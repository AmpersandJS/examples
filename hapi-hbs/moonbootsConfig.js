var path     = require('path');

var config   = require('getconfig');
var stylizer = require('stylizer');

var appDir   = path.join(__dirname, '/client');
var cssDir   = path.join(__dirname, '/public/css');

module.exports = {
  appPath: '/{p*}',
  moonboots: {
    jsFileName: 'hapi-handlebars',
    cssFileName: 'hapi-handlebars',
    main: path.join(appDir, '/app.js'),
    developmentMode: config.isDev,
    libraries: [/* Client-Side libraries (non-common.js) */],
    stylesheets: [
      path.join(cssDir, '/bootstrap.css'),
      path.join(cssDir, '/app.css')
    ],
    browserify: {
      debug: false,
      transforms: ['browserify-handlebars']
    },
    beforeBuildCSS: function (done) {
      // We only want to do this in dev mode. If it's not in dev mode, this
      // function will only be run once.
      if (!config.isDev) {
        done();
        return;
      }
      stylizer({
        infile      : path.join(cssDir, '/app.styl'),
        outfile     : path.join(cssDir, '/app.css'),
        development : true,
        watch       : path.join(cssDir, '/**/*.styl')
      }, done);
    }
  }
};
