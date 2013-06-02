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

- While there are docs (see below) there is no tutorial, which is the best way to learn a language.
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

The runtime does not yet have error reporting but it will be supported soon including stack traces that are transparent to callbacks, unlike JS traces.  You can set the variable `debugRuntime` in the top of the compiler code to see an execution trace showing the stack on every instruction.  You can change the variable directly is fjs.js or recompile the coffee version.


Hello World
-----------

Here is the mandatory Hello World example which should look familiar to FORTH programmers ...

    'Hello World' .

This is FORTH code but it is JS under the covers.  For example the dot (print) command is actually just a synonym for console.log.


Documentation
-------------

This informally documents the FJS language as of this writing.

*Comments*

Currently there are only line-based comments.  Just as in Javascript a double slash `//` starts a comment which goes to the next line feed character `\n`.  This is the only place in the language where a line feed has any meaning.

    1 1 + .  // prints "2" on stdout
    1 1 * .  // prints "1" on stdout

*Execution*

FJS is unique, even among other FORTH-like languages, in that execution always proceeds from one word to the next without ever going backwards and never skipping.  Conditional execution is handled by using anonymous functions with the `if` command that are conditionally executed.  Loops are managed by calling functions repeatedly with `while` commands, etc.  Also, using iterator functions like `map` and `fold` reduce the need for loops.  This simple linear execution, even when calling async functions, makes FJS quite readable once you learn the command words and the RPN stack model becomes familiar.

*Words*

A word can be any mix of characters other than white-space and periods.  There are some other format restrictions (see *Word Modifiers* below).  Valid words examples are `myvar`, `2`, `/+X`, `i++`, and `(*&^`.  All white space is ignored in FJS, including line endings, so there is no concept of a "line".  All words are translated to legal JS variable names internally.  E.g. `/+X` would be represented internally as `_slash__plus_X`.

Each word in FJS is either a Javascript constant or a Javascript function evaluation.  In both cases a value is pushed on the stack.  A function may pop one or more arguments from the stack before execution.  *All* function words, including simple ones like print (`.`), are implemented as normal Javascript functions.  See the fjs-primitives file for examples.

*Named Variables*

Named variables are simply Javascript variables of the same name, except that illegal characters are escaped (see Words section).  Assignnment to a variable is accomplished by adding an equals sign to the end of the name.  The top item on the stack is popped and stored in that variable.  For example, `x=` will pop the top stack item and assign the value to the variable `x`.  Remember that accessing a variable is as simple as including the name.  So the following will assign the value 3 to x, retrieve the value, and print it.

    3 x= x .


*Functions*

A function is defined in FJS by a set of parentheses surrounding code.  There must be white space around the parens like any word.  Every function definition in FJS is anonymous until assigned to a variable (ala Coffeescript).

Here is a function that prints "hello world".  In the first line the function is defined and executed immediately.  In the last two lines the function is pushed on the stack (see `:` modifer in "Word Modifers" section), the function is then assigned to a named variable, and the function is then called by simply including the variable name.

     ( "hello world" . )                  // creates and runs function, prints "hello world"
    :( "hello world" . ) printGreeting=	  // creates function and assigns it to a variable
    printGreeting						  // runs function, prints "hello world"


*Word Modifers*

There are several characters that have special meaning when added to a word or function.  They are the modifiers `>`, `.`, `:`, and `=`.

The `>`, with an optional number (`n>`) can be prefixed to function names. This modifier pops n items off the stack and passes them as arguments to the function.  If there is no number, then it pops *all* the items and passes them.  This also works with anonymous functions.  Note that this is the modifier that allows normal javascript functions to be called from FJS.

    1 3 2    Math.min . // prints "Infinity" (Math.min())   Leaves 3 items on stack
    1 3 2   >Math.max .	// prints "3" (Math.max(1, 3, 2))   Leaves empty stack
    1 3 2  2>Math.min .	// prints "2" (Math.min(3, 2))      Leaves 1 item on stack
    1 3 2  2>( >. )     // prints "3 2"                     Leaves 1 item on stack

The `.` modifier, not to be confused with the dot print word, acts much the same way as it does in Javascript.  It pops an object off the stack and references the named property, leaving the property value (or function result) on the stack. Note these three lines perform the identical results as the first three above.  Also note that the `>` and `.` are combined in lines 2 and 3.

    1 3 2 Math   .min . // prints "Infinity" (Math.min())
    1 3 2 Math  >.max .	// prints "3" (Math.max(1, 3, 2))   Leaves empty stack
    1 3 2 Math 2>.min .	// prints "2" (Math.min(3, 2))      Leaves 1 item on stack

