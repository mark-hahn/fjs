
###
    FJS compiler
    coffee fjs.coffee test
###

version = '0.1.0'

debugCompile = yes
debugRuntime = no

fs = require 'fs'

path = process.argv[2]
longPad = ''; for i in [0..25] then longPad += '     '

withStmntStack 	= []
localVarStack   = []

depth 			= 0
haveDbgInspect 	= no

funcOut = "\n// File #{path} compiled by FJS version #{version} " +
		  "on #{new Date().toString()[0..20]}\n\n"
#		  "fjs_keepAlive = setInterval(function(){}, 1e9);\n\n"

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

	getJsString = (word, regex) ->
		out = ""
		i = regex.lastIndex - word.length + 1
		while i < funcSrc.length
			chr0 = funcSrc[i]
			chr1 = funcSrc[i+1] ? ' '
			if chr0 is '\\'
				out += chr0 + chr1
				i += 2
				continue
			if chr0 is "`" and /\s/.test chr1
				regex.lastIndex = i + 1
				return out
			out += chr0
			i++
		throw new Exception 'Unterminated backtick string'

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

	outFunc = (wordRegEx, exec = yes) ->

		if debugCompile then console.log 'outFunc', exec

		if exec
			out null, '( function(){'
		else
			out null, 'this.push( function(){'

		depth++

		compileFunc getFuncString wordRegEx

		depth--
		out null, '}'

		if exec
			out '()', '} ).apply( this, this.curFrame.stack );'
			out null, 'this.curFrame.stack = [];'
		else
			out null, '} );'

	#################### emit debug routine at top of file #####################

	if debugRuntime and not haveDbgInspect
		out null, "function fjsInspect(fjs_word) {\n" +
				  "  while(fjs_word.length < 25) fjs_word += ' ';\n" +
				  "  fjs_stkDmp = []; fjs_frame = this.curFrame;\n" +
				  "  if(fjs_frame) {\n" +
				  "    fjs_stk = fjs_frame.stack; fjs_stkLen = fjs_stk.length;\n" +
				  "    for(fjs_i=0; fjs_i<fjs_stkLen; fjs_i++) {\n" +
				  "      fjs_item = fjs_stk[fjs_i];\n" +
				  "      fjs_stkDmp.push(\n" +
				  "        fjs_item === null ? 'null' : \n" +
				  "        typeof fjs_item == 'string'  ? '\"'+fjs_item+'\"'          : \n" +
		          "        typeof fjs_item == 'number'  ?  fjs_item                   : \n" +
				  "        fjs_item instanceof Function ? 'function'                  : \n" +
		          "        fjs_item instanceof Array    ? '['+fjs_item.toString()+']' : \n" +
		          "        fjs_item instanceof Boolean  ? fjs_item.toString()         : \n" +
				  "        (fjs_m = /^function\\s(.*?)\\(/.exec(fjs_item.constructor)) ? fjs_m[1] :\n" +
				  "        fjs_item.toString()\n" +
				  "      );\n" +
				  "    }\n" +
				  "  }\n" +
				  "  console.log( 'dbg: ' + fjs_word, fjs_stkDmp.join(', '));\n" +
				  "}\n"
		haveDbgInspect = yes


	#################### find new local vars #####################

	localVars = {}
	wordsInLine = []

	wordRegEx = new RegExp '(\\S+)(\\s*)', 'g'
	while (matches = wordRegEx.exec funcSrc)
		[_, wordMatch, whiteSpace] = matches

		wordsInLine.push wordMatch

		if not whiteSpace or /\n/.test whiteSpace or wordRegEx.lastIndex is funcSrc.length
			for word in wordsInLine
				if /^\d*>\(|:?\(<\d*$/.test(word) or word in ['(', ':('] then break

				if word not in ['=', '>='] and word[-1..-1] is '='
					word = word[0..-2]
					exists = no
					for varSet in localVarStack ? []
						if varSet[word] then exists = yes; break

					if not exists then localVars[word] = yes

			wordsInLine = []

#	if debugCompile then console.log 'localVars', localVars

	localVarStack.push localVars


	#################### emit function overhead #####################

	localVarsArr = []
	for localVar of localVars then localVarsArr.push encodeSymbol localVar
	if localVarsArr.length
		out null, 'var ' + localVarsArr.join(', ') + ';'

	out null, pfx + '.funcCall( ' + (if debugRuntime then 'fjsInspect,' else 'null,'), no
	depth++

	out null, '['
	depth++

	out null, 'function() {'
	depth++

	withStmntStack.push []


	#################### emit js code word by word #####################

	wordsInLine = []

	wordRegEx = new RegExp '(\\S+)(\\s*)', 'g'
	while (matches = wordRegEx.exec funcSrc)
		[_, wordMatch, whiteSpace] = matches

		wordsInLine.push wordMatch

		if not whiteSpace or /\n/.test whiteSpace or wordRegEx.lastIndex is funcSrc.length

			for word in wordsInLine
				if debugCompile then console.log 'word: ', word

				if word[0..1] is '//' then burnToEOL wordRegEx

				else if word[0..4] is 'with:'
					topIdx = withStmntStack.length-1
					sym = encodeSymbol word[5..]
					withStmntStack[topIdx].push sym
					out null, 'with( ' + sym + ' ) {'
					depth++

				else if word[0..6] is 'typeof:'
					sym = encodeSymbol word[7..]
					out word, 'this.push( typeof ' + sym + ' );'
					depth++

				else if word[0..10] is 'instanceof:'
					sym = encodeSymbol word[11..]
					out word, 'this.push( this.pop() instanceof ' + sym + ' );'
					depth++

				else if word is 'cb' then out word, 'this.pushCB(' +
						(if debugRuntime then 'fjsInspect' else 'null') + ');'

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

				# Javascript constant
				else if word[0] is "`"
					str = getJsString word, wordRegEx
					if str.length > word.length then word += ' ...'
					out word, 'this.push( ' + str + ' );'

				# var assignment, xxx=
				else if word.length > 1 and word[-1..-1] is '='
					out word, encodeSymbol(word[0..-2]) + ' = this.pop();'

				# left paren opening function def with optional colon modifier
				else if (m = /^(:)?\($/.exec word)
#					if debugCompile then console.log 'lftparen', colon
					outFunc wordRegEx, not m[1]

				# move outer stack items to inner stack, @n
				else if (matches = /^@(\d*)$/.exec word)
					out word, 'this.pushOuter( ' + matches[1] + ' );'

				# literal string or push anonymous function, :xxx
				else if word[0] is ':'
					sym = encodeSymbol word[1..]
					out null, 'this.pushFuncOrSym( typeof ' +
								sym + ' == "undefined" ? null : ' + sym + ', "' + sym + '");'
					out word, ''

				# dot modifier to var or function, xxx.
				else if (m = /^(\S+)(\.)?$/.exec word)
					[_, front, dot] = m
#					if debugCompile then console.log 'dot', {front, dot}

					if not front
						if dot
							out '.', 'this.execOrPush( _dot_ );'
					else
						sym = encodeSymbol front
						if not dot
							out word, 'this.execOrPush( ' + sym + ' );'
						else
							out null, 'fjs_ctxtObj = this.pop();'
							out null, 'fjs_val = fjs_ctxtObj.' + sym + ';'
							out null, 'if(typeof fjs_val == "function")'
							out null, '  fjs_val = fjs_val.apply('
							out null, '      fjs_ctxtObj, this.curFrame.stack );'
							out word, 'if(fjs_val != undefined) this.pushReturn(fjs_val);'

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

symByWord =  throw: '_throw_', if: '_if_', while: '_while_', '.': '_dot_', new: '_new_'

wordBySym = _throw_: 'throw', _if_: 'if', _while_: 'while',  _dot_: '.', _new_: 'new'

encodeSymbol = (str) ->
	if str.length is 0 then return str
	if str[0] is '`' then return str[1..]
	if str of symByWord then return symByWord[str];

	out = '';
	for char in str
		if (name = nameByChar[char]) then out += '_' + name + '_'
		else out += char

	if isNaN(out) and /^\d/.test out then out = '_num_' + out

	out

decodeSymbol = (str) ->
	if str of wordBySym then return wordBySym[str];

	for name, char of charByName
		regex = new Regexp '_' + name + '_', 'g'
		str = str.replace regex, char
	str


########################## EXECUTE COMPILER ###########################

src = "with:fjs-primitives  fjs-primitives=  require './fjs-primitives'\n\n" +
	  	fs.readFileSync(path + '.fjs').toString()

compileFunc src, "require('./fjs-runtime')"

fs.writeFile path + '.js', funcOut
