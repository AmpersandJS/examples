var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['string'],
        firstName: ['string', true, ''],
        lastName: ['string', true, ''],
        username: ['string']
    },
    session: {
        accountStatus: ['string', true, 'signedout']
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        initials: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
            }
        }
    },

    initialize: function() {
        this.subscribeToHoodieEvents();
        window.hoodie.account.authenticate().then(this.handleUserAuthenticated.bind(this), this.handleUserUnauthenticated.bind(this));
    },

    subscribeToHoodieEvents : function() {
        window.hoodie.account.on('signup changeusername signin reauthenticated', this.handleUserAuthenticated.bind(this));
        window.hoodie.account.on('signout', this.handleUserUnauthenticated.bind(this));
        window.hoodie.on('account:error:unauthenticated remote:error:unauthenticated', this.handleUserAuthenticationError.bind(this));
    },

    handleUserAuthenticated: function(username) {
        this.accountStatus = 'signedin';
        this.firstName = username;
    },

    handleUserUnauthenticated: function() {
        if (window.hoodie.account.username) {
            return this.handleUserAuthenticationError();
        }
        this.accountStatus = 'signedout';
    },

    handleUserAuthenticationError: function() {
        this.firstName = window.hoodie.account.username;
        this.accountStatus = 'error';
    }
});
