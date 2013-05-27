
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


	#################### find span routines #####################

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


	#################### emit routines #####################

	out = (word, line, dbgOk = yes) ->
		str = ''; for i in [0...depth] then str += '  '
		str += line
		if word
			while str.length  < 75 then str += ' '
			dbgStr = ''
			if debugRuntime and dbgOk
				dbgStr = longPad + 'fjsInspect.call(this, "' + word.replace(/"/g, "'") + '");'
			funcOut += str + ' /* ' + word + ' */' + dbgStr + '\n'
		else
			funcOut += str + '\n'

	outFunc = (pushArgCount, wordRegEx, exec = yes, popArgCount) ->
		if pushArgCount is '' then pushArgCount = 'Infinity'
		if popArgCount  is '' then popArgCount  = 'Infinity'

		if debugCompile then console.log 'outFunc', {pushArgCount, exec, popArgCount}

		out null, 'var fjs_func = function(){'
		depth++

		if pushArgCount?
			out null, 'var fjs_args = (Array.prototype.slice.call('
			out null, '    arguments, 0, (fjs_func.fjs_popArgCount || Infinity)));'
			args = (if pushArgCount then ', this.popN(' + pushArgCount + ') ' else ' ')
		else
			out null, 'var fjs_args = [];'
			args = ' '

		compileFunc getFuncString wordRegEx

		depth--
		out null, '}'

		if popArgCount
			out null, 'fjs_func.fjs_popArgCount = ' + popArgCount + ';'

		if exec
			out null, 'fjs_func.apply( this' + args + ');'

	#################### emit debug routine at top of file #####################

	if debugRuntime and not haveDbgInspect
		out null, "function fjsInspect(word) {\n" +
				  "  while(word.length < 25) word += ' ';\n" +
				  "  stkDmp = []; frame = this.curFrame;\n" +
				  "  if(frame) {\n" +
				  "    stk = frame.stack; stkLen = stk.length;\n" +
				  "    for(i=0; i<stkLen; i++) {\n" +
				  "      item = stk[i];\n" +
				  "      stkDmp.push(item === null ? 'null' : \n" +
				  "        typeof item == 'function' ? '<function>' : \n" +
                  "        typeof item == 'object' && \n" +
                  "          !(item instanceof Array) ? '<object>' : item);\n" +
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

		if /^\d*>\(|:?\(<\d*$/.test(word) or word in ['(', ':('] then break

		if word not in ['=', '>='] and word[-1..-1] is '='
			word = word[0..-2]
			exists = no
			for varSet in localVarStack ? []
				if varSet[word] then exists = yes; break

			if not exists then localVars[word] = yes

	if debugCompile then console.log 'localVars', localVars

	localVarStack.push localVars


	#################### emit function overhead #####################

	localVarsArr = []
	for localVar of localVars then localVarsArr.push encodeSymbol localVar
	if localVarsArr.length
		out null, 'var ' + localVarsArr.join(', ') + ';'

	dbgArgs = (if not firstFunc then dbgArgs = 'fjs_args, ' else '[], ')
	out null, pfx + '.funcCall( ' + debugRuntime + ', ' + dbgArgs, no
	depth++

	out null, '['
	depth++

	out null, 'function() {'
	depth++

	if not firstFunc
		out null,  'this.pushArray(fjs_args);'
	firstFunc = no

	withStmntStack.push []


	#################### emit js code word by word #####################

	wordRegEx = new RegExp '\\s*(\\S+)', 'g'

	while (matches = wordRegEx.exec funcSrc)
		word = matches[1]

		if debugCompile then console.log 'word: ', word

		if word[0..1] is '//' then burnToEOL wordRegEx

		else if word[0..4] is 'with:'
			topIdx = withStmntStack.length-1
			sym = encodeSymbol word[5..]
			withStmntStack[topIdx].push sym
			out null, 'with( ' + sym + ' ) {'
			depth++

		else if word is 'cb' then out word, 'this.pushCB(' + debugRuntime + ');'

		else if word is  'wait'
			out word, 'this.wait();'
			for i in withStmntStack[withStmntStack.length-1] then depth--; out null, '}'
			depth--
			out null, '}, function() {'
			depth++
			for w in  withStmntStack[withStmntStack.length-1]
				out null, 'with( ' + encodeSymbol(w) + ' ) {'
				depth++

		# string constant
		else if word[0] in ['"',"'"]
			str = getString word, wordRegEx
			if str.length > word.length then word += ' ...'
			out word, 'this.push( ' + str + ' );'

		# var assignment, xxx=
		else if word.length > 1 and word[-1..-1] is '='
			out word, encodeSymbol(word[0..-2]) + ' = this.pop();'

		# left paren opening function def with option modifiers, :n>(<n
		else if (m = /^(:)?((\d*)>)?\((<(\d*))?$/.exec word)
			[colon, gt, gtn, lt, ltn] = m[1..]
			if debugCompile then console.log 'lftparen', {colon, gt, gtn, lt, ltn}
			outFunc gtn, wordRegEx, not colon, ltn

		# move outer stack items to inner stack, @n
		else if (matches = /^@(\d*)$/.exec word)
			out word, 'this.pushOuter( ' + matches[1] + ' );'

		# literal string or push anonymous function, :xxx
		else if word[0] is ':'
			sym = encodeSymbol word[1..]
			out null, 'this.pushFuncOrSym( typeof ' +
						sym + ' == "undefined" ? null : ' + sym + ', "' + sym + '");'
			out word, ''

		# gt and/or dot modifier to var or function, n>.xxx
		else if (m = /^(((\d*)>)?(\.)?)([^\s]+)/.exec word)
			[mod, gt, gtn, dot, rest] = m[1..]
			if debugCompile then console.log 'gt_and/or_dot', {gt,  gtn, dot, rest, mod}

			if not mod
				out word, 'this.execOrPush( ' + encodeSymbol(word) + ' );'
				continue

			sym = encodeSymbol rest

			if dot
				out null, 'fjs_ctxtObj = this.pop();'
				out null, 'fjs_val = fjs_ctxtObj.' + sym + ';'

				if gtn then out null, 'args = this.stack().splice(-' + gtn + ', ' + gtn + ')'
				out null, 'if(typeof fjs_val == "function")'

				if gtn
					out null, '  fjs_val = fjs_val.apply(fjs_ctxtObj, args);'
				else if gt
					out null, '  fjs_val = fjs_val.apply(fjs_ctxtObj, this.popAll());'
				else
					out null, '  fjs_val = fjs_val.call(fjs_ctxtObj);'

				out word, 'if(fjs_val != undefined) this.push(fjs_val);'
			else
				out word, 'this.pushArgsAndExec( ' + sym + ', ' + (gtn or 'null') + ' );'

		# plain var or function
		else
			out sym, 'this.execOrPush( ' + encodeSymbol(sym) + ' );'

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
	if debugCompile then console.log 'word:  )'


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

#	if not str[0] is '.' and str.indexOf('.') isnt -1
#		words = str.split '.'
#		strs = []
#		for seg in words then if seg.length then strs.push encodeSymbol(seg)
#		str = strs.join '.'

	if str[0] is '`' then return str[1..]

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


########################## EXECUTE COMPILER ###########################

src = "'./fjs-primitives' >require fjs-primitives= with:fjs-primitives \n\n" +
	  	fs.readFileSync(path + '.fjs').toString()

compileFunc src, "require('./fjs-runtime')"

fs.writeFile path + '.js', funcOut
