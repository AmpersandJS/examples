/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');


module.exports = Router.extend({
    routes: {
        '': 'home',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
