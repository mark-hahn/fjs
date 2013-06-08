
// File test compiled by FJS version 0.1.0 on Fri Jun 07 2013 23:19

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
        (fjs_m = /^function\s(.*?)\(\s/.exec(fjs_item.constructor)) ? fjs_m[1] :
        fjs_item.toString()
      );
    }
  }
  console.log( 'dbg: ' + fjs_word, fjs_stkDmp.join(', '));
}

var fjs_dash_primitives, x, printGreeting, fs, obj, prt1, y;
require('./fjs-runtime').funcCall( fjsInspect,
  [
    function() {
      this.push( './fjs-primitives' );                                      /* './fjs-primitives' */                                                                                                                                  fjsInspect.call(this, "'./fjs-primitives'");
      this.execOrPush( require );                                           /* require */                                                                                                                                  fjsInspect.call(this, "require");
      fjs_dash_primitives = this.pop();                                     /* fjs-primitives= */                                                                                                                                  fjsInspect.call(this, "fjs-primitives=");
      with( fjs_dash_primitives ) {
        this.pushArgsAndExec( fjs_dash_primitives );                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Hello World* section" );                    /* "\nFrom the *Hello World* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Hello World* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.push( 'Hello World' );                                         /* 'Hello World' */                                                                                                                                  fjsInspect.call(this, "'Hello World'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( fjs_dash_primitives );                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Comments* section" );                       /* "\nFrom the *Comments* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Comments* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( _plus_ );                                          /* + */                                                                                                                                  fjsInspect.call(this, "+");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( _star_ );                                          /* * */                                                                                                                                  fjsInspect.call(this, "*");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( fjs_dash_primitives );                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Named Variables* section" );                /* "\nFrom the *Named Variables* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Named Variables* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        this.execOrPush( x );                                               /* x */                                                                                                                                  fjsInspect.call(this, "x");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( x );                                          /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Functions* section" );                      /* "\nFrom the *Functions* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Functions* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.push( "hello world" );                                 /* "hello world" */                                                                                                                                  fjsInspect.call(this, "'hello world'");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.push( function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.push( "hello world" );                                 /* "hello world" */                                                                                                                                  fjsInspect.call(this, "'hello world'");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } );
        printGreeting = this.pop();                                         /* printGreeting= */                                                                                                                                  fjsInspect.call(this, "printGreeting=");
        this.execOrPush( printGreeting );                                   /* printGreeting */                                                                                                                                  fjsInspect.call(this, "printGreeting");
        this.pushArgsAndExec( printGreeting );                              /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Word Modifers* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        this.execOrPush( x );                                               /* x */                                                                                                                                  fjsInspect.call(this, "x");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        this.push( "x" );                                                   /* :x */                                                                                                                                  fjsInspect.call(this, ":x");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( Math.min );                                        /* Math.min */                                                                                                                                  fjsInspect.call(this, "Math.min");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.push( "Math.min" );                                            /* :Math.min */                                                                                                                                  fjsInspect.call(this, ":Math.min");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( 1 );                                       /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                this.execOrPush( _plus_ );                                  /* + */                                                                                                                                  fjsInspect.call(this, "+");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.push( function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( 1 );                                       /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                this.execOrPush( _plus_ );                                  /* + */                                                                                                                                  fjsInspect.call(this, "+");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } );
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( x );                                          /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Word Modifers* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( Math.min );                                        /* Math.min */                                                                                                                                  fjsInspect.call(this, "Math.min");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( Math );                                            /* Math */                                                                                                                                  fjsInspect.call(this, "Math");
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.min;
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.apply(
              fjs_ctxtObj, this.curFrame.stack );
        if(fjs_val != undefined) this.pushReturnValue(fjs_val);             /* min. */                                                                                                                                  fjsInspect.call(this, "min.");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( min );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Word Modifers* section" );                  /* "\nFrom the *Word Modifers* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Word Modifers* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushArgsAndExec( min );                                        /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushArgsAndExec( min, 2 );                                     /* .<2 */                                                                                                                                  fjsInspect.call(this, ".<2");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.execOrPush( Math.min );                                        /* Math.min */                                                                                                                                  fjsInspect.call(this, "Math.min");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushArgsAndExec( min, 2 );                                     /* Math.max<2 */                                                                                                                                  fjsInspect.call(this, "Math.max<2");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( min );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Using Arguments* section" );                /* "\nFrom the *Using Arguments* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Using Arguments* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.pushOuter(  );                                         /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.pushOuter(  );                                         /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.pushOuter(  );                                         /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.pushArgsAndExec( undefined, 2 );                       /* @<2 */                                                                                                                                  fjsInspect.call(this, "@<2");
                this.execOrPush( Math.max );                                /* Math.max */                                                                                                                                  fjsInspect.call(this, "Math.max");
                this.execOrPush( _dot_ );                                   /* . */                                                                                                                                  fjsInspect.call(this, ".");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 4 );                                       /* 4 */                                                                                                                                  fjsInspect.call(this, "4");
                this.pushArgsAndExec( undefined );                          /* @< */                                                                                                                                  fjsInspect.call(this, "@<");
                this.pushArgsAndExec( undefined );                          /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.pushArgsAndExec( min );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Function Results* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( 1 );                                       /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.pushArgsAndExec( min );                                        /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( 1 );                                       /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                this.execOrPush( _plus_ );                                  /* + */                                                                                                                                  fjsInspect.call(this, "+");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.pushArgsAndExec( min );                                        /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( 1 );                                       /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                this.execOrPush( _plus_ );                                  /* + */                                                                                                                                  fjsInspect.call(this, "+");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.execOrPush( _plus_ );                                          /* + */                                                                                                                                  fjsInspect.call(this, "+");
        this.pushArgsAndExec( min );                                        /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
        this.pushArgsAndExec( min );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Function Results* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 4 );                                               /* 4 */                                                                                                                                  fjsInspect.call(this, "4");
        this.execOrPush( 2 );                                               /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
        this.execOrPush( _plus_ );                                          /* + */                                                                                                                                  fjsInspect.call(this, "+");
        this.execOrPush( 3 );                                               /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
        this.execOrPush( 5 );                                               /* 5 */                                                                                                                                  fjsInspect.call(this, "5");
        this.execOrPush( _dash_ );                                          /* - */                                                                                                                                  fjsInspect.call(this, "-");
        this.execOrPush( _plus_ );                                          /* + */                                                                                                                                  fjsInspect.call(this, "+");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 4 );                                       /* 4 */                                                                                                                                  fjsInspect.call(this, "4");
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                this.execOrPush( _plus_ );                                  /* + */                                                                                                                                  fjsInspect.call(this, "+");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 3 );                                       /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                this.execOrPush( 5 );                                       /* 5 */                                                                                                                                  fjsInspect.call(this, "5");
                this.execOrPush( _dash_ );                                  /* - */                                                                                                                                  fjsInspect.call(this, "-");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.execOrPush( _plus_ );                                          /* + */                                                                                                                                  fjsInspect.call(this, "+");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.pushArgsAndExec( min );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Function Results* section" );               /* "\nFrom the *Function Results* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Function Results* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( Math.min );                                        /* Math.min */                                                                                                                                  fjsInspect.call(this, "Math.min");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 4 );                                               /* 4 */                                                                                                                                  fjsInspect.call(this, "4");
        this.push( 'hi' );                                                  /* 'hi' */                                                                                                                                  fjsInspect.call(this, "'hi'");
        this.execOrPush( alert );                                           /* alert */                                                                                                                                  fjsInspect.call(this, "alert");
        this.pushArgsAndExec( min );                                        /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
        this.push( ' ' );                                                   /* ' ' */                                                                                                                                  fjsInspect.call(this, "' '");
        this.push( "1 2 3" );                                               /* "1 2 3" */                                                                                                                                  fjsInspect.call(this, "'1 2 3'");
        fjs_ctxtObj = this.pop();
        fjs_val = fjs_ctxtObj.split;
        if(typeof fjs_val == "function")
          fjs_val = fjs_val.apply(
              fjs_ctxtObj, this.curFrame.stack );
        if(fjs_val != undefined) this.pushReturnValue(fjs_val);             /* split. */                                                                                                                                  fjsInspect.call(this, "split.");
        this.pushArgsAndExec( split );                                      /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
        this.push( "\nFrom the *Named Variable Scopes* section" );          /* "\nFrom the *Named Variable Scopes* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Named Variable Scopes* section'");
        this.execOrPush( _dot_ );                                           /* . */                                                                                                                                  fjsInspect.call(this, ".");
        this.execOrPush( 1 );                                               /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
        x = this.pop();                                                     /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
        this.pushReturnValue( (function(){
          this.funcCall( fjsInspect,
            [
              function() {
                this.execOrPush( 2 );                                       /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                y = this.pop();                                             /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
                this.funcReturn();                                          /* ) */                                                                                                                                  fjsInspect.call(this, ")");
              }
            ]
          );
        } ).apply( this, this.curFrame.stack ));                            /* () */                                                                                                                                  fjsInspect.call(this, "()");
        this.curFrame.stack = [];
        this.push( typeof y );                                              /* typeof:y */                                                                                                                                  fjsInspect.call(this, "typeof:y");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          this.pushReturnValue( (function(){
            this.funcCall( fjsInspect,
              [
                function() {
                  this.execOrPush( 3 );                                     /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                  x = this.pop();                                           /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
                  this.funcReturn();                                        /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                }
              ]
            );
          } ).apply( this, this.curFrame.stack ));                          /* () */                                                                                                                                  fjsInspect.call(this, "()");
          this.curFrame.stack = [];
          this.execOrPush( x );                                             /* x */                                                                                                                                  fjsInspect.call(this, "x");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          this.pushArgsAndExec( y );                                        /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
          this.push( "\nFrom the *Async Execution* section" );              /* "\nFrom the *Async Execution* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Async Execution* section'");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          this.push( 'fs' );                                                /* 'fs' */                                                                                                                                  fjsInspect.call(this, "'fs'");
          this.execOrPush( require );                                       /* require */                                                                                                                                  fjsInspect.call(this, "require");
          fs = this.pop();                                                  /* fs= */                                                                                                                                  fjsInspect.call(this, "fs=");
          this.pushCB(fjsInspect);                                          /* cb */                                                                                                                                  fjsInspect.call(this, "cb");
          this.push( 'utf8' );                                              /* 'utf8' */                                                                                                                                  fjsInspect.call(this, "'utf8'");
          this.push( 'fjs.bat' );                                           /* 'fjs.bat' */                                                                                                                                  fjsInspect.call(this, "'fjs.bat'");
          this.execOrPush( fs.readFile );                                   /* fs.readFile */                                                                                                                                  fjsInspect.call(this, "fs.readFile");
          this.pushReturnValue( (function(){
            this.funcCall( fjsInspect,
              [
                function() {
                  this.push( 'hello world' );                               /* 'hello world' */                                                                                                                                  fjsInspect.call(this, "'hello world'");
                  this.execOrPush( _dot_ );                                 /* . */                                                                                                                                  fjsInspect.call(this, ".");
                  this.funcReturn();                                        /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                }
              ]
            );
          } ).apply( this, this.curFrame.stack ));                          /* () */                                                                                                                                  fjsInspect.call(this, "()");
          this.curFrame.stack = [];
          this.wait();                                                      /* wait */                                                                                                                                  fjsInspect.call(this, "wait");
        }
      }, function() {
        with( fjs_dash_primitives ) {
          this.pushArgsAndExec( fs );                                       /* .< */                                                                                                                                  fjsInspect.call(this, ".<");
          this.pushArgsAndExec( fs );                                       /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
          this.push( "\nFrom the *Primitve Words* section" );               /* "\nFrom the *Primitve Words* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Primitve Words* section'");
          this.execOrPush( _dot_ );                                         /* . */                                                                                                                                  fjsInspect.call(this, ".");
          this.push( './fjs-primitives' );                                  /* './fjs-primitives' */                                                                                                                                  fjsInspect.call(this, "'./fjs-primitives'");
          this.execOrPush( require );                                       /* require */                                                                                                                                  fjsInspect.call(this, "require");
          fjs_dash_primitives = this.pop();                                 /* fjs-primitives= */                                                                                                                                  fjsInspect.call(this, "fjs-primitives=");
          with( fjs_dash_primitives ) {
            this.pushArgsAndExec( fjs_dash_primitives );                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
            this.push( "\nFrom the *Comparisoms and Boolean Operators* section" ); /* "\nFrom the *Comparisoms and Boolean Operators* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Comparisoms and Boolean Operators* section'");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( 2 );                                           /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
            this.execOrPush( 1 );                                           /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
            this.execOrPush( _lt_ );                                        /* < */                                                                                                                                  fjsInspect.call(this, "<");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( 2 );                                           /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
            this.execOrPush( 1 );                                           /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
            this.execOrPush( _gt_ );                                        /* > */                                                                                                                                  fjsInspect.call(this, ">");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( 2 );                                           /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
            this.execOrPush( 1 );                                           /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
            this.execOrPush( _plus_ );                                      /* + */                                                                                                                                  fjsInspect.call(this, "+");
            this.execOrPush( 3 );                                           /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
            this.execOrPush( _eq_ );                                        /* = */                                                                                                                                  fjsInspect.call(this, "=");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.pushArgsAndExec( fjs_dash_primitives );                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
            this.push( "\nFrom the *Comparisoms and Boolean Operators* section" ); /* "\nFrom the *Comparisoms and Boolean Operators* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Comparisoms and Boolean Operators* section'");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( true );                                        /* true */                                                                                                                                  fjsInspect.call(this, "true");
            this.execOrPush( not );                                         /* not */                                                                                                                                  fjsInspect.call(this, "not");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( false );                                       /* false */                                                                                                                                  fjsInspect.call(this, "false");
            this.execOrPush( true );                                        /* true */                                                                                                                                  fjsInspect.call(this, "true");
            this.execOrPush( and );                                         /* and */                                                                                                                                  fjsInspect.call(this, "and");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( 6 );                                           /* 6 */                                                                                                                                  fjsInspect.call(this, "6");
            x = this.pop();                                                 /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
            this.execOrPush( 5 );                                           /* 5 */                                                                                                                                  fjsInspect.call(this, "5");
            this.execOrPush( x );                                           /* x */                                                                                                                                  fjsInspect.call(this, "x");
            this.execOrPush( _gt_ );                                        /* > */                                                                                                                                  fjsInspect.call(this, ">");
            this.execOrPush( 3 );                                           /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
            this.execOrPush( x );                                           /* x */                                                                                                                                  fjsInspect.call(this, "x");
            this.execOrPush( _lt_ );                                        /* < */                                                                                                                                  fjsInspect.call(this, "<");
            this.execOrPush( or );                                          /* or */                                                                                                                                  fjsInspect.call(this, "or");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.execOrPush( 6 );                                           /* 6 */                                                                                                                                  fjsInspect.call(this, "6");
            x = this.pop();                                                 /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
            this.pushReturnValue( (function(){
              this.funcCall( fjsInspect,
                [
                  function() {
                    this.execOrPush( 5 );                                   /* 5 */                                                                                                                                  fjsInspect.call(this, "5");
                    this.execOrPush( x );                                   /* x */                                                                                                                                  fjsInspect.call(this, "x");
                    this.execOrPush( _gt_ );                                /* > */                                                                                                                                  fjsInspect.call(this, ">");
                    this.funcReturn();                                      /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                  }
                ]
              );
            } ).apply( this, this.curFrame.stack ));                        /* () */                                                                                                                                  fjsInspect.call(this, "()");
            this.curFrame.stack = [];
            this.pushReturnValue( (function(){
              this.funcCall( fjsInspect,
                [
                  function() {
                    this.execOrPush( 3 );                                   /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                    this.execOrPush( x );                                   /* x */                                                                                                                                  fjsInspect.call(this, "x");
                    this.execOrPush( _lt_ );                                /* < */                                                                                                                                  fjsInspect.call(this, "<");
                    this.funcReturn();                                      /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                  }
                ]
              );
            } ).apply( this, this.curFrame.stack ));                        /* () */                                                                                                                                  fjsInspect.call(this, "()");
            this.curFrame.stack = [];
            this.execOrPush( or );                                          /* or */                                                                                                                                  fjsInspect.call(this, "or");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.pushArgsAndExec( x );                                      /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
            this.push( "\nFrom the *Special Operator Prefixes* section" );  /* "\nFrom the *Special Operator Prefixes* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Special Operator Prefixes* section'");
            this.execOrPush( _dot_ );                                       /* . */                                                                                                                                  fjsInspect.call(this, ".");
            this.push( {x:1} );                                             /* `{x:1}` */                                                                                                                                  fjsInspect.call(this, "`{x:1}`");
            obj = this.pop();                                               /* obj= */                                                                                                                                  fjsInspect.call(this, "obj=");
            this.pushReturnValue( (function(){
              this.funcCall( fjsInspect,
                [
                  function() {
                    with( obj ) {
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  }
                ]
              );
            } ).apply( this, this.curFrame.stack ));                        /* () */                                                                                                                                  fjsInspect.call(this, "()");
            this.curFrame.stack = [];
            this.push( typeof x );                                          /* typeof:x */                                                                                                                                  fjsInspect.call(this, "typeof:x");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Conditionals and Looping* section" ); /* "\nFrom the *Conditionals and Looping* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Conditionals and Looping* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( 'x is 1' );                                /* 'x is 1' */                                                                                                                                  fjsInspect.call(this, "'x is 1'");
                      this.execOrPush( console.log );                       /* console.log */                                                                                                                                  fjsInspect.call(this, "console.log");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( 1 );                                 /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _eq_ );                              /* = */                                                                                                                                  fjsInspect.call(this, "=");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              this.execOrPush( _if_ );                                      /* if */                                                                                                                                  fjsInspect.call(this, "if");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( 'x is 1' );                                /* 'x is 1' */                                                                                                                                  fjsInspect.call(this, "'x is 1'");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              prt1 = this.pop();                                            /* prt1= */                                                                                                                                  fjsInspect.call(this, "prt1=");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.execOrPush( prt1 );                                      /* prt1 */                                                                                                                                  fjsInspect.call(this, "prt1");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _eq_ );                                      /* = */                                                                                                                                  fjsInspect.call(this, "=");
              this.execOrPush( _if_ );                                      /* if */                                                                                                                                  fjsInspect.call(this, "if");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              y = this.pop();                                               /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( 2 );                                 /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                      y = this.pop();                                       /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( 3 );                                         /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _lt_ );                                      /* < */                                                                                                                                  fjsInspect.call(this, "<");
              this.execOrPush( _if_ );                                      /* if */                                                                                                                                  fjsInspect.call(this, "if");
              this.execOrPush( y );                                         /* y */                                                                                                                                  fjsInspect.call(this, "y");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              y = this.pop();                                               /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
              this.execOrPush( 3 );                                         /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _lt_ );                                      /* < */                                                                                                                                  fjsInspect.call(this, "<");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( 2 );                                 /* 2 */                                                                                                                                  fjsInspect.call(this, "2");
                      y = this.pop();                                       /* y= */                                                                                                                                  fjsInspect.call(this, "y=");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( doif );                                      /* doif */                                                                                                                                  fjsInspect.call(this, "doif");
              this.execOrPush( y );                                         /* y */                                                                                                                                  fjsInspect.call(this, "y");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( y );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Conditionals and Looping* section" ); /* "\nFrom the *Conditionals and Looping* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Conditionals and Looping* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( 0 );                                         /* 0 */                                                                                                                                  fjsInspect.call(this, "0");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.execOrPush( 1 );                                 /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _plus_ );                            /* + */                                                                                                                                  fjsInspect.call(this, "+");
                      x = this.pop();                                       /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( 3 );                                 /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _lt_ );                              /* < */                                                                                                                                  fjsInspect.call(this, "<");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( _while_ );                                   /* while */                                                                                                                                  fjsInspect.call(this, "while");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Conditionals and Looping* section" ); /* "\nFrom the *Conditionals and Looping* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Conditionals and Looping* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( 0 );                                         /* 0 */                                                                                                                                  fjsInspect.call(this, "0");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.execOrPush( 1 );                                 /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _plus_ );                            /* + */                                                                                                                                  fjsInspect.call(this, "+");
                      x = this.pop();                                       /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
                      this.execOrPush( 3 );                                 /* 3 */                                                                                                                                  fjsInspect.call(this, "3");
                      this.execOrPush( x );                                 /* x */                                                                                                                                  fjsInspect.call(this, "x");
                      this.execOrPush( _lt_ );                              /* < */                                                                                                                                  fjsInspect.call(this, "<");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( repeat );                                    /* repeat */                                                                                                                                  fjsInspect.call(this, "repeat");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( _lbkt__rbkt_ );                              /* [] */                                                                                                                                  fjsInspect.call(this, "[]");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( [1, 2] );                                          /* `[1, 2]` */                                                                                                                                  fjsInspect.call(this, "`[1, 2]`");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( {a:1, b:2} );                                      /* `{a:1, b:2}` */                                                                                                                                  fjsInspect.call(this, "`{a:1, b:2}`");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( { x: 'one', y: 'two' } );                          /* `{ x: 'one', y: 'two' }` */                                                                                                                                  fjsInspect.call(this, "`{ x: 'one', y: 'two' }`");
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.x;
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(
                    fjs_ctxtObj, this.curFrame.stack );
              if(fjs_val != undefined) this.pushReturnValue(fjs_val);       /* x. */                                                                                                                                  fjsInspect.call(this, "x.");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( 'x' );                                             /* 'x' */                                                                                                                                  fjsInspect.call(this, "'x'");
              this.push( { x: 'one', y: 'two' } );                          /* `{ x: 'one', y: 'two' }` */                                                                                                                                  fjsInspect.call(this, "`{ x: 'one', y: 'two' }`");
              this.execOrPush( get );                                       /* get */                                                                                                                                  fjsInspect.call(this, "get");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              this.push( [ 'zero', 'one' ] );                               /* `[ 'zero', 'one' ]` */                                                                                                                                  fjsInspect.call(this, "`[ 'zero', 'one' ]`");
              this.execOrPush( get );                                       /* get */                                                                                                                                  fjsInspect.call(this, "get");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( _lbkt__rbkt_ );                              /* [] */                                                                                                                                  fjsInspect.call(this, "[]");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.push( 'a' );                                             /* 'a' */                                                                                                                                  fjsInspect.call(this, "'a'");
              this.execOrPush( 0 );                                         /* 0 */                                                                                                                                  fjsInspect.call(this, "0");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( set );                                       /* set */                                                                                                                                  fjsInspect.call(this, "set");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.execOrPush( _lbrace__rbrace_ );                          /* {} */                                                                                                                                  fjsInspect.call(this, "{}");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.execOrPush( 1 );                                         /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
              this.push( 'a' );                                             /* 'a' */                                                                                                                                  fjsInspect.call(this, "'a'");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( set );                                       /* set */                                                                                                                                  fjsInspect.call(this, "set");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( x );                                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( [1, 2, 3] );                                       /* `[1, 2, 3]` */                                                                                                                                  fjsInspect.call(this, "`[1, 2, 3]`");
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.pop;
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(
                    fjs_ctxtObj, this.curFrame.stack );
              if(fjs_val != undefined) this.pushReturnValue(fjs_val);       /* pop. */                                                                                                                                  fjsInspect.call(this, "pop.");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( [1, 2, 3] );                                       /* `[1, 2, 3]` */                                                                                                                                  fjsInspect.call(this, "`[1, 2, 3]`");
              x = this.pop();                                               /* x= */                                                                                                                                  fjsInspect.call(this, "x=");
              this.execOrPush( 4 );                                         /* 4 */                                                                                                                                  fjsInspect.call(this, "4");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.push;
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(
                    fjs_ctxtObj, this.curFrame.stack );
              if(fjs_val != undefined) this.pushReturnValue(fjs_val);       /* push. */                                                                                                                                  fjsInspect.call(this, "push.");
              this.execOrPush( x );                                         /* x */                                                                                                                                  fjsInspect.call(this, "x");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushArgsAndExec( push );                                 /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( [1,2,5] );                                         /* `[1,2,5]` */                                                                                                                                  fjsInspect.call(this, "`[1,2,5]`");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      this.execOrPush( dup );                               /* dup */                                                                                                                                  fjsInspect.call(this, "dup");
                      this.execOrPush( _star_ );                            /* * */                                                                                                                                  fjsInspect.call(this, "*");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( map );                                       /* map */                                                                                                                                  fjsInspect.call(this, "map");
              this.push( [0,3] );                                           /* `[0,3]` */                                                                                                                                  fjsInspect.call(this, "`[0,3]`");
              this.push( [1,2] );                                           /* `[1,2]` */                                                                                                                                  fjsInspect.call(this, "`[1,2]`");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      this.execOrPush( dup );                               /* dup */                                                                                                                                  fjsInspect.call(this, "dup");
                      this.execOrPush( _star_ );                            /* * */                                                                                                                                  fjsInspect.call(this, "*");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.pushArgsAndExec( push, 3 );                              /* map<3 */                                                                                                                                  fjsInspect.call(this, "map<3");
              this.pushArgsAndExec( push );                                 /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Arrays and Objects* section" );       /* "\nFrom the *Arrays and Objects* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Arrays and Objects* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( [1, 2] );                                          /* `[1, 2]` */                                                                                                                                  fjsInspect.call(this, "`[1, 2]`");
              this.push( function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      this.push( ']=' );                                    /* ']=' */                                                                                                                                  fjsInspect.call(this, "']='");
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      this.push( '[' );                                     /* '[' */                                                                                                                                  fjsInspect.call(this, "'['");
                      this.pushArgsAndExec( undefined );                    /* +< */                                                                                                                                  fjsInspect.call(this, "+<");
                      this.execOrPush( _dot_ );                             /* . */                                                                                                                                  fjsInspect.call(this, ".");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } );
              this.execOrPush( each );                                      /* each */                                                                                                                                  fjsInspect.call(this, "each");
              this.pushArgsAndExec( push );                                 /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Modules* section" );                  /* "\nFrom the *Modules* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Modules* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( 'fs' );                                            /* 'fs' */                                                                                                                                  fjsInspect.call(this, "'fs'");
              this.execOrPush( require );                                   /* require */                                                                                                                                  fjsInspect.call(this, "require");
              fs = this.pop();                                              /* fs= */                                                                                                                                  fjsInspect.call(this, "fs=");
              this.push( 'hello world' );                                   /* 'hello world' */                                                                                                                                  fjsInspect.call(this, "'hello world'");
              this.execOrPush( fs.writefileSync );                          /* fs.writefileSync */                                                                                                                                  fjsInspect.call(this, "fs.writefileSync");
              this.pushArgsAndExec( fs );                                   /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Modules* section" );                  /* "\nFrom the *Modules* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Modules* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      this.execOrPush( 1 );                                 /* 1 */                                                                                                                                  fjsInspect.call(this, "1");
                      this.execOrPush( _plus_ );                            /* + */                                                                                                                                  fjsInspect.call(this, "+");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              exports.increment = this.pop();                               /* exports.increment= */                                                                                                                                  fjsInspect.call(this, "exports.increment=");
              this.pushArgsAndExec( exports.increment );                    /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Embedding Javascript Code* section" ); /* "\nFrom the *Embedding Javascript Code* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Embedding Javascript Code* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( x = 1 + 1 );                                       /* `x = 1 + 1` */                                                                                                                                  fjsInspect.call(this, "`x = 1 + 1`");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.push( {a:1, b:2} );                                      /* `{a:1, b:2}` */                                                                                                                                  fjsInspect.call(this, "`{a:1, b:2}`");
              obj = this.pop();                                             /* obj= */                                                                                                                                  fjsInspect.call(this, "obj=");
              this.pushArgsAndExec( obj );                                  /* drop< */                                                                                                                                  fjsInspect.call(this, "drop<");
              this.push( "\nFrom the *Http Server* section" );              /* "\nFrom the *Http Server* section" */                                                                                                                                  fjsInspect.call(this, "'\nFrom the *Http Server* section'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.pushCB(fjsInspect);                                      /* cb */                                                                                                                                  fjsInspect.call(this, "cb");
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( 'http' );                                  /* 'http' */                                                                                                                                  fjsInspect.call(this, "'http'");
                      this.execOrPush( require );                           /* require */                                                                                                                                  fjsInspect.call(this, "require");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              fjs_ctxtObj = this.pop();
              fjs_val = fjs_ctxtObj.createServer;
              if(typeof fjs_val == "function")
                fjs_val = fjs_val.apply(
                    fjs_ctxtObj, this.curFrame.stack );
              if(fjs_val != undefined) this.pushReturnValue(fjs_val);       /* createServer. */                                                                                                                                  fjsInspect.call(this, "createServer.");
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( '127.0.0.1' );                             /* '127.0.0.1' */                                                                                                                                  fjsInspect.call(this, "'127.0.0.1'");
                      this.execOrPush( 1337 );                              /* 1337 */                                                                                                                                  fjsInspect.call(this, "1337");
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      fjs_ctxtObj = this.pop();
                      fjs_val = fjs_ctxtObj.listen;
                      if(typeof fjs_val == "function")
                        fjs_val = fjs_val.apply(
                            fjs_ctxtObj, this.curFrame.stack );
                      if(fjs_val != undefined) this.pushReturnValue(fjs_val); /* listen. */                                                                                                                                  fjsInspect.call(this, "listen.");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              this.execOrPush( drop );                                      /* drop */                                                                                                                                  fjsInspect.call(this, "drop");
              this.push( 'Server running at http://127.0.0.1:1337/' );      /* 'Server running at http://127.0.0.1:1337/' */                                                                                                                                  fjsInspect.call(this, "'Server running at http://127.0.0.1:1337/'");
              this.execOrPush( _dot_ );                                     /* . */                                                                                                                                  fjsInspect.call(this, ".");
              this.wait();                                                  /* wait */                                                                                                                                  fjsInspect.call(this, "wait");
            }
          }
        }, function() {
          with( fjs_dash_primitives ) {
            with( fjs_dash_primitives ) {
              this.execOrPush( swap );                                      /* swap */                                                                                                                                  fjsInspect.call(this, "swap");
              this.execOrPush( drop );                                      /* drop */                                                                                                                                  fjsInspect.call(this, "drop");
              this.execOrPush( dup );                                       /* dup */                                                                                                                                  fjsInspect.call(this, "dup");
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( {'Content-Type':'text/plain'} );           /* `{'Content-Type':'text/plain'}` */                                                                                                                                  fjsInspect.call(this, "`{'Content-Type':'text/plain'}`");
                      this.execOrPush( 200 );                               /* 200 */                                                                                                                                  fjsInspect.call(this, "200");
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      fjs_ctxtObj = this.pop();
                      fjs_val = fjs_ctxtObj.writeHead;
                      if(typeof fjs_val == "function")
                        fjs_val = fjs_val.apply(
                            fjs_ctxtObj, this.curFrame.stack );
                      if(fjs_val != undefined) this.pushReturnValue(fjs_val); /* writeHead. */                                                                                                                                  fjsInspect.call(this, "writeHead.");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              this.pushReturnValue( (function(){
                this.funcCall( fjsInspect,
                  [
                    function() {
                      this.push( 'Hello World' );                           /* 'Hello World' */                                                                                                                                  fjsInspect.call(this, "'Hello World'");
                      this.execOrPush( 200 );                               /* 200 */                                                                                                                                  fjsInspect.call(this, "200");
                      this.pushOuter(  );                                   /* @ */                                                                                                                                  fjsInspect.call(this, "@");
                      fjs_ctxtObj = this.pop();
                      fjs_val = fjs_ctxtObj.end;
                      if(typeof fjs_val == "function")
                        fjs_val = fjs_val.apply(
                            fjs_ctxtObj, this.curFrame.stack );
                      if(fjs_val != undefined) this.pushReturnValue(fjs_val); /* end. */                                                                                                                                  fjsInspect.call(this, "end.");
                      this.funcReturn();                                    /* ) */                                                                                                                                  fjsInspect.call(this, ")");
                    }
                  ]
                );
              } ).apply( this, this.curFrame.stack ));                      /* () */                                                                                                                                  fjsInspect.call(this, "()");
              this.curFrame.stack = [];
              this.funcReturn();                                            /* ) */                                                                                                                                  fjsInspect.call(this, ")");
            }
          }
        }
      ]
    );
