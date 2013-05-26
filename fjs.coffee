
###
    FJS compiler
    coffee fjs.coffee test
###

version = '0.0.0'

debugCompile = no
debugRuntime = yes

fs = require 'fs'

path = process.argv[2]
longPad = ''; for i in [0..25] then longPad += '     '

withStmntStack 	= []
localVarStack   = []

depth 			= 0
haveDbgInspect 	= no
firstFunc 		= yes

funcOut = "\n// File #{path} compiled by FJS version #{version} " +
		  "on #{new Date().toString()[0..20]}\n\n"

########### compile function ############

compileFunc = (funcSrc, pfx = 'this', argCount = 0) ->

	getString = (word, regex) ->
		delim = word[0]
		out = delim
		i = regex.lastIndex - word.length + 1
		while i < funcSrc.length
			chr0 = funcSrc[i]
			chr1 = funcSrc[i+1] ? ' '
			if chr0 is '\\'
				out += chr0 + chr1
				i += 2
				continue
			out += chr0
			if chr0 is delim and /\s/.test chr1
				regex.lastIndex = i + 1
				return out
			i++
		throw new Exception 'Unterminated string'

	getFuncString = (regex) ->
		out = ''
		i = regex.lastIndex
		while i < funcSrc.length
			chr0 = funcSrc[i]
			chr1 = funcSrc[i+1] ? ' '
			chr2 = funcSrc[i+2] ? ' '
			if chr0 is '\\'
				out += chr0 + chr1
				i += 2
				continue
			if /\s/.test(chr0) and chr1 is ')' and /\s/.test(chr2)
				regex.lastIndex = i + 2
				return out
			out += chr0
			i++
		throw new Exception 'Unterminated function, missing right paren'

	burnToEOL = (regex) ->
		eolRegex = new RegExp '.*', 'gm'
		eolRegex.lastIndex = regex.lastIndex
		eolRegex.exec funcSrc
		regex.lastIndex = eolRegex.lastIndex

	out = (word, line, dbgOk = yes) ->
		str = ''; for i in [0...depth] then str += '  '
		str += line
		if word
			while str.length  < 50 then str += ' '
			dbgStr = ''
			if debugRuntime and dbgOk
				dbgStr = longPad + 'fjsInspect.call(this, "' + word + '");'
			funcOut += str + ' /* ' + word + ' */' + dbgStr + '\n'
		else
			funcOut += str + '\n'

	outFunc = (argCount, wordRegEx, exec = yes) ->
		if debugCompile then console.log 'outFunc', {argCount, exec}

		out null, (if exec then '(' else '') + 'function(){'
		depth++
		if argCount?
			out null, 'var fjs_args = Array.prototype.slice.call(arguments);'
			args = ', this.popN(' + argCount + ') '
		else
			out null, 'var fjs_args = [];'
			args = ' '
		compileFunc getFuncString wordRegEx
		depth--
		out null, (if exec then '}).apply( this' + args + ');' else '}')

	if debugRuntime and not haveDbgInspect
		out null, "function fjsInspect(word) {\n" +
				  "  while(word.length < 25) word += ' ';\n" +
				  "  stkDmp = []; frame = this.curFrame;\n" +
				  "  if(frame) {\n" +
				  "    stk = frame.stack; stkLen = stk.length;\n" +
				  "    for(i=0; i<stkLen; i++) {\n" +
				  "      item = stk[i];\n" +
				  "      stkDmp.push(item === null ? 'null' : " +
				  "                  typeof item == 'function' ? '<function>' : \n" +
				  "                  typeof item == 'object' ? '<object>' : item);\n" +
				  "    }\n" +
				  "  }\n" +
				  "  console.log( 'dbg: ' + word, stkDmp);\n" +
				  "}\n"
		haveDbgInspect = yes


#################### find new local vars #####################

	localVars = {}

	wordRegEx = new RegExp '\\s*(\\S+)', 'g'
	while (matches = wordRegEx.exec funcSrc)
		word = matches[1]
		if word not in ['=', '>='] and word[-1..-1] is '='
			word = word[0..-2]
			exists = no
			for varSet in localVarStack ? []
				for existingVar of varSet
					if word is existingVar
						exists = yes
						break
				if exists then break
			if not exists then localVars[word] = yes

	if debugCompile then console.log 'localVars', localVars

	localVarStack.push localVars


#################### emit function overhead #####################

	localVarsArr = []
	for localVar of localVars then localVarsArr.push encodeSymbol localVar
	if localVarsArr.length
		out null, 'var ' + localVarsArr.join(', ') + ';'

	dbgArgs = (if not firstFunc then 'fjs_args,' else 'null, ')
	out null, pfx + '.funcCall( ' + debugRuntime + ', ' + dbgArgs, no
	depth++

	out null, '['
	depth++

	out null, 'function() {'
	depth++

	if not firstFunc then out null,  'this.pushArray(fjs_args);'
	firstFunc = no

	withStmntStack.push []


