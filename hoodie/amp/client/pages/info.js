var PageView = require('ampersand-view');


module.exports = PageView.extend({
    pageTitle: 'more info',
    initialize: function (spec) {
        this.template = app.clientHtml['pages.info'];
    }
});
