
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

	pop:    -> @curFrame.stack.pop()
	popAll: -> stk = @curFrame.stack; @curFrame.stack = []; stk
	popN: (n) ->
		n or= @curFrame.stack.length
		@curFrame.stack.splice -n, n

	push: (v) -> @curFrame.stack.push v

	pushOuter: (n) ->
		outerStk = @frames[@frames.length-1].stack
		n or= outerStk.length
		items = outerStk.splice -n, n
		@curFrame.stack = @curFrame.stack.concat items

	new: (Class, args) ->
		(->
			construct = -> Class.apply this, args
			construct.prototype = Class.prototype
			new construct
		)()

	pushArgsAndExec: (f, n) ->
		n or= @curFrame.stack.length
		res = f.apply @, @curFrame.stack.splice -n, n
		if res isnt undefined then @curFrame.stack.push res

	pushArray: (array) -> @curFrame.stack = @curFrame.stack.concat array

	pushFuncOrSym: (v, s) ->
		if typeof v is 'function' then @curFrame.stack.push v
		else @curFrame.stack.push s

	execOrPush: (v) ->
		res = if typeof v is 'function' then v.call @ else v
		if res isnt undefined then @curFrame.stack.push res

	pushCB: (debugFunc) ->
		@curFrame.stack.push @_callback.bind @, debugFunc
		@callbacksPending++

	_callback: (debugFunc, args...) ->
		if --@callbacksPending > 0 then return
		ctxt = (if @callbacksPending is 0 then @ else ctxt = @savedCtxt)
		@savedCtxt = ctxt.clone()
		ctxt.curFrame.stack = ctxt.curFrame.stack.concat args
		if debugFunc
			console.log()
			debugFunc.call ctxt, '<callback>'
		ctxt._run()

	funcCall: (debugFunc, dbgArgs, segments) ->
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
			@curFrame.stack = @curFrame.stack.concat stack

module.exports = new Context