The `:` modifier blocks the word's evalution and puts it directly on the stack.  In the case of a variable name it pushes the name itself as a string.  So this is actually just shorthand for a string constant with no white space.  (This is called a "symbol" in Ruby).  In the case of a function name, it pushes the actual function on the stack instead of calling it.  This also works with anonymous functions.

	1 x=  x .		// prints "1"
	1 x= :x .		// prints "x"
	 Math.min .		// prints "Infinity"
	:Math.min .		// prints "[Function: min]"
	 ( 1 2 + ) .	// prints "3"
	:( 1 2 + ) .	// prints "[Function]"

And lastly, the `=` suffix is described in the "Named Variables" section.


*Multiple Stacks*

In FJS, every function invocation creates a new invisible data stack in the function's local scope.  All words operate on the current local stack.  This means as functions calls are nested a "stack of stacks" is created.  You might have wondered how the `>` word modifer that pops the entire stack is useful.  The answer is that it only empties the current "inner" stack.  All "outer" stacks are not affected.

On every function call, the new stack starts empty.  This brings up the problem of accessing stack items outside the function's local scope. What use is a function that can't operate on existing stack items?  There are two ways to access an outer stack ...

The first method directly pops items off of the outer stack and pushes them onto the inner local stack.  It is a word made up of an at sign `@`, possibly followed by a number (`@n`). The number tells how many items to move from the outer stack to the inner.  If there is no number then one item is moved.    This can be used anywhere inside of a function and there can be multiple of these in a function.

    1 3 2 ( @2 >Math.min . ) // prints "2" and leaves one item on stack
    1 3 2 ( @ . @ . @ . )	 // prints "2", then "3", then "1"
    1 3 2 ( @3 >. )          // prints "1 3 2"

The other method of accessing the outer stack is to use the arguments of the function call.  If you remember, we already saw how to pop items off a stack before a call and then pass them as arguments.  This is the `>` word modifer.  Now we just need a way for a called function to push the passed arguments onto the local stack.  The function definition opening paren can have a modifer that does exactly this.  It looks like `(<`. This pushes all arguments on the local stack.  The `(<n` form limits the push to the first n arguments. Note the lack of white space between `:(` and `<2` in the example below.

    :(<2 >. ) print2=	 // defines a function and assigns it to a variable
    1 3 2 >print2        // prints "3 2" and leaves one item on the stack

You might wonder why not just write the function above as `:( @2 >. )`.  The answer is that using the function arguments instead of the stacks allows the function to be called from Javascript.  The `<` and `>` modifers provide two-way interoperability between FJS and Javascript.

Note:  An easy way to remember the `>` and `<` modifiers is to think of `>` as "squeezing" the stack items on the left into the arguments and `<` expanding the arguments into the stack on the right.

You can actually use both at once to move an outer stack to the inner stack.  This pushes the entire stack into a function call's arguments and then takes them all out.

    1 3 2 >(< >. )   // prints "1 3 2" by using function arguments

*Function Results*

We need a way for an FJS function to return results to the outer stack when the functions finishes execution.  This is done simply by taking all left-over items on the inner stack and pushing them on the outer stack when the function returns.

    ( 1 3 2 )   >.		// prints "1 3 2"
    ( 1 3 2 + ) >.		// prints "1 5"
    ( 1 3 2 + ) + .		// prints "6"

From the example above, you can see that an anonymous function looks and behaves like simple paren grouping as in this example javascript code: `( 1 + 2) * 3`.  However cool this is, I have not figured out any case where this is useful.  Stack-based languages don't need grouping.

Javascript function results are also pushed on the stack but are limited to the one result.  When a function returns undefined then nothing is pushed on the stack.  This is convenient and usually gives logical results.  For example, the print `.` word is actually the javascript console.log function which returns undefined which leaves the stack clean and avoids using the drop word.

When calling a JSF function from Javascript the return value is undefined if the stack is empty or the one top of stack value is returned.


*Named Variable Scopes*

Scoping works as it does in Ruby and Coffeescript.  A variable is in the scope of a function if the variable was assigned (`var=`) anywhere in the surrounding scope before the function.  Otherwise it is local.

	1 x=		// assign 1 to x
	( 2 y= )	// anonymous function executed with var y in local scope
	typeof:y .	// prints "undefined"
	( 3 x= )  	// var x is from outer scope
	x .			// prints 3


*Async Execution*

Javascript requires nested callback functions in order to handle asynchronous activity.  FJS requires no callback functions.  There are two primitive words, `cb` and `wait`, that allow the code to pause waiting for async results. When there is a function that requires a callback argument, you simply use the `cb` word.
This is a function that creates a special callback function internally that has the complete execution context bound to it.  This is called a "continuation".  After the async function is called the FJS execution continues without any delay.  When a `wait` word is encountered the execution of that context is halted.

