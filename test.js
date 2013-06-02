
// File test compiled by FJS version 0.0.0 on Sat Jun 01 2013 22:50

function fjsInspect(fjs_word) {
  while(fjs_word.length < 25) fjs_word += ' ';
  fjs_stkDmp = []; fjs_frame = this.curFrame;
  if(fjs_frame) {
    fjs_stk = fjs_frame.stack; fjs_stkLen = fjs_stk.length;
    for(fjs_i=0; fjs_i<fjs_stkLen; fjs_i++) {
      fjs_item = fjs_stk[fjs_i];
      fjs_stkDmp.push(
        fjs_item === null ? 'null' : 
        typeof fjs_item == 'string'  ? '"'+fjs_item+'"'          : 
        typeof fjs_item == 'number'  ?  fjs_item                   : 
        fjs_item instanceof Function ? 'function'                  : 
        fjs_item instanceof Array    ? '['+fjs_item.toString()+']' : 
        fjs_item instanceof Boolean  ? fjs_item.toString()         : 
        (fjs_m = /^function\s(.*?)\(/.exec(fjs_item.constructor)) ? fjs_m[1] :
        fjs_item.toString()
      );
    }
  }
  console.log( 'dbg: ' + fjs_word, fjs_stkDmp.join(', '));
}

var fjs_dash_primitives;
require('./fjs-runtime').funcCall( fjsInspect, [], 
  [
    function() {
      this.push( './fjs-primitives' );                                      /* './fjs-primitives' */                                                                                                                                  fjsInspect.call(this, "'./fjs-primitives'");
      this.pushArgsAndExec( require, null );                                /* >require */                                                                                                                                  fjsInspect.call(this, ">require");
      fjs_dash_primitives = this.pop();                                     /* fjs-primitives= */                                                                                                                                  fjsInspect.call(this, "fjs-primitives=");
      with( fjs_dash_primitives ) {
        var fjs_func = function(){
          var fjs_args = [];
          this.funcCall( fjsInspect, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushArgsAndExec( _dot_, null );                        /* >. */                                                                                                                                  fjsInspect.call(this, ">.");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        }
        fjs_func.fjs_popArgCount = 2;
        this.push( fjs_func );
        print2 = this.pop();                                                /* print2= */                                                                                                                                  fjsInspect.call(this, "print2=");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.pushArgsAndExec( print2, null );                               /* >print2 */                                                                                                                                  fjsInspect.call(this, ">print2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        var fjs_func = function(){
          var fjs_args = (Array.prototype.slice.call(
              arguments, 0, (fjs_func.fjs_popArgCount || Infinity)));
          this.funcCall( fjsInspect, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.pushArgsAndExec( _dot_, null );                        /* >. */                                                                                                                                  fjsInspect.call(this, ">.");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        }
        fjs_func.fjs_popArgCount = Infinity;
        fjs_func.apply( this, this.popN(Infinity) );                        /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        this.execOrPush( x );                                               /* x */                                                                                                                                  fjsInspect.call(this, "x");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        var fjs_func = function(){
          var fjs_args = [];
          var y;
          this.funcCall( fjsInspect, fjs_args, 
            [
              function() {
                this.pushArray(fjs_args);
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                y = this.pop();                                             /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        }
        fjs_func.apply( this );                                             /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.push( typeof y );                                              /* typeof:y */                                                                                                                                  fjsInspect.call(this, "typeof:y");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          var fjs_func = function(){
            var fjs_args = [];
            var x;
            this.funcCall( fjsInspect, fjs_args, 
              [
                function() {
                  this.pushArray(fjs_args);
                  this.execOrPush( 3 );                                     /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                  x = this.pop();                                           /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
                  this.funcReturn();                                        /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                }
              ]
            );
          }
          fjs_func.apply( this );                                           /* () */                                                                                                                                  fjsInspect.call(this, "()");
          this.execOrPush( x );                                             /* x */                                                                                                                                  fjsInspect.call(this, "x");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          this.execOrPush( 1 );                                             /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
          x = this.pop();                                                   /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
          var fjs_func = function(){
            var fjs_args = [];
            var y;
            this.funcCall( fjsInspect, fjs_args, 
              [
                function() {
                  this.pushArray(fjs_args);
                  this.execOrPush( 2 );                                     /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                  y = this.pop();                                           /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
                  this.funcReturn();                                        /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                }
              ]
            );
          }
          fjs_func.apply( this );                                           /* () */                                                                                                                                  fjsInspect.call(this, "()");
          this.push( typeof y );                                            /* typeof:y */                                                                                                                                  fjsInspect.call(this, "typeof:y");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            var fjs_func = function(){
              var fjs_args = [];
              var x;
              this.funcCall( fjsInspect, fjs_args, 
                [
                  function() {
                    this.pushArray(fjs_args);
                    this.execOrPush( 3 );                                   /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                    x = this.pop();                                         /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
                    this.funcReturn();                                      /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                  }
                ]
              );
            }
            fjs_func.apply( this );                                         /* () */                                                                                                                                  fjsInspect.call(this, "()");
            this.execOrPush( x );                                           /* x */                                                                                                                                  fjsInspect.call(this, "x");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( {x:1} );                                       /* `{x:1} */                                                                                                                                  fjsInspect.call(this, "`{x:1}");
            obj = this.pop();                                               /* obj= */                                                                                                                                  fjsInspect.call(this, "obj=");
            var fjs_func = function(){
              var fjs_args = [];
              this.funcCall( fjsInspect, fjs_args, 
                [
                  function() {
                    this.pushArray(fjs_args);
                    with( obj ) {
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  }
                ]
              );
            }
            fjs_func.apply( this );                                         /* () */                                                                                                                                  fjsInspect.call(this, "()");
            this.push( typeof x );                                          /* typeof:x */                                                                                                                                  fjsInspect.call(this, "typeof:x");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushFuncOrSym( typeof abc == "undefined" ? null : abc, "abc");
                                                                            /* :abc */                                                                                                                                  fjsInspect.call(this, ":abc");
              this.push( this.pop() instanceof string );                    /* instanceof:string */                                                                                                                                  fjsInspect.call(this, "instanceof:string");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            }
          ]
        );
