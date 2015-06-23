var app = require('ampersand-app');
var _ = require('lodash');
var config = require('clientconfig');
var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var People = require('./models/persons');
var domReady = require('domready');
var bind = require('amp-bind');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

// Extends our main app singleton
// We are using window.sessionStorage to ferry the token to this page. You could use a cookie just as easily. We init our me object with the token pointing to the sessionStorage location.
app.extend({
  me: new Me({
    id: window.sessionStorage.user,
    token: window.sessionStorage.token
  }),
  people: new People(),
  router: new Router(),
  // This is where it all starts
  init: function() {
    // Check to see if the token has been attached to our me object. If it is not found then force a redirect to the login page. Make sure to return so the page does not try to render while the
    // browser is redirecting.
    if (this.me.token == null) {
      window.location = "/login.html";
      return;
    }

    // If we do find the token in the sessionStorage then we need to delete it out since sessionStorage is not safest place to keep information.
    delete window.sessionStorage.token;
    delete window.sessionStorage.user;

    // Now that the token is available we need to try and make a request to see if it's still valid. Since we store the user's id in the token we can request that user's information.
    this.me.fetch({
      success: bind(function(){
        // Create and attach our main view
        this.mainView = new MainView({
          model: this.me,
          el: document.body
        });

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({pushState: true});
      }, this),
      error: bind(function(){
        // If there is an error fetching the user information then we force the user to login page to regen the token
        this.logout();
      }, this)
    })
  },
  // This is a helper for navigating around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url pathname for example: "/costello/settings"
  navigate: function(page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {
      trigger: true
    });
  },
  logout: function(){
    // This is where you would delete any kind of cookies or sessionStorage that you app holds to auto-login users.
    window.location = '/login.html';
  }
});

// run it on domReady
domReady(_.bind(app.init, app));
