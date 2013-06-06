fjs
===

Concatenative (FORTH-like) language for Javascript / Node

Overview
--------

FJS (the name is from "Forth-like JavaScript") is a concatenative stack language, like [FORTH](http://en.wikipedia.org/wiki/Forth_(programming_language)), [Postscript](http://en.wikipedia.org/wiki/PostScript), and [Factor](http://en.wikipedia.org/wiki/Factor_(programming_language)). It is highly integrated with Javascript.  The compiler runs in JS, FJS can load and call any JS file/module, JS modules can load and call FJS modules, all variables are JS types, and JS code can be embedded in FJS.

While FJS has many features (see next section), I'd like to point out one big one for the Node community. Stack languages naturally support continuations.  FJS takes advantage of this to convert the Javascript callbacks into a pure linear sync code style.  See the http server example below.

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

Status (Version 0.1.0)
----------------------

While FJS code can be compiled and run, the project is pre-pre-alpha.  The last changes broke the backwards compatability badly and there will probably be more such changes.

Some missing features ...

- While there are docs (see below) there is no tutorial, which is the best way to learn a language.
- REPL.  Plans are in the works for a webpage based REPL with sandbox.
- Better error reporting. Currently debugging is done by an exhaustive execution trace.
- Unit testing is needed.
- Optimized compilation for faster execution.  Speed is unmeasured at this point. (Even though FJS semantics assume a stack, much of the code can be optimized to remove the stack behind the scenes.)


Why Use A Stack Language?
-------------------------

Stack languages are concise, simple, and powerful. See the [Wikipedia entry](http://en.wikipedia.org/wiki/Stack-oriented_programming_language). They are effecitively a macro language excellent for DSP and REPL usage.  Stack programs have virtually no syntax. They are just a list of constants and functions.  See this [discussion](http://concatenative.org/wiki/view/Concatenative%20language) from the Factor website for an extended look at the advantages of stack languages.

Stack languages look confusing to beginners until the RPN (see note) argument order becomes familiar.  Once you understand the stack usage you will realize how simple it is that each word executes immediately and in order.  It becomes quite readable.

Note: fjs actually uses polish notation, PN, not reverse polish notation, RPN.

Installation / Usage
--------------------

FJS compiles using Node and FJS executable code has only been tested in Node.  FJS is not available on NPM yet. FJS is written entirely in coffeescript but it is not needed for normal usage.

To try out FJS now you will need to clone the repo from git@github.com:mark-hahn/fjs.git.  Keep all files in the one fjs directory and use `node fjs test` to compile a FJS source file test.jfs to test.js. Then execute test.js with `node test`.  A windows batch file is included for automating the complete cycle of compiling the compiler, compiling the runtime modules, comiling the FJS source code, and executing the result. A bash equivalent is coming soon.

The runtime does not yet have error reporting but it will be supported soon including stack traces that are transparent to callbacks, unlike JS traces.  You can set the variable `debugRuntime` in the top of the compiler code to see an execution trace showing the stack on every instruction.  You can change the variable directly in fjs.js or recompile the coffee version.


Hello World
-----------

Here is the mandatory Hello World example which should look somewhat familiar to FORTH programmers ...

    . 'Hello World'

This is stack-based code but it is JS under the covers.  For example the dot (print) command is actually just a synonym for console.log.

Note to FORTH users:  fjs executes from right-to-left, not the FORTH left-to-right.  This is done to make the resulting code much more like Javascript.  So it is `console.log 'Hello World'`, not `'Hello World' console.log`.


Documentation
-------------

This informally documents the FJS language as of this writing.

*Comments*

Currently there are only line-based comments.  Just as in Javascript a double slash `//` starts a comment which goes to the next line feed character `\n`.  This is the only place in the language where a line feed has any meaning.

    . + 1 1   // prints "2" on stdout
    . * 1 1   // prints "1" on stdout

*Execution*

FJS is unique, even among other FORTH-like languages, in that execution always proceeds from one word to the next without ever going backwards and never skipping.  Conditional execution is handled by using anonymous functions with the `if` command that are conditionally executed.  Loops are managed by calling functions repeatedly with `while` commands, etc.  Also, using iterator functions like `map` and `fold` reduce the need for loops.  This simple linear execution, even when calling async functions, makes FJS quite readable once you learn the command words and the stack model becomes familiar.

*Words*

A word can be any mix of characters other than white-space and periods.  There are some other format restrictions (see *Word Modifiers* below).  Valid words examples are `myvar`, `2`, `/+X`, `i++`, and `(*&^`.  All extra white space is ignored in FJS, including line endings, so there is no concept of a "line".  All words are translated to legal JS variable names internally.  E.g. `/+X` would be represented internally as `_slash__plus_X`.

Each word in FJS is either a Javascript constant, Javascript variable, or a Javascript function evaluation.   A function is called with arguments popped from the stack and in most cases a return value is pushed on the stack. *All* function words, including simple ones like print (`.`), are implemented as normal Javascript functions.  See the fjs-primitives file for examples.

*Named Variables*

Named variables are simply Javascript variables of the same name, except that illegal characters are escaped (see Words section).  Assignnment to a variable is accomplished by adding an equals sign to the end of the name.  The top item on the stack is popped and stored in that variable.  For example, `x=` will pop the top stack item and assign the value to the variable `x`.  Remember that accessing a variable is as simple as including the name.  So the following will assign the value 3 to x, retrieve the value, and print it.

    x= 3 // assign 3 to variable x
    . x  // prints "3"


*Functions*

A function is defined in FJS by a set of parentheses surrounding code.  There must be white space around the parens like the words.  Every function definition in FJS is anonymous until assigned to a variable (ala Coffeescript and Postscript).

Here is a function that prints "hello world".  In the first line the function is defined and executed immediately.  In the last two lines the function is pushed on the stack (see `:` modifer in "Word Modifers" section), the function is then assigned to a named variable, and the function is then called by simply including the variable name.

    ( . "hello world" )                   // creates and runs function, prints "hello world"
    printGreeting= :( . "hello world" )   // creates function and assigns it to a variable
    printGreeting						  // runs function, prints "hello world"


*Word Modifers*

There are several characters that have special meaning when added to a word or function.  They are the modifiers `.`, `:`, and `=`.  These sigils are not just annotative.  They cause new behavior.

The `.` modifier, not to be confused with the dot print word, acts much the same way as it does in Javascript. The dot is appended to the end of a variable.  It pops an object off the stack and references the named property of the object, leaving the property value (or function result) on the stack. These two lines are functional identical.

    . Math.min  1 2 3   // prints "3" (Math.max(1, 3, 2))   Leaves empty stack
    . min. Math 1 2 3   // prints "3" (Math.max(1, 3, 2))   Leaves empty stack

The `:` modifier blocks the word's evalution and puts it directly on the stack.  The colon is prepended to the variable or function.  In the case of a variable name it pushes the name itself as a string.  So this is actually just shorthand for a string constant with no white space.  (This is called a "symbol" in Ruby).  In the case of a function name, it pushes the actual function on the stack instead of calling it.  This also works with anonymous functions.

	.  x x= 1		// prints "1"
	. :x x= 1		// prints "x"
	.  Math.min		// prints "Infinity"
	. :Math.min     // prints "[Function: min]"
	.  ( + 1 2 )    // prints "3"
	. :( + 1 2 )	// prints "[Function]"

And lastly, the `=` suffix is described in the "Named Variables" section.

*Number/Asterisk Convention*

You will see many words that end in a number or asterisk.  This is just a convention, not a real word modifier.  When there is a number it means how many items from the top of the stack to operate on.  When there is an asterisk it means to operate on all items in the stack.

    .2 1 2 3      // prints two items, "1 2", and leaves one item on the stack
    .* 1 2 3      // prints all three, "1 2 3" and leaves the stack empty
    drop* 1 2 3   // empties entire stack


*Multiple Stacks*

In FJS, every function invocation creates a new invisible data stack in the function's local scope.  All words operate on the current local stack.  This means as functions calls are nested a "stack of stacks" is created.  When a function is called it only empties the current "inner" stack.  All "outer" stacks are not affected.

On every function call, the new stack starts empty and the local stack is moved to the function call arguments.  This brings up the problem of accessing stack items outside the function's local scope. What use is a function that can't operate on existing stack items?

The `@` word directly pops items off of the outer stack and pushes them onto the inner local stack.  It is a word made up of an at sign `@`, possibly followed by a number (`@n`). The number tells how many items to move from the outer stack to the inner.  If there is no number then one item is moved.    This can be used anywhere inside of a function and there can be multiple of these in a function.

    ( . Math.max @2 ) 1 2 3  // prints "2" and leaves one item on stack
    ( .  @ . @ . @ )  1 2 3  // prints "1", then "2", then "3"
    ( .* @3 )         1 2 3  // prints "1 2 3"

*Function Results*

We need a way for an FJS function to return results to the outer stack when the functions finishes execution.  This is done simply by taking all left-over items on the inner stack and pushing them on the outer stack when the function returns.

    .*  (   1 2 3 )   // prints "1 2 3"
    .*  ( + 1 2 3 )   // prints "3 3"
    . + ( + 1 2 3 )   // prints "6"

From the example above, you can see that an anonymous function looks and behaves like simple paren grouping as in this example javascript code: `( 1 + 2) * 3`.  However cool this is, I have not figured out any case where this is useful.  Stack-based languages don't need grouping.

Javascript function return values are also pushed on the stack.  When a function returns `undefined` then nothing is pushed on the stack.  This is convenient and usually gives logical results.  For example, the print `.` word is actually the javascript console.log function which returns undefined which leaves the stack clean and avoids needing the drop word.

If the function return value is an array, then all the items are removed from the array and placed on the stack. All other return types are just placed on the stack.

When calling a JSF function from Javascript the return value is undefined if the stack is empty.  Otherwise the entire local stack is returned as an array.

*Named Variable Scopes*

Scoping works as it does in Ruby and Coffeescript.  A variable is in the scope of a function if the variable was assigned (`var=`) anywhere in the surrounding scope before the function.  Otherwise it is local.  In the following example the lines are executed in order.

	  x= 1		// assign 1 to x
	( y= 2 )	// anonymous function executed with var y in local scope
	. typeof:y  // prints "undefined"
	( x= 3 )  	// var x is from outer scope
	. x 		// prints 3, not 1


*Async Execution*

Javascript requires nested callback functions in order to handle asynchronous activity.  FJS requires no callback functions.  There are two primitive words, `cb` and `wait`, that allow the code to pause waiting for async results. When there is a function that requires a callback argument, you simply use the `cb` word.

`cb` is a function that creates a special callback function internally that has the complete execution context bound to it.  This is called a "continuation".  After the async function is called the FJS execution continues without any delay.  When a `wait` word is encountered the execution of that context is halted.

Later, when the aync javascript function calls the callback, the internal FJS cb-generated function restarts the FJS execution where the `wait` word paused, using the context it had before. The results passed to the cb-generated function are pushed on the stack.  This example calls the node fs.readFile function and then prints the text that was read.

	fs= require 'fs'  // load the fs module and assing it to the fs variable.
	.* wait ( . 'hello world' ) fs.readFile 'fjs.bat' 'utf8' cb
                      // prints "hello world" and then the error code and file contents

Note that the file path, encoding, and cb-generated function are passed as arguments to readfile.  Execution continues, hello world is printed, and then FJS pauses at the wait until the callback happens. Then the readile results are pushed to the stack and printed.

If there is more than one cb used before the `wait`, then execution pauses until all callbacks have occured.  This allows parallel execution.  Using one `cb` per `wait` gives normal serial execution.

If a javascript function calls the cb-generated function more than once, then execution will continue from the wait multiple times.  The context is cloned each time so the execution starts with the same continuation state.  This is a type of "forking" that allows multiple execution of FJS code.  The http server example below takes advantage of this to process one http request for each callback.


*Primitve Words*

Words that all FJS code needs, such as `.`, `dup`, and `drop` are defined in the fjs-primitives javascript file.  This file is included automatically in the compiled output using this code ...

    fjs-primitives= require './fjs-primitives'
    with:fjs-primitives

The `with` operator allows the primitives to be used without a namespace prefix.  See the *Special Operator Prefixes* section.  Note that `with` is normally avoided in javascript because it makes it too easy to add unpredicatable bugs.  This is not a concern in FJS because the compiler output does not produce these types of bugs.

Implementation detail:  The primitive functions get the stack in their arguments like any other function.  They then operate on the `arguments` stack-like object.  Returning `arguments` from the function then puts the remaining items back on the stack, like any other function return.

*Modules*

You have seen the use of javascript modules in previous examples.  This is simply using the javascript `require` function like FJS calls any other function.  The resulting loaded module is assigned to a variable and this variable effectively becomes the namespace for the module's vars/functions.

    fs= require 'fs'             	// load module and save it in fs var
    fs.writefileSync 'hello world' 	// use fs as the namespace for write

You can use the FJS `with` operator to avoid using the namespace variable, just as the fjs-primitives module does. See the *Special Operator Prefixes* section. This is also a safe use of the `with` if you limit its usage to accessing the module vars/functions.

Modules can also be written in FJS and used in javascript.  The following example code could be included in a single `.fjs` file and the compiled `.js` file could be "required".

     exports.increment= ( + 1 @ )	// The `increment` function is exported from the module


*Embedding Javascript Code*

Enclosing javascript code in backticks places it into the compiled output unchanged. This copies coffeescript.  The js code must not contain any operators like `break` or `return`.  It must return a value which will be placed on the stack.

    . `x = 1 + 1` 		// assigns 2 to x and prints "2"
    obj= `{a:1, b:2}` 	// assigns a constant object to the variable `obj`

Note that currently the only way to create arrays and objects in FJS is to use this technique.  Primitves will be added soon to create arrays and objects.  The *Word Modifers* section details the existing `.` modifer which allows access to arrays and objects.


*Special Operator Prefixes*

Some javascript operators cannot work on stack variables.  They must operate on the variable name.  Examples are `with`, `typeof`, and `instanceof`.  For these operators you must combine the operator and operand in one word, separated by a colon.  Note that the `with` operator is in affect until the end of the surrounding function.

	obj= `{x:1}` 		    	// assign object to var obj
    ( . x with:obj )			// prints 1 (`with` goes to end of function
    . typeof:x  			    // prints "undefined"


*Http Server Example*

It's time for a more complex example.  This is the Node http server example from the Node home page followed by the FJS version.

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

    createServer. ( require 'http' ) cb
    drop ( listen. @ 1337 '127.0.0.1' )
    dup drop swap wait . 'Server running at http://127.0.0.1:1337/'
        ( writeHead. @ 200 `{'Content-Type':'text/plain'}` )
        ( end.       @ 200 'Hello World'                   )

Note how the flow of the FJS code matches the actual execution order, unlike JS with callbacks.  The execution "pauses" at the wait command (by saving a continution and returning to the JS event loop).  Then when callbacks occur internally, execution will continue from the `wait` word.  On each new http request the `wait` command will repeat using a new context for each callback with the `request` and `result` objects on the stack.

License
-------

FJS is made available using the standard MIT license.  See LICENSE.TXT.
