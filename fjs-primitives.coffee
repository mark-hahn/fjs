###
    FJS primitive functions
###

exports._dot_ = (args...) ->
	if args.length is 0 then console.log @pop()
	else console.log args...
	undefined

exports.swap = ->
	stack = @stack()
	if (stkLen = stack.length) > 1
		top = stack[stkLen-1]
		stack[stkLen-1] = stack[stkLen-2]
		stack[stkLen-2] = top
	undefined

exports.over = ->
	stack = @stack()
	if (stkLen = stack.length) > 1 then @push stack[stkLen-2]
	undefined

exports.dup = (args...) ->
	if args.length is 0
		stack = @stack()
		if (stkLen = stack.length) > 0 then @push stack[stkLen-1]
	else
		@curFrame.stack = args.concat args
	undefined

exports.rot = (args...) ->
	if args.length is 0
		stack = @stack()
		if (stkLen = stack.length) < 3 then exports.swap()
		else
			bot = stack[stkLen-3]
			stack[stkLen-3] = stack[stkLen-2]
			stack[stkLen-2] = stack[stkLen-1]
			stack[stkLen-1] = bot
	else
		@curFrame.stack = args[1..].concat args[0..0]
	undefined

exports.drop = (args...) ->
	if args.length is 0 then @pop()
	undefined

exports._plus_ = (args...) ->
	if args.length is 0
		stack = @stack()
		if (stkLen = stack.length) > 1
			top = @pop()
			stack[stkLen-2] = stack[stkLen-2] + top
	else
		if (argsLen = args.length) > 1
			total = args[argsLen-2] + args[argsLen-1]
			for i in args[0..-3] then total += i
			@curFrame.stack = [total]
	undefined

exports._star_ = (args...) ->
	if args.length is 0
		stack = @stack()
		if (stkLen = stack.length) > 1
			top = @pop()
			stack[stkLen-2] = stack[stkLen-2] * top
	else
		if (argsLen = args.length) > 1
			total = args[argsLen-1]
			for i in args[0..-2] then total *= i
			@curFrame.stack = [total]
	undefined

exports._dash_ = ->
	stack = @stack()
	if (stkLen = stack.length) > 1
		top = @pop()
		stack[stkLen-2] = stack[stkLen-2] - top
	else if stkLen is 1
		stack[stkLen-1]  = -stack[stkLen-1]
	undefined

exports._slash_ = ->
	stack = @stack()
	if (stkLen = stack.length) > 1
		top = @pop()
		stack[stkLen-2] = stack[stkLen-2] / top
	undefined

exports._lt_ = -> @pop() > @pop()
exports._eq_ = -> @pop() is @pop()
exports._gt_ = -> @pop() < @pop()

exports._if_ = ->
	func = @pop()
	@pop().call @
	if @pop()
		if func.fjs_popArgCount then @pushArgsAndExec func, func.fjs_popArgCount
		else @execOrPush func
	undefined

exports._while_ = ->
	func = @pop()
	cond = @pop()
	loop
		cond?.call @
		if @pop()
			@execOrPush?.call @, func
		else
			break
	undefined

exports._throw_  = -> throw JSON.stringify @
