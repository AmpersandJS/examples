var PageView = require('./base');
var templates = require('../templates');
var app = require('ampersand-app');

module.exports = PageView.extend({
  pageTitle: 'home',
  template: templates.pages.home,
  props: {
    token: 'string'
  },
  bindings: {
    token: {
      type: 'text',
      hook: 'loginToken'
    }
  },
  initialize: function(){
    this.token = app.me.token;
  }
});
