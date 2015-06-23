/* global console */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');

// JWT setup
var jwt = require('jwt-simple');
var jwtSecret = 'abcdefghijklmnopqrstuvwxyz1234567890';

var app = express();

// a little helper for fixing paths for various environments
var fixPath = function(pathString) {
  return path.resolve(path.normalize(pathString));
};

// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
  app.use(serveStatic(fixPath('test/assets')));
  app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
  app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');

// -----------------
// JWT validation middleware. We want to validate every request that comes to our api.
// -----------------
app.use('/api*', function(req, res, next){
  var token = req.headers['access-token'];
  var user = req.headers['access-user'];

  var decoded = jwt.decode(token, jwtSecret);
  if(decoded) {
    // You can do some sort of lookup here to validate the request such as searching a redis store for a certain key in the payload.
    // Here we are just making sure that user key in the payload matches the access-user header and that the token is not expired.
    if (decoded.user !== user * 1) {
      res.status(401).send();
      return;
    }

    if (decoded.exp <= Date.now()) {
      res.status(401).send();
      return;
    }

    // The token passed our validation so we call next()
    next();
  }
  else{
    // If we get here then the token is invalid.
    // This is where, depending on your setup, you can send a 401 back or force the request to a login page.
    res.status(401).send();
  }
});

// -----------------
// Set up our little demo API
// -----------------
var api = require('./fakeApi');
app.get('/api/people', api.list);
app.get('/api/people/:id', api.get);
app.delete('/api/people/:id', api.delete);
app.put('/api/people/:id', api.update);
app.post('/api/people', api.add);

// This is our simple login function. This should be more complicated but for the sake of this example we are just going to use static variables
// and create the JWT here.
app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  if(username === 'admin' && password === 'root'){
    //This is where we would create the JWT payload. You can put whatever you want in the token. Just be mindful of size and type of information. No passwords ;)
    var exp = new Date();
    var data = {
      user: 7,
      created: Date.now(),
      exp: exp.setDate(exp.getDate() + 1)
    };

    var token = jwt.encode(data, jwtSecret, 'HS256');

    res.send({
      user: 7,
      token: token
    });
  }
  else{
    res.status(401).send();
  }
});

// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
  app.get('/test*', semiStatic({
    folderPath: fixPath('test'),
    root: '/test'
  }));
}

// -----------------
// Set our client config cookie
// -----------------
app.use(function(req, res, next) {
  res.cookie('config', JSON.stringify(config.client));
  next();
});

// -----------------
// Configure Moonboots to serve our client application
// -----------------
new Moonboots({
  moonboots: {
    jsFileName: 'json-web-tokens',
    cssFileName: 'json-web-tokens',
    main: fixPath('client/app.js'),
    developmentMode: config.isDev,
    libraries: [],
    stylesheets: [
      fixPath('stylesheets/bootstrap.css'),
      fixPath('stylesheets/app.css')
    ],
    browserify: {
      debug: config.isDev
    },
    beforeBuildJS: function() {
      // This re-builds our template files from jade each time the app's main
      // js file is requested. Which means you can seamlessly change jade and
      // refresh in your browser to get new templates.
      if (config.isDev) {
        templatizer(fixPath('templates'), fixPath('client/templates.js'));
      }
    },
    beforeBuildCSS: function(done) {
      // This re-builds css from stylus each time the app's main
      // css file is requested. Which means you can seamlessly change stylus files
      // and see new styles on refresh.
      if (config.isDev) {
        stylizer({
          infile: fixPath('stylesheets/app.styl'),
          outfile: fixPath('stylesheets/app.css'),
          development: true
        }, done);
      } else {
        done();
      }
    }
  },
  server: app
});

// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log('JSON Web Tokens is running at: http://localhost:' + config.http.port + ' Yep. That\'s pretty awesome.');
