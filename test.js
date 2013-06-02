
// File test compiled by FJS version 0.0.0 on Sun Jun 02 2013 15:04

var fjs_dash_primitives, x;
require('./fjs-runtime').funcCall( null, [], 
  [
    function() {
      this.push( './fjs-primitives' );                                      /* './fjs-primitives' */
      this.pushArgsAndExec( require, null );                                /* >require */
      fjs_dash_primitives = this.pop();                                     /* fjs-primitives= */
      with( fjs_dash_primitives ) {
        this.push( "\nFrom the *Hello World* section" );                    /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.push( 'Hello World' );                                         /* 'Hello ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Comments* section" );                       /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( _star_ );                                          /* * */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Named Variables* section" );                /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 3 );                                               /* 3 */
        x = this.pop();                                                     /* x= */
        this.execOrPush( x );                                               /* x */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Functions* section" );                      /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.push( "hello world" );                                 /* "hello ... */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.push( "hello world" );                                 /* "hello ... */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        this.push( fjs_func );
        printGreeting = this.pop();                                         /* printGreeting= */
        this.execOrPush( printGreeting );                                   /* printGreeting */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( Math.min );                                        /* Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.pushArgsAndExec( Math.max, null );                             /* >Math.max */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.pushArgsAndExec( Math.min, 2 );                                /* 2>Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        var fjs_func = function(){
          var fjs_args = (Array.prototype.slice.call(
              arguments, 0, (fjs_func.fjs_popArgCount || Infinity)));
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushArgsAndExec( _dot_, null );                        /* >. */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this, this.popN(2) );                               /* () */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( Math );                                            /* Math */
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.min;
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.call(fjs_ctxtObj);
        if(fjs_val != undefined) this.push(fjs_val);                        /* .min */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( Math );                                            /* Math */
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.max;
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.apply(fjs_ctxtObj, this.popAll());
        if(fjs_val != undefined) this.push(fjs_val);                        /* >.max */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.execOrPush( Math );                                            /* Math */
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.min;
        args = this.stack().splice(-2, 2)
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.apply(fjs_ctxtObj, args);
        if(fjs_val != undefined) this.push(fjs_val);                        /* 2>.min */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        this.execOrPush( x );                                               /* x */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        this.pushFuncOrSym( typeof x == "undefined" ? null : x, "x");
                                                                            /* :x */
        this.execOrPush( _dot_ );                                           /* . */
        this.execOrPush( Math.min );                                        /* Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushFuncOrSym( typeof Math.min == "undefined" ? null : Math.min, "Math.min");
                                                                            /* :Math.min */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.execOrPush( _dot_ );                                           /* . */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        this.push( fjs_func );
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Multiple Stacks* section" );                /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushOuter( 2 );                                        /* @2 */
                this.pushArgsAndExec( Math.min, null );                     /* >Math.min */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushOuter(  );                                         /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.pushOuter(  );                                         /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.pushOuter(  );                                         /* @ */
                this.execOrPush( _dot_ );                                   /* . */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushOuter( 3 );                                        /* @3 */
                this.pushArgsAndExec( _dot_, null );                        /* >. */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.push( "\nFrom the *Multiple Stacks* section" );                /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushArgsAndExec( _dot_, null );                        /* >. */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.fjs_popArgCount = 2;
        this.push( fjs_func );
        print2 = this.pop();                                                /* print2= */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        this.pushArgsAndExec( print2, null );                               /* >print2 */
        this.push( "\nFrom the *Multiple Stacks* section" );                /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        this.execOrPush( 3 );                                               /* 3 */
        this.execOrPush( 2 );                                               /* 2 */
        var fjs_func = function(){
          var fjs_args = (Array.prototype.slice.call(
              arguments, 0, (fjs_func.fjs_popArgCount || Infinity)));
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushArgsAndExec( _dot_, null );                        /* >. */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.fjs_popArgCount = Infinity;
        fjs_func.apply( this, this.popN(Infinity) );                        /* () */
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.pushArgsAndExec( _dot_, null );                                /* >. */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.pushArgsAndExec( _dot_, null );                                /* >. */
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 1 );                                       /* 1 */
                this.execOrPush( 3 );                                       /* 3 */
                this.execOrPush( 2 );                                       /* 2 */
                this.execOrPush( _plus_ );                                  /* + */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.execOrPush( _plus_ );                                          /* + */
        this.execOrPush( _dot_ );                                           /* . */
        this.push( "\nFrom the *Named Variable Scopes* section" );          /* "\nFrom ... */
        this.execOrPush( _dot_ );                                           /* . */
        this.pushArgsAndExec( drop, null );                                 /* >drop */
        this.execOrPush( 1 );                                               /* 1 */
        x = this.pop();                                                     /* x= */
        var fjs_func = function(){
          var fjs_args = [];
          var y;
          this.funcCall( null, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 2 );                                       /* 2 */
                y = this.pop();                                             /* y= */
                this.funcReturn();                                          /* ) */
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */
        this.push( typeof y );                                              /* typeof:y */
          this.execOrPush( _dot_ );                                         /* . */
          var fjs_func = function(){
            var fjs_args = [];
            this.funcCall( null, fjs_args, 
              [
                function() {
                  this.pushArray(fjs_args);
                  this.execOrPush( 3 );                                     /* 3 */
                  x = this.pop();                                           /* x= */
                  this.funcReturn();                                        /* ) */
                }
              ]
            );
          }
          fjs_func.apply( this );                                           /* () */
          this.execOrPush( x );                                             /* x */
          this.execOrPush( _dot_ );                                         /* . */
          this.push( "\nFrom the *Async Execution* section" );              /* "\nFrom ... */
          this.execOrPush( _dot_ );                                         /* . */
          this.pushArgsAndExec( drop, null );                               /* >drop */
          this.push( 'fs' );                                                /* 'fs' */
          this.pushArgsAndExec( require, null );                            /* >require */
          fs = this.pop();                                                  /* fs= */
          this.push( 'fjs.bat' );                                           /* 'fjs.bat' */
          this.push( 'utf8' );                                              /* 'utf8' */
          this.pushCB(null);                                                /* cb */
          this.pushArgsAndExec( fs.readFile, null );                        /* >fs.readFile */
          this.push( 'hello world' );                                       /* 'hello ... */
          this.execOrPush( _dot_ );                                         /* . */
          this.wait();                                                      /* wait */
        }
      }, function() {
        with( fjs_dash_primitives ) {
          this.pushArgsAndExec( _dot_, null );                              /* >. */
          this.push( "\nFrom the *Primitve Words* section" );               /* "\nFrom ... */
          this.execOrPush( _dot_ );                                         /* . */
          this.pushArgsAndExec( drop, null );                               /* >drop */
          this.push( './fjs-primitives' );                                  /* './fjs-primitives' */
          this.pushArgsAndExec( require, null );                            /* >require */
          fjs_dash_primitives = this.pop();                                 /* fjs-primitives= */
          with( fjs_dash_primitives ) {
            this.push( "\nFrom the *Modules* section" );                    /* "\nFrom ... */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* >drop */
            this.push( 'fs' );                                              /* 'fs' */
            this.pushArgsAndExec( require, null );                          /* >require */
            fs = this.pop();                                                /* fs= */
            this.push( 'hello world' );                                     /* 'hello ... */
            this.execOrPush( fs.writefileSync );                            /* fs.writefileSync */
            this.push( "\nFrom the *Modules* section" );                    /* "\nFrom ... */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* >drop */
            var fjs_func = function(){
              var fjs_args = [];
              this.funcCall( null, fjs_args, 
                [
                  function() {
                    this.pushArray(fjs_args);
                    this.execOrPush( 1 );                                   /* 1 */
                    this.execOrPush( _plus_ );                              /* + */
                    this.funcReturn();                                      /* ) */
                  }
                ]
              );
            }
            fjs_func.fjs_popArgCount = 1;
            fjs_func.apply( this );                                         /* () */
            exports.increment = this.pop();                                 /* exports.increment= */
            this.push( "\nFrom the *Embedding Javascript Code* section" );  /* "\nFrom ... */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* >drop */
            this.push( x = 1 + 1 );                                         /* `x ... */
            this.execOrPush( _dot_ );                                       /* . */
            this.push( {a:1, b:2} );                                        /* `{a:1, ... */
            obj = this.pop();                                               /* obj= */
            this.push( "\nFrom the *Special Operator Prefixes* section" );  /* "\nFrom ... */
            this.execOrPush( _dot_ );                                       /* . */
            this.pushArgsAndExec( drop, null );                             /* >drop */
            this.execOrPush( undefined );                                   /* undefined */
            x = this.pop();                                                 /* x= */
            this.push( {x:1} );                                             /* `{x:1}` */
            obj = this.pop();                                               /* obj= */
            var fjs_func = function(){
              var fjs_args = [];
              this.funcCall( null, fjs_args, 
                [
                  function() {
                    this.pushArray(fjs_args);
                    with( obj ) {
                      this.execOrPush( x );                                 /* x */
                      this.execOrPush( _dot_ );                             /* . */
                      this.funcReturn();                                    /* ) */
                    }
                  }
                ]
              );
            }
            fjs_func.apply( this );                                         /* () */
            this.push( typeof x );                                          /* typeof:x */
              this.execOrPush( _dot_ );                                     /* . */
              this.push( "\nFJS version of http server example" );          /* "\nFJS ... */
              this.execOrPush( _dot_ );                                     /* . */
              this.pushArgsAndExec( drop, null );                           /* >drop */
              this.pushCB(null);                                            /* cb */
              this.push( 'http' );                                          /* 'http' */
              this.pushArgsAndExec( require, 1 );                           /* 1>require */
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.createServer;
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(fjs_ctxtObj, this.popAll());
              if(fjs_val != undefined) this.push(fjs_val);                  /* >.createServer */
              this.execOrPush( 1337 );                                      /* 1337 */
              this.push( '127.0.0.1' );                                     /* '127.0.0.1' */
              this.execOrPush( rot );                                       /* rot */
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.listen;
              args = this.stack().splice(-2, 2)
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(fjs_ctxtObj, args);
              if(fjs_val != undefined) this.push(fjs_val);                  /* 2>.listen */
              this.execOrPush( drop );                                      /* drop */
              this.push( 'Server running at http://127.0.0.1:1337/' );      /* 'Server ... */
              this.execOrPush( _dot_ );                                     /* . */
              this.wait();                                                  /* wait */
            }
          }
        }, function() {
          with( fjs_dash_primitives ) {
            with( fjs_dash_primitives ) {
              this.execOrPush( swap );                                      /* swap */
              this.execOrPush( drop );                                      /* drop */
              this.execOrPush( dup );                                       /* dup */
              this.execOrPush( 200 );                                       /* 200 */
              this.push( {'Content-Type':'text/plain'} );                   /* `{'Content-Type':'text/plain'}` */
              this.execOrPush( rot );                                       /* rot */
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.writeHead;
              args = this.stack().splice(-2, 2)
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(fjs_ctxtObj, args);
              if(fjs_val != undefined) this.push(fjs_val);                  /* 2>.writeHead */
              this.push( 'Hello World' );                                   /* 'Hello ... */
              this.execOrPush( swap );                                      /* swap */
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.end;
              args = this.stack().splice(-1, 1)
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(fjs_ctxtObj, args);
              if(fjs_val != undefined) this.push(fjs_val);                  /* 1>.end */
              this.funcReturn();                                            /* ) */
            }
          }
        }
      ]
    );
