var BaseDialog = require('./base-dialog');
var templates = require('../../templates');


module.exports = BaseDialog.extend({
    pageTitle: 'more info',
    template: templates.views.dialogs.info,
    events: {"click .modal-close, [data-hook~=close]": "cancelDialog"}
});
