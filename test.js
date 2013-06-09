
// File test compiled by FJS version 0.1.0 on Sat Jun 08 2013 22:05

var fjs_dash_primitives, x, printGreeting, fs, obj, prt1, y;
require('./fjs-runtime').funcCall( null,
  [
    function() {
      this.push( './fjs-primitives' );                                      /* './fjs-primitives' */
      this.execOrPush( require );                                           /* require */
      fjs_dash_primitives = this.pop();                                     /* fjs-primitives= */
      with( fjs_dash_primitives ) {
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Hello World* section" );                    /* "\nFrom the *Hello World* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( 'Hello World' );                                         /* 'Hello World' */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Comments* section" );                       /* "\nFrom the *Comments* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( _star_ );                                          /* * */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Named Variables* section" );                /* "\nFrom the *Named Variables* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        x = this.pop();                                                     /* x= */
        this.execOrPush( x );                                               /* x */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Functions* section" );                      /* "\nFrom the *Functions* section" */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.push( "hello world" );                                 /* "hello world" */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.push( function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.push( "hello world" );                                 /* "hello world" */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } );
        printGreeting = this.pop();                                         /* printGreeting= */
        this.execOrPush( printGreeting );                                   /* printGreeting */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        this.execOrPush( x );                                               /* x */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        this.push( typeof x == "function" ? x : "x" );                      /* :x */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( Math.min );                                        /* Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( typeof Math.min == "function" ? Math.min : "Math.min" ); /* :Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } );
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( Math.max );                                        /* Math.max */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( Math );                                            /* Math */
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.max;
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.apply(
              fjs_ctxtObj, this.curFrame.stack );
          this.curFrame.stack = [];
        this.pushReturnValue(fjs_val);                                      /* max. */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.pushArgsAndExec( _dot_, null );                                /* .< */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.pushArgsAndExec( _dot_, 2 );                                   /* .<2 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( Math.max );                                        /* Math.max */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        this.pushArgsAndExec( Math.max, 2 );                                /* Math.max<2 */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Using Arguments* section" );                /* "\nFrom the *Using Arguments* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.moveArgsToStack(1);                                    /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.moveArgsToStack(1);                                    /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.moveArgsToStack(1);                                    /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.moveArgsToStack(2);                                    /* @2 */
                this.execOrPush( Math.max );                                /* Math.max */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( 1 );                                               /* 1 */
        var fjs_argsArr = this.curFrame.stack.splice(0, 2);
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 4 );                                       /* 4 */
                this.moveArgsToStack();                                     /* @@ */
                this.pushArgsAndExec( _dot_, null );                        /* .< */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( 1 );                                       /* 1 */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.pushArgsAndExec( _dot_, null );                                /* .< */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.pushArgsAndExec( _dot_, null );                                /* .< */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.execOrPush( _plus_ );                                          /* + */
        this.pushArgsAndExec( _dot_, null );                                /* .< */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 4 );                                               /* 4 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 5 );                                               /* 5 */
        this.execOrPush( _dash_ );                                          /* - */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 4 );                                       /* 4 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 5 );                                       /* 5 */
                this.execOrPush( _dash_ );                                  /* - */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( Math.min );                                        /* Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          this.funcCall( null,
            [
              function() {
                this.push( ' ' );                                           /* ' ' */
                this.push( "1 2 3" );                                       /* "1 2 3" */
                fjs_ctxtObj = this.pop();
                fjs_val = fjs_ctxtObj.split;
                if(typeof fjs_val == "function")
                  fjs_val = fjs_val.apply(
                      fjs_ctxtObj, this.curFrame.stack );
                  this.curFrame.stack = [];
                this.pushReturnValue(fjs_val);                              /* split. */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.pushArgsAndExec( _dot_, null );                                /* .< */
        this.pushArgsAndExec( drop, null );                                 /* drop< */
        this.push( "\nFrom the *Named Variable Scopes* section" );          /* "\nFrom the *Named Variable Scopes* section" */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        var fjs_argsArr = this.curFrame.stack;
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.setArgs(arguments);                                          /* ( */
          var y;
          this.funcCall( null,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */
                y = this.pop();                                             /* y= */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        } ).apply( this, fjs_argsArr ));                                    /* () */
        this.push( typeof y );                                              /* typeof:y */
          this.execOrPush( _dot_ );                                         /* . */
          var fjs_argsArr = this.curFrame.stack;
          this.curFrame.stack = [];
          this.pushReturnValue( (function(){
            this.setArgs(arguments);                                        /* ( */
            this.funcCall( null,
              [
                function() {
                  this.execOrPush( 3 );                                     /* 3 */
                  x = this.pop();                                           /* x= */
                  this.funcReturn();                                        /* ) */
                }
              ]
            );
          } ).apply( this, fjs_argsArr ));                                  /* () */
          this.execOrPush( x );                                             /* x */
          this.execOrPush( _dot_ );                                         /* . */
          this.pushArgsAndExec( drop, null );                               /* drop< */
          this.push( "\nFrom the *Async Execution* section" );              /* "\nFrom the *Async Execution* section" */
          this.execOrPush( _dot_ );                                         /* . */
          this.push( 'fs' );                                                /* 'fs' */
          this.execOrPush( require );                                       /* require */
          fs = this.pop();                                                  /* fs= */
          this.pushCB(null);                                                /* cb */
          this.push( 'utf8' );                                              /* 'utf8' */
          this.push( 'fjs.bat' );                                           /* 'fjs.bat' */
          this.execOrPush( fs.readFile );                                   /* fs.readFile */
          var fjs_argsArr = this.curFrame.stack;
          this.curFrame.stack = [];
          this.pushReturnValue( (function(){
            this.setArgs(arguments);                                        /* ( */
            this.funcCall( null,
              [
                function() {
                  this.push( 'hello world' );                               /* 'hello world' */
                  this.execOrPush( _dot_ );                                 /* . */
                  this.funcReturn();                                        /* ) */
                }
              ]
            );
          } ).apply( this, fjs_argsArr ));                                  /* () */
          this.wait();                                                      /* wait */
        }
      }, function() {
        with( fjs_dash_primitives ) {
          this.pushArgsAndExec( _dot_, null );                              /* .< */
          this.pushArgsAndExec( drop, null );                               /* drop< */
          this.push( "\nFrom the *Comparisons and Boolean Operators* section" ); /* "\nFrom the *Comparisons and Boolean Operators* section" */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( 2 );                                             /* 2 */
          this.execOrPush( 1 );                                             /* 1 */
          this.execOrPush( _lt_ );                                          /* < */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( 2 );                                             /* 2 */
          this.execOrPush( 1 );                                             /* 1 */
          this.execOrPush( _gt_ );                                          /* > */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( 2 );                                             /* 2 */
          this.execOrPush( 1 );                                             /* 1 */
          this.execOrPush( _plus_ );                                        /* + */
          this.execOrPush( 3 );                                             /* 3 */
          this.execOrPush( _eq_ );                                          /* = */
          this.execOrPush( _dot_ );                                         /* . */
          this.pushArgsAndExec( drop, null );                               /* drop< */
          this.push( "\nFrom the *Comparisons and Boolean Operators* section" ); /* "\nFrom the *Comparisons and Boolean Operators* section" */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( true );                                          /* true */
          this.execOrPush( not );                                           /* not */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( false );                                         /* false */
          this.execOrPush( true );                                          /* true */
          this.execOrPush( and );                                           /* and */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( 6 );                                             /* 6 */
          x = this.pop();                                                   /* x= */
          this.execOrPush( 5 );                                             /* 5 */
          this.execOrPush( x );                                             /* x */
          this.execOrPush( _gt_ );                                          /* > */
          this.execOrPush( 3 );                                             /* 3 */
          this.execOrPush( x );                                             /* x */
          this.execOrPush( _lt_ );                                          /* < */
          this.execOrPush( or );                                            /* or */
          this.execOrPush( _dot_ );                                         /* . */
          this.execOrPush( 6 );                                             /* 6 */
          x = this.pop();                                                   /* x= */
          var fjs_argsArr = this.curFrame.stack;
          this.curFrame.stack = [];
          this.pushReturnValue( (function(){
            this.setArgs(arguments);                                        /* ( */
            this.funcCall( null,
              [
                function() {
                  this.execOrPush( 5 );                                     /* 5 */
                  this.execOrPush( x );                                     /* x */
                  this.execOrPush( _gt_ );                                  /* > */
                  this.funcReturn();                                        /* ) */
                }
              ]
            );
          } ).apply( this, fjs_argsArr ));                                  /* () */
          var fjs_argsArr = this.curFrame.stack;
          this.curFrame.stack = [];
          this.pushReturnValue( (function(){
            this.setArgs(arguments);                                        /* ( */
            this.funcCall( null,
              [
                function() {
                  this.execOrPush( 3 );                                     /* 3 */
                  this.execOrPush( x );                                     /* x */
                  this.execOrPush( _lt_ );                                  /* < */
                  this.funcReturn();                                        /* ) */
                }
              ]
            );
          } ).apply( this, fjs_argsArr ));                                  /* () */
          this.execOrPush( or );                                            /* or */
          this.execOrPush( _dot_ );                                         /* . */
          this.pushArgsAndExec( drop, null );                               /* drop< */
          this.push( "\nFrom the *Special Operator Prefixes* section" );    /* "\nFrom the *Special Operator Prefixes* section" */
          this.execOrPush( _dot_ );                                         /* . */
          this.push( {z:1} );                                               /* `{z:1}` */
          obj = this.pop();                                                 /* obj= */
          var fjs_argsArr = this.curFrame.stack;
          this.curFrame.stack = [];
          this.pushReturnValue( (function(){
            this.setArgs(arguments);                                        /* ( */
            this.funcCall( null,
              [
                function() {
                  with( obj ) {
                    this.execOrPush( z );                                   /* z */
                    this.execOrPush( _dot_ );                               /* . */
                    this.funcReturn();                                      /* ) */
                  }
                }
              ]
            );
          } ).apply( this, fjs_argsArr ));                                  /* () */
          this.push( typeof z );                                            /* typeof:z */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Conditionals and Looping* section" );   /* "\nFrom the *Conditionals and Looping* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 1 );                                           /* 1 */
            x = this.pop();                                                 /* x= */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( 'x is 1' );                                  /* 'x is 1' */
                    this.execOrPush( console.log );                         /* console.log */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            var fjs_argsArr = this.curFrame.stack;
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( 1 );                                   /* 1 */
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _eq_ );                                /* = */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } ).apply( this, fjs_argsArr ));                                /* () */
            this.execOrPush( _if_ );                                        /* if */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( 'x is 1' );                                  /* 'x is 1' */
                    this.execOrPush( _dot_ );                               /* . */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            prt1 = this.pop();                                              /* prt1= */
            this.execOrPush( 1 );                                           /* 1 */
            x = this.pop();                                                 /* x= */
            this.push( typeof prt1 == "function" ? prt1 : "prt1" );         /* :prt1 */
            this.execOrPush( 1 );                                           /* 1 */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _eq_ );                                        /* = */
            this.execOrPush( _if_ );                                        /* if */
            this.execOrPush( 1 );                                           /* 1 */
            x = this.pop();                                                 /* x= */
            this.execOrPush( 1 );                                           /* 1 */
            y = this.pop();                                                 /* y= */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( 2 );                                   /* 2 */
                    y = this.pop();                                         /* y= */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( 3 );                                           /* 3 */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _lt_ );                                        /* < */
            this.execOrPush( _if_ );                                        /* if */
            this.execOrPush( y );                                           /* y */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 1 );                                           /* 1 */
            x = this.pop();                                                 /* x= */
            this.execOrPush( 1 );                                           /* 1 */
            y = this.pop();                                                 /* y= */
            this.execOrPush( 3 );                                           /* 3 */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _lt_ );                                        /* < */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( 2 );                                   /* 2 */
                    y = this.pop();                                         /* y= */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( doif );                                        /* doif */
            this.execOrPush( y );                                           /* y */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Conditionals and Looping* section" );   /* "\nFrom the *Conditionals and Looping* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 0 );                                           /* 0 */
            x = this.pop();                                                 /* x= */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _dot_ );                               /* . */
                    this.execOrPush( 1 );                                   /* 1 */
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _plus_ );                              /* + */
                    x = this.pop();                                         /* x= */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( 3 );                                   /* 3 */
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _lt_ );                                /* < */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( _while_ );                                     /* while */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Conditionals and Looping* section" );   /* "\nFrom the *Conditionals and Looping* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 0 );                                           /* 0 */
            x = this.pop();                                                 /* x= */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _dot_ );                               /* . */
                    this.execOrPush( 1 );                                   /* 1 */
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _plus_ );                              /* + */
                    x = this.pop();                                         /* x= */
                    this.execOrPush( 3 );                                   /* 3 */
                    this.execOrPush( x );                                   /* x */
                    this.execOrPush( _lt_ );                                /* < */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( repeat );                                      /* repeat */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( _lbkt__rbkt_ );                                /* [] */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 2 );                                           /* 2 */
            this.execOrPush( 1 );                                           /* 1 */
            this.pushArgsAndExec( _lbkt__rbkt_, null );                     /* []< */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 2 );                                           /* 2 */
            this.push( typeof b == "function" ? b : "b" );                  /* :b */
            this.execOrPush( 1 );                                           /* 1 */
            this.push( typeof a == "function" ? a : "a" );                  /* :a */
            this.pushArgsAndExec( _lbrace__rbrace_, null );                 /* {}< */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( { x: 'one', y: 'two' } );                            /* `{ x: 'one', y: 'two' }` */
            fjs_ctxtObj = this.pop();
            fjs_val = fjs_ctxtObj.x;
            if(typeof fjs_val == "function")
              fjs_val = fjs_val.apply(
                  fjs_ctxtObj, this.curFrame.stack );
              this.curFrame.stack = [];
            this.pushReturnValue(fjs_val);                                  /* x. */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( 'x' );                                               /* 'x' */
            this.push( { x: 'one', y: 'two' } );                            /* `{ x: 'one', y: 'two' }` */
            this.execOrPush( get );                                         /* get */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( 1 );                                           /* 1 */
            this.push( [ 'zero', 'one' ] );                                 /* `[ 'zero', 'one' ]` */
            this.execOrPush( get );                                         /* get */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( _lbkt__rbkt_ );                                /* [] */
            x = this.pop();                                                 /* x= */
            this.push( 'a' );                                               /* 'a' */
            this.execOrPush( 0 );                                           /* 0 */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( set );                                         /* set */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _dot_ );                                       /* . */
            this.execOrPush( _lbrace__rbrace_ );                            /* {} */
            x = this.pop();                                                 /* x= */
            this.execOrPush( 1 );                                           /* 1 */
            this.push( 'a' );                                               /* 'a' */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( set );                                         /* set */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( [1, 2, 3] );                                         /* `[1, 2, 3]` */
            fjs_ctxtObj = this.pop();
            fjs_val = fjs_ctxtObj.pop;
            if(typeof fjs_val == "function")
              fjs_val = fjs_val.apply(
                  fjs_ctxtObj, this.curFrame.stack );
              this.curFrame.stack = [];
            this.pushReturnValue(fjs_val);                                  /* pop. */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( [1, 2, 3] );                                         /* `[1, 2, 3]` */
            x = this.pop();                                                 /* x= */
            this.execOrPush( 4 );                                           /* 4 */
            this.execOrPush( x );                                           /* x */
            fjs_ctxtObj = this.pop();
            fjs_val = fjs_ctxtObj.push;
            if(typeof fjs_val == "function")
              fjs_val = fjs_val.apply(
                  fjs_ctxtObj, this.curFrame.stack );
              this.curFrame.stack = [];
            this.pushReturnValue(fjs_val);                                  /* push. */
            this.execOrPush( x );                                           /* x */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( [1,2,5] );                                           /* `[1,2,5]` */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.moveArgsToStack(1);                                /* @ */
                    this.execOrPush( dup );                                 /* dup */
                    this.execOrPush( _star_ );                              /* * */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( map );                                         /* map */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Arrays and Objects* section" );         /* "\nFrom the *Arrays and Objects* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( [1, 2] );                                            /* `[1, 2]` */
            this.push( function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.moveArgsToStack(1);                                /* @ */
                    this.execOrPush( _dot_ );                               /* . */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } );
            this.execOrPush( each );                                        /* each */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Embedding Javascript Code* section" );  /* "\nFrom the *Embedding Javascript Code* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( x = 1 + 1 );                                         /* `x = 1 + 1` */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( {a:1, b:2} );                                        /* `{a:1, b:2}` */
            obj = this.pop();                                               /* obj= */
            this.pushArgsAndExec( drop, null );                             /* drop< */
            this.push( "\nFrom the *Http Server* section" );                /* "\nFrom the *Http Server* section" */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushCB(null);                                              /* cb */
            var fjs_argsArr = this.curFrame.stack;
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( 'http' );                                    /* 'http' */
                    this.execOrPush( require );                             /* require */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } ).apply( this, fjs_argsArr ));                                /* () */
            fjs_ctxtObj = this.pop();
            fjs_val = fjs_ctxtObj.createServer;
            if(typeof fjs_val == "function")
              fjs_val = fjs_val.apply(
                  fjs_ctxtObj, this.curFrame.stack );
              this.curFrame.stack = [];
            this.pushReturnValue(fjs_val);                                  /* createServer. */
            var fjs_argsArr = this.curFrame.stack;
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( '127.0.0.1' );                               /* '127.0.0.1' */
                    this.execOrPush( 1337 );                                /* 1337 */
                    this.moveArgsToStack(1);                                /* @ */
                    fjs_ctxtObj = this.pop();
                    fjs_val = fjs_ctxtObj.listen;
                    if(typeof fjs_val == "function")
                      fjs_val = fjs_val.apply(
                          fjs_ctxtObj, this.curFrame.stack );
                      this.curFrame.stack = [];
                    this.pushReturnValue(fjs_val);                          /* listen. */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } ).apply( this, fjs_argsArr ));                                /* () */
            this.execOrPush( drop );                                        /* drop */
            this.push( 'Server running at http://127.0.0.1:1337/' );        /* 'Server running at http://127.0.0.1:1337/' */
            this.execOrPush( _dot_ );                                       /* . */
            this.wait();                                                    /* wait */
          }
        }, function() {
          with( fjs_dash_primitives ) {
            this.execOrPush( drop );                                        /* drop */
            this.execOrPush( dup );                                         /* dup */
            var fjs_argsArr = this.curFrame.stack;
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( {'Content-Type':'text/plain'} );             /* `{'Content-Type':'text/plain'}` */
                    this.execOrPush( 200 );                                 /* 200 */
                    this.moveArgsToStack(1);                                /* @ */
                    fjs_ctxtObj = this.pop();
                    fjs_val = fjs_ctxtObj.writeHead;
                    if(typeof fjs_val == "function")
                      fjs_val = fjs_val.apply(
                          fjs_ctxtObj, this.curFrame.stack );
                      this.curFrame.stack = [];
                    this.pushReturnValue(fjs_val);                          /* writeHead. */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } ).apply( this, fjs_argsArr ));                                /* () */
            var fjs_argsArr = this.curFrame.stack;
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.setArgs(arguments);                                      /* ( */
              this.funcCall( null,
                [
                  function() {
                    this.push( 'Hello World\n' );                           /* 'Hello World\n' */
                    this.moveArgsToStack(1);                                /* @ */
                    fjs_ctxtObj = this.pop();
                    fjs_val = fjs_ctxtObj.end;
                    if(typeof fjs_val == "function")
                      fjs_val = fjs_val.apply(
                          fjs_ctxtObj, this.curFrame.stack );
                      this.curFrame.stack = [];
                    this.pushReturnValue(fjs_val);                          /* end. */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            } ).apply( this, fjs_argsArr ));                                /* () */
            this.funcReturn();                                              /* ) */
          }
        }
      ]
    );
