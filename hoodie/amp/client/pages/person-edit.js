/*global app, alert*/
var PageView = require('ampersand-view');
var PersonForm = require('../forms/person');


module.exports = PageView.extend({
    pageTitle: 'edit person',
    initialize: function (spec) {
        var self = this;
        this.template = app.clientHtml['pages.personEdit'];
        app.people.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('could not find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    subviews: {
        form: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: 'form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var model = this.model;
                return new PersonForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        model.save(data, {
                            wait: true,
                            success: function () {
                                app.navigate('/collections');
                            }
                        });
                    }
                });
            }
        }
    }
});
