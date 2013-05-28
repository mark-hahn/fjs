fjs
===

FORTH-like language for Javascript / Node

Overview
--------

FJS (the name is from "Forth-like JavaScript") is a concatenative stack language, like [FORTH](http://www.forth.com/forth/) and [Factor](http://factorcode.org/). It is highly integrated with Javascript.  The compiler runs in JS, FJS can load and call any JS file/module, JS modules can load and call FJS modules, all variables are JS types, and JS code can be embedded in FJS.

While FJS has many features (see next section), I'd like to point out one big one for the Node community. All stack languages easily and naturally support continuations.  FJS takes advantage of this to convert the Javascript callbacks into a pure linear sync code style.  See the http server example below.

Features
--------

- Easy to learn.  There is almost no syntax.
- Excellent for REPL usage due to simple definitions and small amount of typing.
- All the features of old stack languages updated to modern functional style.
- Compatible with Javascript in all ways. Compatible with all javascript modules.
- Runs on the server or in the browser.  Compiled code is standard Javascript.
- Compiles very fast.
- Allows writing simple linear code while calling async functions.
- Context (continuation) objects allow meaningful complete stack traces.

Status (Version 0.0.0)
----------------------

While FJS code can be compiled and run, the project is pre-pre-alpha.  Some missing features ...

- The documentation has barely begun (see below).
- REPL.  Plans are in the works for a webpage based REPL with sandbox.
- Better error reporting. Currently debugging is done by an exhaustive execution trace.
- Unit testing is needed, but that will be easy due to the nature of the FJS language.
- Optimized compilation for faster execution.  Speed is unmeasured at this point. (Even though FJS semantics assume a stack, much of the code can be optimized to remove the stack behind the scenes.)


Why Use A Stack Language?
-------------------------

Stack languages are concise, simple, and powerful. See the [Wikipedia entry](http://en.wikipedia.org/wiki/Stack-oriented_programming_language). They are effecitively a macro language excellent for DSP and REPL usage.  Stack programs have virtually no syntax. They are just a list of constants and functions.  See this [discussion](http://concatenative.org/wiki/view/Concatenative%20language) from the Factor website for an extended look at the advantages of stack languages.

Stack languages look confusing to beginners until the RPN argument order becomes familiar.  Once you understand the stack usage you will realize how simple it is that each word executes immediately and in order.  It becomes quite readable.

Installation / Usage
--------------------

FJS compiles using Node and FJS executable code has only been tested in Node.  FJS is not available on NPM yet. FJS is written entirely in coffeescript but it is not needed for normal usage.

To try out FJS now you will need to clone the repo from git@github.com:mark-hahn/fjs.git.  Keep all files in the one fjs directory and use `node fjs myfile` to compile the FJS source file myfile.jfs to myfile.js. Then execute myfile.js with `node myfile`.  A windows batch file is included for automating the complete cycle of compiling the compiler, compiling the runtime modules, comiling the FJS source code, and executing the result. A bash equivalent is coming soon.

The runtime does not yet have error reporting but it will be supported soon including stack traces that are transparent to callbacks, unlike JS traces.  For now you can set the variable `debugRuntime` in the compiler to true, compile the compiler with `coffee -c fjs.coffee` and you will see an execution trace showing the stack on very instruction.

Hello World
-----------

Here is the mandatory Hello World which should look familiar to FORTH programmers ...

    'Hello World' .

This is FORTH code but it is JS under the covers.  For example the dot (print) command is actually just a synonym for console.log.

Http Server
-----------
Let's jump to more complex code.  This is the Node http server example from the Node home page followed by the FJS version. This is provided to show how FJS uses JS semantics.  You don't have to understand this now.  It uses some advanced FJS concepts.

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

	cb 'http' 1>require >.createServer
	1337 '127.0.0.1' rot 2>.listen drop
	'Server running at http://127.0.0.1:1337/' . wait swap drop dup
	  200 `{'Content-Type':'text/plain'} rot 2>.writeHead
	  'Hello World ' `i++ 2>+ swap 1>.end

Note how the flow of the FJS code matches the actual execution order, unlike JS with callbacks.  The execution "pauses" at the wait command (by saving a continution and returning to the JS event loop).  Then when all callbacks have occured internally execution will continue from the `wait` command with the callback arguments on the stack.  If more callbacks occur the execution from the `wait` command will repeat using a new context for each callback.

Documentation
-------------

*Execution*

FJS is unique, even among other FORTH-like languages, in that execution always proceeds from one word to the next without ever going backwards and never skipping.  Conditional execution is handled by using anonymous functions with the `if` command that are conditionally executed.  Loops are managed by calling functions repeatedly with `while` commands, etc.  Also, using iterator functions like `map` and `fold` reduce the need for loops.  This simple linear execution, even when calling async functions, makes FJS quite readable once you learn the command words and the RPN stack model becomes familiar.

*Words/Functions*

A word can be any mix of characters other than white-space and periods.  There are some other format restrictions (see *Word Modifiers* below).  Valid words examples are `myvar`, `2`, `/+X`, `i++`, and `(*&^`.  All white space is ignored including line endings so there is actually no concept of a line.  All words are translated to legal JS variable names internally.  So `/+X` would be represented internally as `_slash__plus_X`.

Each word in FJS is either a JS constant or a JS function evaluation.  In both cases a value is pushed on the stack.  A function may pop one or more arguments from the stack before execution.  *All* function words are implemented as normal Javascript functions.  See the fjs-primitives file for examples.

A function can be defined in FJS by a simple set of parenthese surrounding code.  Every function definition in FJS is anonymous until assigned to a variable (ala coffee-script).  Here is a function that adds two numbers and prints them.  The word outside the parens assigns the function to a named variable.  The second line uses the new function.

    ( @2 + . ) addPrint=
    1 2 addPrint

*Named Variables and Scoping*

*Primitive Commands*

*Word Modifiers*


