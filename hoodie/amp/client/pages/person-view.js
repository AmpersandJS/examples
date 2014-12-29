/*global app, alert*/
var PageView = require('ampersand-view');
var PersonForm = require('../forms/person');


module.exports = PageView.extend({
    pageTitle: 'view person',
    bindings: {
        'model.fullName': {
            hook: 'name'
        },
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    },
    events: {
        'click [data-hook~=delete]': 'handleDeleteClick'
    },
    initialize: function (spec) {
        var self = this;
        this.template = app.clientHtml['pages.personView'];
        app.people.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('could not find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    handleDeleteClick: function () {
        this.model.destroy({success: function () {
            app.navigate('collections');
        }});
    }
});
