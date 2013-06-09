###
    FJS primitive functions
###

module.exports =

# ------------ PRIMITIVES WITH DEFAULT OF 0 ARGUMENTS --------------

	_lbkt__rbkt_: (args...) ->
		if @overrideDefault
			[args]
		else
			[[]]

	_lbrace__rbrace_: (args...) ->
		if @overrideDefault
			obj = {}
			i = 0
			while i < args.length - 1
				obj[args[i].toString()] = args[i+1]
				i += 2
			obj
		else
			{}


# ------------ PRIMITIVES WITH DEFAULT OF 1 ARGUMENT --------------

	_dot_: (args...) ->
		if @overrideDefault
			console.log args...
		else
			console.log args[0]
			args[1..]

	dup: (args...) ->
		if @overrideDefault
			args.concat args
		else
			args[0..0].concat args

	drop: (args...) ->
		if @overrideDefault
			undefined
		else
			args[1..]

	truthy: (args...) ->
		if @overrideDefault
			for arg, i in args then if not args[i] then return false
			true
		else
			[ not not args[0] ].concat args[1..]

	not: (args...) ->
		if @overrideDefault
			for arg, i in args then args[i] = not args[i]
			args
		else
			[ not args[0] ].concat args[1..]

# ------------ PRIMITIVES WITH DEFAULT OF 2 ARGUMENTS --------------

	# dups second or last arg onto stack top
	over: (args...) ->
		if @overrideDefault
			args[-1..-1].concat args
		else
			args[1..1].concat args

	# opposite of rot when more than 2 args
	swap: (args...) ->
		if @overrideDefault
			args[1..-1].concat args[0..0]
		else
			[args[1], args[0]]

	get: (args...) ->
		obj = args[0]
		if @overrideDefault
			res = []
			for args in args[1..]
				res.push obj[ arg ]
			res
		else
			obj[ args[1] ]

	_plus_: (args...) ->
		if @overrideDefault
			haveStr = no
			for arg in args then if typeof arg is 'string' then haveStr = yes; break
			total = (if haveStr then '' else 0)
			for arg in args then total += arg
			total
		else
#			console.log '_plus_ def', args, [ args[0] + args[1] ]
			if args.length < 2 then args
			else [ args[0] + args[1] ].concat args[2..]

	# negate if args.length is 1
	# else replace all args below top with top - arg
	_dash_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg in args[1..] then total -= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] - args[1] ].concat args[2..]

	_star_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg, i in args[1..] then total *= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] * args[1] ].concat args[2..]

	_slash_: (args...) ->
		if @overrideDefault and args.length > 2
			total = +args[0]
			for arg in args[1..] then total /= arg
			total
		else
			if args.length < 2 then args
			else [ args[0] / args[1] ].concat args[2..]

	or: (args...) ->
		if @overrideDefault
			for arg, i in args then if args[i] then return true
			false
		else
			if args.length < 2 then args
			else [ args[0] || args[1] ].concat args[2..]

	and: (args...) ->
		if @overrideDefault
			for arg, i in args then if not args[i] then return false
			true
		else
			if args.length < 2 then args
			else [ args[0] && args[1] ].concat args[2..]

	# checks if all or top two args are equal
	_eq_: (args...) ->
		if @overrideDefault
			top = args[0]
			for arg, i in args[1..] then if top isnt arg then return false
			true
		else
			if args.length < 2 then true
			else [ args[0] is args[1] ].concat args[2..]

	_lt_: (args...) ->
		if @overrideDefault
			for arg, i in args[1..] then if arg[i-1] >= arg then return false
			true
		else
			if args.length < 2 then false
			else [ args[0] < args[1] ].concat args[2..]

	_gt_: (args...) ->
		if @overrideDefault
			for arg, i in args[1..] then if arg[i-1] <= arg then return false
			true
		else
			if args.length < 2 then false
			else [ args[0] > args[1] ].concat args[2..]

	_if_: (args...) ->
		console.log '_if_', args
		if typeof args[0] is 'function' and args[0].call @ or args[0]
			args[1].apply @, args[2..]
		undefined

	doif: (args...) ->
		if typeof args[1] is 'function' and args[1].call @ or args[1]
			args[0].apply @, args[2..]
		undefined

	_while_: (args...) ->
		while args[0].call @ then args[1].apply @, args[2..]
		undefined

	repeat: (args...) ->
		loop
			args[0].apply @, args[1..]
			if @pop() is false then break
		undefined

	dowhile: (args...) ->
		while args[1].call @ then args[0].apply @, args[2..]
		undefined

	map: (args...) ->
		res = []
		for item in args[1]
			args[0].call @, item
			res.push @pop()
		[res]

	each: (args...) ->
		res = []
		for item in args[1]
			args[0].call @, item
			if (resItem = @pop()) is false then break
			res.push resItem
		[res]

# ------------ PRIMITIVES WITH DEFAULT OF 3 ARGUMENTS --------------
	rot: (args...) ->
		if @overrideDefault
			args[-1..-1].concat args[0..-2]
		else
			args[2..2].concat args[0..1], args[3..]

	set: (args...) ->
		obj = args[0]
		if @overrideDefault
			i = 0
			while i < args.length - 1
				obj[args[i]] = args[i+1]
				i += 2
			res
		else
			obj[ args[1] ] = args[2]


# ------------ PRIMITIVES WITH DEFAULT OF ALL ARGUMENTS --------------

	_new_: (args...) ->
		constructor = args[0]
		argsArr = []
		for arg, i in args[1..] then argsArr.push 'args[' + i + ']'
		eval 'new constructor(' + argsArr.join(',') + ')'


exports._throw_  = -> throw JSON.stringify @
