var View = require("ampersand-view");


module.exports = View.extend({
    closeable: true,
    closeFromModalBorder: function (e) {
        if (e.target === this.el && this.closeable) {
            this.cancelDialog();
        }
    },
    cancelDialog: function () {
        this.closeDialog(true);
    },
    closeDialog: function (failure, successData) {
        this.trigger("dialog:closed", failure, successData);
    }
});