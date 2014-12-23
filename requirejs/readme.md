# Using Ampersand with AMD and Require.js

Perhaps you have a project that uses Backbone and Require.js.  You've just found out about Ampersand.js and would love to use it, but it's all based on common.js and npm.  How do you get all those cool ampersand libraries into your project without doing a full switch to common.js and browserify (or webpack)?  

This example will show you one way to bring in ampersand modules into your project relatively easily.  There are other ways, notably the require.js [packages](http://requirejs.org/docs/api.html#packages) syntax, but I've found this does not work with dependencies very well.  

## Installation:
If you don't have bower installed yet:  `npm install -g bower`
Then install your dependencies:
`bower install`
`npm install`

Run the build:
`gulp bundleAmpersand`

Serve your project:
`node server.js`

Open your browser to [localhost:8000](http://localhost:8000)

## highlights
The basic premise is you create a `ampersand-proto.js` file that contains which ampersand projects you'd like to use in common.js format.  (Note you can use this method to do almost any common.js package in your require.js build too!)
```javascript
module.exports = {
	State : require('ampersand-state'),
	View : require('ampersand-view')
	// and so on... 
};
```

We then take this file and run it through browserify using gulp.  I'm using gulp here as a build tool, but you can easily duplicate this for grunt using [`grunt-browserify`](https://github.com/jmreidy/grunt-browserify). 
```javascript
gulp.task('bundleAmpersand', function() {
    return gulp.src('./scripts/ampersand-proto.js')
        .pipe(browserify({
            debug : true,
            standalone : 'ampersand', 
            external : ["jquery"]  // any external dependencies you don't want in the bundle
        }))
        .pipe(rename('ampersand-bundle.js'))
        .pipe(gulp.dest('./scripts'));
});
```
The `standalone` flag tells browserify to create the bundle in a way that require.js can understand.  

`external` allows you to exclude some libraries from bundling.  Some ampersand projects will include dependencies you already have imported in your project, like `underscore` or `jquery`.  To save space, you can have browserify ignore those depdendencies on bundling.  In my experience, when the bundle `require`s jquery, require.js will serve it up just fine (though you may need to shim it in your require.js config).  

Next, update your require.js config to recognize ampersand and you're good to go.  See `main.js`:
```javascript
require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        ampersand : './ampersand-bundle'
    }
});
require([
	'jquery',
    'backbone',
    'ampersand'
], function ($, Backbone, Ampersand) {
    Backbone.history.start();
    var Person = Ampersand.State.extend({
    	props : {
    		name : 'string'
    	},
    	derived : {
    		greeting : {
    			deps : ['name'],    		
    			fn : function(){
    				return 'Hello ' +this.name;
    			}
    		}
    	}
    });
    // etc
```
