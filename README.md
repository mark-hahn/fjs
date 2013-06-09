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

- Plans are in the works for a webpage based REPL with sandbox.
- Better error reporting. Currently debugging is done by an exhaustive execution trace.
- Unit testing.
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

FJS is unique, even among other FORTH-like languages, in that execution always proceeds from one word to the next without ever going backwards and never skipping.  Conditional execution is handled by using functions with the `if` command.  Loops are managed by calling functions repeatedly with `while` commands, etc.  Also, using iterator functions like `map` and `reduce` reduce the need for loops.  This simple linear execution, even when calling async functions, makes FJS quite readable once you learn the command words and the stack model becomes familiar.

*Words*

A word can be any mix of characters other than white-space and periods.  There are some other format restrictions (see *Word Modifiers* below).  Valid words examples are `myvar`, `2`, `/+X`, `i++`, and `(*&^`.  All extra white space is ignored in FJS, including line endings, so there is no concept of a "line".  All words are translated to legal JS variable names internally.  E.g. `/+X` would be represented internally as `_slash__plus_X`.

Each word in FJS is either a Javascript constant, Javascript variable, or a Javascript function evaluation.   A function is called with arguments popped from the stack and in most cases a return value is pushed on the stack. *All* function words, including simple ones like print (`.`), are implemented as normal Javascript functions.  See the fjs-primitives file for examples.

*Named Variables*

Named variables are simply Javascript variables of the same name, except that illegal characters are escaped (see the *Words* section).  Assignnment to a variable is accomplished by adding an equals sign to the end of the name.  The top item on the stack is popped and stored in that variable.  For example, `x=` will pop the top stack item and assign the value to the variable `x`.  Remember that accessing a variable is as simple as including the name.  So the following will assign the value 3 to x, retrieve the value, and print it.

    x= 3 // assign 3 to variable x
    . x  // prints "3"


*Functions*

A function is defined in FJS by a set of parentheses surrounding code.  There must be white space around the parens like the words.  Every function definition in FJS is anonymous until assigned to a variable (ala Coffeescript and Postscript).

Here is a function that prints "hello world".  In the first line the function is defined and executed immediately.  In the last two lines the function is pushed on the stack (see `:` modifer in the *Word Modifers* section), the function is then assigned to a named variable, and the function is then called by simply including the variable name.

    ( . "hello world" )                   // creates and runs function, prints "hello world"
    printGreeting= :( . "hello world" )   // creates function and assigns it to a variable
    printGreeting						  // runs function, prints "hello world"


*Word Modifers*

There are several characters that have special meaning when added to a word or function.  They are the modifiers `:`, `.`, `<`, and `=`.  These sigils are not just annotative.  They modify the program behavior.  The `:` is prepended to the beginning of the word and the rest are appended to the end of the word.

The `:` modifier is prepended to the beginning of a variable name or function.  It blocks the word's evalution and puts it directly on the stack.  In the case of a variable name it pushes the name itself as a string.  So this is actually just shorthand for a string constant with no white space.  (This is called a "symbol" in Ruby).  In the case of a function name, it pushes the actual function on the stack instead of calling it.  This also works with anonymous functions.

	.  x x= 1		// prints "1"
	. :x x= 1		// prints "x"
	.  Math.min		// prints "Infinity"
	. :Math.min     // prints "[Function: min]"
	.  ( + 1 2 )    // prints "3"
	. :( + 1 2 )	// prints "[Function]"

The `.` modifier, not to be confused with the dot print word, acts much the same way as it does in Javascript. The dot is appended to the end of a variable.  It pops an object off the stack and references the named property of the object, leaving the property value (or function result) on the stack. These two lines are functionally identical.

    . Math.min  1 2 3   // prints "3" (Math.max(1, 3, 2))   Leaves empty stack
    . min. Math 1 2 3   // prints "3" (Math.max(1, 3, 2))   Leaves empty stack

