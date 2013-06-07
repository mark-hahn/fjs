
###
    File: fjs-runtime.cof -- Module used by every compiled fjs file
	coffee -c fjs-runtime.cof
###

# a fjs function (@codeFuncSegs array) invocation
# includes execution ptr (@segIdx) and datastack (@stack)
class Frame
	constructor: ( @codeFuncSegs, @segIdx = 0, @stack = [] ) ->

	clone: -> new Frame @codeFuncSegs, @segIdx, @stack.slice 0

# execution engine
class Context

	constructor: (@curFrame = null) ->
		@frames = []
		@callbacksPending = 0

	clone: ->
		newCtxt = new Context @curFrame.clone()
		newCtxt

	stack: -> @curFrame.stack

	pop: -> @curFrame.stack.shift()

	popAll: -> stk = @curFrame.stack; @curFrame.stack = []; stk

	popN: (n or= @curFrame.stack.length) ->
		@curFrame.stack.splice 0, n

	push: (v) -> @curFrame.stack.unshift v

	pushOuter: (n) ->
		outerStk = @frames[@frames.length-1].stack
		n or= outerStk.length
		items = outerStk.splice 0, n
		@curFrame.stack = items.concat @curFrame.stack

	new: (Class, args) ->
		(->
			construct = -> Class.apply this, args
			construct.prototype = Class.prototype
			new construct
		)()

	pushArray: (array) -> @curFrame.stack = array.concat @curFrame.stack

	pushReturnValue: (val) ->
		if typeof val is 'undefined' then return
		if val instanceof Array then @pushArray val
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
			@curFrame.stack = stack.concat @curFrame.stack

module.exports = new Context

