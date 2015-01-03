var BaseDialog = require("./base-dialog");
var templates = require('../../templates');


module.exports = BaseDialog.extend({
    template: templates.views.dialogs.message,
    props: {
        messageTitle: ['string', false, 'Warning'],
        message: 'string'
    },
    bindings: {
        'messageTitle': {
            type: 'text',
            hook: 'message-title'
        },
        'message': {
            type: 'text',
            hook: 'message-contents'
        }

    },
    closeable: true,
    events: {"click .modal-close, [data-hook~=close]": "cancelDialog"}
});