The `<` modifier is appended to the end of any function.  It has an optional form with a number `<n`.  It overrides the default number of items to pop off the stack and pass to the called function as arguments.  When there isn't a number after the `<`, the entire stack is passed as arguments and emptied.  The default number of arguments depends on the funcion but for javascript functions it is always the entire stack.

    .    1 2 3				// pops one item and prints "1"
    .<   1 2 3				// empties stack and prints "1 2 3"
    .<2  1 2 3				// pops two items and prints "1 2"
    . Math.min 	 1 2 3		// empties stack and prints "3"
    . Math.max<2 1 2 3		// pops two items and prints "2"

The `=` suffix is described in the *Named Variables* section.

*Multiple Stacks*

In FJS, every function invocation creates a new invisible data stack in the function's local scope.  All words now operate on this new local stack.  This means as function calls are nested, a "stack of stacks" is created.  When a function is called it can only push/pop items from/to the current "inner" stack.  All "outer" stacks are not affected.

Editor's note:  The next two paragraphs are implementation details and may be skipped.

On every function call the old local stack (the outer stack) is moved to the function call arguments leaving the old stack empty.  A normal, non-FJS Javascript function operates on these call arguments to produce its return value which is pushed on the outer stack when it terminates. This non-FJS Javascript function does not access the new local stack and it stays empty.

So weirdly enough, when a non-FJS function executes, the inner and outer stacks are both empty the whole time.  Note that a function can return any number of items using an array (see the *Function Results* section).  This allows a function to effectively operate only on the stack's top items by returning most of the arguments back in an array.  Even FJS primitive words, which are implemented in Javascript, operate this way.

*Using Arguments*

An FJS function (made with parens) operates on the local stack instead of the arguments, like all stack-based languages do. But the local stack starts off empty, so how does the FJS function get items onto its local stack?  This is accomplished by a word that pops items from the arguments and pushes them onto the local stack.

The `@` word pops one item off of the `arguments` list and pushes it onto the local stack. You can append a number, `@n`, to specify moving n arguments. The word `@@` moves all arguments to the stack.  These can be used anywhere inside of a function and there can be more than one.

Because the outer stack is passed to the function as arguments and then `@` moves arguments to the inner stack, one can think of the `@` word as just moving items from the outer stack to the inner stack.

    ( .  @ . @ . @ )   1 2 3  // prints "1", then "2", then "3" and leaves stack empty
    ( . Math.max @2 ) 1 2 3  // prints "2" and leaves one item on stack
    ( .< @@ 4 )<2      1 2 3  // prints "1 2 4" and leaves one item on stack

Note that in the last line the `<2` modifier on the function specifies the number of outer stack items popped and passed as arguments.


*Function Results*

We need a way for an FJS function to return results to the outer stack when the functions finishes execution.  This is done simply by taking all left-over items on the inner stack and pushing them on the outer stack when the function returns.

    .<   (   1 2 3 )   // prints "1 2 3"
    .<   ( + 1 2 3 )   // prints "3 3"
    .< + ( + 1 2 3 )   // prints "6"

From the example above, you can see that an anonymous function looks and behaves like simple paren grouping as in this example javascript code: `( 1 + 2) * 3`.  While FJS and other stack-basec languages never require grouping, it can be used to help readability.

	. + - 5 3 + 2 4				// prints "8"
	. + ( - 5 3 ) ( + 2 4 )		// same but much more readable.

Javascript function return values are also pushed on the stack, except when a function returns `undefined`.  Then nothing is pushed on the stack.  This is convenient and usually gives logical results.  For example, the print `.` word is actually the javascript console.log function which returns undefined which leaves the stack clean and avoids needing the drop word.

If the function return value is an array, then all the items from the array and placed separately on the stack. All other return types are just pushed on the stack.

When calling a JSF function from Javascript the return value is undefined if the stack is empty.  Otherwise the entire local stack is returned as an array.

    . Math.min				// prints Infinity
    split. "1 2 3" ' '		// leaves three items on stack: "1", "2", "3"

*Named Variable Scopes*

Scoping works as it does in Ruby and Coffeescript.  A variable is in the scope of a function if the variable was assigned (`var=`) anywhere in the surrounding scope before the function.  Otherwise it is local.  In the following example the lines are executed in order.

	  x= 1		// assign 1 to x
	( y= 2 )	// anonymous function executed with var y in local scope
	. typeof:y  // prints "undefined"
	( x= 3 )  	// var x is from outer scope
	. x 		// prints 3, not 1


