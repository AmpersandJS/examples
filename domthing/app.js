var AmpersandView = require('ampersand-view');
var AmpersandState = require('ampersand-state');


/******* Models *******/
var Person = AmpersandState.extend({
    props: {
        name: 'string',
        age: 'number'
    }
});


/******* Views *******/

// Create a baseview with the mixin mixed-in
var domthingMixin = require('ampersand-domthing-mixin');
var BaseView = AmpersandView.extend(domthingMixin);

var PersonView = BaseView.extend({
    template: require('./templates/person.dom')
});


/******* App *******/

document.addEventListener('DOMContentLoaded', function () {
    //make a model
    var person = new Person({
        name: 'Philip',
        age: 1
    });

    //make a view
    var view = new PersonView({ model: person });
    view.render();

    //render it
    document.body.appendChild(view.el);

    //Update the model and watch it change, no bindings needed
    setInterval(function () {
        person.age++;
    }, 500);
});
