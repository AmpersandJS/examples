var Model = require('ampersand-model');
var App = require('ampersand-app');

module.exports = Model.extend({
  ajaxConfig: function(){
    return {
      headers: {
        'Access-Token': App.me.token,
        'Access-User': App.me.id
      }
    }
  }
});