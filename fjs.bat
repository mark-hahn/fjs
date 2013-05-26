
rem  /github/fjs/fjs.bat

cd /github/fjs

call coffee fjs.coffee test
call coffee -c fjs-primitives.coffee
call coffee -c fjs-runtime.coffee
call node test.js
