###
    FJS primitive functions
###

module.exports =

	_new_:  (args...) ->
		if args.length is 0
			@new @pop()
		else
			@new args.pop(), args

	_dot_:  (args...) ->
		if args.length is 0 then console.log @pop()
		else console.log args...
		undefined

	# same as dup for 1 arg
	# also opposite of rot for more than 2 args
	swap:  (args...) ->
		if args.length is 0
			stack = @stack()
			if (stkLen = stack.length) > 1
				top = stack[stkLen-1]
				stack[stkLen-1] = stack[stkLen-2]
				stack[stkLen-2] = top
			undefined
		else
			args[-1..-1].concat args[0..-2]

	dup:  (args...) ->
		if args.length is 0
			stack = @stack()
			stack[stack.length-1]
		else
			args.concat args

	# dup stack[-args.length] on top of stack (stack index)
	over:  (args...) ->
		if args.length is 0
			stack = @stack()
			if (stkLen = stack.length) > 1 then stack[stkLen-2]
		else
			args.concat args[0..0]

	rot:  (args...) ->
		if args.length is 0
			stack = @stack()
			if (stkLen = stack.length) < 3 then exports.swap()
			else
				bot = stack[stkLen-3]
				stack[stkLen-3] = stack[stkLen-2]
				stack[stkLen-2] = stack[stkLen-1]
				stack[stkLen-1] = bot
			undefined
		else
			args[1..].concat args[0..0]

	# also drops args.length items
	drop:  (args...) ->
		if args.length is 0 then @pop()
		undefined

	# + is the only operator that just sums all args
	_plus_:  (args...) ->
		if args.length is 0
			stack = @stack()
			if (stkLen = stack.length) > 1
				top = @pop()
				stack[stkLen-2] = stack[stkLen-2] + top
				undefined
		else
			haveStr = no
			for arg in args then if typeof arg is 'string' then haveStr = yes; break
			total = (if haveStr then '' else 0)
			for arg in args then total += arg
			total

	# negate if stack.length is 1
	# subtract top from all args below top
	_dash_:  (args...) ->
		if (argsLen = args.length) is 0
			stack = @stack()
			if (stkLen = stack.length) > 1
				top = @pop()
				stack[stkLen-2] = stack[stkLen-2] - top
			else if stkLen is 1
				stack[0] = -stack[0]
			undefined
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] -= top
			args

	_star_:  (args...) ->
		if (argsLen = args.length) is 0
			stack = @stack()
			if (stkLen = stack.length) > 1
				top = @pop()
				stack[stkLen-2] = stack[stkLen-2] * top
				undefined
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] *= top
			args

	_slash_:  (args...) ->
		if (argsLen = args.length) is 0
			stack = @stack()
			if (stkLen = stack.length) > 1
				top = @pop()
				stack[stkLen-2] = stack[stkLen-2] / top
			undefined
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] /= top
			args

	# checks if all args are equal
	_eq_:  (args...) ->
		if (argsLen = args.length) is 0
			@pop() is @pop()
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] = args[i] is top
			args

	_lt:  (args...) ->
		if (argsLen = args.length) is 0
			@pop() > @pop()
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] = args[i] < top
			args

	_gt_:  (args...) ->
		if args.length is 0
			@pop() < @pop()
		else
			top = args.pop()
			for i in [0..argsLen-2] then args[i] = args[i] > top
			args

	truthy:  (args...) ->
		if (argsLen = args.length) is 0
			stack = @stack()
			stkLenM1 = stack.length-1
			stack[stkLenM1] = not not stack[stkLenM1]
		else
			for i in [0..argsLen-1] then args[i] = not not args[i]
			args

	not:  (args...) ->
		if (argsLen = args.length) is 0 then not @pop()
		else
			for i in [0..argsLen-1] then args[i] = not args[i]
			args

	_if_:  (args...) ->
		if (argsLen = args.length) is 0
			@pop().call @; cond = @pop()
			func = @pop()
			if cond
				if func.fjs_popArgCount then @pushArgsAndExec func, func.fjs_popArgCount
				else @execOrPush func
		else
			args.pop().call @; cond = @pop()
			if cond
				for func in args[0..argsLen-2]
					if func.fjs_popArgCount then @pushArgsAndExec func, func.fjs_popArgCount
					else @execOrPush func
		undefined

	_while_:  ->
		if (argsLen = args.length) is 0
			cond = @pop()
			func = @pop()
			loop
				cond?.call @
				if @pop()
					@execOrPush.call @, func
				else
					break
		else
			cond = args.pop()
			loop
				cond?.call @
				if @pop()
					for func in args[0..argsLen-2]
						@execOrPush.call @, func
				else
					break
		undefined

exports._throw_  = -> throw JSON.stringify @