Later, when the aync javascript function calls the callback, the internal FJS cb-generated function restarts the FJS execution where the wait word paused, using the context it had before. The results passed to the cb-generated function are pushed on the stack.  This example calls the node fs.readFile function and then prints the text that was read.

	'fs' >require fs=		// load the fs module and assing it to the fs variable.
    'myfile.txt' 'utf8' cb >fs.readfile 'hello world' . wait >.
    						// this prints "hello world" and then the error code and contents

Note that the file path, encoding, and cb-generated function are passed as arguments to readfile.  Execution continues immediately, other code executes, and then FJS pause at the wait until the callback happens and the readile results are pushed to the stack.

If there is more than one cb used before the `wait`, then execution pauses until all callbacks have occured.  This allows parallel execution.  Using one `cb` per `wait` gives normal serial execution.

If a javascript function calls the cb-generated function more than once, then execution will continue from the wait multiple times.  The context is cloned each time so the continuation starts with the same state.  This is a type of "forking" that allows multiple execution of FJS code.  The http server example below takes advantage of this to process one http request for each callback.


*Primitve Words*

Words that all FJS code needs, such as `.`, `dup`, and `drop` are defined in the fjs-primitives javascript file.  This file is inccluded transparently in the compiled output using this code ...

    './fjs-primitives' >require fjs-primitives=
    with:fjs-primitives

The `with` operator allows the primitives to be used without a namespace prefix.  See the *Special Operator Prefixes* section.  Note that `with` is normally avoided in javascript because it makes it too easy to add unpredicatable bugs.  This is not a concern in FJS because the compiler output does not produce these types of bugs.

If you look at the fjs-primitives javascript source you will see a common pattern in each word.  There is code to see if input values were passed as function arguments or not.  If not, then the appropiate pops and pushes to the stack are performed.  There are plans to refactor the compiler output so that javascript code for words does not need to deal with this concern.

*Modules*

You have seen the use of javascript modules in previous examples.  This is simply using the javascript `require` function as FJS calls any other function.  The resulting loaded module is assigned to a variable and this variable effectively becomes the namespace for the module's vars/functions.

    'fs' >require fs=				// load module and save it in fs var
    'hello world' fs.writefileSync	// use fs as the namespace for write

You can use the FJS `with` operator to avoid using the namespace variable, just as the fjs-primitives module does. See the *Special Operator Prefixes* section. This is also a safe use of the `with` if you limit its usage to accessing the module vars/functions.

Modules can be written in FJS and used in javascript.  The following example code could be included in a single `.fjs` file and the compiled `.js` file could be "required".

    (<1 1 + ) exports.increment=	// The `increment` function is exported


*Embedding Javascript Code*

Enclosing javascript code in backticks places it into the output unchanged. This copies coffeescript.  The js code must not contain any operators like `break` or `return`.  It must return a value which will be placed on the stack.

    `x = 1 + 1` .		// assigns 2 to x and prints "2"
    `{a:1, b:2}` obj=	// assigns a constant object to the variable obj

Note that currently the only way to create arrays and objects in FJS is to use this technique.  Primitves will be added soon to create arrays and objects.  The *Word Modifers* section details the existing `.` modifer which allows access to arrays and objects.


*Special Operator Prefixes*

Some javascript operators cannot work on stack variables.  They must operate on the variable name.  Examples are `with`, `typeof`, and `instanceof`.  For these operators you must combine the operator and operand in one word, separated by a colon.  Note that the `with` operator is in affect until the end of the surrounding function.

	`{x:1} obj=		    		// assign object to var obj
    ( with:obj x . )			// prints 1 (with goes to end of function
    typeof:x .					// prints "undefined"
    :abc instanceof:string .	// prints "true"


*Http Server Example*

It's time for a more complex example.  This is the Node http server example from the Node home page followed by the FJS version.

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

	cb 'http' 1>require >.createServer
	1337 '127.0.0.1' rot 2>.listen drop
	'Server running at http://127.0.0.1:1337/' . wait swap drop dup
	  200 `{'Content-Type':'text/plain'}` rot 2>.writeHead
	  'Hello World' 1>.end

Note how the flow of the FJS code matches the actual execution order, unlike JS with callbacks.  The execution "pauses" at the wait command (by saving a continution and returning to the JS event loop).  Then when all callbacks have occured internally execution will continue from the `wait` word.  On each new http request the `wait` command will repeat using a new context for each callback with the `request` and `result` objects on the stack.

