var domReady = require('domready');
var Person = require('./models/person');
var MainView = require('./views/main');

module.exports = {

  blastoff: function () {

    domReady(function () {
      var person = new Person({
        name: 'muraken720',
        age: 1
      });

      var view = new MainView({
        model: person
      });

      view.render();

      document.body.appendChild(view.el);

      setInterval(function () {
        person.age++;
      }, 500);
    });
  }
};

module.exports.blastoff();
