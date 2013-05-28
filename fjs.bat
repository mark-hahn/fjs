
call coffee -c fjs.coffee
call coffee -c fjs-primitives.coffee
call coffee -c fjs-runtime.coffee

call node fjs test

call node test
