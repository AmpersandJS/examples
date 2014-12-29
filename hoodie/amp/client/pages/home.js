var PageView = require('ampersand-view');


module.exports = PageView.extend({
    pageTitle: 'home',
    initialize: function (spec) {
        this.template = app.clientHtml['pages.home'];
    }
});
