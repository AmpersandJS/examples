var View = require('ampersand-view');


module.exports = View.extend({
    initialize: function (spec) {
        this.template = app.clientHtml['includes.hoodieAccountbar'];
    },
    bindings: {
        'model.firstName': '.hoodie-username',
        'model.accountStatus': {
            type: 'switch',
            cases: {
                'signedout': '.hoodie-account-signedout',
                'signedin': '.hoodie-account-signedin',
                'error': '.hoodie-account-error'
            }
        }
    },
    events: {
        'click [data-hoodie-action=signout]': 'handleSignoutClick',
        'click [data-hoodie-action=signup]': 'handleSignupClick',
        'click [data-hoodie-action=signin]': 'handleSigninClick'
    },
    handleSignoutClick: function () {
        window.hoodie.account.signOut();
    },
    handleSigninClick: function () {
        var promise = window.hoodie.account.signIn('mike', 'mike');
    },
    handleSignupClick: function () {
        var promise = window.hoodie.account.signUp('mike', 'mike');
    }
});
