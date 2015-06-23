var Collection = require('ampersand-rest-collection');
var App = require('ampersand-app');

module.exports = Collection.extend({
  ajaxConfig: function(){
    return {
      headers: {
        'Access-Token': App.me.token,
        'Access-User': App.me.id
      }
    }
  }
});