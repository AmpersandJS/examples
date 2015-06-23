# JSON Web Tokens

This is an example application showing how JWT's could be used with Ampersand. It uses the auto generated amp app and jwt-simple. The basic idea behind the example is to show the following:

1. Generate a JWT server side
2. Attach the token to a session property on an ampersand-model
3. Build a base model and base collection with a modified ajaxConfig to attach the token to the request using a header
4. Use express middleware to validate the token on each request to the API.

There is plenty of comments explaining what the code is doing. The most notable changes occur in:

1. server.js - create the JWT in a login function, validate the JWT in a middleware function
2. app.js - check for the existence of the token. make a request using the token.
3. baseModel.js and baseCollection.js - modified the ajaxConfig to attach the token to a header on each request.

## How to run it

1. download/install [node.js](http://nodejs.org/)
1. cd to jwt folder
1. install dependencies: `npm install`
1. run it: `npm start`
1. open http://localhost:3000 in a browser

## How it's structured

See docs: http://ampersandjs.com/
Curated modules: http://tools.ampersandjs.com/

## Credits

Built by folks at [&yet](http://andyet.com).

## Want a deeper understanding?

Get the book: http://humanjavascript.com
