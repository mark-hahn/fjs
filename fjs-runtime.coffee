
###
    File: fjs-runtime.cof -- Module used by every compiled fjs file
	coffee -c fjs-runtime.cof
###

# a fjs function (@codeFuncSegs array) invocation
# includes execution ptr (@segIdx) and datastack (@stack)
class Frame
	constructor: ( @codeFuncSegs ) ->
		@segIdx = 0
		@stack  = []

# execution engine
class Context

	constructor: ->
		@frames = []
		@curFrame = null
		@callbacksPending = 0

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

	pushArgsAndExec: (f, n, modifier) ->
#		console.log {f, n, modifier}

		n or= @curFrame.stack.length
		ctxt = args = null
		stk = @curFrame.stack
		switch modifier
			when '.'  then ctxt = @pop(); args = []
			when '>.' then ctxt = @pop(); args = stk.splice -n, n
			when '.>' then args = stk.splice -n, n; ctxt = @pop
			else ctxt = @; args = stk.splice -n, n
		res = f.apply ctxt, args
		if res isnt undefined then @curFrame.stack.push res

	pushArray: (array) -> @curFrame.stack = @curFrame.stack.concat array

	pushFuncOrSym: (v, s) ->
		if typeof v is 'function' then @curFrame.stack.push v
		else @curFrame.stack.push s

	execOrPush: (v) ->
		res = if typeof v is 'function' then v.call @ else v
		if res isnt undefined then @curFrame.stack.push res

	pushCB: (debug) ->
		@curFrame.stack.push @_callback.bind @, debug
		@callbacksPending++

	_callback: (debug, args...) ->
		@curFrame.stack = @curFrame.stack.concat args
		if debug then console.log 'dbg: <callback>               ', @curFrame.stack
		--@callbacksPending
		if @callbacksPending is 0 then @_run()
		#  else if @callbacksPending < 0 then clone(@)._run()   # clone with prototype

	funcCall: (debug, dbgArgs, segments) ->
		@frames.push @curFrame
		@curFrame = new Frame segments
		if debug then console.log "dbg: (                        ", dbgArgs
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

