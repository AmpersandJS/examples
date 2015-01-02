/*global app*/
var PageView = require('ampersand-view');
var PersonForm = require('../forms/person');


module.exports = PageView.extend({
    pageTitle: 'add person',
    initialize: function (spec) {
        this.template = app.clientHtml['pages.personAdd'];
    },
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
