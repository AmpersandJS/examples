/*global app*/
var PageView = require('./base');
var PersonForm = require('../forms/person');

module.exports = PageView.extend({
  pageTitle: 'add person',
  template: require('../../templates/pages/personAdd.hbs'),
  subviews: {
    form: {
      container: 'form',
      prepareView: function (el) {
        return new PersonForm({
          el: el,
          submitCallback: function (data) {
            app.people.create(data, {
              wait: true,
              success: function () {
                app.navigate('/collections');
                app.people.fetch();
              }
            });
          }
        });
      }
    }
  }
});