*Async Execution*

Javascript requires nested callback functions in order to handle asynchronous activity.  FJS requires no callback functions.  There are two primitive words, `cb` and `wait`, that allow the code to pause waiting for async results.

When there is a function that requires a callback argument, you simply use the `cb` word.  `cb` is a function that creates a special callback function that has the complete execution context bound to it.  This is called a "continuation".  After the async function is called the FJS execution continues without any delay.  When a `wait` word is encountered the execution of that context is halted.

Later, when the aync javascript function calls the callback, the internal FJS cb-generated function restarts the FJS execution where the `wait` word paused, using the context it had before. The results passed to the cb-generated function are pushed on the stack.  This example calls the node fs.readFile function and then prints the text that was read.

	fs= require 'fs'  // load the fs module and assing it to the fs variable.
	.< wait ( . 'hello world' ) fs.readFile 'fjs.bat' 'utf8' cb
                      // prints "hello world" and then the error code and file contents

Note that the file path, encoding, and cb-generated function are passed as arguments to readfile.  Execution continues, hello world is printed, and then FJS pauses at the wait until the callback happens. Then the readile results are pushed to the stack and printed.

If there is more than one cb used before the `wait`, then execution pauses until all callbacks have occured.  This allows parallel execution.  Using one `cb` per `wait` gives normal serial execution.

If a javascript function calls the cb-generated function more than once, then execution will continue from the wait multiple times.  The context is cloned each time so the execution starts with the same continuation state.  This is a type of "forking" that allows multiple execution of FJS code.  The http server example below takes advantage of this to process one http request for each callback.


*Primitive Words*

Words that all FJS code needs, such as `.`, `dup`, and `drop` are defined in the fjs-primitives javascript file.  This file is included automatically in the compiled output using this code ...

    fjs-primitives= require './fjs-primitives'
    with:fjs-primitives

The `with` operator allows the primitives to be used without a namespace prefix.  See the *Special Operator Prefixes* section.  Note that `with` is normally avoided in javascript because it makes it too easy to add unpredicatable bugs.  This is not a concern in FJS because the compiler output does not produce these types of bugs.

Implementation detail:  The primitive functions get the stack in their arguments like any other function.  They then operate on the `arguments` stack-like object.  Returning `arguments` from the function then puts the remaining items back on the stack, like any other function return.

*Comparisons and Boolean Operators*

There are a set of primitives, `<`, `=`, and `>` (and others) that pop two items off the stack, compare them, and push a boolean value on the stack.  These equate to the javascript operators `<`, `===`, and `>`.

    . < 1 2				// prints "true"
    . > 1 2				// prints "false"
    . = 3 + 1 2			// prints "true"

Boolean primitive operators, like `not`, `and`, and `or` pop two items and push the boolean operation result back.  These are equivalent to the Javascript operators `!`, `&&`,and  `||`.

	. not true						// prints "false"
    . and true false				// prints "false'
    . or < x 3 > x 5 x= 6 			// prints "true'
	. or ( < x 3 ) ( > x 5 ) x= 6	// same as last line but easier to read


*Special Operator Prefixes*

Some javascript operators cannot work on stack variables.  They must operate on the variable name.  Examples are `with`, `typeof`, and `instanceof`.  For these operators you must combine the operator and operand in one word, separated by a colon.  Note that the `with` operator is in affect until the end of the surrounding function.

	obj= `{z:1}` 		    	// assign object to var obj
    ( . z with:obj )			// prints 1 (`with` goes to end of function
    . typeof:z  			    // prints "undefined"


*Conditionals and Looping*

FJS code is conditionally executed by an `if` word that pops a truthy value (var or function evaluation) off the stack, pops a function off the stack, and then executes the function only if the truthy value is true.

