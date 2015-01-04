var AmpersandView = require('ampersand-view');
var vdomMixin = require('ampersand-virtual-dom-mixin');
var templates = require('../templates');

module.exports = AmpersandView.extend(vdomMixin, {
  template: templates.main,

  bindings: {
    "model.name": {
      type: 'text',
      hook: 'name'
    },

    "model.age": {
      type: 'text',
      hook: 'age'
    },

    "model.message": {
      type: 'text',
      hook: 'message'
    }

  },

  initialize: function () {
    //this.on('change', this.render);
    this.on('change', this.onChange);
  },

  onChange: function () {
    console.log('onchange');
    this.render();
  }
});
