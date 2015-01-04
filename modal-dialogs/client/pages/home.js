var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    events: {
        'click [data-hook=alert]': 'handleAlertClick'
    },
    handleAlertClick: function(e) {
        e.preventDefault();
        window.app.view.showMessageDialog('Important message', 'This is a place where error messages or other "alert" kinds of text can be displayed.');
    }
});