There ia a convenience version of `if` called `doif` that pops the function to execute first and then the truthy value.

	if ( = x 1 ) :( console.log 'x is 1' ) x= 1		// prints "x is 1"
	if = x 1 :prt1 x= 1 prt1= :( . 'x is 1' ) 		// prints "x is 1"
    . y if < x 3 :( y= 2 ) y= 1 x= 1				// prints "2"
    . y doif :( y= 2 ) < x 3 y= 1 x= 1				// prints "2"

Note that the functions such as `:( y= 2 )` need the colon to push the function on the stack instead of evaluating it immediately.

The most common looping construct is the `while` word. It is somewhat like `if` in that it pops a conditional function off the stack, pops a function to execute off the stack, and then executes the second function repeatedly while the conditional function returns a truthy value of true.  There is also a version `dowhile` that reverses the arguments like `doif` does.

    while :( < x 3 ) :( x= + x 1 . x ) x= 0	// prints "0", "1" and "2"

Another looping word is called `repeat`.  It takes one function off the stack and then executes it repeatedly until it returns the boolean value `false` (exact, not truthy).  Note that this always executes at least once.

    repeat :( < x 3 x= + x 1 . x ) x= 0	  // prints "0", "1" and "2"


*Arrays and Objects*

An empty array or object can be created with the primitive words `[]` or `{}`.  Array and object constants can be created by using the `<n` modifier.

	. []			 // prints "[]"
	. []< 1 2		 // prints "[ 1, 2 ]"
	. {}< :a 1 :b 2	 // prints "{ a: 1, b: 2 }"

As described before, the `.` word modifier accesses an object's property with a constant name.  To access an item with a variable index, use the word `get`, which pops an integer index for an array or a string index for an object.

    . x.  `{ x: 'one', y: 'two' }`		// prints "one", js: console.log({x:'one', y:'two'}.x)
    . get `{ x: 'one', y: 'two' }` 'x' 	// prints "one", js: console.log({x:'one', y:'two'}['x'])
    . get `[ 'zero', 'one' ]`	    1	// prints "one", js: console.log(['zero', 'one'][1])

To set a value in an array or object with a variable index, use the `set` word.

    . x set x  0 'a' x= []			// prints "[ "a" ]",  js: x=[]; x[0]   = 'a'; console.log(x)
    . x set x 'a' 1  x= {}			// prints "{ a: 1 }", js: x={}; x['a'] =  1 ; console.log(x)

The array type supports the words `push.`, `pop.`, `shift.`, and `unshift.` like any other javascript methods.

    . pop. `[1, 2, 3]`				// prints "3"
    . x push. x 4 x= `[1, 2, 3]`	// prints "[ 1, 2, 3, 4 ]"

A functional style that often replaces the need for looping is to iterate a function over an array or an object.  The `map`, `reduce`, and `filter` words are good examples.  In the first line below the function is executed three times and one item of the array is passed in as an argument each time and then that item is replaced with the value squared.

    . map :( * dup @ ) `[1,2,5]`    // prints [1, 4, 25]

The `each` word operates much like the `repeat` word but once for each item in an array or object. Unlike `map` it leaves nothing on the stack.  It can be aborted early by returning the exact value of `false'.  This is stolen from jQuery's `each` function.  The first argument passed into the function is the key and the second is the value.

    each :( . @ ) `[1, 2]`	   // prints "1" then "2"


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
    obj= `{a:1, b:2}` 	// assigns a constant object to the variable "obj"


*Http Server*

It's time for a more complex example.  This is the Node http server example from the Node home page followed by the FJS version.

	var http = require('http');
	http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

    createServer. ( require 'http' ) cb
    drop ( listen. @ 1337 '127.0.0.1' )
    dup drop wait . 'Server running at http://127.0.0.1:1337/'
        ( writeHead. @ 200 `{'Content-Type':'text/plain'}` )
        ( end.       @ 'Hello World\n'                     )

Note how the flow of the FJS code matches the actual execution order, unlike the JS code with its callbacks.  The execution "pauses" at the wait command (by saving a continution and returning to the JS event loop).  Then when callbacks occur internally, execution will continue from the `wait` word.  On each new http request the `wait` command will repeat using a new context for each callback with the `request` and `result` objects on the stack.

License
-------

FJS is made available using the standard MIT license.  See LICENSE.TXT.
