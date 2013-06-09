
###
    File: fjs-runtime.cof -- Module used by every compiled fjs file
	coffee -c fjs-runtime.cof
###

# a fjs function (@codeFuncSegs array) invocation
# includes execution ptr (@segIdx) and datastack (@stack)
class Frame
	constructor: ( @codeFuncSegs, @segIdx = 0, @stack = [], @args = [] ) ->

	clone: -> new Frame @codeFuncSegs, @segIdx, @stack.slice 0, @args.slice 0

# execution engine
class Context

	constructor: (@curFrame = null) ->
		@frames = []
		@callbacksPending = 0

	clone: ->
		newCtxt = new Context @curFrame.clone()

	stack: -> @curFrame.stack

	moveArgsToStack: (n) ->
		if not (frame2 = @frames[-1..-1][0]) then return
		if not n
			@curFrame.stack = frame2.args.concat @curFrame.stack
			frame2.args = []
		else
			@curFrame.stack = frame2.args.splice(0, n).concat @curFrame.stack

	setArgs: (args) -> @curFrame.args = Array.prototype.slice.call args

	pop: -> @curFrame.stack.shift()

	popAll: -> stk = @curFrame.stack; @curFrame.stack = []; stk

	popN: (n) ->
		n or= @curFrame.stack.length
		@curFrame.stack.splice 0, n

	push: (v) -> @curFrame.stack.unshift v

	new: (Class, args) ->
		(->
			construct = -> Class.apply this, args
			construct.prototype = Class.prototype
			new construct
		)()

	pushArray: (array) -> @curFrame.stack = array.concat @curFrame.stack

	pushReturnValue: (val) ->
		if typeof val is 'undefined' then return
		if val instanceof Array
#			console.log 'pushReturnValue Array', val
			@pushArray val
		else if toString.call(val) is '[object Arguments]'
			@pushArray Array.prototype.slice call val
		else @curFrame.stack.unshift val

	pushArgsAndExec: (f, n = @curFrame.stack.length) ->
		@overrideDefault = true
		@pushReturnValue f.apply @, @curFrame.stack.splice 0, n
		delete @overrideDefault

	execOrPush: (word) ->
		if typeof word is 'function'
			stk = @curFrame.stack
			@curFrame.stack = []
#			console.log 'execOrPush function', stk
			@pushReturnValue word.apply @, stk
		else
			@push word

	pushCB: (debugFunc) ->
		@curFrame.stack.unshift @_callback.bind @, debugFunc
		@callbacksPending++

	_callback: (debugFunc, args...) ->
		if --@callbacksPending > 0 then return
		ctxt = (if @callbacksPending is 0 then @ else ctxt = @savedCtxt)
		@savedCtxt = ctxt.clone()
		ctxt.curFrame.stack = args.concat ctxt.curFrame.stack
		if debugFunc
			console.log()
			debugFunc.call ctxt, '<callback>'
		ctxt._run()

	funcCall: (debugFunc, segments) ->
		@frames.push @curFrame
		@curFrame = new Frame segments
		if debugFunc then debugFunc.call @, '('
		@_run()

	_run: (args) ->
		@curFrame.codeFuncSegs[@curFrame.segIdx++]?.call @

	wait: ->
		if @callbacksPending < 1 then @_run()
		# else ends js tick execution until next cb

	funcReturn: ->
		stack = @curFrame.stack
		if (@curFrame = @frames.pop())
			@curFrame.stack = stack.concat @curFrame.args, @curFrame.stack

module.exports = new Context