#################### emit js code word by word #####################

	wordRegEx = new RegExp '\\s*(\\S+)', 'g'

	while (matches = wordRegEx.exec funcSrc)
		word = matches[1]

		if debugCompile then console.log 'word: ', word

		if word[0..4] is 'with:'
			topIdx = withStmntStack.length-1
			sym = encodeSymbol word[5..]
			withStmntStack[topIdx].push sym
			out null, 'with( ' + sym + ' ) {'
			depth++
			continue

		switch word
			when 'cb' then out word, 'this.pushCB(' + debugRuntime + ');'

			when 'wait'
				out word, 'this.wait();'
				for i in withStmntStack[withStmntStack.length-1] then depth--; out null, '}'
#				depth--
				out null, '}, function() {'
				depth++
				for w in  withStmntStack[withStmntStack.length-1]
					out null, 'with( ' + encodeSymbol(w) + ' ) {'
					depth++

			when '@'  then out word, 'this.at();'
			when '>@' then out word, 'this.atAll();'

			else
				if word[0..1] is '//' then burnToEOL wordRegEx

				else if word is '('
					outFunc 0, wordRegEx

				else if word is  ':('
					out null, 'this.push('
					depth++
					outFunc 0, wordRegEx, no
					depth--
					out word, ');'

				else if (matches = /^(\d*)>\($/.exec word)
					outFunc matches[1], wordRegEx

				else if word[0] in ['"',"'"]
					str = getString word, wordRegEx
					if word[-1..-1] isnt word[0] then word += ' ...'
					out word, 'this.push( ' + str + ' );'

				else if word.length > 1 and word[-1..-1] is '='
					out word, encodeSymbol(word[0..-2]) + ' = this.pop();'

				else if word[0] is ':'
					sym = encodeSymbol word[1..]
					out null, 'this.pushFuncOrSym( typeof ' +
								sym + ' == "undefined" ? null : ' + sym + ', "' + sym + '");'
					out word, ''

				else if word.length > 1 and word[0] is '>'
					out word, 'this.pushArgsAndExec( ' + encodeSymbol(word[1..]) + ' );'

				else
					out word, 'this.execOrPush( ' + encodeSymbol(word) + ' );'

	out ')', 'this.funcReturn();'
	for i in withStmntStack[withStmntStack.length-1] then depth--; out null, '}'

	depth--
	out null, '}'

	depth--
	out null, ']'

	withStmntStack.pop()
	localVarStack.pop()

	depth--
	out null, ');'
	if debugRuntime then console.log 'word:  )'


############################ SYMBOL ENCODING ############################

nameByChar =
	'!': 'bang',   '"': 'quot',   '#': 'hash',   '%': 'pcent', '&':  'amp',    "'": 'tick'
	'(': 'lparen', ')': 'rparen', '*': 'star',   '+': 'plus',  ',':  'comma',  '-': 'dash'
	'/': 'slash',  ':': 'colon',  ';': 'semi',  '<':  'lt',     '=': 'eq'
	'>': 'gt',     '?': 'qmark',  '@': 'at',     '[': 'lbkt',  '\\': 'bslsh',  ']': 'rbkt'
	'^': 'caret',  '`': 'btick',  '{': 'lbrace', '|': 'pipe',  '}':  'rbrace', '~': 'tilda'

charByName =
	'bang'  : '!', 'quot'  : '"', 'hash'  : '#', 'pcent' : '%', 'amp'   : '&', 'tick'  : "'"
	'lparen': '(', 'rparen': ')', 'star'  : '*', 'plus'  : '+', 'comma' : ',', 'dash'  : '-'
	'slash' : '/', 'colon' : ':', 'semi'  : ';', 'lt'    : '<', 'eq'    : '='
	'gt'    : '>', 'qmark' : '?', 'at'    : '@', 'lbkt'  : '[', 'bslsh' : '\\','rbkt'  : ']'
	'caret' : '^', 'btick' : '`', 'lbrace': '{', 'pipe'  : '|', 'rbrace': '}', 'tilda' : '~'

symByWord =  throw: '_throw_', if: '_if_', while: '_while_', '.': '_dot_'

wordBySym = _throw_: 'throw', _if_: 'if', _while_: 'while',  _dot_: '.'

encodeSymbol = (str) ->
	if str.length is 0 then return str
	if str of symByWord then return symByWord[str];
	out = '';
	for char in str
		if (name = nameByChar[char]) then out += '_' + name + '_'
		else out += char
	out

decodeSymbol = (str) ->
	if str of wordBySym then return wordBySym[str];

	for name, char of charByName
		regex = new Regexp '_' + name + '_', 'g'
		str = str.replace regex, char
	str


########################## START ###########################

src = "'./fjs-primitives' >require fjs-primitives= with:fjs-primitives \n\n" +
	  fs.readFileSync(path + '.fjs').toString()

compileFunc src, "require('./fjs-runtime')"

fs.writeFile path + '.js', funcOut
