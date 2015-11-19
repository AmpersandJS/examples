import app from 'ampersand-app';
import _ from 'lodash';
import config from 'clientconfig';
import Router from './router';
import MainView from './views/main';
import Me from './models/me';
import People from './models/persons';
import domReady from 'domready';

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

// Extends our main app singleton
app.extend({
  me: new Me(),
  people: new People(),
  router: new Router(),
  // This is where it all starts
  init() {
    // Create and attach our main view
    this.mainView = new MainView({
      model: this.me,
      el: document.body
    });

    // this kicks off our backbutton tracking (browser history)
    // and will cause the first matching handler in the router
    // to fire.
    this.router.history.start({
      pushState: true
    });
  },
  // This is a helper for navigating around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url pathname for example: "/costello/settings"
  navigate(page) {
    const url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {
      trigger: true
    });
  }
});

// run it on domReady
domReady(_.bind(app.init, app));
