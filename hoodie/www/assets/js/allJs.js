(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global app, me, $*/
var _ = require('underscore');
//var logger = require('andlog');
//var config = require('clientconfig');

var Router = require('./router');
var MainView = require('./views/main');
var Me = require('./models/me');
var People = require('./models/persons');
var domReady = require('domready');
var clientHtml = require('./clientHtml.js');
//var Hoodie = require('hoodie');


module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        // initialize Hoodie
        window.hoodie  = new Hoodie();

        // create our global 'me' object and an empty collection for our people models.
        window.me = new Me();
        this.people = new People();

        //load all the html
        this.clientHtml = clientHtml;

        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                model: me,
                el: document.body
            });

            // ...and render it
            mainView.render();

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.blastoff();

},{"./clientHtml.js":2,"./models/me":4,"./models/persons":6,"./router":12,"./views/main":14,"domready":95,"underscore":102}],2:[function(require,module,exports){
var clientHtml = {};

clientHtml["body"] = "<body>\n" +
   "<nav class=\"navbar navbar-default\">\n" +
   "  <div class=\"container-fluid\">\n" +
   "    <div class=\"navbar-header\"><a href=\"/\" class=\"navbar-brand\">Ampersand-Hoodie Example App</a></div>\n" +
   "    <ul class=\"nav navbar-nav\">\n" +
   "      <li><a href=\"/\">Home</a></li>\n" +
   "      <li><a href=\"/collections\">Collection demo</a></li>\n" +
   "    </ul>\n" +
   "    <div data-hook=\"hoodie-accountbar\"></div>\n" +
   "\n" +
   "  </div>\n" +
   "</nav>\n" +
   "<div class=\"container\">\n" +
   "  <main data-hook=\"page-container\"></main>\n" +
   "</div>\n" +
   "</body>";

clientHtml["head"] = "<meta content=\"width=device-width,initial-scale=1.0,maximum-scale=1.0\" name=\"viewport\">\n" +
   "<meta content=\"yes\"  name=\"apple-mobile-web-app-capable\">";

clientHtml["includes.formInput"] = "<div class=\"form-group\"><label data-hook=\"label\"></label>\n" +
   "  <input class=\"form-control\"/>\n" +
   "  <div data-hook=\"message-container\">\n" +
   "    <div data-hook=\"message-text\" class=\"alert alert-danger\"></div>\n" +
   "  </div>\n" +
   "</div>\n" +
   "";

clientHtml["includes.hoodieAccountbar"] = "<div class=\"hoodie-accountbar\">\n" +
   "\n" +
   "  <div class=\"hoodie-account-signedout\">\n" +
   "            <span class=\"btn-group\">\n" +
   "              <button class=\"btn btn-small btn-primary\" data-hoodie-action=\"signup\">Sign Up</button>\n" +
   "              <button class=\"btn btn-small btn-primary\" data-hoodie-action=\"signin\">Sign In</button>\n" +
   "            </span>\n" +
   "  </div><!-- /.hoodie-account-signedout -->\n" +
   "\n" +
   "  <div class=\"hoodie-account-signedin\">\n" +
   "    Hello,\n" +
   "    <span class=\"hoodie-username\"><!-- usern name will be filled in here --></span>\n" +
   "            <span class=\"btn-group\">\n" +
   "              <button class=\"btn btn-small btn-primary\" data-hoodie-action=\"signout\">Sign Out</button>\n" +
   "            </span>\n" +
   "  </div><!-- /.hoodie-account-signedin -->\n" +
   "\n" +
   "  <div class=\"hoodie-account-error\">\n" +
   "    Hello,\n" +
   "    <span class=\"hoodie-username\"><!-- username will be filled in here --></span>.\n" +
   "            <span class=\"btn-group\">\n" +
   "              <button class=\"btn btn-small btn-primary\" data-hoodie-action=\"signout\">Sign Out</button>\n" +
   "              <button class=\"btn btn-small btn-danger\" data-hoodie-action=\"signin\">Authentication error: Sign in again</button>\n" +
   "            </span>\n" +
   "  </div><!-- /.hoodie-account-error -->\n" +
   "</div>\n" +
   "";

clientHtml["includes.person"] = "<li class=\"person list-group-item\">\n" +
   "  <img data-hook=\"avatar\" width=\"40\" height=\"40\"/>\n" +
   "  <a data-hook=\"name\"></a>\n" +
   "  <span class=\"btn-group pull-right\">\n" +
   "    <a data-hook=\"action-edit\" class=\"btn btn-default\">edit </a>\n" +
   "    <a href=\"#\" data-hook=\"action-delete\" class=\"btn btn-danger\">delete</a>\n" +
   "  </span>\n" +
   "</li>";

clientHtml["pages.collectionDemo"] = "<section class=\"page pageOne\"><h2>Collection demo</h2>\n" +
   "\n" +
   "  <p>Intelligently rendering collections can be a bit tricky. </p>\n" +
   "\n" +
   "  <p><a href=\"https://github.com/ampersandjs/ampersand-view\">ampersand-view's</a> <code>renderCollection()</code> method\n" +
   "    makes it simple.</p>\n" +
   "\n" +
   "  <p>The only code required to manage the collection is:</p><pre><code>this.renderCollection(\n" +
   "    this.collection,\n" +
   "    PersonView,\n" +
   "    this.queryByHook('people-list')\n" +
   "    );</code></pre>\n" +
   "  <h3>People container:</h3>\n" +
   "  <ul data-hook=\"people-list\" class=\"list-group\"></ul>\n" +
   "\n" +
   "  <table data-hook=\"people-table\"> </table>\n" +
   "  <p>Try it by clicking the buttons</p>\n" +
   "\n" +
   "  <div class=\"buttons btn-group\">\n" +
   "    <button data-hook=\"reset\" class=\"btn btn-default\">.reset()</button>\n" +
   "    <button data-hook=\"fetch\" class=\"btn btn-default\">.fetch()</button>\n" +
   "    <button data-hook=\"shuffle\" class=\"btn btn-default\">.shuffle()</button>\n" +
   "    <a href=\"/person/add\" class=\"btn btn-default\">Add Person</a></div>\n" +
   "  <p>Events are always managed so you don't get any leaks.</p></section>";

clientHtml["pages.home"] = "<section class=\"page home\"><h2>Welcome to the Ampersand-Hoodie example app</h2>\n" +
   "\n" +
   "  <p>Signup and signin are currently hard coded to \"mike,mike\".  Make sure you sign up before trying to sign in.</p>\n" +
   "\n" +
   "  <p>You can play with adding and editing people on the \"Collection demo\" page.</p>\n" +
   "\n" +
   "</section>";

clientHtml["pages.personAdd"] = "<section class=\"page add-person\"><h2>Add Person</h2>\n" +
   "\n" +
   "  <p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p>\n" +
   "\n" +
   "  <p>The same form-view is used for both editing and creating new users.</p>\n" +
   "\n" +
   "  <form data-hook=\"person-form\">\n" +
   "    <fieldset data-hook=\"field-container\"></fieldset>\n" +
   "    <div class=\"buttons\">\n" +
   "      <button data-hook=\"reset\" type=\"submit\" class=\"btn\">Submit</button>\n" +
   "    </div>\n" +
   "  </form>\n" +
   "</section>";

clientHtml["pages.personEdit"] = "<section class=\"page edit-person\"><h2>Edit Person</h2>\n" +
   "\n" +
   "  <p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p>\n" +
   "\n" +
   "  <p>The same form-view is used for both editing and creating new users.</p>\n" +
   "\n" +
   "  <form data-hook=\"person-form\">\n" +
   "    <fieldset data-hook=\"field-container\"></fieldset>\n" +
   "    <div class=\"buttons\">\n" +
   "      <button data-hook=\"reset\" type=\"submit\" class=\"btn\">Submit</button>\n" +
   "    </div>\n" +
   "  </form>\n" +
   "</section>";

clientHtml["pages.personView"] = "<section class=\"page view-person\">\n" +
   "  <h2 data-hook=\"name\"></h2><img data-hook=\"avatar\" width=\"80\" height=\"80\"/>\n" +
   "\n" +
   "  <div class=\"buttons\"><a data-hook=\"edit\" class=\"btn\">Edit</a>\n" +
   "    <button data-hook=\"delete\" class=\"btn\">Delete</button>\n" +
   "  </div>\n" +
   "</section>";
module.exports = clientHtml;
},{}],3:[function(require,module,exports){
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'First Name',
                name: 'firstName',
                value: this.model && this.model.firstName,
                placeholder: 'First Name',
                parent: this,
                template: app.clientHtml['includes.formInput']
            }),
            new InputView({
                label: 'Last Name',
                name: 'lastName',
                value: this.model && this.model.lastName,
                placeholder: 'Last Name',
                parent: this,
                template: app.clientHtml['includes.formInput']
            }),
            new InputView({
                label: 'Coolness Factor',
                name: 'coolnessFactor',
                value: this.model && this.model.coolnessFactor,
                type: 'number',
                placeholder: '8',
                parent: this,
                template: app.clientHtml['includes.formInput'],
                tests: [
                    function (val) {
                        if (val < 0 || val > 11) return "Must be between 0 and 11";
                    },
                    function (val) {
                        if (!/^[0-9]+$/.test(val)) return "Must be a number.";
                    }
                ]
            })
        ];
    }
});

},{"ampersand-form-view":23,"ampersand-input-view":46}],4:[function(require,module,exports){
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

},{"ampersand-model":47}],5:[function(require,module,exports){
var AmpersandModel = require('ampersand-hoodie-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        firstName: ['string', true, ''],
        lastName: ['string', true, ''],
        coolnessFactor: ['number', true, 5]
    },
    session: {
        HOODIE_TYPE: ['string', true, 'person'],
        selected: ['boolean', true, false]
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        avatar: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return 'http://robohash.org/' + encodeURIComponent(this.fullName) + '?size=80x80';
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '/person/' + this.id + '/edit';
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/person/' + this.id;
            }
        }
    }
});

},{"ampersand-hoodie-model":44}],6:[function(require,module,exports){
var Collection = require('ampersand-hoodie-collection');
var Person = require('./person');


module.exports = Collection.extend({
    model: Person,
    HOODIE_TYPE: 'person'
});

},{"./person":5,"ampersand-hoodie-collection":26}],7:[function(require,module,exports){
var PageView = require('ampersand-view');
var PersonView = require('../views/person');


module.exports = PageView.extend({
    pageTitle: 'collection demo',
    initialize: function (spec) {
        this.template = app.clientHtml['pages.collectionDemo'];
        this.subscribeToHoodieEvents();
    },
    events: {
        'click [data-hook~=shuffle]': 'shuffle',
        'click [data-hook~=fetch]': 'fetchCollection',
        'click [data-hook~=reset]': 'resetCollection',
        'click [data-hook~=add]': 'addRandom'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, PersonView, this.queryByHook('people-list'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    },
    shuffle: function () {
        this.collection.comparator = function () {
            return !Math.round(Math.random());
        };
        this.collection.sort();
        delete this.collection.comparator;
        return false;
    },
    addRandom: function () {
        function getRandom(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        var firstNames = 'Joe Harry Larry Sue Bob Rose Angela Tom Merle Joseph Josephine'.split(' ');
        var lastNames = 'Smith Jewel Barker Stephenson Rossum Crockford'.split(' ');

        this.collection.create({
            firstName: firstNames[getRandom(0, firstNames.length - 1)],
            lastName: lastNames[getRandom(0, lastNames.length - 1)],
            coolnessFactor: getRandom(0, 15)
        });
    },
    subscribeToHoodieEvents : function() {
        window.hoodie.account.on('signup changeusername signin reauthenticated', this.fetchCollection.bind(this));
        window.hoodie.account.on('signout', this.fetchCollection.bind(this));
    }
});

},{"../views/person":15,"ampersand-view":74}],8:[function(require,module,exports){
var PageView = require('ampersand-view');


module.exports = PageView.extend({
    pageTitle: 'home',
    initialize: function (spec) {
        this.template = app.clientHtml['pages.home'];
    }
});

},{"ampersand-view":74}],9:[function(require,module,exports){
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

},{"../forms/person":3,"ampersand-view":74}],10:[function(require,module,exports){
/*global app, alert*/
var PageView = require('ampersand-view');
var PersonForm = require('../forms/person');


module.exports = PageView.extend({
    pageTitle: 'edit person',
    initialize: function (spec) {
        var self = this;
        this.template = app.clientHtml['pages.personEdit'];
        app.people.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('could not find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    subviews: {
        form: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: 'form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var model = this.model;
                return new PersonForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        model.save(data, {
                            wait: true,
                            success: function () {
                                app.navigate('/collections');
                            }
                        });
                    }
                });
            }
        }
    }
});

},{"../forms/person":3,"ampersand-view":74}],11:[function(require,module,exports){
/*global app, alert*/
var PageView = require('ampersand-view');
var PersonForm = require('../forms/person');


module.exports = PageView.extend({
    pageTitle: 'view person',
    bindings: {
        'model.fullName': {
            hook: 'name'
        },
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    },
    events: {
        'click [data-hook~=delete]': 'handleDeleteClick'
    },
    initialize: function (spec) {
        var self = this;
        this.template = app.clientHtml['pages.personView'];
        app.people.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('could not find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    handleDeleteClick: function () {
        this.model.destroy({success: function () {
            app.navigate('collections');
        }});
    }
});

},{"../forms/person":3,"ampersand-view":74}],12:[function(require,module,exports){
/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collection-demo');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonViewPage = require('./pages/person-view');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    collectionDemo: function () {
        this.trigger('page', new CollectionDemo({
            model: me,
            collection: app.people
        }));
    },

    personAdd: function () {
        this.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        this.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        this.trigger('page', new PersonViewPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

},{"./pages/collection-demo":7,"./pages/home":8,"./pages/person-add":9,"./pages/person-edit":10,"./pages/person-view":11,"ampersand-router":68}],13:[function(require,module,exports){
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

},{"ampersand-view":74}],14:[function(require,module,exports){
/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var setFavicon = require('favicon-setter');
var HoodieAccountbar = require('./hoodieAccountbar');


module.exports = View.extend({
    initialize: function () {
        this.template = app.clientHtml['body'];
        // this marks the correct nav item selected
        this.listenTo(app.router, 'page', this.handleNewPage);
    },
    events: {
        'click a[href]': 'handleLinkClick'
    },

    render: function () {
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(app.clientHtml['head']));

        // main renderer
        this.renderWithTemplate({me: me});

        this.renderSubview(new HoodieAccountbar({
            model: me
        }), '[data-hook=hoodie-accountbar]');

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || "amp";
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dynamic)
        setFavicon('/images/ampersand.png');
        return this;
    },

    handleNewPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    handleLinkClick: function (e) {
        var aTag = e.target;
        var local = aTag.host === window.location.host;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            app.navigate(aTag.pathname);
        }
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll('.nav a[href]').forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});

},{"./hoodieAccountbar":13,"ampersand-dom":22,"ampersand-view":74,"ampersand-view-switcher":73,"domify":94,"favicon-setter":97,"underscore":102}],15:[function(require,module,exports){
var View = require('ampersand-view');


module.exports = View.extend({
    initialize: function (spec) {
        this.template = app.clientHtml['includes.person'];
    },
    bindings: {
        'model.fullName': '[data-hook~=name]',
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'action-edit',
            name: 'href'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'name',
            name: 'href'
        }
    },
    events: {
        'click [data-hook~=action-delete]': 'handleRemoveClick'
    },
    handleRemoveClick: function () {
        this.model.destroy();
        return false;
    }
});

},{"ampersand-view":74}],16:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-collection-underscore-mixin"] = window.ampersand["ampersand-collection-underscore-mixin"] || [];  window.ampersand["ampersand-collection-underscore-mixin"].push("1.0.3");}
var _ = require('underscore');
var slice = [].slice;
var mixins = {};


// Underscore methods that we want to implement on the Collection.
var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'
];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function (method) {
    if (!_[method]) return;
    mixins[method] = function () {
        var args = slice.call(arguments);
        args.unshift(this.models);
        return _[method].apply(_, args);
    };
});

// Underscore methods that take a property name as an argument.
var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

// Use attributes instead of properties.
_.each(attributeMethods, function (method) {
    if (!_[method]) return;
    mixins[method] = function (value, context) {
        var iterator = _.isFunction(value) ? value : function (model) {
            return model.get ? model.get(value) : model[value];
        };
        return _[method](this.models, iterator, context);
    };
});

// Return models with matching attributes. Useful for simple cases of
// `filter`.
mixins.where = function (attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return this[first ? 'find' : 'filter'](function (model) {
        var value;
        for (var key in attrs) {
            value = model.get ? model.get(key) : model[key];
            if (attrs[key] !== value) return false;
        }
        return true;
    });
};

// Return the first model with matching attributes. Useful for simple cases
// of `find`.
mixins.findWhere = function (attrs) {
    return this.where(attrs, true);
};

// Plucks an attribute from each model in the collection.
mixins.pluck = function (attr) {
    return _.invoke(this.models, 'get', attr);
};

module.exports = mixins;

},{"underscore":102}],17:[function(require,module,exports){
var BackboneEvents = require('backbone-events-standalone');
var classExtend = require('ampersand-class-extend');
var isArray = require('is-array');
var extend = require('extend-object');
var slice = [].slice;


function Collection(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator) this.comparator = options.comparator;
    if (options.parent) this.parent = options.parent;
    if (!this.mainIndex) {
        var idAttribute = this.model && this.model.prototype && this.model.prototype.idAttribute;
        this.mainIndex = idAttribute || 'id';
    }
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, extend({silent: true}, options));
}

extend(Collection.prototype, BackboneEvents, {
    initialize: function () {},

    indexes: [],

    isModel: function (model) {
        return this.model && model instanceof this.model;
    },

    add: function (models, options) {
        return this.set(models, extend({merge: false, add: true, remove: false}, options));
    },

    // overridable parse method
    parse: function (res, options) {
        return res;
    },

    // overridable serialize method
    serialize: function () {
        return this.map(function (model) {
            if (model.serialize) {
                return model.serialize();
            } else {
                var out = {};
                extend(out, model);
                delete out.collection;
                return out;
            }
        });
    },

    toJSON: function () {
        return this.serialize();
    },

    set: function (models, options) {
        options = extend({add: true, remove: true, merge: true}, options);
        if (options.parse) models = this.parse(models, options);
        var singular = !isArray(models);
        models = singular ? (models ? [models] : []) : models.slice();
        var id, model, attrs, existing, sort, i, length;
        var at = options.at;
        var sortable = this.comparator && (at == null) && options.sort !== false;
        var sortAttr = ('string' === typeof this.comparator) ? this.comparator : null;
        var toAdd = [], toRemove = [], modelMap = {};
        var add = options.add, merge = options.merge, remove = options.remove;
        var order = !sortable && add && remove ? [] : false;
        var targetProto = this.model && this.model.prototype || Object.prototype;

        // Turn bare objects into model references, and prevent invalid models
        // from being added.
        for (i = 0, length = models.length; i < length; i++) {
            attrs = models[i] || {};
            if (this.isModel(attrs)) {
                id = model = attrs;
            } else if (targetProto.generateId) {
                id = targetProto.generateId(attrs);
            } else {
                id = attrs[targetProto.idAttribute || this.mainIndex];
            }

            // If a duplicate is found, prevent it from being added and
            // optionally merge it into the existing model.
            if (existing = this.get(id)) {
                if (remove) modelMap[existing.cid || existing[this.mainIndex]] = true;
                if (merge) {
                    attrs = attrs === model ? model.attributes : attrs;
                    if (options.parse) attrs = existing.parse(attrs, options);
                    // if this is model
                    if (existing.set) {
                        existing.set(attrs, options);
                        if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
                    } else {
                        // if not just update the properties
                        extend(existing, attrs);
                    }
                }
                models[i] = existing;

            // If this is a new, valid model, push it to the `toAdd` list.
            } else if (add) {
                model = models[i] = this._prepareModel(attrs, options);
                if (!model) continue;
                toAdd.push(model);
                this._addReference(model, options);
            }

            // Do not add multiple models with the same `id`.
            model = existing || model;
            if (!model) continue;
            if (order && ((model.isNew && model.isNew() || !model[this.mainIndex]) || !modelMap[model.cid || model[this.mainIndex]])) order.push(model);
            modelMap[model[this.mainIndex]] = true;
        }

        // Remove nonexistent models if appropriate.
        if (remove) {
            for (i = 0, length = this.length; i < length; i++) {
                model = this.models[i];
                if (!modelMap[model.cid || model[this.mainIndex]]) toRemove.push(model);
            }
            if (toRemove.length) this.remove(toRemove, options);
        }

        // See if sorting is needed, update `length` and splice in new models.
        if (toAdd.length || (order && order.length)) {
            if (sortable) sort = true;
            if (at != null) {
                for (i = 0, length = toAdd.length; i < length; i++) {
                    this.models.splice(at + i, 0, toAdd[i]);
                }
            } else {
                var orderedModels = order || toAdd;
                for (i = 0, length = orderedModels.length; i < length; i++) {
                    this.models.push(orderedModels[i]);
                }
            }
        }

        // Silently sort the collection if appropriate.
        if (sort) this.sort({silent: true});

        // Unless silenced, it's time to fire all appropriate add/sort events.
        if (!options.silent) {
            for (i = 0, length = toAdd.length; i < length; i++) {
                model = toAdd[i];
                if (model.trigger) {
                    model.trigger('add', model, this, options);
                } else {
                    this.trigger('add', model, this, options);
                }
            }
            if (sort || (order && order.length)) this.trigger('sort', this, options);
        }

        // Return the added (or merged) model (or models).
        return singular ? models[0] : models;
    },

    get: function (query, indexName) {
        if (!query) return;
        var index = this._indexes[indexName || this.mainIndex];
        return index[query] || index[query[this.mainIndex]] || this._indexes.cid[query.cid];
    },

    // Get the model at the given index.
    at: function (index) {
        return this.models[index];
    },

    remove: function (models, options) {
        var singular = !isArray(models);
        var i, length, model, index;

        models = singular ? [models] : slice.call(models);
        options || (options = {});
        for (i = 0, length = models.length; i < length; i++) {
            model = models[i] = this.get(models[i]);
            if (!model) continue;
            this._deIndex(model);
            index = this.models.indexOf(model);
            this.models.splice(index, 1);
            if (!options.silent) {
                options.index = index;
                if (model.trigger) {
                    model.trigger('remove', model, this, options);
                } else {
                    this.trigger('remove', model, this, options);
                }
            }
            this._removeReference(model, options);
        }
        return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function (models, options) {
        options || (options = {});
        for (var i = 0, length = this.models.length; i < length; i++) {
            this._removeReference(this.models[i], options);
        }
        options.previousModels = this.models;
        this._reset();
        models = this.add(models, extend({silent: true}, options));
        if (!options.silent) this.trigger('reset', this, options);
        return models;
    },

    sort: function (options) {
        var self = this;
        if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
        options || (options = {});

        if (typeof this.comparator === 'string') {
            this.models.sort(function (left, right) {
                if (left.get) {
                    left = left.get(self.comparator);
                    right = right.get(self.comparator);
                } else {
                    left = left[self.comparator];
                    right = right[self.comparator];
                }
                if (left > right || left === void 0) return 1;
                if (left < right || right === void 0) return -1;
                return 0;
            });
        } else if (this.comparator.length === 1) {
            this.models.sort(function (left, right) {
                left = self.comparator(left);
                right = self.comparator(right);
                if (left > right || left === void 0) return 1;
                if (left < right || right === void 0) return -1;
                return 0;
            });
        } else {
            this.models.sort(this.comparator.bind(this));
        }

        if (!options.silent) this.trigger('sort', this, options);
        return this;
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function () {
        var list = this.indexes || [];
        var i = 0;
        list.push(this.mainIndex);
        list.push('cid');
        var l = list.length;
        this.models = [];
        this._indexes = {};
        for (; i < l; i++) {
            this._indexes[list[i]] = {};
        }
    },

    _prepareModel: function (attrs, options) {
        // if we haven't defined a constructor, skip this
        if (!this.model) return attrs;

        if (this.isModel(attrs)) {
            if (!attrs.collection) attrs.collection = this;
            return attrs;
        } else {
            options = options ? extend({}, options) : {};
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model.validationError) return model;
            this.trigger('invalid', this, model.validationError, options);
            return false;
        }
    },

    _deIndex: function (model) {
        for (var name in this._indexes) {
            delete this._indexes[name][model[name] || (model.get && model.get(name))];
        }
    },

    _index: function (model) {
        for (var name in this._indexes) {
            var indexVal = model[name] || (model.get && model.get(name));
            if (indexVal) this._indexes[name][indexVal] = model;
        }
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function (model, options) {
        this._index(model);
        if (!model.collection) model.collection = this;
        if (model.on) model.on('all', this._onModelEvent, this);
    },

        // Internal method to sever a model's ties to a collection.
    _removeReference: function (model, options) {
        if (this === model.collection) delete model.collection;
        this._deIndex(model);
        if (model.off) model.off('all', this._onModelEvent, this);
    },

    _onModelEvent: function (event, model, collection, options) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (model && event === 'change:' + this.mainIndex) {
            this._deIndex(model);
            this._index(model);
        }
        this.trigger.apply(this, arguments);
    }
});

Object.defineProperties(Collection.prototype, {
    length: {
        get: function () {
            return this.models.length;
        }
    },
    isCollection: {
        value: true
    }
});

var arrayMethods = [
    'indexOf',
    'lastIndexOf',
    'every',
    'some',
    'forEach',
    'map',
    'filter',
    'reduce',
    'reduceRight'
];

arrayMethods.forEach(function (method) {
    Collection.prototype[method] = function () {
        return this.models[method].apply(this.models, arguments);
    };
});

// alias each/forEach for maximum compatibility
Collection.prototype.each = Collection.prototype.forEach;

Collection.extend = classExtend;

module.exports = Collection;

},{"ampersand-class-extend":18,"backbone-events-standalone":20,"extend-object":96,"is-array":21}],18:[function(require,module,exports){
var objectExtend = require('extend-object');


/// Following code is largely pasted from Backbone.js

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    objectExtend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.unshift(child.prototype);
        objectExtend.apply(null, args);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

// Expose the extend function
module.exports = extend;

},{"extend-object":96}],19:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys,

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],20:[function(require,module,exports){
module.exports = require('./backbone-events-standalone');

},{"./backbone-events-standalone":19}],21:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],22:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom"] = window.ampersand["ampersand-dom"] || [];  window.ampersand["ampersand-dom"].push("1.2.7");}
var dom = module.exports = {
    text: function (el, val) {
        el.textContent = getString(val);
    },
    // optimize if we have classList
    addClass: function (el, cls) {
        cls = getString(cls);
        if (!cls) return;
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.addClass(el, c);
            });
        } else if (el.classList) {
            el.classList.add(cls);
        } else {
            if (!hasClass(el, cls)) {
                if (el.classList) {
                    el.classList.add(cls);
                } else {
                    el.className += ' ' + cls;
                }
            }
        }
    },
    removeClass: function (el, cls) {
        if (Array.isArray(cls)) {
            cls.forEach(function(c) {
                dom.removeClass(el, c);
            });
        } else if (el.classList) {
            cls = getString(cls);
            if (cls) el.classList.remove(cls);
        } else {
            // may be faster to not edit unless we know we have it?
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    hasClass: hasClass,
    switchClass: function (el, prevCls, newCls) {
        if (prevCls) this.removeClass(el, prevCls);
        this.addClass(el, newCls);
    },
    // makes sure attribute (with no content) is added
    // if exists it will be cleared of content
    addAttribute: function (el, attr) {
        // setting to empty string does same
        el.setAttribute(attr, '');
        // Some browsers won't update UI for boolean attributes unless you
        // set it directly. So we do both
        if (hasBooleanProperty(el, attr)) el[attr] = true;
    },
    // completely removes attribute
    removeAttribute: function (el, attr) {
        el.removeAttribute(attr);
        if (hasBooleanProperty(el, attr)) el[attr] = false;
    },
    // sets attribute to string value given, clearing any current value
    setAttribute: function (el, attr, value) {
        el.setAttribute(attr, getString(value));
    },
    getAttribute: function (el, attr) {
        return el.getAttribute(attr);
    },
    hide: function (el) {
        if (!isHidden(el)) {
            storeDisplayStyle(el);
            hide(el);
        }
    },
    // show element
    show: function (el) {
        show(el);
    },
    html: function (el, content) {
        el.innerHTML = content;
    }
};

// helpers
function getString(val) {
    if (!val && val !== 0) {
        return '';
    } else {
        return val;
    }
}

function hasClass(el, cls) {
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }
}

function hasBooleanProperty(el, prop) {
    var val = el[prop];
    return prop in el && (val === true || val === false);
}

function isHidden (el) {
    return dom.getAttribute(el, 'data-anddom-hidden') === 'true';
}

function storeDisplayStyle (el) {
    dom.setAttribute(el, 'data-anddom-display', el.style.display);
}

function show (el) {
    el.style.display = dom.getAttribute(el, 'data-anddom-display') || '';
    dom.removeAttribute(el, 'data-anddom-hidden');
}

function hide (el) {
    dom.setAttribute(el, 'data-anddom-hidden', 'true');
    el.style.display = 'none';
}

},{}],23:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-form-view"] = window.ampersand["ampersand-form-view"] || [];  window.ampersand["ampersand-form-view"].push("2.2.0");}
var BBEvents = require('backbone-events-standalone');
var extend = require('extend-object');

var result = function (obj, prop) {
    if (typeof obj[prop] === 'function') return obj[prop]();
    return obj[prop];
};


function FormView(opts) {
    opts = opts || {};

    this.el = opts.el;
    this.validCallback = opts.validCallback || this.validCallback || function () {};
    this.submitCallback = opts.submitCallback || this.submitCallback || function () {};

    if (opts.data) this.data = opts.data;
    if (opts.model) this.model = opts.model;

    this.clean = opts.clean || function (res) { return res; };
    this.valid = false;
    this.preventDefault = opts.preventDefault === false ? false : true;
    this.autoAppend = opts.autoAppend === false ? false : true;

    // storage for our fields
    this._fieldViews = {};
    this._fieldViewsArray = [];

    // add all our fields
    this.render();

    (opts.fields || result(this, 'fields') || []).forEach(this.addField.bind(this));

    if (this.initialize) this.initialize.apply(this, arguments);

    //defer till after returning from initialize
    setTimeout(function () {
        this.checkValid(true);
    }.bind(this), 0);
}


extend(FormView.prototype, BBEvents, {
    data: null,
    model: null,
    fields: null,

    addField: function (fieldView) {
        this._fieldViews[fieldView.name] = fieldView;
        this._fieldViewsArray.push(fieldView);
        if (this.fieldContainerEl) {
            fieldView.parent = this;
            fieldView.render();
            this.fieldContainerEl.appendChild(fieldView.el);
        }
    },

    removeField: function (name) {
        var field = this.getField(name);
        if (field) {
            field.remove();
            delete this._fieldViews[name];
            this._fieldViewsArray.splice(this._fieldViewsArray.indexOf(field), 1);
        }
    },

    getField: function (name) {
        return this._fieldViews[name];
    },

    setValid: function (now, forceFire) {
        var prev = this.valid;
        this.valid = now;
        if (prev !== now || forceFire) {
            this.validCallback(now);
        }
    },

    checkValid: function (forceFire) {
        var valid = this._fieldViewsArray.every(function (field) {
            return field.valid;
        });
        this.setValid(valid, forceFire);
        return valid;
    },

    beforeSubmit: function () {
        this._fieldViewsArray.forEach(function (field) {
            if (field.beforeSubmit) field.beforeSubmit();
        });
    },

    update: function (field) {
        this.trigger('change:' + field.name, field);
        // if this one's good check 'em all
        if (field.valid) {
            this.checkValid();
        } else {
            this.setValid(false);
        }
    },

    remove: function () {
        this.el.removeEventListener('submit', this.handleSubmit, false);
        var parent = this.el.parentNode;
        if (parent) parent.removeChild(this.el);
        this._fieldViewsArray.forEach(function (field) {
            field.remove();
        });
    },

    handleSubmit: function (e) {
        this.beforeSubmit();
        this.checkValid();
        if (!this.valid) {
            e.preventDefault();
            return false;
        }

        if (this.preventDefault) {
            e.preventDefault();
            this.submitCallback(this.getData());
            return false;
        }
    },

    getData: function () {
        var res = {};
        for (var key in this._fieldViews) {
            res[key] = this._fieldViews[key].value;
        }
        return this.clean(res);
    },

    render: function () {
        if (this.rendered) return;
        if (!this.el) {
            this.el = document.createElement('form');
        }
        if (this.autoAppend) {
            this.fieldContainerEl = this.el.querySelector('[data-hook~=field-container]') || this.el;
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.el.addEventListener('submit', this.handleSubmit, false);
        this.rendered = true;
    }
});

FormView.extend = function (obj) {
    var child = function () {
       FormView.apply(this, arguments);
    };

    extend(child.prototype, FormView.prototype);
    extend(child.prototype, obj);

    return child;
};

module.exports = FormView;

},{"backbone-events-standalone":25,"extend-object":96}],24:[function(require,module,exports){
module.exports=require(19)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/backbone-events-standalone.js":19}],25:[function(require,module,exports){
module.exports=require(20)
},{"./backbone-events-standalone":24,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/index.js":20}],26:[function(require,module,exports){
var RestCollection = require('ampersand-rest-collection');
var hoodieMixin = require('ampersand-hoodie-mixin');


module.exports = RestCollection.extend(hoodieMixin, {
});

},{"ampersand-hoodie-mixin":27,"ampersand-rest-collection":28}],27:[function(require,module,exports){
var _ = require('underscore');

module.exports = {
    //implementing classes must include a HOODIE_TYPE session property, with the default argument filled in:
    // 'HOODIE_TYPE': ['string', true, 'person']
    session: {
        'HOODIE_TYPE': ['string', true]
    },

    //This sync function is a modified version of the code in ampersand-sync
    sync: function (method, model, options) {
        options = options ? _.clone(options) : {};
        var jsonPayload;
        var promise;

        // Ensure that we have a hoodie object type.
        if (!model.HOODIE_TYPE) {
            throw new Error('A HOODIE_TYPE property must be specified');
        }

        // Ensure that we have the appropriate request data.
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            jsonPayload = options.attrs || model.toJSON(options) || options.data;
        }

        switch(method) {
            case 'read':
                if (options && options.id) {
                    promise = window.hoodie.store.find(model.HOODIE_TYPE, options.id);
                } else {
                    promise = window.hoodie.store.findAll(model.HOODIE_TYPE);
                }
                break;
            case 'create':
                if (!jsonPayload) {
                    throw new Error('Trying to add a model, but no data provided');
                } else {
                    promise = window.hoodie.store.add(model.HOODIE_TYPE, jsonPayload, options.silent);
                }
                break;
            case 'update':
            case 'patch':
                if (! jsonPayload) {
                    throw new Error('Trying to update a model, but no data provided');
                } else if (!model.id) {
                    throw new Error('Cannot update model - no id provided');
                } else {
                    promise = window.hoodie.store.update(model.HOODIE_TYPE, model.id, jsonPayload, options.silent);
                }
                break;
            case 'delete':
                if (!model.id) {
                    throw new Error('Cannot delete model - no id provided');
                } else {
                    promise = window.hoodie.store.remove(model.HOODIE_TYPE, model.id, options.silent);
                }
                break;
            default:
                throw new Error('Undefined hoodie method requested: ' + methodMap[method] + ' original: ' + method);
                break
        }

        promise.done(function(body) {
            if (options.success) return options.success(body, 'success');
        });
        promise.fail(function(error) {
            if (options.error) return options.error({}, 'error', error);
        });
    }
};
},{"underscore":102}],28:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-rest-collection"] = window.ampersand["ampersand-rest-collection"] || [];  window.ampersand["ampersand-rest-collection"].push("2.0.4");}
var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var restMixins = require('ampersand-collection-rest-mixin');


module.exports = Collection.extend(underscoreMixin, restMixins);

},{"ampersand-collection":17,"ampersand-collection-rest-mixin":29,"ampersand-collection-underscore-mixin":16}],29:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-collection-rest-mixin"] = window.ampersand["ampersand-collection-rest-mixin"] || [];  window.ampersand["ampersand-collection-rest-mixin"].push("3.0.1");}
var sync = require('ampersand-sync');
var extend = require('extend-object');


// Wrap an optional error callback with a fallback error event.
var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
    };
};

module.exports = {
    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        options = options ? extend({}, options) : {};
        if (options.parse === void 0) options.parse = true;
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp, options);
            if (success) success(collection, resp, options);
            collection.trigger('sync', collection, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
        options = options ? extend({}, options) : {};
        if (!(model = this._prepareModel(model, options))) return false;
        if (!options.wait) this.add(model, options);
        var collection = this;
        var success = options.success;
        options.success = function(model, resp) {
            if (options.wait) collection.add(model, options);
            if (success) success(model, resp, options);
        };
        model.save(null, options);
        return model;
    },

    sync: function() {
        return sync.apply(this, arguments);
    },

    // Get or fetch a model by Id.
    getOrFetch: function (id, options, cb) {
        if (arguments.length !== 3) {
            cb = options;
            options = {};
        }
        var self = this;
        var model = this.get(id);
        if (model) return cb(null, model);
        function done() {
            var model = self.get(id);
            if (model) {
                if (cb) cb(null, model);
            } else {
                cb(new Error('not found'));
            }
        }
        if (options.all) {
            this.fetch({
                success: done,
                error: done
            });
        } else {
            this.fetchById(id, cb);
        }
    },

    // fetchById: fetches a model and adds it to
    // collection when fetched.
    fetchById: function (id, cb) {
        var self = this;
        var idObj = {};
        idObj[this.model.prototype.idAttribute] = id;
        var model = new this.model(idObj, {collection: this});
        model.fetch({
            success: function () {
                self.add(model);
                if (cb) cb(null, model);
            },
            error: function () {
                delete model.collection;
                if (cb) cb(Error('not found'));
            }
        });
    }
};

},{"ampersand-sync":30,"extend-object":96}],30:[function(require,module,exports){
var _ = require('underscore');
var xhr = require('xhr');
var qs = require('qs');


// Throw an error when a URL is needed, and none is supplied.
var urlError = function () {
    throw new Error('A "url" property or function must be specified');
};


module.exports = function (method, model, options) {
    var type = methodMap[method];
    var headers = {};

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
        emulateHTTP: false,
        emulateJSON: false
    });

    // Default request options.
    var params = {type: type};

    // Ensure that we have a URL.
    if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
        params.json = options.attrs || model.toJSON(options);
    }

    // If passed a data param, we add it to the URL or body depending on request type
    if (options.data && type === 'GET') {
        // make sure we've got a '?'
        params.url += _.contains(params.url, '?') ? '&' : '?';
        params.url += qs.stringify(options.data);
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        params.body = params.json ? {model: params.json} : {};
        delete params.json;
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
        params.type = 'POST';
        if (options.emulateJSON) params.body._method = type;
        headers['X-HTTP-Method-Override'] = type;
    }

    // When emulating JSON, we turn the body into a querystring.
    // We do this later to let the emulateHTTP run its course.
    if (options.emulateJSON) {
        params.body = qs.stringify(params.body);
    }

    // Start setting ajaxConfig options (headers, xhrFields).
    var ajaxConfig = (_.result(model, 'ajaxConfig') || {});

    // Combine generated headers with user's headers.
    if (ajaxConfig.headers) {
        _.extend(headers, ajaxConfig.headers);
    }
    params.headers = headers;

    //Set XDR for cross domain in IE8/9
    if (ajaxConfig.useXDR) {
        params.useXDR = true;
    }

    // Set raw xhr options.
    if (ajaxConfig.xhrFields) {
        var beforeSend = ajaxConfig.beforeSend;
        params.beforeSend = function (req) {
            for (var key in ajaxConfig.xhrFields) {
                req[key] = ajaxConfig.xhrFields[key];
            }
            if (beforeSend) return beforeSend.apply(this, arguments);
        };
        params.xhrFields = ajaxConfig.xhrFields;
    }

    // Turn a jQuery.ajax formatted request into xhr compatible
    params.method = params.type;

    var ajaxSettings = _.extend(params, options);

    // Make the request. The callback executes functions that are compatible
    // With jQuery.ajax's syntax.
    var request = options.xhr = xhr(ajaxSettings, function (err, resp, body) {
        if (err && options.error) return options.error(resp, 'error', err.message);

        // Parse body as JSON if a string.
        if (body && typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {}
        }
        if (options.success) return options.success(body, 'success', resp);
    });
    model.trigger('request', model, request, options, ajaxSettings);
    request.ajaxSettings = ajaxSettings;
    return request;
};

// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
};

},{"qs":31,"underscore":36,"xhr":37}],31:[function(require,module,exports){
module.exports = require('./lib');

},{"./lib":32}],32:[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":33,"./stringify":34}],33:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parametersLimit: 1000
};


internals.parseValues = function (str, delimiter) {

    delimiter = typeof delimiter === 'string' ? delimiter : internals.delimiter;

    var obj = {};
    var parts = str.split(delimiter, internals.parametersLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (!obj[key]) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) &&
            root !== cleanRoot &&
            index <= internals.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, depth) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val);
};


module.exports = function (str, depth, delimiter) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    if (typeof depth !== 'number') {
        delimiter = depth;
        depth = internals.depth;
    }

    var tempObj = typeof str === 'string' ? internals.parseValues(str, delimiter) : Utils.clone(str);
    var obj = {};

    // Iterate over the keys and setup the new object
    //
    for (var key in tempObj) {
        if (tempObj.hasOwnProperty(key)) {
            var newObj = internals.parseKeys(key, tempObj[key], depth);
            obj = Utils.merge(obj, newObj);
        }
    }

    return Utils.compact(obj);
};

},{"./utils":35}],34:[function(require,module,exports){
(function (Buffer){
// Load modules


// Declare internals

var internals = {
    delimiter: '&'
};


internals.stringify = function (obj, prefix) {

    if (Buffer.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']'));
        }
    }

    return values;
};


module.exports = function (obj, delimiter) {

    delimiter = typeof delimiter === 'undefined' ? internals.delimiter : delimiter;

    var keys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys = keys.concat(internals.stringify(obj[key], key));
        }
    }

    return keys.join(delimiter);
};

}).call(this,require("buffer").Buffer)

},{"buffer":98}],35:[function(require,module,exports){
(function (Buffer){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.clone = function (source) {

    if (typeof source !== 'object' ||
        source === null) {

        return source;
    }

    if (Buffer.isBuffer(source)) {
        return source.toString();
    }

    var obj = Array.isArray(source) ? [] : {};
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            obj[i] = exports.clone(source[i]);
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    var obj = exports.clone(target);

    if (Array.isArray(source)) {
        for (var i = 0, il = source.length; i < il; ++i) {
            if (typeof source[i] !== 'undefined') {
                if (typeof obj[i] === 'object') {
                    obj[i] = exports.merge(obj[i], source[i]);
                }
                else {
                    obj[i] = source[i];
                }
            }
        }

        return obj;
    }

    if (Array.isArray(obj)) {
        obj = exports.arrayToObject(obj);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (value &&
            typeof value === 'object') {

            if (!obj[key]) {
                obj[key] = exports.clone(value);
            }
            else {
                obj[key] = exports.merge(obj[key], value);
            }
        }
        else {
            obj[key] = value;
        }
    }

    return obj;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj) {

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var compacted = {};

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                compacted[key] = [];

                for (var i = 0, l = obj[key].length; i < l; i++) {
                    if (typeof obj[key][i] !== 'undefined') {
                        compacted[key].push(obj[key][i]);
                    }
                }
            }
            else {
                compacted[key] = exports.compact(obj[key]);
            }
        }
    }

    return compacted;
};

}).call(this,require("buffer").Buffer)

},{"buffer":98}],36:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}],37:[function(require,module,exports){
var window = require("global/window")
var once = require("once")
var parseHeaders = require('parse-headers')

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new XDR()
        }else{
            xhr = new XHR()
        }
    }

    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var key
    var load = options.response ? loadResponse : loadXhr

    if ("json" in options) {
        isJson = true
        headers["Accept"] = "application/json"
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
                                    //backward compatibility
    if (options.withCredentials || (options.cors && options.withCredentials !== false)) {
        xhr.withCredentials = true
    }

    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }
    
    if ("beforeSend" in options && 
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = null

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === 'text' || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function getStatusCode() {
        return xhr.status === 1223 ? 204 : xhr.status
    }

    // if we're getting a none-ok statusCode, build & return an error
    function errorFromStatusCode(status, body) {
        var error = null
        if (status === 0 || (status >= 400 && status < 600)) {
            var message = (typeof body === "string" ? body : false) ||
                messages[String(status).charAt(0)]
            error = new Error(message)
            error.statusCode = status
        }

        return error
    }

    // will load the data & process the response in a special response object
    function loadResponse() {
        var status = getStatusCode()
        var body = getBody()
        var error = errorFromStatusCode(status, body)
        var response = {
            body: body,
            statusCode: status,
            statusText: xhr.statusText,
            raw: xhr
        }
        if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
            response.headers = parseHeaders(xhr.getAllResponseHeaders())
        } else {
            response.headers = {}
        }

        callback(error, response, response.body)
    }

    // will load the data and add some response properties to the source xhr
    // and then respond with that
    function loadXhr() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)

        xhr.status = xhr.statusCode = status
        xhr.body = getBody()
        xhr.headers = parseHeaders(xhr.getAllResponseHeaders())

        callback(error, xhr, xhr.body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}

},{"global/window":38,"once":39,"parse-headers":43}],38:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],39:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],40:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":41}],41:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],42:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],43:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":40,"trim":42}],44:[function(require,module,exports){
var AmpersandModel = require('ampersand-model');
var hoodieMixin = require('ampersand-hoodie-mixin');


module.exports = AmpersandModel.extend(hoodieMixin, {
});
},{"ampersand-hoodie-mixin":45,"ampersand-model":47}],45:[function(require,module,exports){
module.exports=require(27)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-hoodie-mixin/ampersand-hoodie-mixin.js":27,"underscore":102}],46:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-input-view"] = window.ampersand["ampersand-input-view"] || [];  window.ampersand["ampersand-input-view"].push("3.1.0");}
var View = require('ampersand-view');


module.exports = View.extend({
    template: [
        '<label>',
            '<span data-hook="label"></span>',
            '<input class="form-input">',
            '<div data-hook="message-container" class="message message-below message-error">',
                '<p data-hook="message-text"></p>',
            '</div>',
        '</label>'
    ].join(''),
    bindings: {
        'name': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'name'
        },
        'label': [
            {
                hook: 'label'
            },
            {
                type: 'toggle',
                hook: 'label'
            }
        ],
        'message': {
            type: 'text',
            hook: 'message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'message-container'
        },
        'placeholder': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'placeholder'
        },
        'validityClass': {
            type: 'class',
            selector: 'input, textarea'
        },
        'rootElementClass': {
            type: 'class',
            selector: ''
        }
    },
    initialize: function (spec) {
        spec || (spec = {});
        this.tests = this.tests || spec.tests || [];
        this.on('change:type', this.handleTypeChange, this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        var value = !spec.value && spec.value !== 0 ? '' : spec.value;
        this.startingValue = value;
        this.inputValue = value;
        this.on('change:valid change:value', this.reportToParent, this);
        if (spec.template) this.template = spec.template;
    },
    render: function () {
        this.renderWithTemplate();
        this.input = this.query('input') || this.query('textarea');
        // switches out input for textarea if that's what we want
        this.handleTypeChange();
        this.initInputBindings();
        // Skip validation on initial setValue
        // if the field is not required
        this.setValue(this.inputValue, !this.required);
    },
    props: {
        inputValue: 'any',
        startingValue: 'any',
        name: 'string',
        type: ['string', true, 'text'],
        placeholder: ['string', true, ''],
        label: ['string', true, ''],
        required: ['boolean', true, true],
        directlyEdited: ['boolean', true, false],
        shouldValidate: ['boolean', true, false],
        message: ['string', true, ''],
        requiredMessage: ['string', true, 'This field is required.'],
        validClass: ['string', true, 'input-valid'],
        invalidClass: ['string', true, 'input-invalid'],
        rootElementClass: ['string', true, '']
    },
    derived: {
        value: {
            deps: ['inputValue'],
            fn: function () {
                return this.inputValue;
            }
        },
        valid: {
            deps: ['inputValue'],
            fn: function () {
                return !this.runTests();
            }
        },
        showMessage: {
            deps: ['message', 'shouldValidate'],
            fn: function () {
                return this.shouldValidate && this.message;
            }
        },
        changed: {
            deps: ['inputValue', 'startingValue'],
            fn: function () {
                return this.inputValue !== this.startingValue;
            }
        },
        validityClass: {
            deps: ['valid', 'validClass', 'invalidClass', 'shouldValidate'],
            fn: function () {
                if (!this.shouldValidate) {
                    return '';
                } else {
                    return this.valid ? this.validClass : this.invalidClass;
                }
            }
        }
    },
    setValue: function (value, skipValidation) {
        if (!value && value !== 0) {
            this.input.value = '';
        } else {
            this.input.value = value.toString();
        }
        this.inputValue = this.input.value;
        if (!skipValidation && !this.getErrorMessage()) {
            this.shouldValidate = true;
        }
    },
    getErrorMessage: function () {
        var message = '';
        if (this.required && !this.value) {
            return this.requiredMessage;
        } else {
            (this.tests || []).some(function (test) {
                message = test.call(this, this.value) || '';
                return message;
            }, this);
            return message;
        }
    },
    handleTypeChange: function () {
        if (this.type === 'textarea' && this.input.tagName.toLowerCase() !== 'textarea') {
            var parent = this.input.parentNode;
            var textarea = document.createElement('textarea');
            parent.replaceChild(textarea, this.input);
            this.input = textarea;
            this._applyBindingsForKey('');
        } else {
            this.input.type = this.type;
        }
    },
    handleInputChanged: function () {
        if (document.activeElement === this.input) {
            this.directlyEdited = true;
        }
        this.inputValue = this.clean(this.input.value);
    },
    clean: function (val) {
        return (this.type === 'number') ? Number(val) : val.trim();
    },
    handleBlur: function () {
        if (this.inputValue && this.changed) {
            this.shouldValidate = true;
        }
        this.runTests();
    },
    beforeSubmit: function () {
        // at the point where we've tried
        // to submit, we want to validate
        // everything from now on.
        this.shouldValidate = true;
        this.runTests();
    },
    runTests: function () {
        var message = this.getErrorMessage();
        if (!message && this.inputValue && this.changed) {
            // if it's ever been valid,
            // we want to validate from now
            // on.
            this.shouldValidate = true;
        }
        this.message = message;
        return message;
    },
    initInputBindings: function () {
        this.input.addEventListener('blur', this.handleBlur, false);
        this.input.addEventListener('input', this.handleInputChanged, false);
    },
    remove: function () {
        this.input.removeEventListener('input', this.handleInputChanged, false);
        this.input.removeEventListener('blur', this.handleBlur, false);
        View.prototype.remove.apply(this, arguments);
    },
    reset: function () {
        this.setValue(this.startingValue);
    },
    clear: function () {
        this.setValue('');
    },
    reportToParent: function () {
        if (this.parent) this.parent.update(this);
    }
});

},{"ampersand-view":74}],47:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-model"] = window.ampersand["ampersand-model"] || [];  window.ampersand["ampersand-model"].push("4.0.3");}
var State = require('ampersand-state');
var _ = require('underscore');
var sync = require('ampersand-sync');


var Model = State.extend({
    save: function (key, val, options) {
        var attrs, method, sync, attributes = this.attributes;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options = _.extend({validate: true}, options);

        // If we're not waiting and attributes exist, save acts as
        // `set(attr).save(null, opts)` with validation. Otherwise, check if
        // the model will be valid when the attributes, if any, are set.
        if (attrs && !options.wait) {
            if (!this.set(attrs, options)) return false;
        } else {
            if (!this._validate(attrs, options)) return false;
        }

        // After a successful server-side save, the client is (optionally)
        // updated with the server-side state.
        if (options.parse === void 0) options.parse = true;
        var model = this;
        var success = options.success;
        options.success = function (resp) {
            var serverAttrs = model.parse(resp, options);
            if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
            if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                return false;
            }
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);

        method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
        if (method === 'patch') options.attrs = attrs;
        // if we're waiting we haven't actually set our attributes yet so
        // we need to do make sure we send right data
        if (options.wait) options.attrs = _.extend(model.serialize(), attrs);
        sync = this.sync(method, this, options);

        return sync;
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function (options) {
        options = options ? _.clone(options) : {};
        if (options.parse === void 0) options.parse = true;
        var model = this;
        var success = options.success;
        options.success = function (resp) {
            if (!model.set(model.parse(resp, options), options)) return false;
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function (options) {
        options = options ? _.clone(options) : {};
        var model = this;
        var success = options.success;

        var destroy = function () {
            model.trigger('destroy', model, model.collection, options);
        };

        options.success = function (resp) {
            if (options.wait || model.isNew()) destroy();
            if (success) success(model, resp, options);
            if (!model.isNew()) model.trigger('sync', model, resp, options);
        };

        if (this.isNew()) {
            options.success();
            return false;
        }
        wrapError(this, options);

        var sync = this.sync('delete', this, options);
        if (!options.wait) destroy();
        return sync;
    },

    // Proxy `ampersand-sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function () {
        return sync.apply(this, arguments);
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function () {
        var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.getId());
    }
});

// Throw an error when a URL is needed, and none is supplied.
var urlError = function () {
    throw new Error('A "url" property or function must be specified');
};

// Wrap an optional error callback with a fallback error event.
var wrapError = function (model, options) {
    var error = options.error;
    options.error = function (resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
    };
};

module.exports = Model;

},{"ampersand-state":48,"ampersand-sync":53,"underscore":102}],48:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-state"] = window.ampersand["ampersand-state"] || [];  window.ampersand["ampersand-state"].push("4.4.4");}
var _ = require('underscore');
var BBEvents = require('backbone-events-standalone');
var KeyTree = require('key-tree-store');
var arrayNext = require('array-next');
var changeRE = /^change:/;

function Base(attrs, options) {
    options || (options = {});
    this.cid || (this.cid = _.uniqueId('state'));
    this._events = {};
    this._values = {};
    this._definition = Object.create(this._definition);
    if (options.parse) attrs = this.parse(attrs, options);
    this.parent = options.parent;
    this.collection = options.collection;
    this._keyTree = new KeyTree();
    this._initCollections();
    this._initChildren();
    this._cache = {};
    this._previousAttributes = {};
    if (attrs) this.set(attrs, _.extend({silent: true, initial: true}, options));
    this._changed = {};
    if (this._derived) this._initDerived();
    if (options.init !== false) this.initialize.apply(this, arguments);
}


_.extend(Base.prototype, BBEvents, {
    // can be allow, ignore, reject
    extraProperties: 'ignore',

    idAttribute: 'id',

    namespaceAttribute: 'namespace',

    typeAttribute: 'modelType',

    // Stubbed out to be overwritten
    initialize: function () {
        return this;
    },

    // Get ID of model per configuration.
    // Should *always* be how ID is determined by other code.
    getId: function () {
        return this[this.idAttribute];
    },

    // Get namespace of model per configuration.
    // Should *always* be how namespace is determined by other code.
    getNamespace: function () {
        return this[this.namespaceAttribute];
    },

    // Get type of model per configuration.
    // Should *always* be how type is determined by other code.
    getType: function () {
        return this[this.typeAttribute];
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function () {
        return this.getId() == null;
    },

    // get HTML-escaped value of attribute
    escape: function (attr) {
        return _.escape(this.get(attr));
    },

    // Check if the model is currently in a valid state.
    isValid: function (options) {
        return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Parse can be used remap/restructure/rename incoming properties
    // before they are applied to attributes.
    parse: function (resp, options) {
        return resp;
    },

    // Serialize is the inverse of `parse` it lets you massage data
    // on the way out. Before, sending to server, for example.
    serialize: function () {
        var res = this.getAttributes({props: true}, true);
        _.each(this._children, function (value, key) {
            res[key] = this[key].serialize();
        }, this);
        _.each(this._collections, function (value, key) {
            res[key] = this[key].serialize();
        }, this);
        return res;
    },

    // Main set method used by generated setters/getters and can
    // be used directly if you need to pass options or set multiple
    // properties at once.
    set: function (key, value, options) {
        var self = this;
        var extraProperties = this.extraProperties;
        var triggers = [];
        var changing, changes, newType, newVal, def, cast, err, attr,
            attrs, dataType, silent, unset, currentVal, initial, hasChanged, isEqual;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (_.isObject(key) || key === null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        options = options || {};

        if (!this._validate(attrs, options)) return false;

        // Extract attributes and options.
        unset = options.unset;
        silent = options.silent;
        initial = options.initial;

        changes = [];
        changing = this._changing;
        this._changing = true;

        // if not already changing, store previous
        if (!changing) {
            this._previousAttributes = this.attributes;
            this._changed = {};
        }

        // For each `set` attribute...
        for (attr in attrs) {
            newVal = attrs[attr];
            newType = typeof newVal;
            currentVal = this._values[attr];
            def = this._definition[attr];


            if (!def) {
                // if this is a child model or collection
                if (this._children[attr] || this._collections[attr]) {
                    this[attr].set(newVal, options);
                    continue;
                } else if (extraProperties === 'ignore') {
                    continue;
                } else if (extraProperties === 'reject') {
                    throw new TypeError('No "' + attr + '" property defined on ' + (this.type || 'this') + ' model and extraProperties not set to "ignore" or "allow"');
                } else if (extraProperties === 'allow') {
                    def = this._createPropertyDefinition(attr, 'any');
                } else if (extraProperties) {
                    throw new TypeError('Invalid value for extraProperties: "' + extraProperties + '"');
                }
            }

            isEqual = this._getCompareForType(def.type);
            dataType = this._dataTypes[def.type];

            // check type if we have one
            if (dataType && dataType.set) {
                cast = dataType.set(newVal);
                newVal = cast.val;
                newType = cast.type;
            }

            // If we've defined a test, run it
            if (def.test) {
                err = def.test.call(this, newVal, newType);
                if (err) {
                    throw new TypeError('Property \'' + attr + '\' failed validation with error: ' + err);
                }
            }

            // If we are required but undefined, throw error.
            // If we are null and are not allowing null, throw error
            // If we have a defined type and the new type doesn't match, and we are not null, throw error.

            if (_.isUndefined(newVal) && def.required) {
                throw new TypeError('Required property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (_.isNull(newVal) && def.required && !def.allowNull) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + ' (cannot be null). Tried to set ' + newVal);
            }
            if ((def.type && def.type !== 'any' && def.type !== newType) && !_.isNull(newVal) && !_.isUndefined(newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be of type ' + def.type + '. Tried to set ' + newVal);
            }
            if (def.values && !_.contains(def.values, newVal)) {
                throw new TypeError('Property \'' + attr + '\' must be one of values: ' + def.values.join(', ') + '. Tried to set ' + newVal);
            }

            hasChanged = !isEqual(currentVal, newVal, attr);

            // enforce `setOnce` for properties if set
            if (def.setOnce && currentVal !== undefined && hasChanged && !initial) {
                throw new TypeError('Property \'' + attr + '\' can only be set once.');
            }

            // keep track of changed attributes
            // and push to changes array
            if (hasChanged) {
                changes.push({prev: currentVal, val: newVal, key: attr});
                self._changed[attr] = newVal;
            } else {
                delete self._changed[attr];
            }
        }

        // actually update our values
        _.each(changes, function (change) {
            self._previousAttributes[change.key] = change.prev;
            if (unset) {
                delete self._values[change.key];
            } else {
                self._values[change.key] = change.val;
            }
        });

        if (!silent && changes.length) self._pending = true;
        if (!silent) {
            _.each(changes, function (change) {
                self.trigger('change:' + change.key, self, change.val, options);
            });
        }

        // You might be wondering why there's a `while` loop here. Changes can
        // be recursively nested within `"change"` events.
        if (changing) return this;
        if (!silent) {
            while (this._pending) {
                this._pending = false;
                this.trigger('change', this, options);
            }
        }
        this._pending = false;
        this._changing = false;
        return this;
    },

    get: function (attr) {
        return this[attr];
    },

    // Toggle boolean properties or properties that have a `values`
    // array in its definition.
    toggle: function (property) {
        var def = this._definition[property];
        if (def.type === 'boolean') {
            // if it's a bool, just flip it
            this[property] = !this[property];
        } else if (def && def.values) {
            // If it's a property with an array of values
            // skip to the next one looping back if at end.
            this[property] = arrayNext(def.values, this[property]);
        } else {
            throw new TypeError('Can only toggle properties that are type `boolean` or have `values` array.');
        }
        return this;
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function () {
        return _.clone(this._previousAttributes);
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function (attr) {
        if (attr == null) return !_.isEmpty(this._changed);
        return _.has(this._changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function (diff) {
        if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
        var val, changed = false;
        var old = this._changing ? this._previousAttributes : this.attributes;
        var def, isEqual;
        for (var attr in diff) {
            def = this._definition[attr];
            if (!def) continue;
            isEqual = this._getCompareForType(def.type);
            if (isEqual(old[attr], (val = diff[attr]))) continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    },

    toJSON: function () {
        return this.serialize();
    },

    unset: function (attr, options) {
        var def = this._definition[attr];
        var type = def.type;
        var val;
        if (def.required) {
            val = _.result(def, 'default');
            return this.set(attr, val, options);
        } else {
            return this.set(attr, val, _.extend({}, options, {unset: true}));
        }
    },

    clear: function (options) {
        var self = this;
        _.each(_.keys(this.attributes), function (key) {
            self.unset(key, options);
        });
        return this;
    },

    previous: function (attr) {
        if (attr == null || !Object.keys(this._previousAttributes).length) return null;
        return this._previousAttributes[attr];
    },

    // Get default values for a certain type
    _getDefaultForType: function (type) {
        var dataType = this._dataTypes[type];
        return dataType && dataType.default;
    },

    // Determine which comparison algorithm to use for comparing a property
    _getCompareForType: function (type) {
        var dataType = this._dataTypes[type];
        if (dataType && dataType.compare) return _.bind(dataType.compare, this);
        return _.isEqual;
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function (attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = _.extend({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        this.trigger('invalid', this, error, _.extend(options || {}, {validationError: error}));
        return false;
    },

    _createPropertyDefinition: function (name, desc, isSession) {
        return createPropertyDefinition(this, name, desc, isSession);
    },

    // just makes friendlier errors when trying to define a new model
    // only used when setting up original property definitions
    _ensureValidType: function (type) {
        return _.contains(['string', 'number', 'boolean', 'array', 'object', 'date', 'any'].concat(_.keys(this._dataTypes)), type) ? type : undefined;
    },

    getAttributes: function (options, raw) {
        options || (options = {});
        _.defaults(options, {
            session: false,
            props: false,
            derived: false
        });
        var res = {};
        var val, item, def;
        for (item in this._definition) {
            def = this._definition[item];
            if ((options.session && def.session) || (options.props && !def.session)) {
                val = (raw) ? this._values[item] : this[item];
                if (typeof val === 'undefined') val = _.result(def, 'default');
                if (typeof val !== 'undefined') res[item] = val;
            }
        }
        if (options.derived) {
            for (item in this._derived) res[item] = this[item];
        }
        return res;
    },

    _initDerived: function () {
        var self = this;

        _.each(this._derived, function (value, name) {
            var def = self._derived[name];
            def.deps = def.depList;

            var update = function (options) {
                options = options || {};

                var newVal = def.fn.call(self);

                if (self._cache[name] !== newVal || !def.cache) {
                    if (def.cache) {
                        self._previousAttributes[name] = self._cache[name];
                    }
                    self._cache[name] = newVal;
                    self.trigger('change:' + name, self, self._cache[name]);
                }
            };

            def.deps.forEach(function (propString) {
                self._keyTree.add(propString, update);
            });
        });

        this.on('all', function (eventName) {
            if (changeRE.test(eventName)) {
                self._keyTree.get(eventName.split(':')[1]).forEach(function (fn) {
                    fn();
                });
            }
        }, this);
    },

    _getDerivedProperty: function (name, flushCache) {
        // is this a derived property that is cached
        if (this._derived[name].cache) {
            //set if this is the first time, or flushCache is set
            if (flushCache || !this._cache.hasOwnProperty(name)) {
                this._cache[name] = this._derived[name].fn.apply(this);
            }
            return this._cache[name];
        } else {
            return this._derived[name].fn.apply(this);
        }
    },

    _initCollections: function () {
        var coll;
        if (!this._collections) return;
        for (coll in this._collections) {
            this[coll] = new this._collections[coll](null, {parent: this});
        }
    },

    _initChildren: function () {
        var child;
        if (!this._children) return;
        for (child in this._children) {
            this[child] = new this._children[child]({}, {parent: this});
            this.listenTo(this[child], 'all', this._getEventBubblingHandler(child));
        }
    },

    // Returns a bound handler for doing event bubbling while
    // adding a name to the change string.
    _getEventBubblingHandler: function (propertyName) {
        return _.bind(function (name, model, newValue) {
            if (changeRE.test(name)) {
                this.trigger('change:' + propertyName + '.' + name.split(':')[1], model, newValue);
            } else if (name === 'change') {
                this.trigger('change', this);
            }
        }, this);
    },

    // Check that all required attributes are present
    _verifyRequired: function () {
        var attrs = this.attributes; // should include session
        for (var def in this._definition) {
            if (this._definition[def].required && typeof attrs[def] === 'undefined') {
                return false;
            }
        }
        return true;
    }
});

// getter for attributes
Object.defineProperties(Base.prototype, {
    attributes: {
        get: function () {
            return this.getAttributes({props: true, session: true});
        }
    },
    all: {
        get: function () {
            return this.getAttributes({
                session: true,
                props: true,
                derived: true
            });
        }
    },
    isState: {
        get: function () { return true; },
        set: function () { }
    }
});

// helper for creating/storing property definitions and creating
// appropriate getters/setters
function createPropertyDefinition(object, name, desc, isSession) {
    var def = object._definition[name] = {};
    var type, descArray;

    if (_.isString(desc)) {
        // grab our type if all we've got is a string
        type = object._ensureValidType(desc);
        if (type) def.type = type;
    } else {

        //Transform array of ['type', required, default] to object form
        if (_.isArray(desc)) {
            descArray = desc;
            desc = {
                type: descArray[0],
                required: descArray[1],
                default: descArray[2]
            };
        }

        type = object._ensureValidType(desc.type);
        if (type) def.type = type;

        if (desc.required) def.required = true;

        if (desc.default && typeof desc.default === 'object') {
            throw new TypeError('The default value for ' + name + ' cannot be an object/array, must be a value or a function which returns a value/object/array');
        }
        def.default = desc.default;

        def.allowNull = desc.allowNull ? desc.allowNull : false;
        if (desc.setOnce) def.setOnce = true;
        if (def.required && _.isUndefined(def.default) && !def.setOnce) def.default = object._getDefaultForType(type);
        def.test = desc.test;
        def.values = desc.values;
    }
    if (isSession) def.session = true;

    // define a getter/setter on the prototype
    // but they get/set on the instance
    Object.defineProperty(object, name, {
        set: function (val) {
            this.set(name, val);
        },
        get: function () {
            var result = this._values[name];
            var typeDef = this._dataTypes[def.type];
            if (typeof result !== 'undefined') {
                if (typeDef && typeDef.get) {
                    result = typeDef.get(result);
                }
                return result;
            }
            result = _.result(def, 'default');
            this._values[name] = result;
            return result;
        }
    });

    return def;
}

// helper for creating derived property definitions
function createDerivedProperty(modelProto, name, definition) {
    var def = modelProto._derived[name] = {
        fn: _.isFunction(definition) ? definition : definition.fn,
        cache: (definition.cache !== false),
        depList: definition.deps || []
    };

    // add to our shared dependency list
    _.each(def.depList, function (dep) {
        modelProto._deps[dep] = _(modelProto._deps[dep] || []).union([name]);
    });

    // defined a top-level getter for derived names
    Object.defineProperty(modelProto, name, {
        get: function () {
            return this._getDerivedProperty(name);
        },
        set: function () {
            throw new TypeError('"' + name + '" is a derived property, it can\'t be set directly.');
        }
    });
}

var dataTypes = {
    string: {
        default: function () {
            return '';
        }
    },
    date: {
        set: function (newVal) {
            var newType;
            if (!_.isDate(newVal)) {
                try {
                    var dateVal = new Date(newVal).valueOf();
                    if (isNaN(dateVal)) {
                        // If the newVal cant be parsed, then try parseInt first
                        dateVal = new Date(parseInt(newVal, 10)).valueOf();
                        if (isNaN(dateVal)) throw TypeError;
                    }
                    newVal = dateVal;
                    newType = 'date';
                } catch (e) {
                    newType = typeof newVal;
                }
            } else {
                newType = 'date';
                newVal = newVal.valueOf();
            }
            return {
                val: newVal,
                type: newType
            };
        },
        get: function (val) {
            return new Date(val);
        },
        default: function () {
            return new Date();
        }
    },
    array: {
        set: function (newVal) {
            return {
                val: newVal,
                type: _.isArray(newVal) ? 'array' : typeof newVal
            };
        },
        default: function () {
            return [];
        }
    },
    object: {
        set: function (newVal) {
            var newType = typeof newVal;
            // we have to have a way of supporting "missing" objects.
            // Null is an object, but setting a value to undefined
            // should work too, IMO. We just override it, in that case.
            if (newType !== 'object' && _.isUndefined(newVal)) {
                newVal = null;
                newType = 'object';
            }
            return {
                val: newVal,
                type: newType
            };
        },
        default: function () {
            return {};
        }
    },
    // the `state` data type is a bit special in that setting it should
    // also bubble events
    state: {
        set: function (newVal) {
            var isInstance = newVal instanceof Base || (newVal && newVal.isState);
            if (isInstance) {
                return {
                    val: newVal,
                    type: 'state'
                };
            } else {
                return {
                    val: newVal,
                    type: typeof newVal
                };
            }
        },
        compare: function (currentVal, newVal, attributeName) {
            var isSame = currentVal === newVal;

            // if this has changed we want to also handle
            // event propagation
            if (!isSame) {
                if (currentVal) {
                    this.stopListening(currentVal);
                }

                if (newVal != null) {
                    this.listenTo(newVal, 'all', this._getEventBubblingHandler(attributeName));
                }
            }

            return isSame;
        }
    }
};

// the extend method used to extend prototypes, maintain inheritance chains for instanceof
// and allow for additions to the model definitions.
function extend(protoProps) {
    var parent = this;
    var child;
    var args = [].slice.call(arguments);
    var prop, item;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    // Add static properties to the constructor function from parent
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // set prototype level objects
    child.prototype._derived =  _.extend({}, parent.prototype._derived);
    child.prototype._deps = _.extend({}, parent.prototype._deps);
    child.prototype._definition = _.extend({}, parent.prototype._definition);
    child.prototype._collections = _.extend({}, parent.prototype._collections);
    child.prototype._children = _.extend({}, parent.prototype._children);
    child.prototype._dataTypes = _.extend({}, parent.prototype._dataTypes || dataTypes);

    // Mix in all prototype properties to the subclass if supplied.
    if (protoProps) {
        args.forEach(function processArg(def) {
            var omitFromExtend = [
                'dataTypes', 'props', 'session', 'derived', 'collections', 'children'
            ];
            if (def.dataTypes) {
                _.each(def.dataTypes, function (def, name) {
                    child.prototype._dataTypes[name] = def;
                });
            }
            if (def.props) {
                _.each(def.props, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def);
                });
            }
            if (def.session) {
                _.each(def.session, function (def, name) {
                    createPropertyDefinition(child.prototype, name, def, true);
                });
            }
            if (def.derived) {
                _.each(def.derived, function (def, name) {
                    createDerivedProperty(child.prototype, name, def);
                });
            }
            if (def.collections) {
                _.each(def.collections, function (constructor, name) {
                    child.prototype._collections[name] = constructor;
                });
            }
            if (def.children) {
                _.each(def.children, function (constructor, name) {
                    child.prototype._children[name] = constructor;
                });
            }
            _.extend(child.prototype, _.omit(def, omitFromExtend));
        });
    }

    var toString = Object.prototype.toString;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
}

Base.extend = extend;

// Our main exports
module.exports = Base;

},{"array-next":49,"backbone-events-standalone":51,"key-tree-store":52,"underscore":102}],49:[function(require,module,exports){
module.exports = function arrayNext(array, currentItem) {
    var len = array.length;
    var newIndex = array.indexOf(currentItem) + 1;
    if (newIndex > (len - 1)) newIndex = 0;
    return array[newIndex];
};

},{}],50:[function(require,module,exports){
module.exports=require(19)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/backbone-events-standalone.js":19}],51:[function(require,module,exports){
module.exports=require(20)
},{"./backbone-events-standalone":50,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/index.js":20}],52:[function(require,module,exports){
function KeyTreeStore() {
    this.storage = {};
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {
    var path, arr;
    for (path in this.storage) {
        arr = this.storage[path];
        arr.some(function (item, index) {
            if (item === obj) {
                arr.splice(index, 1);
                return true;
            }
        });
    }
};

// grab all relevant objects
KeyTreeStore.prototype.get = function (keypath) {
    var res = [];
    var key;

    for (key in this.storage) {
        if (keypath === key || key.indexOf(keypath + '.') === 0) {
            res = res.concat(this.storage[key]);
        }
    }

    return res;
};

module.exports = KeyTreeStore;

},{}],53:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/ampersand-sync.js":30,"qs":54,"underscore":59,"xhr":60}],54:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./lib":55,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/qs/index.js":31}],55:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./parse":56,"./stringify":57,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/qs/lib/index.js":32}],56:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"./utils":58,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/qs/lib/parse.js":33}],57:[function(require,module,exports){
(function (Buffer){
// Load modules


// Declare internals

var internals = {
    delimiter: '&'
};


internals.stringify = function (obj, prefix) {

    if (Buffer.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']'));
        }
    }

    return values;
};


module.exports = function (obj, delimiter) {

    delimiter = typeof delimiter === 'undefined' ? internals.delimiter : delimiter;

    var keys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys = keys.concat(internals.stringify(obj[key], key));
        }
    }

    return keys.join(delimiter);
};

}).call(this,require("buffer").Buffer)

},{"buffer":98}],58:[function(require,module,exports){
(function (Buffer){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.clone = function (source) {

    if (typeof source !== 'object' ||
        source === null) {

        return source;
    }

    if (Buffer.isBuffer(source)) {
        return source.toString();
    }

    var obj = Array.isArray(source) ? [] : {};
    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            obj[i] = exports.clone(source[i]);
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    var obj = exports.clone(target);

    if (Array.isArray(source)) {
        for (var i = 0, il = source.length; i < il; ++i) {
            if (typeof source[i] !== 'undefined') {
                if (typeof obj[i] === 'object') {
                    obj[i] = exports.merge(obj[i], source[i]);
                }
                else {
                    obj[i] = source[i];
                }
            }
        }

        return obj;
    }

    if (Array.isArray(obj)) {
        obj = exports.arrayToObject(obj);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (value &&
            typeof value === 'object') {

            if (!obj[key]) {
                obj[key] = exports.clone(value);
            }
            else {
                obj[key] = exports.merge(obj[key], value);
            }
        }
        else {
            obj[key] = value;
        }
    }

    return obj;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj) {

    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var compacted = {};

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                compacted[key] = [];

                for (var i = 0, l = obj[key].length; i < l; i++) {
                    if (typeof obj[key][i] !== 'undefined') {
                        compacted[key].push(obj[key][i]);
                    }
                }
            }
            else {
                compacted[key] = exports.compact(obj[key]);
            }
        }
    }

    return compacted;
};

}).call(this,require("buffer").Buffer)

},{"buffer":98}],59:[function(require,module,exports){
module.exports=require(36)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/underscore/underscore.js":36}],60:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/index.js":37,"global/window":61,"once":62,"parse-headers":66}],61:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],62:[function(require,module,exports){
module.exports=require(39)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/node_modules/once/once.js":39}],63:[function(require,module,exports){
module.exports=require(40)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/node_modules/parse-headers/node_modules/for-each/index.js":40,"is-function":64}],64:[function(require,module,exports){
module.exports=require(41)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/node_modules/parse-headers/node_modules/for-each/node_modules/is-function/index.js":41}],65:[function(require,module,exports){
module.exports=require(42)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/node_modules/parse-headers/node_modules/trim/index.js":42}],66:[function(require,module,exports){
module.exports=require(43)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/xhr/node_modules/parse-headers/parse-headers.js":43,"for-each":63,"trim":65}],67:[function(require,module,exports){
var Events = require('backbone-events-standalone');
var _ = require('underscore');


// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither.
var History = function () {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
        this.location = window.location;
        this.history = window.history;
    }
};

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

// Has the history handling already been started?
History.started = false;

// Set up all inheritable **Backbone.History** properties and methods.
_.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function () {
        var path = this.location.pathname.replace(/[^\/]$/, '$&/');
        return path === this.root && !this.location.search;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function (window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function () {
        var path = decodeURI(this.location.pathname + this.location.search);
        var root = this.root.slice(0, -1);
        if (!path.indexOf(root)) path = path.slice(root.length);
        return path.slice(1);
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function (fragment) {
        if (fragment == null) {
            if (this._hasPushState || !this._wantsHashChange) {
                fragment = this.getPath();
            } else {
                fragment = this.getHash();
            }
        }
        return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function (options) {
        if (History.started) throw new Error("Backbone.history has already been started");
        History.started = true;

        // Figure out the initial configuration.
        // Is pushState desired ... is it available?
        this.options          = _.extend({root: '/'}, this.options, options);
        this.root             = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._hasHashChange   = 'onhashchange' in window;
        this._wantsPushState  = !!this.options.pushState;
        this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
        this.fragment         = this.getFragment();

        // Add a cross-platform `addEventListener` shim for older browsers.
        var addEventListener = window.addEventListener;

        // Normalize root to always include a leading and trailing slash.
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');

        // Depending on whether we're using pushState or hashes, and whether
        // 'onhashchange' is supported, determine how we check the URL state.
        if (this._hasPushState) {
            addEventListener('popstate', this.checkUrl, false);
        } else if (this._wantsHashChange && this._hasHashChange) {
            addEventListener('hashchange', this.checkUrl, false);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        // Transition from hashChange to pushState or vice versa if both are
        // requested.
        if (this._wantsHashChange && this._wantsPushState) {

            // If we've started off with a route from a `pushState`-enabled
            // browser, but we're currently in a browser that doesn't support it...
            if (!this._hasPushState && !this.atRoot()) {
                this.location.replace(this.root + '#' + this.getPath());
                // Return immediately as browser will do redirect to new url
                return true;

            // Or if we've started out with a hash-based route, but we're currently
            // in a browser where it could be `pushState`-based instead...
            } else if (this._hasPushState && this.atRoot()) {
                this.navigate(this.getHash(), {replace: true});
            }
        }

        if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function () {
        // Add a cross-platform `removeEventListener` shim for older browsers.
        var removeEventListener = window.removeEventListener;

        // Remove window listeners.
        if (this._hasPushState) {
            removeEventListener('popstate', this.checkUrl, false);
        } else if (this._wantsHashChange && this._hasHashChange) {
            removeEventListener('hashchange', this.checkUrl, false);
        }

        // Some environments will throw when clearing an undefined interval.
        if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
        History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function (route, callback) {
        this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`.
    checkUrl: function (e) {
        var current = this.getFragment();
        if (current === this.fragment) return false;
        this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function (fragment) {
        fragment = this.fragment = this.getFragment(fragment);
        return this.handlers.some(function (handler) {
            if (handler.route.test(fragment)) {
                handler.callback(fragment);
                return true;
            }
        });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function (fragment, options) {
        if (!History.started) return false;
        if (!options || options === true) options = {trigger: !!options};

        var url = this.root + (fragment = this.getFragment(fragment || ''));

        // Strip the hash and decode for matching.
        fragment = decodeURI(fragment.replace(pathStripper, ''));

        if (this.fragment === fragment) return;
        this.fragment = fragment;

        // Don't include a trailing slash on the root.
        if (fragment === '' && url !== '/') url = url.slice(0, -1);

        // If pushState is available, we use it to set the fragment as a real URL.
        if (this._hasPushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

            // If hash changes haven't been explicitly disabled, update the hash
            // fragment to store history.
        } else if (this._wantsHashChange) {
            this._updateHash(this.location, fragment, options.replace);
            // If you've told us that you explicitly don't want fallback hashchange-
            // based history, then `navigate` becomes a page refresh.
        } else {
            return this.location.assign(url);
        }
        if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function (location, fragment, replace) {
        if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
        } else {
            // Some browsers require that `hash` contains a leading #.
            location.hash = '#' + fragment;
        }
    }

});

module.exports = new History();

},{"backbone-events-standalone":71,"underscore":72}],68:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-router"] = window.ampersand["ampersand-router"] || [];  window.ampersand["ampersand-router"].push("1.0.6");}
var classExtend = require('ampersand-class-extend');
var Events = require('backbone-events-standalone');
var ampHistory = require('./ampersand-history');
var _ = require('underscore');


// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
var Router = module.exports = function (options) {
    options || (options = {});
    this.history = options.history || ampHistory;
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Set up all inheritable **Backbone.Router** properties and methods.
_.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function (query, num) {
    //       ...
    //     });
    //
    route: function (route, name, callback) {
        if (!_.isRegExp(route)) route = this._routeToRegExp(route);
        if (_.isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) callback = this[name];
        var router = this;
        this.history.route(route, function (fragment) {
            var args = router._extractParameters(route, fragment);
            if (router.execute(callback, args, name) !== false) {
                router.trigger.apply(router, ['route:' + name].concat(args));
                router.trigger('route', name, args);
                router.history.trigger('route', router, name, args);
            }
        });
        return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function (callback, args, name) {
        if (callback) callback.apply(this, args);
    },

    // Simple proxy to `ampHistory` to save a fragment into the history.
    navigate: function (fragment, options) {
        this.history.navigate(fragment, options);
        return this;
    },

    // Helper for doing `internal` redirects without adding to history
    // and thereby breaking backbutton functionality.
    redirectTo: function (newUrl) {
        this.navigate(newUrl, {replace: true, trigger: true});
    },

    // Bind all defined routes to `history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function () {
        if (!this.routes) return;
        this.routes = _.result(this, 'routes');
        var route, routes = Object.keys(this.routes);
        while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
        }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function (route) {
        route = route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, function (match, optional) {
                return optional ? match : '([^/?]+)';
            })
            .replace(splatParam, '([^?]*?)');
        return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function (route, fragment) {
        var params = route.exec(fragment).slice(1);
        return params.map(function (param, i) {
            // Don't decode the search params.
            if (i === params.length - 1) return param || null;
            return param ? decodeURIComponent(param) : null;
        });
    }

});

Router.extend = classExtend;

},{"./ampersand-history":67,"ampersand-class-extend":69,"backbone-events-standalone":71,"underscore":72}],69:[function(require,module,exports){
module.exports=require(18)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/ampersand-class-extend/ampersand-class-extend.js":18,"extend-object":96}],70:[function(require,module,exports){
module.exports=require(19)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/backbone-events-standalone.js":19}],71:[function(require,module,exports){
module.exports=require(20)
},{"./backbone-events-standalone":70,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/index.js":20}],72:[function(require,module,exports){
module.exports=require(36)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/underscore/underscore.js":36}],73:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-view-switcher"] = window.ampersand["ampersand-view-switcher"] || [];  window.ampersand["ampersand-view-switcher"].push("1.1.2");}
function ViewSwitcher(el, options) {
    options || (options = {});
    this.el = el;
    this.config = {
        hide: null,
        show: null,
        empty: null,
        waitForRemove: false
    };
    for (var item in options) {
        if (this.config.hasOwnProperty(item)) {
            this.config[item] = options[item];
        }
    }
    if (options.view) {
        this.set(options.view);
    } else {
        // call this so the empty callback gets called
        this._onViewRemove();
    }
}

ViewSwitcher.prototype.set = function (view) {
    var self = this;
    var prev = this.previous = this.current;
    var current = this._setCurrent(view);
    if (this.config.waitForRemove) {
        this._hide(prev, function () {
            // make sure we're still dealing with the same one
            // that way if we're navigating quickly we don't start
            // to show one that's already old.
            if (prev === self.previous && current === self.current) {
                self._show(current);
            }
        });
    } else {
        this._hide(prev);
        this._show(current);
    }
};

ViewSwitcher.prototype._setCurrent = function (view) {
    this.current = view;
    if (view) this._registerRemoveListener(view);
    var emptyCb = this.config.empty;
    if (emptyCb && !this.current) {
        emptyCb();
    }
    return view;
};

ViewSwitcher.prototype.clear = function (cb) {
    this._hide(this.current, cb);
};

// If the view switcher itself is removed, remove its child to avoid memory leaks
ViewSwitcher.prototype.remove = function () {
    if (this.current) this.current.remove();
};

ViewSwitcher.prototype._show = function (view, cb) {
    var customShow = this.config.show;
    if (customShow) {
        // async
        if (customShow.length === 3) {
            this._render(view);
            customShow(view, cb);
        } else {
            this._render(view);
            customShow(view);
            if (cb) cb();
        }
    } else {
        this._render(view);
        if (cb) cb();
    }
};

ViewSwitcher.prototype._registerRemoveListener = function (view) {
    if (view) view.once('remove', this._onViewRemove, this);
};

ViewSwitcher.prototype._onViewRemove = function (view) {
    var emptyCb = this.config.empty;
    if (this.current === view) {
        this.current = null;
    }
    if (emptyCb && !this.current) {
        emptyCb();
    }
};

ViewSwitcher.prototype._render = function (view) {
    if (!view.rendered) view.render({containerEl: this.el});
    if (!view.insertSelf) this.el.appendChild(view.el);
};

ViewSwitcher.prototype._hide = function (view, cb) {
    if (!view) return cb && cb();
    var customHide = this.config.hide;
    if (customHide) {
        // async
        if (customHide.length === 3) {
            customHide(view, this.current, function () {
                view.remove();
                if (cb) cb();
            });
        } else {
            customHide(view, this.current);
            view.remove();
            if (cb) cb();
        }
    } else {
        view.remove();
        if (cb) cb();
    }
};


module.exports = ViewSwitcher;

},{}],74:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-view"] = window.ampersand["ampersand-view"] || [];  window.ampersand["ampersand-view"].push("7.2.0");}
var State = require('ampersand-state');
var CollectionView = require('ampersand-collection-view');
var domify = require('domify');
var _ = require('underscore');
var events = require('events-mixin');
var matches = require('matches-selector');
var bindings = require('ampersand-dom-bindings');
var getPath = require('get-object-path');


function View(attrs) {
    this.cid = _.uniqueId('view');
    attrs || (attrs = {});
    var parent = attrs.parent;
    delete attrs.parent;
    BaseState.call(this, attrs, {init: false, parent: parent});
    this.on('change:el', this._handleElementChange, this);
    this._parsedBindings = bindings(this.bindings, this);
    this._initializeBindings();
    if (attrs.el && !this.autoRender) {
        this._handleElementChange();
    }
    this._initializeSubviews();
    this.template = attrs.template || this.template;
    this.initialize.apply(this, arguments);
    this.set(_.pick(attrs, viewOptions));
    if (this.autoRender && this.template) {
        this.render();
    }
}

var BaseState = State.extend({
    dataTypes: {
        element: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal instanceof Element ? 'element' : typeof newVal
                };
            },
            compare: function (el1, el2) {
                return el1 === el2;
            }
        },
        collection: {
            set: function (newVal) {
                return {
                    val: newVal,
                    type: newVal && newVal.isCollection ? 'collection' : typeof newVal
                };
            },
            compare: function (currentVal, newVal) {
                return currentVal === newVal;
            }
        }
    },
    props: {
        model: 'state',
        el: 'element',
        collection: 'collection'
    },
    derived: {
        rendered: {
            deps: ['el'],
            fn: function () {
                return !!this.el;
            }
        },
        hasData: {
            deps: ['model'],
            fn: function () {
                return !!this.model;
            }
        }
    }
});

// Cached regex to split keys for `delegate`.
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

// List of view options to be merged as properties.
var viewOptions = ['model', 'collection', 'el'];

View.prototype = Object.create(BaseState.prototype);

// Set up all inheritable properties and methods.
_.extend(View.prototype, {
    // ## query
    // Get an single element based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`.
    // If you pass an element we just return it back.
    // This lets us use `get` to handle cases where users
    // can pass a selector or an already selected element.
    query: function (selector) {
        if (!selector) return this.el;
        if (typeof selector === 'string') {
            if (matches(this.el, selector)) return this.el;
            return this.el.querySelector(selector) || undefined;
        }
        return selector;
    },

    // ## queryAll
    // Returns an array of elements based on CSS selector scoped to this.el
    // if you pass an empty string it return `this.el`. Also includes root
    // element.
    queryAll: function (selector) {
        var res = [];
        if (!this.el) return res;
        if (selector === '') return [this.el];
        if (matches(this.el, selector)) res.push(this.el);
        return res.concat(Array.prototype.slice.call(this.el.querySelectorAll(selector)));
    },

    // ## queryByHook
    // Convenience method for fetching element by it's `data-hook` attribute.
    // Also tries to match against root element.
    // Also supports matching 'one' of several space separated hooks.
    queryByHook: function (hook) {
        return this.query('[data-hook~="' + hook + '"]');
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {},

    // **render** is the core function that your view can override, its job is
    // to populate its element (`this.el`), with the appropriate HTML.
    render: function () {
        this.renderWithTemplate(this);
        return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable events listeners.
    remove: function () {
        var parsedBindings = this._parsedBindings;
        if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
        if (this._subviews) _.chain(this._subviews).flatten().invoke('remove');
        this.stopListening();
        // TODO: Not sure if this is actually necessary.
        // Just trying to de-reference this potentially large
        // amount of generated functions to avoid memory leaks.
        _.each(parsedBindings, function (properties, modelName) {
            _.each(properties, function (value, key) {
                delete parsedBindings[modelName][key];
            });
            delete parsedBindings[modelName];
        });
        this.trigger('remove', this);
        return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    _handleElementChange: function (element, delegate) {
        if (this.eventManager) this.eventManager.unbind();
        this.eventManager = events(this.el, this);
        this.delegateEvents();
        this._applyBindingsForKey();
        return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function (e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function (events) {
        if (!(events || (events = _.result(this, 'events')))) return this;
        this.undelegateEvents();
        for (var key in events) {
            this.eventManager.bind(key, events[key]);
        }
        return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function () {
        this.eventManager.unbind();
        return this;
    },

    // ## registerSubview
    // Pass it a view. This can be anything with a `remove` method
    registerSubview: function (view) {
        // Storage for our subviews.
        this._subviews || (this._subviews = []);
        this._subviews.push(view);
        // If view has an 'el' it's a single view not
        // an array of views registered by renderCollection
        // so we store a reference to the parent view.
        if (view.el) view.parent = this;
        return view;
    },

    // ## renderSubview
    // Pass it a view instance and a container element
    // to render it in. It's `remove` method will be called
    // when the parent view is destroyed.
    renderSubview: function (view, container) {
        if (typeof container === 'string') {
            container = this.query(container);
        }
        this.registerSubview(view);
        view.render();
        (container || this.el).appendChild(view.el);
        return view;
    },

    _applyBindingsForKey: function (name) {
        if (!this.el) return;
        var fns = this._parsedBindings.getGrouped(name);
        var item;
        for (item in fns) {
            fns[item].forEach(function (fn) {
                fn(this.el, getPath(this, item), _.last(item.split('.')));
            }, this);
        }
    },

    _initializeBindings: function () {
        if (!this.bindings) return;
        this.on('all', function (eventName) {
            if (eventName.slice(0, 7) === 'change:') {
                this._applyBindingsForKey(eventName.split(':')[1]);
            }
        }, this);
    },

    // ## _initializeSubviews
    // this is called at setup and grabs declared subviews
    _initializeSubviews: function () {
        if (!this.subviews) return;
        for (var item in this.subviews) {
            this._parseSubview(this.subviews[item], item);
        }
    },

    // ## _parseSubview
    // helper for parsing out the subview declaration and registering
    // the `waitFor` if need be.
    _parseSubview: function (subview, name) {
        var self = this;
        var opts = {
            selector: subview.container || '[data-hook="' + subview.hook + '"]',
            waitFor: subview.waitFor || '',
            prepareView: subview.prepareView || function (el) {
                return new subview.constructor({
                    el: el,
                    parent: self
                });
            }
        };
        function action() {
            var el, subview;
            // if not rendered or we can't find our element, stop here.
            if (!this.el || !(el = this.query(opts.selector))) return;
            if (!opts.waitFor || getPath(this, opts.waitFor)) {
                subview = this[name] = opts.prepareView.call(this, el);
                subview.render();
                this.registerSubview(subview);
                this.off('change', action);
            }
        }
        // we listen for main `change` items
        this.on('change', action, this);
    },


    // Shortcut for doing everything we need to do to
    // render and fully replace current root element.
    // Either define a `template` property of your view
    // or pass in a template directly.
    // The template can either be a string or a function.
    // If it's a function it will be passed the `context`
    // argument.
    renderWithTemplate: function (context, templateArg) {
        var template = templateArg || this.template;
        if (!template) throw new Error('Template string or function needed.');
        var newDom = _.isString(template) ? template : template.call(this, context || this);
        if (_.isString(newDom)) newDom = domify(newDom);
        var parent = this.el && this.el.parentNode;
        if (parent) parent.replaceChild(newDom, this.el);
        if (newDom.nodeName === '#document-fragment') throw new Error('Views can only have one root element.');
        this.el = newDom;
        return this;
    },

    // ## cacheElements
    // This is a shortcut for adding reference to specific elements within your view for
    // access later. This avoids excessive DOM queries and makes it easier to update
    // your view if your template changes.
    //
    // In your `render` method. Use it like so:
    //
    //     render: function () {
    //       this.basicRender();
    //       this.cacheElements({
    //         pages: '#pages',
    //         chat: '#teamChat',
    //         nav: 'nav#views ul',
    //         me: '#me',
    //         cheatSheet: '#cheatSheet',
    //         omniBox: '#awesomeSauce'
    //       });
    //     }
    //
    // Then later you can access elements by reference like so: `this.pages`, or `this.chat`.
    cacheElements: function (hash) {
        for (var item in hash) {
            this[item] = this.query(hash[item]);
        }
    },

    // ## listenToAndRun
    // Shortcut for registering a listener for a model
    // and also triggering it right away.
    listenToAndRun: function (object, events, handler) {
        var bound = _.bind(handler, this);
        this.listenTo(object, events, bound);
        bound();
    },

    // ## animateRemove
    // Placeholder for if you want to do something special when they're removed.
    // For example fade it out, etc.
    // Any override here should call `.remove()` when done.
    animateRemove: function () {
        this.remove();
    },

    // ## renderCollection
    // Method for rendering a collections with individual views.
    // Just pass it the collection, and the view to use for the items in the
    // collection. The collectionView is returned.
    renderCollection: function (collection, ViewClass, container, opts) {
        var containerEl = (typeof container === 'string') ? this.query(container) : container;
        var config = _.extend({
            collection: collection,
            el: containerEl || this.el,
            view: ViewClass,
            parent: this,
            viewOptions: {
                parent: this
            }
        }, opts);
        var collectionView = new CollectionView(config);
        collectionView.render();
        return this.registerSubview(collectionView);
    }
});

View.extend = BaseState.extend;
module.exports = View;

},{"ampersand-collection-view":75,"ampersand-dom-bindings":79,"ampersand-state":81,"domify":94,"events-mixin":86,"get-object-path":91,"matches-selector":92,"underscore":93}],75:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-collection-view"] = window.ampersand["ampersand-collection-view"] || [];  window.ampersand["ampersand-collection-view"].push("1.1.3");}
var _ = require('underscore');
var BBEvents = require('backbone-events-standalone');
var ampExtend = require('ampersand-class-extend');

// options
var options = ['collection', 'el', 'viewOptions', 'view', 'filter', 'reverse', 'parent'];


function CollectionView(spec) {
    if (!spec) {
        throw new ReferenceError('Collection view missing required parameters: collection, el');
    }
    if (!spec.collection) {
        throw new ReferenceError('Collection view requires a collection');
    }
    if (!spec.el && !this.insertSelf) {
        throw new ReferenceError('Collection view requires an el');
    }
    _.extend(this, _.pick(spec, options));
    this.views = [];
    this.listenTo(this.collection, 'add', this._addViewForModel);
    this.listenTo(this.collection, 'remove', this._removeViewForModel);
    this.listenTo(this.collection, 'sort', this._rerenderAll);
    this.listenTo(this.collection, 'refresh reset', this._reset);
}

_.extend(CollectionView.prototype, BBEvents, {
    // for view contract compliance
    render: function () {
        this._renderAll();
        return this;
    },
    remove: function () {
        _.invoke(this.views, 'remove');
        this.stopListening();
    },
    _getViewByModel: function (model) {
        return _.find(this.views, function (view) {
            return model === view.model;
        });
    },
    _createViewForModel: function (model) {
        var view = new this.view(_({model: model, collection: this.collection}).extend(this.viewOptions));
        this.views.push(view);
        view.parent = this;
        view.renderedByParentView = true;
        view.render();
        return view;
    },
    _getOrCreateByModel: function (model) {
        return this._getViewByModel(model) || this._createViewForModel(model);
    },
    _addViewForModel: function (model, collection, options) {
        var view = this._getViewByModel(model);
        var matches = this.filter ? this.filter(model) : true;
        if (!matches) {
            return;
        }
        if (!view) {
            view = new this.view(_({model: model, collection: this.collection}).extend(this.viewOptions));
            this.views.push(view);
            view.parent = this;
            view.renderedByParentView = true;
            view.render({containerEl: this.el});
        }
        if (options && options.rerender) {
            this._insertView(view);
        } else {
            this._insertViewAtIndex(view);
        }
    },
    _insertViewAtIndex: function (view) {
        if (!view.insertSelf) {
            var pos = this.collection.indexOf(view.model);
            var modelToInsertBefore, viewToInsertBefore;

            if (this.reverse) {
                modelToInsertBefore = this.collection.at(pos - 1);
            } else {
                modelToInsertBefore = this.collection.at(pos + 1);
            }

            viewToInsertBefore = this._getViewByModel(modelToInsertBefore);

            // FIX IE bug (https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore)
            // "In Internet Explorer an undefined value as referenceElement will throw errors, while in rest of the modern browsers, this works fine."
            if(viewToInsertBefore) {
                this.el.insertBefore(view.el, viewToInsertBefore && viewToInsertBefore.el);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _insertView: function (view) {
        if (!view.insertSelf) {
            if (this.reverse && this.el.firstChild) {
                this.el.insertBefore(view.el, this.el.firstChild);
            } else {
                this.el.appendChild(view.el);
            }
        }
    },
    _removeViewForModel: function (model) {
        var view = this._getViewByModel(model);
        if (!view) {
            return;
        }
        var index = this.views.indexOf(view);
        if (index !== -1) {
            // remove it if we found it calling animateRemove
            // to give user option of gracefully destroying.
            view = this.views.splice(index, 1)[0];
            this._removeView(view);
        }
    },
    _removeView: function (view) {
        if (view.animateRemove) {
            view.animateRemove();
        } else {
            view.remove();
        }
    },
    _renderAll: function () {
        this.collection.each(this._addViewForModel, this);
    },
    _rerenderAll: function (collection, options) {
        options = options || {};
        this.collection.each(function (model) {
            this._addViewForModel(model, this, _.extend(options, {rerender: true}));
        }, this);
    },
    _reset: function () {
        var newViews = this.collection.map(this._getOrCreateByModel, this);

        //Remove existing views from the ui
        var toRemove = _.difference(this.views, newViews);
        toRemove.forEach(this._removeView, this);

        //Rerender the full list with the new views
        this.views = newViews;
        this._rerenderAll();
    }
});

CollectionView.extend = ampExtend;

module.exports = CollectionView;

},{"ampersand-class-extend":76,"backbone-events-standalone":78,"underscore":93}],76:[function(require,module,exports){
module.exports=require(18)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/ampersand-class-extend/ampersand-class-extend.js":18,"extend-object":96}],77:[function(require,module,exports){
/**
 * Standalone extraction of Backbone.Events, no external dependency required.
 * Degrades nicely when Backone/underscore are already available in the current
 * global context.
 *
 * Note that docs suggest to use underscore's `_.extend()` method to add Events
 * support to some given object. A `mixin()` method has been added to the Events
 * prototype to avoid using underscore for that sole purpose:
 *
 *     var myEventEmitter = BackboneEvents.mixin({});
 *
 * Or for a function constructor:
 *
 *     function MyConstructor(){}
 *     MyConstructor.prototype.foo = function(){}
 *     BackboneEvents.mixin(MyConstructor.prototype);
 *
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * (c) 2013 Nicolas Perriault
 */
/* global exports:true, define, module */
(function() {
  var root = this,
      breaker = {},
      nativeForEach = Array.prototype.forEach,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      slice = Array.prototype.slice,
      idCounter = 0;

  // Returns a partial implementation matching the minimal API subset required
  // by Backbone.Events
  function miniscore() {
    return {
      keys: Object.keys || function (obj) {
        if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
          throw new TypeError("keys() called on a non-object");
        }
        var key, keys = [];
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            keys[keys.length] = key;
          }
        }
        return keys;
      },

      uniqueId: function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
      },

      has: function(obj, key) {
        return hasOwnProperty.call(obj, key);
      },

      each: function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (this.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      },

      once: function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      }
    };
  }

  var _ = miniscore(), Events;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Mixin utility
  Events.mixin = function(proto) {
    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
                   'listenToOnce', 'bind', 'unbind'];
    _.each(exports, function(name) {
      proto[name] = this[name];
    }, this);
    return proto;
  };

  // Export Events as BackboneEvents depending on current context
  if (typeof define === "function") {
    define(function() {
      return Events;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.BackboneEvents = Events;
  } else {
    root.BackboneEvents = Events;
  }
})(this);

},{}],78:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"./backbone-events-standalone":77,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/index.js":20}],79:[function(require,module,exports){
;if (typeof window !== "undefined") {  window.ampersand = window.ampersand || {};  window.ampersand["ampersand-dom-bindings"] = window.ampersand["ampersand-dom-bindings"] || [];  window.ampersand["ampersand-dom-bindings"].push("3.3.3");}
var Store = require('key-tree-store');
var dom = require('ampersand-dom');
var matchesSelector = require('matches-selector');


// returns a key-tree-store of functions
// that can be applied to any element/model.

// all resulting functions should be called
// like func(el, value, lastKeyName)
module.exports = function (bindings, context) {
    var store = new Store();
    var key, current;

    for (key in bindings) {
        current = bindings[key];
        if (typeof current === 'string') {
            store.add(key, getBindingFunc({
                type: 'text',
                selector: current
            }));
        } else if (current.forEach) {
            current.forEach(function (binding) {
                store.add(key, getBindingFunc(binding, context));
            });
        } else {
            store.add(key, getBindingFunc(current, context));
        }
    }

    return store;
};


var slice = Array.prototype.slice;

function getMatches(el, selector) {
    if (selector === '') return [el];
    var matches = [];
    if (matchesSelector(el, selector)) matches.push(el);
    return matches.concat(slice.call(el.querySelectorAll(selector)));
}

function makeArray(val) {
    return Array.isArray(val) ? val : [val];
}

function getBindingFunc(binding, context) {
    var type = binding.type || 'text';
    var isCustomBinding = typeof type === 'function';
    var selector = (function () {
        if (typeof binding.selector === 'string') {
            return binding.selector;
        } else if (binding.hook) {
            return '[data-hook~="' + binding.hook + '"]';
        } else {
            return '';
        }
    })();
    var yes = binding.yes;
    var no = binding.no;
    var hasYesNo = !!(yes || no);

    // storage variable for previous if relevant
    var previousValue;

    if (isCustomBinding) {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                type.call(context, match, value, previousValue);
            });
            previousValue = value;
        };
    } else if (type === 'text') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.text(match, value);
            });
        };
    } else if (type === 'class') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.switchClass(match, previousValue, value);
            });
            previousValue = value;
        };
    } else if (type === 'attribute') {
        if (!binding.name) throw Error('attribute bindings must have a "name"');
        return function (el, value) {
            var names = makeArray(binding.name);
            getMatches(el, selector).forEach(function (match) {
                names.forEach(function (name) {
                    dom.setAttribute(match, name, value);
                });
            });
            previousValue = value;
        };
    } else if (type === 'value') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                if (!value && value !== 0) value = '';
                // only apply bindings if element is not currently focused
                if (document.activeElement !== match) match.value = value;
            });
            previousValue = value;
        };
    } else if (type === 'booleanClass') {
        // if there's a `no` case this is actually a switch
        if (hasYesNo) {
            yes = makeArray(yes || '');
            no = makeArray(no || '');
            return function (el, value) {
                var prevClass = value ? no : yes;
                var newClass = value ? yes : no;
                getMatches(el, selector).forEach(function (match) {
                    prevClass.forEach(function (pc) {
                        dom.removeClass(match, pc);
                    });
                    newClass.forEach(function (nc) {
                        dom.addClass(match, nc);
                    });
                });
            };
        } else {
            return function (el, value, keyName) {
                var name = makeArray(binding.name || keyName);
                getMatches(el, selector).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            };
        }
    } else if (type === 'booleanAttribute') {
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            getMatches(el, selector).forEach(function (match) {
                name.forEach(function (attr) {
                    dom[value ? 'addAttribute' : 'removeAttribute'](match, attr);
                });
            });
        };
    } else if (type === 'toggle') {
        // this doesn't require a selector since we can pass yes/no selectors
        if (hasYesNo) {
            return function (el, value) {
                getMatches(el, yes).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match);
                });
                getMatches(el, no).forEach(function (match) {
                    dom[value ? 'hide' : 'show'](match);
                });
            };
        } else {
            return function (el, value) {
                getMatches(el, selector).forEach(function (match) {
                    dom[value ? 'show' : 'hide'](match);
                });
            };
        }
    } else if (type === 'switch') {
        if (!binding.cases) throw Error('switch bindings must have "cases"');
        return function (el, value) {
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item]).forEach(function (match) {
                    dom[value === item ? 'show' : 'hide'](match);
                });
            }
        };
    } else if (type === 'innerHTML') {
        return function (el, value) {
            getMatches(el, selector).forEach(function (match) {
                dom.html(match, value);
            });
        };
    } else if (type === 'switchClass') {
        if (!binding.cases) throw Error('switchClass bindings must have "cases"');
        return function (el, value, keyName) {
            var name = makeArray(binding.name || keyName);
            for (var item in binding.cases) {
                getMatches(el, binding.cases[item]).forEach(function (match) {
                    name.forEach(function (className) {
                        dom[value === item ? 'addClass' : 'removeClass'](match, className);
                    });
                });
            }
        };
    } else {
        throw new Error('no such binding type: ' + type);
    }
}

},{"ampersand-dom":22,"key-tree-store":80,"matches-selector":92}],80:[function(require,module,exports){
var slice = Array.prototype.slice;

// our constructor
function KeyTreeStore() {
    this.storage = {};
}

// add an object to the store
KeyTreeStore.prototype.add = function (keypath, obj) {
    var arr = this.storage[keypath] || (this.storage[keypath] = []);
    arr.push(obj);
};

// remove an object
KeyTreeStore.prototype.remove = function (obj) {
    var path, arr;
    for (path in this.storage) {
        arr = this.storage[path];
        arr.some(function (item, index) {
            if (item === obj) {
                arr.splice(index, 1);
                return true;
            }
        });
    }
};

// get array of all all relevant functions, without keys
KeyTreeStore.prototype.get = function (keypath) {
    var res = [];
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + '.') === 0) {
            res = res.concat(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getGrouped = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (!keypath || keypath === key || key.indexOf(keypath + '.') === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// get all results that match keypath but still grouped by key
KeyTreeStore.prototype.getAll = function (keypath) {
    var res = {};
    var key;

    for (key in this.storage) {
        if (keypath === key || key.indexOf(keypath + '.') === 0) {
            res[key] = slice.call(this.storage[key]);
        }
    }

    return res;
};

// run all matches with optional context
KeyTreeStore.prototype.run = function (keypath, context) {
    var args = slice.call(arguments, 2);
    this.get(keypath).forEach(function (fn) {
        fn.apply(context || this, args);
    });
};



module.exports = KeyTreeStore;

},{}],81:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-model/node_modules/ampersand-state/ampersand-state.js":48,"array-next":82,"backbone-events-standalone":84,"key-tree-store":85,"underscore":93}],82:[function(require,module,exports){
module.exports=require(49)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-model/node_modules/ampersand-state/node_modules/array-next/array-next.js":49}],83:[function(require,module,exports){
module.exports=require(19)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/backbone-events-standalone.js":19}],84:[function(require,module,exports){
module.exports=require(20)
},{"./backbone-events-standalone":83,"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/backbone-events-standalone/index.js":20}],85:[function(require,module,exports){
module.exports=require(52)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-model/node_modules/ampersand-state/node_modules/key-tree-store/key-tree-store.js":52}],86:[function(require,module,exports){

/**
 * Module dependencies.
 */

var events = require('component-event');
var delegate = require('delegate-events');
var forceCaptureEvents = ['focus', 'blur'];

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  var capture = (forceCaptureEvents.indexOf(event) !== -1);
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb, capture);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

},{"component-event":87,"delegate-events":88}],87:[function(require,module,exports){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
},{}],88:[function(require,module,exports){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

// Some events don't bubble, so we want to bind to the capture phase instead
// when delegating.
var forceCaptureEvents = ['focus', 'blur'];

exports.bind = function(el, selector, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  event.unbind(el, type, fn, capture);
};

},{"closest":89,"event":87}],89:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":90}],90:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],91:[function(require,module,exports){
module.exports = get;

function get (context, path) {
  if (path.indexOf('.') == -1 && path.indexOf('[') == -1) {
    return context[path];
  }

  var crumbs = path.split(/\.|\[|\]/g);
  var i = -1;
  var len = crumbs.length;
  var result;

  while (++i < len) {
    if (i == 0) result = context;
    if (!crumbs[i]) continue;
    if (result == undefined) break;
    result = result[crumbs[i]];
  }

  return result;
}

},{}],92:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],93:[function(require,module,exports){
module.exports=require(36)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-hoodie-collection/node_modules/ampersand-rest-collection/node_modules/ampersand-collection-rest-mixin/node_modules/ampersand-sync/node_modules/underscore/underscore.js":36}],94:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var div = document.createElement('div');
// Setup
div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
var innerHTMLBug = !div.getElementsByTagName('link').length;
div = undefined;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],95:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }

});

},{}],96:[function(require,module,exports){
var arr = [];
var each = arr.forEach;
var slice = arr.slice;


module.exports = function(obj) {
    each.call(slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

},{}],97:[function(require,module,exports){
// follow @HenrikJoreteg and @andyet if you like this ;)
// props to @mathias for this https://gist.github.com/428626 which served as starting point
// for this code.
(function () {
    function setFavicon(href) {
        var head = (document.head = document.getElementsByTagName('head')[0]);
        var faviconId = 'favicon';
        var link = document.createElement('link');
        var oldLink = document.getElementById(faviconId);
        link.id = faviconId;
        link.rel = 'shortcut icon';
        link.href = href;
        if (oldLink) {
            head.removeChild(oldLink);
        }
        head.appendChild(link);

        return this;
    };

    // export for various systems
    if (typeof module !== 'undefined') {
        module.exports = setFavicon;
    } else if (typeof $ !== 'undefined') {
        $.setFavicon = setFavicon;
    } else {
        window.setFavicon = setFavicon;
    }
})();

},{}],98:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":99,"ieee754":100,"is-array":101}],99:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],100:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],101:[function(require,module,exports){
module.exports=require(21)
},{"/Users/mike/dev/node/ampersand/examples/hoodie/node_modules/ampersand-collection/node_modules/is-array/index.js":21}],102:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhbXAvY2xpZW50L2FwcC5qcyIsImFtcC9jbGllbnQvY2xpZW50SHRtbC5qcyIsImFtcC9jbGllbnQvZm9ybXMvcGVyc29uLmpzIiwiYW1wL2NsaWVudC9tb2RlbHMvbWUuanMiLCJhbXAvY2xpZW50L21vZGVscy9wZXJzb24uanMiLCJhbXAvY2xpZW50L21vZGVscy9wZXJzb25zLmpzIiwiYW1wL2NsaWVudC9wYWdlcy9jb2xsZWN0aW9uLWRlbW8uanMiLCJhbXAvY2xpZW50L3BhZ2VzL2hvbWUuanMiLCJhbXAvY2xpZW50L3BhZ2VzL3BlcnNvbi1hZGQuanMiLCJhbXAvY2xpZW50L3BhZ2VzL3BlcnNvbi1lZGl0LmpzIiwiYW1wL2NsaWVudC9wYWdlcy9wZXJzb24tdmlldy5qcyIsImFtcC9jbGllbnQvcm91dGVyLmpzIiwiYW1wL2NsaWVudC92aWV3cy9ob29kaWVBY2NvdW50YmFyLmpzIiwiYW1wL2NsaWVudC92aWV3cy9tYWluLmpzIiwiYW1wL2NsaWVudC92aWV3cy9wZXJzb24uanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tdW5kZXJzY29yZS1taXhpbi9hbXBlcnNhbmQtY29sbGVjdGlvbi11bmRlcnNjb3JlLW1peGluLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uL2FtcGVyc2FuZC1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY2xhc3MtZXh0ZW5kL2FtcGVyc2FuZC1jbGFzcy1leHRlbmQuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9iYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvaXMtYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWRvbS9hbXBlcnNhbmQtZG9tLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1mb3JtLXZpZXcvYW1wZXJzYW5kLWZvcm0tdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vYW1wZXJzYW5kLWhvb2RpZS1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWhvb2RpZS1taXhpbi9hbXBlcnNhbmQtaG9vZGllLW1peGluLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9hbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9hbXBlcnNhbmQtY29sbGVjdGlvbi1yZXN0LW1peGluLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvYW1wZXJzYW5kLXN5bmMuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWhvb2RpZS1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY29sbGVjdGlvbi1yZXN0LW1peGluL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3luYy9ub2RlX21vZHVsZXMvcXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWhvb2RpZS1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY29sbGVjdGlvbi1yZXN0LW1peGluL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3luYy9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW4vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW4vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy91bmRlcnNjb3JlL3VuZGVyc2NvcmUuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWhvb2RpZS1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY29sbGVjdGlvbi1yZXN0LW1peGluL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3luYy9ub2RlX21vZHVsZXMveGhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvbm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW4vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy94aHIvbm9kZV9tb2R1bGVzL29uY2Uvb25jZS5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW4vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy94aHIvbm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvbm9kZV9tb2R1bGVzL2Zvci1lYWNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvbm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9ub2RlX21vZHVsZXMvZm9yLWVhY2gvbm9kZV9tb2R1bGVzL2lzLWZ1bmN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbi9ub2RlX21vZHVsZXMvYW1wZXJzYW5kLXN5bmMvbm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9ub2RlX21vZHVsZXMvdHJpbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb24vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW4vbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy94aHIvbm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvcGFyc2UtaGVhZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtaG9vZGllLW1vZGVsL2FtcGVyc2FuZC1ob29kaWUtbW9kZWwuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLWlucHV0LXZpZXcvYW1wZXJzYW5kLWlucHV0LXZpZXcuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLW1vZGVsL2FtcGVyc2FuZC1tb2RlbC5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtbW9kZWwvbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zdGF0ZS9hbXBlcnNhbmQtc3RhdGUuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLW1vZGVsL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3RhdGUvbm9kZV9tb2R1bGVzL2FycmF5LW5leHQvYXJyYXktbmV4dC5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtbW9kZWwvbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zdGF0ZS9ub2RlX21vZHVsZXMva2V5LXRyZWUtc3RvcmUva2V5LXRyZWUtc3RvcmUuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLW1vZGVsL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3luYy9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtbW9kZWwvbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1zeW5jL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLW1vZGVsL25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtc3luYy9ub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1yb3V0ZXIvYW1wZXJzYW5kLWhpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXJvdXRlci9hbXBlcnNhbmQtcm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3LXN3aXRjaGVyL2FtcGVyc2FuZC12aWV3LXN3aXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L2FtcGVyc2FuZC12aWV3LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtY29sbGVjdGlvbi12aWV3L2FtcGVyc2FuZC1jb2xsZWN0aW9uLXZpZXcuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXZpZXcvbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1jb2xsZWN0aW9uLXZpZXcvbm9kZV9tb2R1bGVzL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L25vZGVfbW9kdWxlcy9hbXBlcnNhbmQtZG9tLWJpbmRpbmdzL2FtcGVyc2FuZC1kb20tYmluZGluZ3MuanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXZpZXcvbm9kZV9tb2R1bGVzL2FtcGVyc2FuZC1kb20tYmluZGluZ3Mvbm9kZV9tb2R1bGVzL2tleS10cmVlLXN0b3JlL2tleS10cmVlLXN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L25vZGVfbW9kdWxlcy9ldmVudHMtbWl4aW4vaW5kZXguanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXZpZXcvbm9kZV9tb2R1bGVzL2V2ZW50cy1taXhpbi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWV2ZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L25vZGVfbW9kdWxlcy9ldmVudHMtbWl4aW4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlLWV2ZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hbXBlcnNhbmQtdmlldy9ub2RlX21vZHVsZXMvZXZlbnRzLW1peGluL25vZGVfbW9kdWxlcy9kZWxlZ2F0ZS1ldmVudHMvbm9kZV9tb2R1bGVzL2Nsb3Nlc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXZpZXcvbm9kZV9tb2R1bGVzL2V2ZW50cy1taXhpbi9ub2RlX21vZHVsZXMvZGVsZWdhdGUtZXZlbnRzL25vZGVfbW9kdWxlcy9jbG9zZXN0L25vZGVfbW9kdWxlcy9tYXRjaGVzLXNlbGVjdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FtcGVyc2FuZC12aWV3L25vZGVfbW9kdWxlcy9nZXQtb2JqZWN0LXBhdGgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYW1wZXJzYW5kLXZpZXcvbm9kZV9tb2R1bGVzL21hdGNoZXMtc2VsZWN0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZG9taWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbXJlYWR5L3JlYWR5LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC1vYmplY3QvZXh0ZW5kLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mYXZpY29uLXNldHRlci9mYXZpY29uLXNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdW5kZXJzY29yZS91bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy96Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3R3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDclJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmdsb2JhbCBhcHAsIG1lLCAkKi9cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuLy92YXIgbG9nZ2VyID0gcmVxdWlyZSgnYW5kbG9nJyk7XG4vL3ZhciBjb25maWcgPSByZXF1aXJlKCdjbGllbnRjb25maWcnKTtcblxudmFyIFJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG52YXIgTWFpblZpZXcgPSByZXF1aXJlKCcuL3ZpZXdzL21haW4nKTtcbnZhciBNZSA9IHJlcXVpcmUoJy4vbW9kZWxzL21lJyk7XG52YXIgUGVvcGxlID0gcmVxdWlyZSgnLi9tb2RlbHMvcGVyc29ucycpO1xudmFyIGRvbVJlYWR5ID0gcmVxdWlyZSgnZG9tcmVhZHknKTtcbnZhciBjbGllbnRIdG1sID0gcmVxdWlyZSgnLi9jbGllbnRIdG1sLmpzJyk7XG4vL3ZhciBIb29kaWUgPSByZXF1aXJlKCdob29kaWUnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyB0aGlzIGlzIHRoZSB0aGUgd2hvbGUgYXBwIGluaXR0ZXJcbiAgICBibGFzdG9mZjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHdpbmRvdy5hcHAgPSB0aGlzO1xuXG4gICAgICAgIC8vIGluaXRpYWxpemUgSG9vZGllXG4gICAgICAgIHdpbmRvdy5ob29kaWUgID0gbmV3IEhvb2RpZSgpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgZ2xvYmFsICdtZScgb2JqZWN0IGFuZCBhbiBlbXB0eSBjb2xsZWN0aW9uIGZvciBvdXIgcGVvcGxlIG1vZGVscy5cbiAgICAgICAgd2luZG93Lm1lID0gbmV3IE1lKCk7XG4gICAgICAgIHRoaXMucGVvcGxlID0gbmV3IFBlb3BsZSgpO1xuXG4gICAgICAgIC8vbG9hZCBhbGwgdGhlIGh0bWxcbiAgICAgICAgdGhpcy5jbGllbnRIdG1sID0gY2xpZW50SHRtbDtcblxuICAgICAgICAvLyBpbml0IG91ciBVUkwgaGFuZGxlcnMgYW5kIHRoZSBoaXN0b3J5IHRyYWNrZXJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5cbiAgICAgICAgLy8gd2FpdCBmb3IgZG9jdW1lbnQgcmVhZHkgdG8gcmVuZGVyIG91ciBtYWluIHZpZXdcbiAgICAgICAgLy8gdGhpcyBlbnN1cmVzIHRoZSBkb2N1bWVudCBoYXMgYSBib2R5LCBldGMuXG4gICAgICAgIGRvbVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGluaXQgb3VyIG1haW4gdmlld1xuICAgICAgICAgICAgdmFyIG1haW5WaWV3ID0gc2VsZi52aWV3ID0gbmV3IE1haW5WaWV3KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogbWUsXG4gICAgICAgICAgICAgICAgZWw6IGRvY3VtZW50LmJvZHlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyAuLi5hbmQgcmVuZGVyIGl0XG4gICAgICAgICAgICBtYWluVmlldy5yZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB3aGF0IHdlIG5lZWQsIHdlIGNhbiBub3cgc3RhcnQgb3VyIHJvdXRlciBhbmQgc2hvdyB0aGUgYXBwcm9wcmlhdGUgcGFnZVxuICAgICAgICAgICAgc2VsZi5yb3V0ZXIuaGlzdG9yeS5zdGFydCh7cHVzaFN0YXRlOiB0cnVlLCByb290OiAnLyd9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIFRoaXMgaXMgaG93IHlvdSBuYXZpZ2F0ZSBhcm91bmQgdGhlIGFwcC5cbiAgICAvLyB0aGlzIGdldHMgY2FsbGVkIGJ5IGEgZ2xvYmFsIGNsaWNrIGhhbmRsZXIgdGhhdCBoYW5kbGVzXG4gICAgLy8gYWxsIHRoZSA8YT4gdGFncyBpbiB0aGUgYXBwLlxuICAgIC8vIGl0IGV4cGVjdHMgYSB1cmwgd2l0aG91dCBhIGxlYWRpbmcgc2xhc2guXG4gICAgLy8gZm9yIGV4YW1wbGU6IFwiY29zdGVsbG8vc2V0dGluZ3NcIi5cbiAgICBuYXZpZ2F0ZTogZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgdmFyIHVybCA9IChwYWdlLmNoYXJBdCgwKSA9PT0gJy8nKSA/IHBhZ2Uuc2xpY2UoMSkgOiBwYWdlO1xuICAgICAgICB0aGlzLnJvdXRlci5oaXN0b3J5Lm5hdmlnYXRlKHVybCwge3RyaWdnZXI6IHRydWV9KTtcbiAgICB9XG59O1xuXG4vLyBydW4gaXRcbm1vZHVsZS5leHBvcnRzLmJsYXN0b2ZmKCk7XG4iLCJ2YXIgY2xpZW50SHRtbCA9IHt9O1xuXG5jbGllbnRIdG1sW1wiYm9keVwiXSA9IFwiPGJvZHk+XFxuXCIgK1xuICAgXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWRlZmF1bHRcXFwiPlxcblwiICtcbiAgIFwiICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXItZmx1aWRcXFwiPlxcblwiICtcbiAgIFwiICAgIDxkaXYgY2xhc3M9XFxcIm5hdmJhci1oZWFkZXJcXFwiPjxhIGhyZWY9XFxcIi9cXFwiIGNsYXNzPVxcXCJuYXZiYXItYnJhbmRcXFwiPkFtcGVyc2FuZC1Ib29kaWUgRXhhbXBsZSBBcHA8L2E+PC9kaXY+XFxuXCIgK1xuICAgXCIgICAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2YmFyLW5hdlxcXCI+XFxuXCIgK1xuICAgXCIgICAgICA8bGk+PGEgaHJlZj1cXFwiL1xcXCI+SG9tZTwvYT48L2xpPlxcblwiICtcbiAgIFwiICAgICAgPGxpPjxhIGhyZWY9XFxcIi9jb2xsZWN0aW9uc1xcXCI+Q29sbGVjdGlvbiBkZW1vPC9hPjwvbGk+XFxuXCIgK1xuICAgXCIgICAgPC91bD5cXG5cIiArXG4gICBcIiAgICA8ZGl2IGRhdGEtaG9vaz1cXFwiaG9vZGllLWFjY291bnRiYXJcXFwiPjwvZGl2PlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDwvZGl2PlxcblwiICtcbiAgIFwiPC9uYXY+XFxuXCIgK1xuICAgXCI8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlxcblwiICtcbiAgIFwiICA8bWFpbiBkYXRhLWhvb2s9XFxcInBhZ2UtY29udGFpbmVyXFxcIj48L21haW4+XFxuXCIgK1xuICAgXCI8L2Rpdj5cXG5cIiArXG4gICBcIjwvYm9keT5cIjtcblxuY2xpZW50SHRtbFtcImhlYWRcIl0gPSBcIjxtZXRhIGNvbnRlbnQ9XFxcIndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEuMCxtYXhpbXVtLXNjYWxlPTEuMFxcXCIgbmFtZT1cXFwidmlld3BvcnRcXFwiPlxcblwiICtcbiAgIFwiPG1ldGEgY29udGVudD1cXFwieWVzXFxcIiAgbmFtZT1cXFwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVxcXCI+XCI7XG5cbmNsaWVudEh0bWxbXCJpbmNsdWRlcy5mb3JtSW5wdXRcIl0gPSBcIjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPjxsYWJlbCBkYXRhLWhvb2s9XFxcImxhYmVsXFxcIj48L2xhYmVsPlxcblwiICtcbiAgIFwiICA8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPlxcblwiICtcbiAgIFwiICA8ZGl2IGRhdGEtaG9vaz1cXFwibWVzc2FnZS1jb250YWluZXJcXFwiPlxcblwiICtcbiAgIFwiICAgIDxkaXYgZGF0YS1ob29rPVxcXCJtZXNzYWdlLXRleHRcXFwiIGNsYXNzPVxcXCJhbGVydCBhbGVydC1kYW5nZXJcXFwiPjwvZGl2PlxcblwiICtcbiAgIFwiICA8L2Rpdj5cXG5cIiArXG4gICBcIjwvZGl2PlxcblwiICtcbiAgIFwiXCI7XG5cbmNsaWVudEh0bWxbXCJpbmNsdWRlcy5ob29kaWVBY2NvdW50YmFyXCJdID0gXCI8ZGl2IGNsYXNzPVxcXCJob29kaWUtYWNjb3VudGJhclxcXCI+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGRpdiBjbGFzcz1cXFwiaG9vZGllLWFjY291bnQtc2lnbmVkb3V0XFxcIj5cXG5cIiArXG4gICBcIiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJidG4tZ3JvdXBcXFwiPlxcblwiICtcbiAgIFwiICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXNtYWxsIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWhvb2RpZS1hY3Rpb249XFxcInNpZ251cFxcXCI+U2lnbiBVcDwvYnV0dG9uPlxcblwiICtcbiAgIFwiICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLXNtYWxsIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWhvb2RpZS1hY3Rpb249XFxcInNpZ25pblxcXCI+U2lnbiBJbjwvYnV0dG9uPlxcblwiICtcbiAgIFwiICAgICAgICAgICAgPC9zcGFuPlxcblwiICtcbiAgIFwiICA8L2Rpdj48IS0tIC8uaG9vZGllLWFjY291bnQtc2lnbmVkb3V0IC0tPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxkaXYgY2xhc3M9XFxcImhvb2RpZS1hY2NvdW50LXNpZ25lZGluXFxcIj5cXG5cIiArXG4gICBcIiAgICBIZWxsbyxcXG5cIiArXG4gICBcIiAgICA8c3BhbiBjbGFzcz1cXFwiaG9vZGllLXVzZXJuYW1lXFxcIj48IS0tIHVzZXJuIG5hbWUgd2lsbCBiZSBmaWxsZWQgaW4gaGVyZSAtLT48L3NwYW4+XFxuXCIgK1xuICAgXCIgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYnRuLWdyb3VwXFxcIj5cXG5cIiArXG4gICBcIiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1zbWFsbCBidG4tcHJpbWFyeVxcXCIgZGF0YS1ob29kaWUtYWN0aW9uPVxcXCJzaWdub3V0XFxcIj5TaWduIE91dDwvYnV0dG9uPlxcblwiICtcbiAgIFwiICAgICAgICAgICAgPC9zcGFuPlxcblwiICtcbiAgIFwiICA8L2Rpdj48IS0tIC8uaG9vZGllLWFjY291bnQtc2lnbmVkaW4gLS0+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGRpdiBjbGFzcz1cXFwiaG9vZGllLWFjY291bnQtZXJyb3JcXFwiPlxcblwiICtcbiAgIFwiICAgIEhlbGxvLFxcblwiICtcbiAgIFwiICAgIDxzcGFuIGNsYXNzPVxcXCJob29kaWUtdXNlcm5hbWVcXFwiPjwhLS0gdXNlcm5hbWUgd2lsbCBiZSBmaWxsZWQgaW4gaGVyZSAtLT48L3NwYW4+LlxcblwiICtcbiAgIFwiICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImJ0bi1ncm91cFxcXCI+XFxuXCIgK1xuICAgXCIgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tc21hbGwgYnRuLXByaW1hcnlcXFwiIGRhdGEtaG9vZGllLWFjdGlvbj1cXFwic2lnbm91dFxcXCI+U2lnbiBPdXQ8L2J1dHRvbj5cXG5cIiArXG4gICBcIiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1zbWFsbCBidG4tZGFuZ2VyXFxcIiBkYXRhLWhvb2RpZS1hY3Rpb249XFxcInNpZ25pblxcXCI+QXV0aGVudGljYXRpb24gZXJyb3I6IFNpZ24gaW4gYWdhaW48L2J1dHRvbj5cXG5cIiArXG4gICBcIiAgICAgICAgICAgIDwvc3Bhbj5cXG5cIiArXG4gICBcIiAgPC9kaXY+PCEtLSAvLmhvb2RpZS1hY2NvdW50LWVycm9yIC0tPlxcblwiICtcbiAgIFwiPC9kaXY+XFxuXCIgK1xuICAgXCJcIjtcblxuY2xpZW50SHRtbFtcImluY2x1ZGVzLnBlcnNvblwiXSA9IFwiPGxpIGNsYXNzPVxcXCJwZXJzb24gbGlzdC1ncm91cC1pdGVtXFxcIj5cXG5cIiArXG4gICBcIiAgPGltZyBkYXRhLWhvb2s9XFxcImF2YXRhclxcXCIgd2lkdGg9XFxcIjQwXFxcIiBoZWlnaHQ9XFxcIjQwXFxcIi8+XFxuXCIgK1xuICAgXCIgIDxhIGRhdGEtaG9vaz1cXFwibmFtZVxcXCI+PC9hPlxcblwiICtcbiAgIFwiICA8c3BhbiBjbGFzcz1cXFwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcXFwiPlxcblwiICtcbiAgIFwiICAgIDxhIGRhdGEtaG9vaz1cXFwiYWN0aW9uLWVkaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPmVkaXQgPC9hPlxcblwiICtcbiAgIFwiICAgIDxhIGhyZWY9XFxcIiNcXFwiIGRhdGEtaG9vaz1cXFwiYWN0aW9uLWRlbGV0ZVxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGFuZ2VyXFxcIj5kZWxldGU8L2E+XFxuXCIgK1xuICAgXCIgIDwvc3Bhbj5cXG5cIiArXG4gICBcIjwvbGk+XCI7XG5cbmNsaWVudEh0bWxbXCJwYWdlcy5jb2xsZWN0aW9uRGVtb1wiXSA9IFwiPHNlY3Rpb24gY2xhc3M9XFxcInBhZ2UgcGFnZU9uZVxcXCI+PGgyPkNvbGxlY3Rpb24gZGVtbzwvaDI+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPHA+SW50ZWxsaWdlbnRseSByZW5kZXJpbmcgY29sbGVjdGlvbnMgY2FuIGJlIGEgYml0IHRyaWNreS4gPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9hbXBlcnNhbmRqcy9hbXBlcnNhbmQtdmlld1xcXCI+YW1wZXJzYW5kLXZpZXcnczwvYT4gPGNvZGU+cmVuZGVyQ29sbGVjdGlvbigpPC9jb2RlPiBtZXRob2RcXG5cIiArXG4gICBcIiAgICBtYWtlcyBpdCBzaW1wbGUuPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPlRoZSBvbmx5IGNvZGUgcmVxdWlyZWQgdG8gbWFuYWdlIHRoZSBjb2xsZWN0aW9uIGlzOjwvcD48cHJlPjxjb2RlPnRoaXMucmVuZGVyQ29sbGVjdGlvbihcXG5cIiArXG4gICBcIiAgICB0aGlzLmNvbGxlY3Rpb24sXFxuXCIgK1xuICAgXCIgICAgUGVyc29uVmlldyxcXG5cIiArXG4gICBcIiAgICB0aGlzLnF1ZXJ5QnlIb29rKCdwZW9wbGUtbGlzdCcpXFxuXCIgK1xuICAgXCIgICAgKTs8L2NvZGU+PC9wcmU+XFxuXCIgK1xuICAgXCIgIDxoMz5QZW9wbGUgY29udGFpbmVyOjwvaDM+XFxuXCIgK1xuICAgXCIgIDx1bCBkYXRhLWhvb2s9XFxcInBlb3BsZS1saXN0XFxcIiBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCI+PC91bD5cXG5cIiArXG4gICBcIlxcblwiICtcbiAgIFwiICA8dGFibGUgZGF0YS1ob29rPVxcXCJwZW9wbGUtdGFibGVcXFwiPiA8L3RhYmxlPlxcblwiICtcbiAgIFwiICA8cD5UcnkgaXQgYnkgY2xpY2tpbmcgdGhlIGJ1dHRvbnM8L3A+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGRpdiBjbGFzcz1cXFwiYnV0dG9ucyBidG4tZ3JvdXBcXFwiPlxcblwiICtcbiAgIFwiICAgIDxidXR0b24gZGF0YS1ob29rPVxcXCJyZXNldFxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+LnJlc2V0KCk8L2J1dHRvbj5cXG5cIiArXG4gICBcIiAgICA8YnV0dG9uIGRhdGEtaG9vaz1cXFwiZmV0Y2hcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPi5mZXRjaCgpPC9idXR0b24+XFxuXCIgK1xuICAgXCIgICAgPGJ1dHRvbiBkYXRhLWhvb2s9XFxcInNodWZmbGVcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPi5zaHVmZmxlKCk8L2J1dHRvbj5cXG5cIiArXG4gICBcIiAgICA8YSBocmVmPVxcXCIvcGVyc29uL2FkZFxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+QWRkIFBlcnNvbjwvYT48L2Rpdj5cXG5cIiArXG4gICBcIiAgPHA+RXZlbnRzIGFyZSBhbHdheXMgbWFuYWdlZCBzbyB5b3UgZG9uJ3QgZ2V0IGFueSBsZWFrcy48L3A+PC9zZWN0aW9uPlwiO1xuXG5jbGllbnRIdG1sW1wicGFnZXMuaG9tZVwiXSA9IFwiPHNlY3Rpb24gY2xhc3M9XFxcInBhZ2UgaG9tZVxcXCI+PGgyPldlbGNvbWUgdG8gdGhlIEFtcGVyc2FuZC1Ib29kaWUgZXhhbXBsZSBhcHA8L2gyPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPlNpZ251cCBhbmQgc2lnbmluIGFyZSBjdXJyZW50bHkgaGFyZCBjb2RlZCB0byBcXFwibWlrZSxtaWtlXFxcIi4gIE1ha2Ugc3VyZSB5b3Ugc2lnbiB1cCBiZWZvcmUgdHJ5aW5nIHRvIHNpZ24gaW4uPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPllvdSBjYW4gcGxheSB3aXRoIGFkZGluZyBhbmQgZWRpdGluZyBwZW9wbGUgb24gdGhlIFxcXCJDb2xsZWN0aW9uIGRlbW9cXFwiIHBhZ2UuPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCI8L3NlY3Rpb24+XCI7XG5cbmNsaWVudEh0bWxbXCJwYWdlcy5wZXJzb25BZGRcIl0gPSBcIjxzZWN0aW9uIGNsYXNzPVxcXCJwYWdlIGFkZC1wZXJzb25cXFwiPjxoMj5BZGQgUGVyc29uPC9oMj5cXG5cIiArXG4gICBcIlxcblwiICtcbiAgIFwiICA8cD5UaGlzIGZvcm0gYW5kIGFsbCBiZWhhdmlvciBpcyBkZWZpbmVkIGJ5IHRoZSBmb3JtIHZpZXcgaW4gPGNvZGU+Y2xpZW50L2Zvcm1zL3BlcnNvbi5qczwvY29kZT4uPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPlRoZSBzYW1lIGZvcm0tdmlldyBpcyB1c2VkIGZvciBib3RoIGVkaXRpbmcgYW5kIGNyZWF0aW5nIG5ldyB1c2Vycy48L3A+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGZvcm0gZGF0YS1ob29rPVxcXCJwZXJzb24tZm9ybVxcXCI+XFxuXCIgK1xuICAgXCIgICAgPGZpZWxkc2V0IGRhdGEtaG9vaz1cXFwiZmllbGQtY29udGFpbmVyXFxcIj48L2ZpZWxkc2V0PlxcblwiICtcbiAgIFwiICAgIDxkaXYgY2xhc3M9XFxcImJ1dHRvbnNcXFwiPlxcblwiICtcbiAgIFwiICAgICAgPGJ1dHRvbiBkYXRhLWhvb2s9XFxcInJlc2V0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG5cXFwiPlN1Ym1pdDwvYnV0dG9uPlxcblwiICtcbiAgIFwiICAgIDwvZGl2PlxcblwiICtcbiAgIFwiICA8L2Zvcm0+XFxuXCIgK1xuICAgXCI8L3NlY3Rpb24+XCI7XG5cbmNsaWVudEh0bWxbXCJwYWdlcy5wZXJzb25FZGl0XCJdID0gXCI8c2VjdGlvbiBjbGFzcz1cXFwicGFnZSBlZGl0LXBlcnNvblxcXCI+PGgyPkVkaXQgUGVyc29uPC9oMj5cXG5cIiArXG4gICBcIlxcblwiICtcbiAgIFwiICA8cD5UaGlzIGZvcm0gYW5kIGFsbCBiZWhhdmlvciBpcyBkZWZpbmVkIGJ5IHRoZSBmb3JtIHZpZXcgaW4gPGNvZGU+Y2xpZW50L2Zvcm1zL3BlcnNvbi5qczwvY29kZT4uPC9wPlxcblwiICtcbiAgIFwiXFxuXCIgK1xuICAgXCIgIDxwPlRoZSBzYW1lIGZvcm0tdmlldyBpcyB1c2VkIGZvciBib3RoIGVkaXRpbmcgYW5kIGNyZWF0aW5nIG5ldyB1c2Vycy48L3A+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGZvcm0gZGF0YS1ob29rPVxcXCJwZXJzb24tZm9ybVxcXCI+XFxuXCIgK1xuICAgXCIgICAgPGZpZWxkc2V0IGRhdGEtaG9vaz1cXFwiZmllbGQtY29udGFpbmVyXFxcIj48L2ZpZWxkc2V0PlxcblwiICtcbiAgIFwiICAgIDxkaXYgY2xhc3M9XFxcImJ1dHRvbnNcXFwiPlxcblwiICtcbiAgIFwiICAgICAgPGJ1dHRvbiBkYXRhLWhvb2s9XFxcInJlc2V0XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG5cXFwiPlN1Ym1pdDwvYnV0dG9uPlxcblwiICtcbiAgIFwiICAgIDwvZGl2PlxcblwiICtcbiAgIFwiICA8L2Zvcm0+XFxuXCIgK1xuICAgXCI8L3NlY3Rpb24+XCI7XG5cbmNsaWVudEh0bWxbXCJwYWdlcy5wZXJzb25WaWV3XCJdID0gXCI8c2VjdGlvbiBjbGFzcz1cXFwicGFnZSB2aWV3LXBlcnNvblxcXCI+XFxuXCIgK1xuICAgXCIgIDxoMiBkYXRhLWhvb2s9XFxcIm5hbWVcXFwiPjwvaDI+PGltZyBkYXRhLWhvb2s9XFxcImF2YXRhclxcXCIgd2lkdGg9XFxcIjgwXFxcIiBoZWlnaHQ9XFxcIjgwXFxcIi8+XFxuXCIgK1xuICAgXCJcXG5cIiArXG4gICBcIiAgPGRpdiBjbGFzcz1cXFwiYnV0dG9uc1xcXCI+PGEgZGF0YS1ob29rPVxcXCJlZGl0XFxcIiBjbGFzcz1cXFwiYnRuXFxcIj5FZGl0PC9hPlxcblwiICtcbiAgIFwiICAgIDxidXR0b24gZGF0YS1ob29rPVxcXCJkZWxldGVcXFwiIGNsYXNzPVxcXCJidG5cXFwiPkRlbGV0ZTwvYnV0dG9uPlxcblwiICtcbiAgIFwiICA8L2Rpdj5cXG5cIiArXG4gICBcIjwvc2VjdGlvbj5cIjtcbm1vZHVsZS5leHBvcnRzID0gY2xpZW50SHRtbDsiLCJ2YXIgRm9ybVZpZXcgPSByZXF1aXJlKCdhbXBlcnNhbmQtZm9ybS12aWV3Jyk7XG52YXIgSW5wdXRWaWV3ID0gcmVxdWlyZSgnYW1wZXJzYW5kLWlucHV0LXZpZXcnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1WaWV3LmV4dGVuZCh7XG4gICAgZmllbGRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgSW5wdXRWaWV3KHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpcnN0IE5hbWUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdmaXJzdE5hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnRmlyc3QgTmFtZScsXG4gICAgICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBhcHAuY2xpZW50SHRtbFsnaW5jbHVkZXMuZm9ybUlucHV0J11cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IElucHV0Vmlldyh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMYXN0IE5hbWUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdsYXN0TmFtZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0xhc3QgTmFtZScsXG4gICAgICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBhcHAuY2xpZW50SHRtbFsnaW5jbHVkZXMuZm9ybUlucHV0J11cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IElucHV0Vmlldyh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb29sbmVzcyBGYWN0b3InLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdjb29sbmVzc0ZhY3RvcicsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5jb29sbmVzc0ZhY3RvcixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJzgnLFxuICAgICAgICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYXBwLmNsaWVudEh0bWxbJ2luY2x1ZGVzLmZvcm1JbnB1dCddLFxuICAgICAgICAgICAgICAgIHRlc3RzOiBbXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPCAwIHx8IHZhbCA+IDExKSByZXR1cm4gXCJNdXN0IGJlIGJldHdlZW4gMCBhbmQgMTFcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEvXlswLTldKyQvLnRlc3QodmFsKSkgcmV0dXJuIFwiTXVzdCBiZSBhIG51bWJlci5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgfVxufSk7XG4iLCJ2YXIgQW1wZXJzYW5kTW9kZWwgPSByZXF1aXJlKCdhbXBlcnNhbmQtbW9kZWwnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFtcGVyc2FuZE1vZGVsLmV4dGVuZCh7XG4gICAgdHlwZTogJ3VzZXInLFxuICAgIHByb3BzOiB7XG4gICAgICAgIGlkOiBbJ3N0cmluZyddLFxuICAgICAgICBmaXJzdE5hbWU6IFsnc3RyaW5nJywgdHJ1ZSwgJyddLFxuICAgICAgICBsYXN0TmFtZTogWydzdHJpbmcnLCB0cnVlLCAnJ10sXG4gICAgICAgIHVzZXJuYW1lOiBbJ3N0cmluZyddXG4gICAgfSxcbiAgICBzZXNzaW9uOiB7XG4gICAgICAgIGFjY291bnRTdGF0dXM6IFsnc3RyaW5nJywgdHJ1ZSwgJ3NpZ25lZG91dCddXG4gICAgfSxcbiAgICBkZXJpdmVkOiB7XG4gICAgICAgIGZ1bGxOYW1lOiB7XG4gICAgICAgICAgICBkZXBzOiBbJ2ZpcnN0TmFtZScsICdsYXN0TmFtZSddLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZSArICcgJyArIHRoaXMubGFzdE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRpYWxzOiB7XG4gICAgICAgICAgICBkZXBzOiBbJ2ZpcnN0TmFtZScsICdsYXN0TmFtZSddLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5maXJzdE5hbWUuY2hhckF0KDApICsgdGhpcy5sYXN0TmFtZS5jaGFyQXQoMCkpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Ib29kaWVFdmVudHMoKTtcbiAgICAgICAgd2luZG93Lmhvb2RpZS5hY2NvdW50LmF1dGhlbnRpY2F0ZSgpLnRoZW4odGhpcy5oYW5kbGVVc2VyQXV0aGVudGljYXRlZC5iaW5kKHRoaXMpLCB0aGlzLmhhbmRsZVVzZXJVbmF1dGhlbnRpY2F0ZWQuYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIHN1YnNjcmliZVRvSG9vZGllRXZlbnRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5ob29kaWUuYWNjb3VudC5vbignc2lnbnVwIGNoYW5nZXVzZXJuYW1lIHNpZ25pbiByZWF1dGhlbnRpY2F0ZWQnLCB0aGlzLmhhbmRsZVVzZXJBdXRoZW50aWNhdGVkLmJpbmQodGhpcykpO1xuICAgICAgICB3aW5kb3cuaG9vZGllLmFjY291bnQub24oJ3NpZ25vdXQnLCB0aGlzLmhhbmRsZVVzZXJVbmF1dGhlbnRpY2F0ZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHdpbmRvdy5ob29kaWUub24oJ2FjY291bnQ6ZXJyb3I6dW5hdXRoZW50aWNhdGVkIHJlbW90ZTplcnJvcjp1bmF1dGhlbnRpY2F0ZWQnLCB0aGlzLmhhbmRsZVVzZXJBdXRoZW50aWNhdGlvbkVycm9yLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVVc2VyQXV0aGVudGljYXRlZDogZnVuY3Rpb24odXNlcm5hbWUpIHtcbiAgICAgICAgdGhpcy5hY2NvdW50U3RhdHVzID0gJ3NpZ25lZGluJztcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB1c2VybmFtZTtcbiAgICB9LFxuXG4gICAgaGFuZGxlVXNlclVuYXV0aGVudGljYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuaG9vZGllLmFjY291bnQudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVzZXJBdXRoZW50aWNhdGlvbkVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY2NvdW50U3RhdHVzID0gJ3NpZ25lZG91dCc7XG4gICAgfSxcblxuICAgIGhhbmRsZVVzZXJBdXRoZW50aWNhdGlvbkVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB3aW5kb3cuaG9vZGllLmFjY291bnQudXNlcm5hbWU7XG4gICAgICAgIHRoaXMuYWNjb3VudFN0YXR1cyA9ICdlcnJvcic7XG4gICAgfVxufSk7XG4iLCJ2YXIgQW1wZXJzYW5kTW9kZWwgPSByZXF1aXJlKCdhbXBlcnNhbmQtaG9vZGllLW1vZGVsJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBbXBlcnNhbmRNb2RlbC5leHRlbmQoe1xuICAgIHByb3BzOiB7XG4gICAgICAgIGlkOiAnYW55JyxcbiAgICAgICAgZmlyc3ROYW1lOiBbJ3N0cmluZycsIHRydWUsICcnXSxcbiAgICAgICAgbGFzdE5hbWU6IFsnc3RyaW5nJywgdHJ1ZSwgJyddLFxuICAgICAgICBjb29sbmVzc0ZhY3RvcjogWydudW1iZXInLCB0cnVlLCA1XVxuICAgIH0sXG4gICAgc2Vzc2lvbjoge1xuICAgICAgICBIT09ESUVfVFlQRTogWydzdHJpbmcnLCB0cnVlLCAncGVyc29uJ10sXG4gICAgICAgIHNlbGVjdGVkOiBbJ2Jvb2xlYW4nLCB0cnVlLCBmYWxzZV1cbiAgICB9LFxuICAgIGRlcml2ZWQ6IHtcbiAgICAgICAgZnVsbE5hbWU6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJ10sXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZSArICcgJyArIHRoaXMubGFzdE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgICAgZGVwczogWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnXSxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vcm9ib2hhc2gub3JnLycgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5mdWxsTmFtZSkgKyAnP3NpemU9ODB4ODAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VXJsOiB7XG4gICAgICAgICAgICBkZXBzOiBbJ2lkJ10sXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnL3BlcnNvbi8nICsgdGhpcy5pZCArICcvZWRpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZpZXdVcmw6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnaWQnXSxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcvcGVyc29uLycgKyB0aGlzLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ2FtcGVyc2FuZC1ob29kaWUtY29sbGVjdGlvbicpO1xudmFyIFBlcnNvbiA9IHJlcXVpcmUoJy4vcGVyc29uJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgbW9kZWw6IFBlcnNvbixcbiAgICBIT09ESUVfVFlQRTogJ3BlcnNvbidcbn0pO1xuIiwidmFyIFBhZ2VWaWV3ID0gcmVxdWlyZSgnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBQZXJzb25WaWV3ID0gcmVxdWlyZSgnLi4vdmlld3MvcGVyc29uJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlVmlldy5leHRlbmQoe1xuICAgIHBhZ2VUaXRsZTogJ2NvbGxlY3Rpb24gZGVtbycsXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGFwcC5jbGllbnRIdG1sWydwYWdlcy5jb2xsZWN0aW9uRGVtbyddO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvSG9vZGllRXZlbnRzKCk7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIFtkYXRhLWhvb2t+PXNodWZmbGVdJzogJ3NodWZmbGUnLFxuICAgICAgICAnY2xpY2sgW2RhdGEtaG9va349ZmV0Y2hdJzogJ2ZldGNoQ29sbGVjdGlvbicsXG4gICAgICAgICdjbGljayBbZGF0YS1ob29rfj1yZXNldF0nOiAncmVzZXRDb2xsZWN0aW9uJyxcbiAgICAgICAgJ2NsaWNrIFtkYXRhLWhvb2t+PWFkZF0nOiAnYWRkUmFuZG9tJ1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ29sbGVjdGlvbih0aGlzLmNvbGxlY3Rpb24sIFBlcnNvblZpZXcsIHRoaXMucXVlcnlCeUhvb2soJ3Blb3BsZS1saXN0JykpO1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hDb2xsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZldGNoQ29sbGVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVzZXRDb2xsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZXNldCgpO1xuICAgIH0sXG4gICAgc2h1ZmZsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uY29tcGFyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLnNvcnQoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29sbGVjdGlvbi5jb21wYXJhdG9yO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBhZGRSYW5kb206IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3ROYW1lcyA9ICdKb2UgSGFycnkgTGFycnkgU3VlIEJvYiBSb3NlIEFuZ2VsYSBUb20gTWVybGUgSm9zZXBoIEpvc2VwaGluZScuc3BsaXQoJyAnKTtcbiAgICAgICAgdmFyIGxhc3ROYW1lcyA9ICdTbWl0aCBKZXdlbCBCYXJrZXIgU3RlcGhlbnNvbiBSb3NzdW0gQ3JvY2tmb3JkJy5zcGxpdCgnICcpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5jcmVhdGUoe1xuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWVzW2dldFJhbmRvbSgwLCBmaXJzdE5hbWVzLmxlbmd0aCAtIDEpXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZXNbZ2V0UmFuZG9tKDAsIGxhc3ROYW1lcy5sZW5ndGggLSAxKV0sXG4gICAgICAgICAgICBjb29sbmVzc0ZhY3RvcjogZ2V0UmFuZG9tKDAsIDE1KVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHN1YnNjcmliZVRvSG9vZGllRXZlbnRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5ob29kaWUuYWNjb3VudC5vbignc2lnbnVwIGNoYW5nZXVzZXJuYW1lIHNpZ25pbiByZWF1dGhlbnRpY2F0ZWQnLCB0aGlzLmZldGNoQ29sbGVjdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93Lmhvb2RpZS5hY2NvdW50Lm9uKCdzaWdub3V0JywgdGhpcy5mZXRjaENvbGxlY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgfVxufSk7XG4iLCJ2YXIgUGFnZVZpZXcgPSByZXF1aXJlKCdhbXBlcnNhbmQtdmlldycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVZpZXcuZXh0ZW5kKHtcbiAgICBwYWdlVGl0bGU6ICdob21lJyxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3BlYykge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYXBwLmNsaWVudEh0bWxbJ3BhZ2VzLmhvbWUnXTtcbiAgICB9XG59KTtcbiIsIi8qZ2xvYmFsIGFwcCovXG52YXIgUGFnZVZpZXcgPSByZXF1aXJlKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIFBlcnNvbkZvcm0gPSByZXF1aXJlKCcuLi9mb3Jtcy9wZXJzb24nKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VWaWV3LmV4dGVuZCh7XG4gICAgcGFnZVRpdGxlOiAnYWRkIHBlcnNvbicsXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGFwcC5jbGllbnRIdG1sWydwYWdlcy5wZXJzb25BZGQnXTtcbiAgICB9LFxuICAgIHN1YnZpZXdzOiB7XG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2Zvcm0nLFxuICAgICAgICAgICAgcHJlcGFyZVZpZXc6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUGVyc29uRm9ybSh7XG4gICAgICAgICAgICAgICAgICAgIGVsOiBlbCxcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0Q2FsbGJhY2s6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHAucGVvcGxlLmNyZWF0ZShkYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC5uYXZpZ2F0ZSgnL2NvbGxlY3Rpb25zJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC5wZW9wbGUuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCIvKmdsb2JhbCBhcHAsIGFsZXJ0Ki9cbnZhciBQYWdlVmlldyA9IHJlcXVpcmUoJ2FtcGVyc2FuZC12aWV3Jyk7XG52YXIgUGVyc29uRm9ybSA9IHJlcXVpcmUoJy4uL2Zvcm1zL3BlcnNvbicpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZVZpZXcuZXh0ZW5kKHtcbiAgICBwYWdlVGl0bGU6ICdlZGl0IHBlcnNvbicsXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gYXBwLmNsaWVudEh0bWxbJ3BhZ2VzLnBlcnNvbkVkaXQnXTtcbiAgICAgICAgYXBwLnBlb3BsZS5nZXRPckZldGNoKHNwZWMuaWQsIHthbGw6IHRydWV9LCBmdW5jdGlvbiAoZXJyLCBtb2RlbCkge1xuICAgICAgICAgICAgaWYgKGVycikgYWxlcnQoJ2NvdWxkIG5vdCBmaW5kIGEgbW9kZWwgd2l0aCBpZDogJyArIHNwZWMuaWQpO1xuICAgICAgICAgICAgc2VsZi5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHN1YnZpZXdzOiB7XG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGNzcyBzZWxlY3RvciB0aGF0IHdpbGwgYmUgdGhlIGBlbGAgaW4gdGhlXG4gICAgICAgICAgICAvLyBwcmVwYXJlVmlldyBmdW5jdGlvbi5cbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2Zvcm0nLFxuICAgICAgICAgICAgLy8gdGhpcyBzYXlzIHdlJ2xsIHdhaXQgZm9yIGB0aGlzLm1vZGVsYCB0byBiZSB0cnV0aHlcbiAgICAgICAgICAgIHdhaXRGb3I6ICdtb2RlbCcsXG4gICAgICAgICAgICBwcmVwYXJlVmlldzogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBlcnNvbkZvcm0oe1xuICAgICAgICAgICAgICAgICAgICBlbDogZWwsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLm1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRDYWxsYmFjazogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnNhdmUoZGF0YSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAubmF2aWdhdGUoJy9jb2xsZWN0aW9ucycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsIi8qZ2xvYmFsIGFwcCwgYWxlcnQqL1xudmFyIFBhZ2VWaWV3ID0gcmVxdWlyZSgnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBQZXJzb25Gb3JtID0gcmVxdWlyZSgnLi4vZm9ybXMvcGVyc29uJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlVmlldy5leHRlbmQoe1xuICAgIHBhZ2VUaXRsZTogJ3ZpZXcgcGVyc29uJyxcbiAgICBiaW5kaW5nczoge1xuICAgICAgICAnbW9kZWwuZnVsbE5hbWUnOiB7XG4gICAgICAgICAgICBob29rOiAnbmFtZSdcbiAgICAgICAgfSxcbiAgICAgICAgJ21vZGVsLmF2YXRhcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhdHRyaWJ1dGUnLFxuICAgICAgICAgICAgaG9vazogJ2F2YXRhcicsXG4gICAgICAgICAgICBuYW1lOiAnc3JjJ1xuICAgICAgICB9LFxuICAgICAgICAnbW9kZWwuZWRpdFVybCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhdHRyaWJ1dGUnLFxuICAgICAgICAgICAgaG9vazogJ2VkaXQnLFxuICAgICAgICAgICAgbmFtZTogJ2hyZWYnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgICAnY2xpY2sgW2RhdGEtaG9va349ZGVsZXRlXSc6ICdoYW5kbGVEZWxldGVDbGljaydcbiAgICB9LFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGFwcC5jbGllbnRIdG1sWydwYWdlcy5wZXJzb25WaWV3J107XG4gICAgICAgIGFwcC5wZW9wbGUuZ2V0T3JGZXRjaChzcGVjLmlkLCB7YWxsOiB0cnVlfSwgZnVuY3Rpb24gKGVyciwgbW9kZWwpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIGFsZXJ0KCdjb3VsZCBub3QgZmluZCBhIG1vZGVsIHdpdGggaWQ6ICcgKyBzcGVjLmlkKTtcbiAgICAgICAgICAgIHNlbGYubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoYW5kbGVEZWxldGVDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koe3N1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFwcC5uYXZpZ2F0ZSgnY29sbGVjdGlvbnMnKTtcbiAgICAgICAgfX0pO1xuICAgIH1cbn0pO1xuIiwiLypnbG9iYWwgbWUsIGFwcCovXG52YXIgUm91dGVyID0gcmVxdWlyZSgnYW1wZXJzYW5kLXJvdXRlcicpO1xudmFyIEhvbWVQYWdlID0gcmVxdWlyZSgnLi9wYWdlcy9ob21lJyk7XG52YXIgQ29sbGVjdGlvbkRlbW8gPSByZXF1aXJlKCcuL3BhZ2VzL2NvbGxlY3Rpb24tZGVtbycpO1xudmFyIFBlcnNvbkFkZFBhZ2UgPSByZXF1aXJlKCcuL3BhZ2VzL3BlcnNvbi1hZGQnKTtcbnZhciBQZXJzb25FZGl0UGFnZSA9IHJlcXVpcmUoJy4vcGFnZXMvcGVyc29uLWVkaXQnKTtcbnZhciBQZXJzb25WaWV3UGFnZSA9IHJlcXVpcmUoJy4vcGFnZXMvcGVyc29uLXZpZXcnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlci5leHRlbmQoe1xuICAgIHJvdXRlczoge1xuICAgICAgICAnJzogJ2hvbWUnLFxuICAgICAgICAnY29sbGVjdGlvbnMnOiAnY29sbGVjdGlvbkRlbW8nLFxuICAgICAgICAncGVyc29uL2FkZCc6ICdwZXJzb25BZGQnLFxuICAgICAgICAncGVyc29uLzppZCc6ICdwZXJzb25WaWV3JyxcbiAgICAgICAgJ3BlcnNvbi86aWQvZWRpdCc6ICdwZXJzb25FZGl0JyxcbiAgICAgICAgJygqcGF0aCknOiAnY2F0Y2hBbGwnXG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0gUk9VVEUgSEFORExFUlMgLS0tLS0tLS0tXG4gICAgaG9tZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3BhZ2UnLCBuZXcgSG9tZVBhZ2Uoe1xuICAgICAgICAgICAgbW9kZWw6IG1lXG4gICAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgY29sbGVjdGlvbkRlbW86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdwYWdlJywgbmV3IENvbGxlY3Rpb25EZW1vKHtcbiAgICAgICAgICAgIG1vZGVsOiBtZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb246IGFwcC5wZW9wbGVcbiAgICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBwZXJzb25BZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdwYWdlJywgbmV3IFBlcnNvbkFkZFBhZ2UoKSk7XG4gICAgfSxcblxuICAgIHBlcnNvbkVkaXQ6IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3BhZ2UnLCBuZXcgUGVyc29uRWRpdFBhZ2Uoe1xuICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgcGVyc29uVmlldzogZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcigncGFnZScsIG5ldyBQZXJzb25WaWV3UGFnZSh7XG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBjYXRjaEFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlZGlyZWN0VG8oJycpO1xuICAgIH1cbn0pO1xuIiwidmFyIFZpZXcgPSByZXF1aXJlKCdhbXBlcnNhbmQtdmlldycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVmlldy5leHRlbmQoe1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBhcHAuY2xpZW50SHRtbFsnaW5jbHVkZXMuaG9vZGllQWNjb3VudGJhciddO1xuICAgIH0sXG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgJ21vZGVsLmZpcnN0TmFtZSc6ICcuaG9vZGllLXVzZXJuYW1lJyxcbiAgICAgICAgJ21vZGVsLmFjY291bnRTdGF0dXMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3dpdGNoJyxcbiAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgJ3NpZ25lZG91dCc6ICcuaG9vZGllLWFjY291bnQtc2lnbmVkb3V0JyxcbiAgICAgICAgICAgICAgICAnc2lnbmVkaW4nOiAnLmhvb2RpZS1hY2NvdW50LXNpZ25lZGluJyxcbiAgICAgICAgICAgICAgICAnZXJyb3InOiAnLmhvb2RpZS1hY2NvdW50LWVycm9yJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIFtkYXRhLWhvb2RpZS1hY3Rpb249c2lnbm91dF0nOiAnaGFuZGxlU2lnbm91dENsaWNrJyxcbiAgICAgICAgJ2NsaWNrIFtkYXRhLWhvb2RpZS1hY3Rpb249c2lnbnVwXSc6ICdoYW5kbGVTaWdudXBDbGljaycsXG4gICAgICAgICdjbGljayBbZGF0YS1ob29kaWUtYWN0aW9uPXNpZ25pbl0nOiAnaGFuZGxlU2lnbmluQ2xpY2snXG4gICAgfSxcbiAgICBoYW5kbGVTaWdub3V0Q2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lmhvb2RpZS5hY2NvdW50LnNpZ25PdXQoKTtcbiAgICB9LFxuICAgIGhhbmRsZVNpZ25pbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gd2luZG93Lmhvb2RpZS5hY2NvdW50LnNpZ25JbignbWlrZScsICdtaWtlJyk7XG4gICAgfSxcbiAgICBoYW5kbGVTaWdudXBDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHdpbmRvdy5ob29kaWUuYWNjb3VudC5zaWduVXAoJ21pa2UnLCAnbWlrZScpO1xuICAgIH1cbn0pO1xuIiwiLypnbG9iYWwgYXBwLCBtZSwgJCovXG4vLyBUaGlzIGFwcCB2aWV3IGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYWxsIGNvbnRlbnQgdGhhdCBnb2VzIGludG9cbi8vIDxodG1sPi4gSXQncyBpbml0dGVkIHJpZ2h0IGF3YXkgYW5kIHJlbmRlcnMgaXRzZWxmIG9uIERPTSByZWFkeS5cblxuLy8gVGhpcyB2aWV3IGFsc28gaGFuZGxlcyBhbGwgdGhlICdkb2N1bWVudCcgbGV2ZWwgZXZlbnRzIHN1Y2ggYXMga2V5Ym9hcmQgc2hvcnRjdXRzLlxudmFyIFZpZXcgPSByZXF1aXJlKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIFZpZXdTd2l0Y2hlciA9IHJlcXVpcmUoJ2FtcGVyc2FuZC12aWV3LXN3aXRjaGVyJyk7XG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbnZhciBkb21pZnkgPSByZXF1aXJlKCdkb21pZnknKTtcbnZhciBkb20gPSByZXF1aXJlKCdhbXBlcnNhbmQtZG9tJyk7XG52YXIgc2V0RmF2aWNvbiA9IHJlcXVpcmUoJ2Zhdmljb24tc2V0dGVyJyk7XG52YXIgSG9vZGllQWNjb3VudGJhciA9IHJlcXVpcmUoJy4vaG9vZGllQWNjb3VudGJhcicpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVmlldy5leHRlbmQoe1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGFwcC5jbGllbnRIdG1sWydib2R5J107XG4gICAgICAgIC8vIHRoaXMgbWFya3MgdGhlIGNvcnJlY3QgbmF2IGl0ZW0gc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhhcHAucm91dGVyLCAncGFnZScsIHRoaXMuaGFuZGxlTmV3UGFnZSk7XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIGFbaHJlZl0nOiAnaGFuZGxlTGlua0NsaWNrJ1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc29tZSBhZGRpdGlvbmFsIHN0dWZmIHdlIHdhbnQgdG8gYWRkIHRvIHRoZSBkb2N1bWVudCBoZWFkXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZG9taWZ5KGFwcC5jbGllbnRIdG1sWydoZWFkJ10pKTtcblxuICAgICAgICAvLyBtYWluIHJlbmRlcmVyXG4gICAgICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKHttZTogbWV9KTtcblxuICAgICAgICB0aGlzLnJlbmRlclN1YnZpZXcobmV3IEhvb2RpZUFjY291bnRiYXIoe1xuICAgICAgICAgICAgbW9kZWw6IG1lXG4gICAgICAgIH0pLCAnW2RhdGEtaG9vaz1ob29kaWUtYWNjb3VudGJhcl0nKTtcblxuICAgICAgICAvLyBpbml0IGFuZCBjb25maWd1cmUgb3VyIHBhZ2Ugc3dpdGNoZXJcbiAgICAgICAgdGhpcy5wYWdlU3dpdGNoZXIgPSBuZXcgVmlld1N3aXRjaGVyKHRoaXMucXVlcnlCeUhvb2soJ3BhZ2UtY29udGFpbmVyJyksIHtcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIChuZXdWaWV3LCBvbGRWaWV3KSB7XG4gICAgICAgICAgICAgICAgLy8gaXQncyBpbnNlcnRlZCBhbmQgcmVuZGVyZWQgZm9yIG1lXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBfLnJlc3VsdChuZXdWaWV3LCAncGFnZVRpdGxlJykgfHwgXCJhbXBcIjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxUb3AgPSAwO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgY2xhc3Mgc3BlY2lmeWluZyBpdCdzIGFjdGl2ZVxuICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcyhuZXdWaWV3LmVsLCAnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBhbiBhZGRpdGlvbmFsIHJlZmVyZW5jZSwganVzdCBiZWNhdXNlXG4gICAgICAgICAgICAgICAgYXBwLmN1cnJlbnRQYWdlID0gbmV3VmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0dGluZyBhIGZhdmljb24gZm9yIGZ1biAobm90ZSwgaXQncyBkeW5hbWljKVxuICAgICAgICBzZXRGYXZpY29uKCcvaW1hZ2VzL2FtcGVyc2FuZC5wbmcnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGhhbmRsZU5ld1BhZ2U6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgIC8vIHRlbGwgdGhlIHZpZXcgc3dpdGNoZXIgdG8gcmVuZGVyIHRoZSBuZXcgb25lXG4gICAgICAgIHRoaXMucGFnZVN3aXRjaGVyLnNldCh2aWV3KTtcblxuICAgICAgICAvLyBtYXJrIHRoZSBjb3JyZWN0IG5hdiBpdGVtIHNlbGVjdGVkXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlTmF2KCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUxpbmtDbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGFUYWcgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIGxvY2FsID0gYVRhZy5ob3N0ID09PSB3aW5kb3cubG9jYXRpb24uaG9zdDtcblxuICAgICAgICAvLyBpZiBpdCdzIGEgcGxhaW4gY2xpY2sgKG5vIG1vZGlmaWVyIGtleXMpXG4gICAgICAgIC8vIGFuZCBpdCdzIGEgbG9jYWwgdXJsLCBuYXZpZ2F0ZSBpbnRlcm5hbGx5XG4gICAgICAgIGlmIChsb2NhbCAmJiAhZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmFsdEtleSAmJiAhZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBhcHAubmF2aWdhdGUoYVRhZy5wYXRobmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlQWN0aXZlTmF2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpO1xuXG4gICAgICAgIHRoaXMucXVlcnlBbGwoJy5uYXYgYVtocmVmXScpLmZvckVhY2goZnVuY3Rpb24gKGFUYWcpIHtcbiAgICAgICAgICAgIHZhciBhUGF0aCA9IGFUYWcucGF0aG5hbWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICAgIGlmICgoIWFQYXRoICYmICFwYXRoKSB8fCAoYVBhdGggJiYgcGF0aC5pbmRleE9mKGFQYXRoKSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoYVRhZy5wYXJlbnROb2RlLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhhVGFnLnBhcmVudE5vZGUsICdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iLCJ2YXIgVmlldyA9IHJlcXVpcmUoJ2FtcGVyc2FuZC12aWV3Jyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3LmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGFwcC5jbGllbnRIdG1sWydpbmNsdWRlcy5wZXJzb24nXTtcbiAgICB9LFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgICdtb2RlbC5mdWxsTmFtZSc6ICdbZGF0YS1ob29rfj1uYW1lXScsXG4gICAgICAgICdtb2RlbC5hdmF0YXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlJyxcbiAgICAgICAgICAgIGhvb2s6ICdhdmF0YXInLFxuICAgICAgICAgICAgbmFtZTogJ3NyYydcbiAgICAgICAgfSxcbiAgICAgICAgJ21vZGVsLmVkaXRVcmwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlJyxcbiAgICAgICAgICAgIGhvb2s6ICdhY3Rpb24tZWRpdCcsXG4gICAgICAgICAgICBuYW1lOiAnaHJlZidcbiAgICAgICAgfSxcbiAgICAgICAgJ21vZGVsLnZpZXdVcmwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlJyxcbiAgICAgICAgICAgIGhvb2s6ICduYW1lJyxcbiAgICAgICAgICAgIG5hbWU6ICdocmVmJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgICAgJ2NsaWNrIFtkYXRhLWhvb2t+PWFjdGlvbi1kZWxldGVdJzogJ2hhbmRsZVJlbW92ZUNsaWNrJ1xuICAgIH0sXG4gICAgaGFuZGxlUmVtb3ZlQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcbiIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWNvbGxlY3Rpb24tdW5kZXJzY29yZS1taXhpblwiXSA9IHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtY29sbGVjdGlvbi11bmRlcnNjb3JlLW1peGluXCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1jb2xsZWN0aW9uLXVuZGVyc2NvcmUtbWl4aW5cIl0ucHVzaChcIjEuMC4zXCIpO31cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgbWl4aW5zID0ge307XG5cblxuLy8gVW5kZXJzY29yZSBtZXRob2RzIHRoYXQgd2Ugd2FudCB0byBpbXBsZW1lbnQgb24gdGhlIENvbGxlY3Rpb24uXG52YXIgbWV0aG9kcyA9IFsnZm9yRWFjaCcsICdlYWNoJywgJ21hcCcsICdjb2xsZWN0JywgJ3JlZHVjZScsICdmb2xkbCcsXG4gICAgJ2luamVjdCcsICdyZWR1Y2VSaWdodCcsICdmb2xkcicsICdmaW5kJywgJ2RldGVjdCcsICdmaWx0ZXInLCAnc2VsZWN0JyxcbiAgICAncmVqZWN0JywgJ2V2ZXJ5JywgJ2FsbCcsICdzb21lJywgJ2FueScsICdpbmNsdWRlJywgJ2NvbnRhaW5zJywgJ2ludm9rZScsXG4gICAgJ21heCcsICdtaW4nLCAndG9BcnJheScsICdzaXplJywgJ2ZpcnN0JywgJ2hlYWQnLCAndGFrZScsICdpbml0aWFsJywgJ3Jlc3QnLFxuICAgICd0YWlsJywgJ2Ryb3AnLCAnbGFzdCcsICd3aXRob3V0JywgJ2RpZmZlcmVuY2UnLCAnaW5kZXhPZicsICdzaHVmZmxlJyxcbiAgICAnbGFzdEluZGV4T2YnLCAnaXNFbXB0eScsICdjaGFpbicsICdzYW1wbGUnLCAncGFydGl0aW9uJ1xuXTtcblxuLy8gTWl4IGluIGVhY2ggVW5kZXJzY29yZSBtZXRob2QgYXMgYSBwcm94eSB0byBgQ29sbGVjdGlvbiNtb2RlbHNgLlxuXy5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICBpZiAoIV9bbWV0aG9kXSkgcmV0dXJuO1xuICAgIG1peGluc1ttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KHRoaXMubW9kZWxzKTtcbiAgICAgICAgcmV0dXJuIF9bbWV0aG9kXS5hcHBseShfLCBhcmdzKTtcbiAgICB9O1xufSk7XG5cbi8vIFVuZGVyc2NvcmUgbWV0aG9kcyB0aGF0IHRha2UgYSBwcm9wZXJ0eSBuYW1lIGFzIGFuIGFyZ3VtZW50LlxudmFyIGF0dHJpYnV0ZU1ldGhvZHMgPSBbJ2dyb3VwQnknLCAnY291bnRCeScsICdzb3J0QnknLCAnaW5kZXhCeSddO1xuXG4vLyBVc2UgYXR0cmlidXRlcyBpbnN0ZWFkIG9mIHByb3BlcnRpZXMuXG5fLmVhY2goYXR0cmlidXRlTWV0aG9kcywgZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIGlmICghX1ttZXRob2RdKSByZXR1cm47XG4gICAgbWl4aW5zW21ldGhvZF0gPSBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlIDogZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwuZ2V0ID8gbW9kZWwuZ2V0KHZhbHVlKSA6IG1vZGVsW3ZhbHVlXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9bbWV0aG9kXSh0aGlzLm1vZGVscywgaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH07XG59KTtcblxuLy8gUmV0dXJuIG1vZGVscyB3aXRoIG1hdGNoaW5nIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3Igc2ltcGxlIGNhc2VzIG9mXG4vLyBgZmlsdGVyYC5cbm1peGlucy53aGVyZSA9IGZ1bmN0aW9uIChhdHRycywgZmlyc3QpIHtcbiAgICBpZiAoXy5pc0VtcHR5KGF0dHJzKSkgcmV0dXJuIGZpcnN0ID8gdm9pZCAwIDogW107XG4gICAgcmV0dXJuIHRoaXNbZmlyc3QgPyAnZmluZCcgOiAnZmlsdGVyJ10oZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1vZGVsLmdldCA/IG1vZGVsLmdldChrZXkpIDogbW9kZWxba2V5XTtcbiAgICAgICAgICAgIGlmIChhdHRyc1trZXldICE9PSB2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufTtcblxuLy8gUmV0dXJuIHRoZSBmaXJzdCBtb2RlbCB3aXRoIG1hdGNoaW5nIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3Igc2ltcGxlIGNhc2VzXG4vLyBvZiBgZmluZGAuXG5taXhpbnMuZmluZFdoZXJlID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gICAgcmV0dXJuIHRoaXMud2hlcmUoYXR0cnMsIHRydWUpO1xufTtcblxuLy8gUGx1Y2tzIGFuIGF0dHJpYnV0ZSBmcm9tIGVhY2ggbW9kZWwgaW4gdGhlIGNvbGxlY3Rpb24uXG5taXhpbnMucGx1Y2sgPSBmdW5jdGlvbiAoYXR0cikge1xuICAgIHJldHVybiBfLmludm9rZSh0aGlzLm1vZGVscywgJ2dldCcsIGF0dHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaXhpbnM7XG4iLCJ2YXIgQmFja2JvbmVFdmVudHMgPSByZXF1aXJlKCdiYWNrYm9uZS1ldmVudHMtc3RhbmRhbG9uZScpO1xudmFyIGNsYXNzRXh0ZW5kID0gcmVxdWlyZSgnYW1wZXJzYW5kLWNsYXNzLWV4dGVuZCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpcy1hcnJheScpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZC1vYmplY3QnKTtcbnZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG5cbmZ1bmN0aW9uIENvbGxlY3Rpb24obW9kZWxzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICBpZiAob3B0aW9ucy5tb2RlbCkgdGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyYXRvcikgdGhpcy5jb21wYXJhdG9yID0gb3B0aW9ucy5jb21wYXJhdG9yO1xuICAgIGlmIChvcHRpb25zLnBhcmVudCkgdGhpcy5wYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgICBpZiAoIXRoaXMubWFpbkluZGV4KSB7XG4gICAgICAgIHZhciBpZEF0dHJpYnV0ZSA9IHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5wcm90b3R5cGUgJiYgdGhpcy5tb2RlbC5wcm90b3R5cGUuaWRBdHRyaWJ1dGU7XG4gICAgICAgIHRoaXMubWFpbkluZGV4ID0gaWRBdHRyaWJ1dGUgfHwgJ2lkJztcbiAgICB9XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAobW9kZWxzKSB0aGlzLnJlc2V0KG1vZGVscywgZXh0ZW5kKHtzaWxlbnQ6IHRydWV9LCBvcHRpb25zKSk7XG59XG5cbmV4dGVuZChDb2xsZWN0aW9uLnByb3RvdHlwZSwgQmFja2JvbmVFdmVudHMsIHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7fSxcblxuICAgIGluZGV4ZXM6IFtdLFxuXG4gICAgaXNNb2RlbDogZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsICYmIG1vZGVsIGluc3RhbmNlb2YgdGhpcy5tb2RlbDtcbiAgICB9LFxuXG4gICAgYWRkOiBmdW5jdGlvbiAobW9kZWxzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldChtb2RlbHMsIGV4dGVuZCh7bWVyZ2U6IGZhbHNlLCBhZGQ6IHRydWUsIHJlbW92ZTogZmFsc2V9LCBvcHRpb25zKSk7XG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRhYmxlIHBhcnNlIG1ldGhvZFxuICAgIHBhcnNlOiBmdW5jdGlvbiAocmVzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRhYmxlIHNlcmlhbGl6ZSBtZXRob2RcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsLnNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbC5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG91dCA9IHt9O1xuICAgICAgICAgICAgICAgIGV4dGVuZChvdXQsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3V0LmNvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJpYWxpemUoKTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiAobW9kZWxzLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBleHRlbmQoe2FkZDogdHJ1ZSwgcmVtb3ZlOiB0cnVlLCBtZXJnZTogdHJ1ZX0sIG9wdGlvbnMpO1xuICAgICAgICBpZiAob3B0aW9ucy5wYXJzZSkgbW9kZWxzID0gdGhpcy5wYXJzZShtb2RlbHMsIG9wdGlvbnMpO1xuICAgICAgICB2YXIgc2luZ3VsYXIgPSAhaXNBcnJheShtb2RlbHMpO1xuICAgICAgICBtb2RlbHMgPSBzaW5ndWxhciA/IChtb2RlbHMgPyBbbW9kZWxzXSA6IFtdKSA6IG1vZGVscy5zbGljZSgpO1xuICAgICAgICB2YXIgaWQsIG1vZGVsLCBhdHRycywgZXhpc3RpbmcsIHNvcnQsIGksIGxlbmd0aDtcbiAgICAgICAgdmFyIGF0ID0gb3B0aW9ucy5hdDtcbiAgICAgICAgdmFyIHNvcnRhYmxlID0gdGhpcy5jb21wYXJhdG9yICYmIChhdCA9PSBudWxsKSAmJiBvcHRpb25zLnNvcnQgIT09IGZhbHNlO1xuICAgICAgICB2YXIgc29ydEF0dHIgPSAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLmNvbXBhcmF0b3IpID8gdGhpcy5jb21wYXJhdG9yIDogbnVsbDtcbiAgICAgICAgdmFyIHRvQWRkID0gW10sIHRvUmVtb3ZlID0gW10sIG1vZGVsTWFwID0ge307XG4gICAgICAgIHZhciBhZGQgPSBvcHRpb25zLmFkZCwgbWVyZ2UgPSBvcHRpb25zLm1lcmdlLCByZW1vdmUgPSBvcHRpb25zLnJlbW92ZTtcbiAgICAgICAgdmFyIG9yZGVyID0gIXNvcnRhYmxlICYmIGFkZCAmJiByZW1vdmUgPyBbXSA6IGZhbHNlO1xuICAgICAgICB2YXIgdGFyZ2V0UHJvdG8gPSB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwucHJvdG90eXBlIHx8IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgICAgICAgLy8gVHVybiBiYXJlIG9iamVjdHMgaW50byBtb2RlbCByZWZlcmVuY2VzLCBhbmQgcHJldmVudCBpbnZhbGlkIG1vZGVsc1xuICAgICAgICAvLyBmcm9tIGJlaW5nIGFkZGVkLlxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBtb2RlbHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGF0dHJzID0gbW9kZWxzW2ldIHx8IHt9O1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb2RlbChhdHRycykpIHtcbiAgICAgICAgICAgICAgICBpZCA9IG1vZGVsID0gYXR0cnM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldFByb3RvLmdlbmVyYXRlSWQpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHRhcmdldFByb3RvLmdlbmVyYXRlSWQoYXR0cnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZCA9IGF0dHJzW3RhcmdldFByb3RvLmlkQXR0cmlidXRlIHx8IHRoaXMubWFpbkluZGV4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgYSBkdXBsaWNhdGUgaXMgZm91bmQsIHByZXZlbnQgaXQgZnJvbSBiZWluZyBhZGRlZCBhbmRcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsbHkgbWVyZ2UgaXQgaW50byB0aGUgZXhpc3RpbmcgbW9kZWwuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcgPSB0aGlzLmdldChpZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZlKSBtb2RlbE1hcFtleGlzdGluZy5jaWQgfHwgZXhpc3RpbmdbdGhpcy5tYWluSW5kZXhdXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG1lcmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzID0gYXR0cnMgPT09IG1vZGVsID8gbW9kZWwuYXR0cmlidXRlcyA6IGF0dHJzO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wYXJzZSkgYXR0cnMgPSBleGlzdGluZy5wYXJzZShhdHRycywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nLnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmcuc2V0KGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSAmJiAhc29ydCAmJiBleGlzdGluZy5oYXNDaGFuZ2VkKHNvcnRBdHRyKSkgc29ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBub3QganVzdCB1cGRhdGUgdGhlIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZChleGlzdGluZywgYXR0cnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZGVsc1tpXSA9IGV4aXN0aW5nO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgbmV3LCB2YWxpZCBtb2RlbCwgcHVzaCBpdCB0byB0aGUgYHRvQWRkYCBsaXN0LlxuICAgICAgICAgICAgfSBlbHNlIGlmIChhZGQpIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IG1vZGVsc1tpXSA9IHRoaXMuX3ByZXBhcmVNb2RlbChhdHRycywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgdG9BZGQucHVzaChtb2RlbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkUmVmZXJlbmNlKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRG8gbm90IGFkZCBtdWx0aXBsZSBtb2RlbHMgd2l0aCB0aGUgc2FtZSBgaWRgLlxuICAgICAgICAgICAgbW9kZWwgPSBleGlzdGluZyB8fCBtb2RlbDtcbiAgICAgICAgICAgIGlmICghbW9kZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG9yZGVyICYmICgobW9kZWwuaXNOZXcgJiYgbW9kZWwuaXNOZXcoKSB8fCAhbW9kZWxbdGhpcy5tYWluSW5kZXhdKSB8fCAhbW9kZWxNYXBbbW9kZWwuY2lkIHx8IG1vZGVsW3RoaXMubWFpbkluZGV4XV0pKSBvcmRlci5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgIG1vZGVsTWFwW21vZGVsW3RoaXMubWFpbkluZGV4XV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIG5vbmV4aXN0ZW50IG1vZGVscyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gdGhpcy5tb2RlbHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbE1hcFttb2RlbC5jaWQgfHwgbW9kZWxbdGhpcy5tYWluSW5kZXhdXSkgdG9SZW1vdmUucHVzaChtb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9SZW1vdmUubGVuZ3RoKSB0aGlzLnJlbW92ZSh0b1JlbW92ZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWUgaWYgc29ydGluZyBpcyBuZWVkZWQsIHVwZGF0ZSBgbGVuZ3RoYCBhbmQgc3BsaWNlIGluIG5ldyBtb2RlbHMuXG4gICAgICAgIGlmICh0b0FkZC5sZW5ndGggfHwgKG9yZGVyICYmIG9yZGVyLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGlmIChzb3J0YWJsZSkgc29ydCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoYXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IHRvQWRkLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWxzLnNwbGljZShhdCArIGksIDAsIHRvQWRkW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkTW9kZWxzID0gb3JkZXIgfHwgdG9BZGQ7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gb3JkZXJlZE1vZGVscy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVscy5wdXNoKG9yZGVyZWRNb2RlbHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbGVudGx5IHNvcnQgdGhlIGNvbGxlY3Rpb24gaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgIGlmIChzb3J0KSB0aGlzLnNvcnQoe3NpbGVudDogdHJ1ZX0pO1xuXG4gICAgICAgIC8vIFVubGVzcyBzaWxlbmNlZCwgaXQncyB0aW1lIHRvIGZpcmUgYWxsIGFwcHJvcHJpYXRlIGFkZC9zb3J0IGV2ZW50cy5cbiAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gdG9BZGQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IHRvQWRkW2ldO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnRyaWdnZXIoJ2FkZCcsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2FkZCcsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc29ydCB8fCAob3JkZXIgJiYgb3JkZXIubGVuZ3RoKSkgdGhpcy50cmlnZ2VyKCdzb3J0JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGFkZGVkIChvciBtZXJnZWQpIG1vZGVsIChvciBtb2RlbHMpLlxuICAgICAgICByZXR1cm4gc2luZ3VsYXIgPyBtb2RlbHNbMF0gOiBtb2RlbHM7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24gKHF1ZXJ5LCBpbmRleE5hbWUpIHtcbiAgICAgICAgaWYgKCFxdWVyeSkgcmV0dXJuO1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9pbmRleGVzW2luZGV4TmFtZSB8fCB0aGlzLm1haW5JbmRleF07XG4gICAgICAgIHJldHVybiBpbmRleFtxdWVyeV0gfHwgaW5kZXhbcXVlcnlbdGhpcy5tYWluSW5kZXhdXSB8fCB0aGlzLl9pbmRleGVzLmNpZFtxdWVyeS5jaWRdO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIG1vZGVsIGF0IHRoZSBnaXZlbiBpbmRleC5cbiAgICBhdDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpbmRleF07XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2luZ3VsYXIgPSAhaXNBcnJheShtb2RlbHMpO1xuICAgICAgICB2YXIgaSwgbGVuZ3RoLCBtb2RlbCwgaW5kZXg7XG5cbiAgICAgICAgbW9kZWxzID0gc2luZ3VsYXIgPyBbbW9kZWxzXSA6IHNsaWNlLmNhbGwobW9kZWxzKTtcbiAgICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gbW9kZWxzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsc1tpXSA9IHRoaXMuZ2V0KG1vZGVsc1tpXSk7XG4gICAgICAgICAgICBpZiAoIW1vZGVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX2RlSW5kZXgobW9kZWwpO1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm1vZGVscy5pbmRleE9mKG1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC50cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnRyaWdnZXIoJ3JlbW92ZScsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3JlbW92ZScsIG1vZGVsLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVSZWZlcmVuY2UobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5ndWxhciA/IG1vZGVsc1swXSA6IG1vZGVscztcbiAgICB9LFxuXG4gICAgLy8gV2hlbiB5b3UgaGF2ZSBtb3JlIGl0ZW1zIHRoYW4geW91IHdhbnQgdG8gYWRkIG9yIHJlbW92ZSBpbmRpdmlkdWFsbHksXG4gICAgLy8geW91IGNhbiByZXNldCB0aGUgZW50aXJlIHNldCB3aXRoIGEgbmV3IGxpc3Qgb2YgbW9kZWxzLCB3aXRob3V0IGZpcmluZ1xuICAgIC8vIGFueSBncmFudWxhciBgYWRkYCBvciBgcmVtb3ZlYCBldmVudHMuIEZpcmVzIGByZXNldGAgd2hlbiBmaW5pc2hlZC5cbiAgICAvLyBVc2VmdWwgZm9yIGJ1bGsgb3BlcmF0aW9ucyBhbmQgb3B0aW1pemF0aW9ucy5cbiAgICByZXNldDogZnVuY3Rpb24gKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVJlZmVyZW5jZSh0aGlzLm1vZGVsc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5wcmV2aW91c01vZGVscyA9IHRoaXMubW9kZWxzO1xuICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICBtb2RlbHMgPSB0aGlzLmFkZChtb2RlbHMsIGV4dGVuZCh7c2lsZW50OiB0cnVlfSwgb3B0aW9ucykpO1xuICAgICAgICBpZiAoIW9wdGlvbnMuc2lsZW50KSB0aGlzLnRyaWdnZXIoJ3Jlc2V0JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBtb2RlbHM7XG4gICAgfSxcblxuICAgIHNvcnQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBhcmF0b3IpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNvcnQgYSBzZXQgd2l0aG91dCBhIGNvbXBhcmF0b3InKTtcbiAgICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29tcGFyYXRvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzLnNvcnQoZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQuZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0LmdldChzZWxmLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICByaWdodCA9IHJpZ2h0LmdldChzZWxmLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBsZWZ0W3NlbGYuY29tcGFyYXRvcl07XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gcmlnaHRbc2VsZi5jb21wYXJhdG9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPiByaWdodCB8fCBsZWZ0ID09PSB2b2lkIDApIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgcmlnaHQgfHwgcmlnaHQgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb21wYXJhdG9yLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbHMuc29ydChmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gc2VsZi5jb21wYXJhdG9yKGxlZnQpO1xuICAgICAgICAgICAgICAgIHJpZ2h0ID0gc2VsZi5jb21wYXJhdG9yKHJpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAobGVmdCA+IHJpZ2h0IHx8IGxlZnQgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPCByaWdodCB8fCByaWdodCA9PT0gdm9pZCAwKSByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzLnNvcnQodGhpcy5jb21wYXJhdG9yLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkgdGhpcy50cmlnZ2VyKCdzb3J0JywgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBQcml2YXRlIG1ldGhvZCB0byByZXNldCBhbGwgaW50ZXJuYWwgc3RhdGUuIENhbGxlZCB3aGVuIHRoZSBjb2xsZWN0aW9uXG4gICAgLy8gaXMgZmlyc3QgaW5pdGlhbGl6ZWQgb3IgcmVzZXQuXG4gICAgX3Jlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5pbmRleGVzIHx8IFtdO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGxpc3QucHVzaCh0aGlzLm1haW5JbmRleCk7XG4gICAgICAgIGxpc3QucHVzaCgnY2lkJyk7XG4gICAgICAgIHZhciBsID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHRoaXMubW9kZWxzID0gW107XG4gICAgICAgIHRoaXMuX2luZGV4ZXMgPSB7fTtcbiAgICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ZXNbbGlzdFtpXV0gPSB7fTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcHJlcGFyZU1vZGVsOiBmdW5jdGlvbiAoYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gaWYgd2UgaGF2ZW4ndCBkZWZpbmVkIGEgY29uc3RydWN0b3IsIHNraXAgdGhpc1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwpIHJldHVybiBhdHRycztcblxuICAgICAgICBpZiAodGhpcy5pc01vZGVsKGF0dHJzKSkge1xuICAgICAgICAgICAgaWYgKCFhdHRycy5jb2xsZWN0aW9uKSBhdHRycy5jb2xsZWN0aW9uID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBhdHRycztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gZXh0ZW5kKHt9LCBvcHRpb25zKSA6IHt9O1xuICAgICAgICAgICAgb3B0aW9ucy5jb2xsZWN0aW9uID0gdGhpcztcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IG5ldyB0aGlzLm1vZGVsKGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICghbW9kZWwudmFsaWRhdGlvbkVycm9yKSByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2ludmFsaWQnLCB0aGlzLCBtb2RlbC52YWxpZGF0aW9uRXJyb3IsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kZUluZGV4OiBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLl9pbmRleGVzKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faW5kZXhlc1tuYW1lXVttb2RlbFtuYW1lXSB8fCAobW9kZWwuZ2V0ICYmIG1vZGVsLmdldChuYW1lKSldO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbmRleDogZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5faW5kZXhlcykge1xuICAgICAgICAgICAgdmFyIGluZGV4VmFsID0gbW9kZWxbbmFtZV0gfHwgKG1vZGVsLmdldCAmJiBtb2RlbC5nZXQobmFtZSkpO1xuICAgICAgICAgICAgaWYgKGluZGV4VmFsKSB0aGlzLl9pbmRleGVzW25hbWVdW2luZGV4VmFsXSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEludGVybmFsIG1ldGhvZCB0byBjcmVhdGUgYSBtb2RlbCdzIHRpZXMgdG8gYSBjb2xsZWN0aW9uLlxuICAgIF9hZGRSZWZlcmVuY2U6IGZ1bmN0aW9uIChtb2RlbCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9pbmRleChtb2RlbCk7XG4gICAgICAgIGlmICghbW9kZWwuY29sbGVjdGlvbikgbW9kZWwuY29sbGVjdGlvbiA9IHRoaXM7XG4gICAgICAgIGlmIChtb2RlbC5vbikgbW9kZWwub24oJ2FsbCcsIHRoaXMuX29uTW9kZWxFdmVudCwgdGhpcyk7XG4gICAgfSxcblxuICAgICAgICAvLyBJbnRlcm5hbCBtZXRob2QgdG8gc2V2ZXIgYSBtb2RlbCdzIHRpZXMgdG8gYSBjb2xsZWN0aW9uLlxuICAgIF9yZW1vdmVSZWZlcmVuY2U6IGZ1bmN0aW9uIChtb2RlbCwgb3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcyA9PT0gbW9kZWwuY29sbGVjdGlvbikgZGVsZXRlIG1vZGVsLmNvbGxlY3Rpb247XG4gICAgICAgIHRoaXMuX2RlSW5kZXgobW9kZWwpO1xuICAgICAgICBpZiAobW9kZWwub2ZmKSBtb2RlbC5vZmYoJ2FsbCcsIHRoaXMuX29uTW9kZWxFdmVudCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9vbk1vZGVsRXZlbnQ6IGZ1bmN0aW9uIChldmVudCwgbW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKChldmVudCA9PT0gJ2FkZCcgfHwgZXZlbnQgPT09ICdyZW1vdmUnKSAmJiBjb2xsZWN0aW9uICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgIGlmIChldmVudCA9PT0gJ2Rlc3Ryb3knKSB0aGlzLnJlbW92ZShtb2RlbCwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChtb2RlbCAmJiBldmVudCA9PT0gJ2NoYW5nZTonICsgdGhpcy5tYWluSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlSW5kZXgobW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5faW5kZXgobW9kZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhDb2xsZWN0aW9uLnByb3RvdHlwZSwge1xuICAgIGxlbmd0aDoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVscy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzQ29sbGVjdGlvbjoge1xuICAgICAgICB2YWx1ZTogdHJ1ZVxuICAgIH1cbn0pO1xuXG52YXIgYXJyYXlNZXRob2RzID0gW1xuICAgICdpbmRleE9mJyxcbiAgICAnbGFzdEluZGV4T2YnLFxuICAgICdldmVyeScsXG4gICAgJ3NvbWUnLFxuICAgICdmb3JFYWNoJyxcbiAgICAnbWFwJyxcbiAgICAnZmlsdGVyJyxcbiAgICAncmVkdWNlJyxcbiAgICAncmVkdWNlUmlnaHQnXG5dO1xuXG5hcnJheU1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW21ldGhvZF0uYXBwbHkodGhpcy5tb2RlbHMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn0pO1xuXG4vLyBhbGlhcyBlYWNoL2ZvckVhY2ggZm9yIG1heGltdW0gY29tcGF0aWJpbGl0eVxuQ29sbGVjdGlvbi5wcm90b3R5cGUuZWFjaCA9IENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2g7XG5cbkNvbGxlY3Rpb24uZXh0ZW5kID0gY2xhc3NFeHRlbmQ7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbjtcbiIsInZhciBvYmplY3RFeHRlbmQgPSByZXF1aXJlKCdleHRlbmQtb2JqZWN0Jyk7XG5cblxuLy8vIEZvbGxvd2luZyBjb2RlIGlzIGxhcmdlbHkgcGFzdGVkIGZyb20gQmFja2JvbmUuanNcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvcnJlY3RseSBzZXQgdXAgdGhlIHByb3RvdHlwZSBjaGFpbiwgZm9yIHN1YmNsYXNzZXMuXG4vLyBTaW1pbGFyIHRvIGBnb29nLmluaGVyaXRzYCwgYnV0IHVzZXMgYSBoYXNoIG9mIHByb3RvdHlwZSBwcm9wZXJ0aWVzIGFuZFxuLy8gY2xhc3MgcHJvcGVydGllcyB0byBiZSBleHRlbmRlZC5cbnZhciBleHRlbmQgPSBmdW5jdGlvbihwcm90b1Byb3BzKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuICAgIC8vICh0aGUgXCJjb25zdHJ1Y3RvclwiIHByb3BlcnR5IGluIHlvdXIgYGV4dGVuZGAgZGVmaW5pdGlvbiksIG9yIGRlZmF1bHRlZFxuICAgIC8vIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3Rvci5cbiAgICBpZiAocHJvdG9Qcm9wcyAmJiBwcm90b1Byb3BzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBBZGQgc3RhdGljIHByb3BlcnRpZXMgdG8gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZyb20gcGFyZW50XG4gICAgb2JqZWN0RXh0ZW5kKGNoaWxkLCBwYXJlbnQpO1xuXG4gICAgLy8gU2V0IHRoZSBwcm90b3R5cGUgY2hhaW4gdG8gaW5oZXJpdCBmcm9tIGBwYXJlbnRgLCB3aXRob3V0IGNhbGxpbmdcbiAgICAvLyBgcGFyZW50YCdzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgIHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbigpeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH07XG4gICAgU3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgY2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG4gICAgLy8gTWl4IGluIGFsbCBwcm90b3R5cGUgcHJvcGVydGllcyB0byB0aGUgc3ViY2xhc3MgaWYgc3VwcGxpZWQuXG4gICAgaWYgKHByb3RvUHJvcHMpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KGNoaWxkLnByb3RvdHlwZSk7XG4gICAgICAgIG9iamVjdEV4dGVuZC5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgYSBjb252ZW5pZW5jZSBwcm9wZXJ0eSBpbiBjYXNlIHRoZSBwYXJlbnQncyBwcm90b3R5cGUgaXMgbmVlZGVkXG4gICAgLy8gbGF0ZXIuXG4gICAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcblxuICAgIHJldHVybiBjaGlsZDtcbn07XG5cbi8vIEV4cG9zZSB0aGUgZXh0ZW5kIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZDtcbiIsIi8qKlxuICogU3RhbmRhbG9uZSBleHRyYWN0aW9uIG9mIEJhY2tib25lLkV2ZW50cywgbm8gZXh0ZXJuYWwgZGVwZW5kZW5jeSByZXF1aXJlZC5cbiAqIERlZ3JhZGVzIG5pY2VseSB3aGVuIEJhY2tvbmUvdW5kZXJzY29yZSBhcmUgYWxyZWFkeSBhdmFpbGFibGUgaW4gdGhlIGN1cnJlbnRcbiAqIGdsb2JhbCBjb250ZXh0LlxuICpcbiAqIE5vdGUgdGhhdCBkb2NzIHN1Z2dlc3QgdG8gdXNlIHVuZGVyc2NvcmUncyBgXy5leHRlbmQoKWAgbWV0aG9kIHRvIGFkZCBFdmVudHNcbiAqIHN1cHBvcnQgdG8gc29tZSBnaXZlbiBvYmplY3QuIEEgYG1peGluKClgIG1ldGhvZCBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRXZlbnRzXG4gKiBwcm90b3R5cGUgdG8gYXZvaWQgdXNpbmcgdW5kZXJzY29yZSBmb3IgdGhhdCBzb2xlIHB1cnBvc2U6XG4gKlxuICogICAgIHZhciBteUV2ZW50RW1pdHRlciA9IEJhY2tib25lRXZlbnRzLm1peGluKHt9KTtcbiAqXG4gKiBPciBmb3IgYSBmdW5jdGlvbiBjb25zdHJ1Y3RvcjpcbiAqXG4gKiAgICAgZnVuY3Rpb24gTXlDb25zdHJ1Y3Rvcigpe31cbiAqICAgICBNeUNvbnN0cnVjdG9yLnByb3RvdHlwZS5mb28gPSBmdW5jdGlvbigpe31cbiAqICAgICBCYWNrYm9uZUV2ZW50cy5taXhpbihNeUNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gKlxuICogKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgSW5jLlxuICogKGMpIDIwMTMgTmljb2xhcyBQZXJyaWF1bHRcbiAqL1xuLyogZ2xvYmFsIGV4cG9ydHM6dHJ1ZSwgZGVmaW5lLCBtb2R1bGUgKi9cbihmdW5jdGlvbigpIHtcbiAgdmFyIHJvb3QgPSB0aGlzLFxuICAgICAgYnJlYWtlciA9IHt9LFxuICAgICAgbmF0aXZlRm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICBpZENvdW50ZXIgPSAwO1xuXG4gIC8vIFJldHVybnMgYSBwYXJ0aWFsIGltcGxlbWVudGF0aW9uIG1hdGNoaW5nIHRoZSBtaW5pbWFsIEFQSSBzdWJzZXQgcmVxdWlyZWRcbiAgLy8gYnkgQmFja2JvbmUuRXZlbnRzXG4gIGZ1bmN0aW9uIG1pbmlzY29yZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5czogT2JqZWN0LmtleXMsXG5cbiAgICAgIHVuaXF1ZUlkOiBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICAgICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gICAgICB9LFxuXG4gICAgICBoYXM6IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICAgIH0sXG5cbiAgICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBvbmNlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChyYW4pIHJldHVybiBtZW1vO1xuICAgICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIF8gPSBtaW5pc2NvcmUoKSwgRXZlbnRzO1xuXG4gIC8vIEJhY2tib25lLkV2ZW50c1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBBIG1vZHVsZSB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byAqYW55IG9iamVjdCogaW4gb3JkZXIgdG8gcHJvdmlkZSBpdCB3aXRoXG4gIC8vIGN1c3RvbSBldmVudHMuIFlvdSBtYXkgYmluZCB3aXRoIGBvbmAgb3IgcmVtb3ZlIHdpdGggYG9mZmAgY2FsbGJhY2tcbiAgLy8gZnVuY3Rpb25zIHRvIGFuIGV2ZW50OyBgdHJpZ2dlcmAtaW5nIGFuIGV2ZW50IGZpcmVzIGFsbCBjYWxsYmFja3MgaW5cbiAgLy8gc3VjY2Vzc2lvbi5cbiAgLy9cbiAgLy8gICAgIHZhciBvYmplY3QgPSB7fTtcbiAgLy8gICAgIF8uZXh0ZW5kKG9iamVjdCwgQmFja2JvbmUuRXZlbnRzKTtcbiAgLy8gICAgIG9iamVjdC5vbignZXhwYW5kJywgZnVuY3Rpb24oKXsgYWxlcnQoJ2V4cGFuZGVkJyk7IH0pO1xuICAvLyAgICAgb2JqZWN0LnRyaWdnZXIoJ2V4cGFuZCcpO1xuICAvL1xuICBFdmVudHMgPSB7XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi4gUGFzc2luZyBgXCJhbGxcImAgd2lsbCBiaW5kXG4gICAgLy8gdGhlIGNhbGxiYWNrIHRvIGFsbCBldmVudHMgZmlyZWQuXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb24nLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8ICh0aGlzLl9ldmVudHNbbmFtZV0gPSBbXSk7XG4gICAgICBldmVudHMucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0LCBjdHg6IGNvbnRleHQgfHwgdGhpc30pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gb25seSBiZSB0cmlnZ2VyZWQgYSBzaW5nbGUgdGltZS4gQWZ0ZXIgdGhlIGZpcnN0IHRpbWVcbiAgICAvLyB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZCwgaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgIG9uY2U6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgb25jZSA9IF8ub25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5vZmYobmFtZSwgb25jZSk7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICAgIG9uY2UuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBvbmNlLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIG9uZSBvciBtYW55IGNhbGxiYWNrcy4gSWYgYGNvbnRleHRgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIHdpdGggdGhhdCBmdW5jdGlvbi4gSWYgYGNhbGxiYWNrYCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50LiBJZiBgbmFtZWAgaXMgbnVsbCwgcmVtb3ZlcyBhbGwgYm91bmRcbiAgICAvLyBjYWxsYmFja3MgZm9yIGFsbCBldmVudHMuXG4gICAgb2ZmOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgdmFyIHJldGFpbiwgZXYsIGV2ZW50cywgbmFtZXMsIGksIGwsIGosIGs7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgICBpZiAoIW5hbWUgJiYgIWNhbGxiYWNrICYmICFjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogXy5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaWYgKGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdO1xuICAgICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVHJpZ2dlciBvbmUgb3IgbWFueSBldmVudHMsIGZpcmluZyBhbGwgYm91bmQgY2FsbGJhY2tzLiBDYWxsYmFja3MgYXJlXG4gICAgLy8gcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBgdHJpZ2dlcmAgaXMsIGFwYXJ0IGZyb20gdGhlIGV2ZW50IG5hbWVcbiAgICAvLyAodW5sZXNzIHlvdSdyZSBsaXN0ZW5pbmcgb24gYFwiYWxsXCJgLCB3aGljaCB3aWxsIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG9cbiAgICAvLyByZWNlaXZlIHRoZSB0cnVlIG5hbWUgb2YgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCkuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgIGlmIChldmVudHMpIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgIGlmIChhbGxFdmVudHMpIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRlbGwgdGhpcyBvYmplY3QgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gZWl0aGVyIHNwZWNpZmljIGV2ZW50cyAuLi4gb3JcbiAgICAvLyB0byBldmVyeSBvYmplY3QgaXQncyBjdXJyZW50bHkgbGlzdGVuaW5nIHRvLlxuICAgIHN0b3BMaXN0ZW5pbmc6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZGVsZXRlTGlzdGVuZXIgPSAhbmFtZSAmJiAhY2FsbGJhY2s7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBpZiAob2JqKSAobGlzdGVuZXJzID0ge30pW29iai5fbGlzdGVuZXJJZF0gPSBvYmo7XG4gICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgbGlzdGVuZXJzW2lkXS5vZmYobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBpZiAoZGVsZXRlTGlzdGVuZXIpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gc3BsaXQgZXZlbnQgc3RyaW5ncy5cbiAgdmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy87XG5cbiAgLy8gSW1wbGVtZW50IGZhbmN5IGZlYXR1cmVzIG9mIHRoZSBFdmVudHMgQVBJIHN1Y2ggYXMgbXVsdGlwbGUgZXZlbnRcbiAgLy8gbmFtZXMgYFwiY2hhbmdlIGJsdXJcImAgYW5kIGpRdWVyeS1zdHlsZSBldmVudCBtYXBzIGB7Y2hhbmdlOiBhY3Rpb259YFxuICAvLyBpbiB0ZXJtcyBvZiB0aGUgZXhpc3RpbmcgQVBJLlxuICB2YXIgZXZlbnRzQXBpID0gZnVuY3Rpb24ob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNwYWNlIHNlcGFyYXRlZCBldmVudCBuYW1lcy5cbiAgICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBbbmFtZXNbaV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gQSBkaWZmaWN1bHQtdG8tYmVsaWV2ZSwgYnV0IG9wdGltaXplZCBpbnRlcm5hbCBkaXNwYXRjaCBmdW5jdGlvbiBmb3JcbiAgLy8gdHJpZ2dlcmluZyBldmVudHMuIFRyaWVzIHRvIGtlZXAgdGhlIHVzdWFsIGNhc2VzIHNwZWVkeSAobW9zdCBpbnRlcm5hbFxuICAvLyBCYWNrYm9uZSBldmVudHMgaGF2ZSAzIGFyZ3VtZW50cykuXG4gIHZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gICAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgpOyByZXR1cm47XG4gICAgICBjYXNlIDE6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7IHJldHVybjtcbiAgICAgIGNhc2UgMjogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7IHJldHVybjtcbiAgICAgIGNhc2UgMzogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpOyByZXR1cm47XG4gICAgICBkZWZhdWx0OiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbGlzdGVuTWV0aG9kcyA9IHtsaXN0ZW5UbzogJ29uJywgbGlzdGVuVG9PbmNlOiAnb25jZSd9O1xuXG4gIC8vIEludmVyc2lvbi1vZi1jb250cm9sIHZlcnNpb25zIG9mIGBvbmAgYW5kIGBvbmNlYC4gVGVsbCAqdGhpcyogb2JqZWN0IHRvXG4gIC8vIGxpc3RlbiB0byBhbiBldmVudCBpbiBhbm90aGVyIG9iamVjdCAuLi4ga2VlcGluZyB0cmFjayBvZiB3aGF0IGl0J3NcbiAgLy8gbGlzdGVuaW5nIHRvLlxuICBfLmVhY2gobGlzdGVuTWV0aG9kcywgZnVuY3Rpb24oaW1wbGVtZW50YXRpb24sIG1ldGhvZCkge1xuICAgIEV2ZW50c1ttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0ge30pO1xuICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSBfLnVuaXF1ZUlkKCdsJykpO1xuICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIG9ialtpbXBsZW1lbnRhdGlvbl0obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWxpYXNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIEV2ZW50cy5iaW5kICAgPSBFdmVudHMub247XG4gIEV2ZW50cy51bmJpbmQgPSBFdmVudHMub2ZmO1xuXG4gIC8vIE1peGluIHV0aWxpdHlcbiAgRXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICB2YXIgZXhwb3J0cyA9IFsnb24nLCAnb25jZScsICdvZmYnLCAndHJpZ2dlcicsICdzdG9wTGlzdGVuaW5nJywgJ2xpc3RlblRvJyxcbiAgICAgICAgICAgICAgICAgICAnbGlzdGVuVG9PbmNlJywgJ2JpbmQnLCAndW5iaW5kJ107XG4gICAgXy5lYWNoKGV4cG9ydHMsIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHByb3RvW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH07XG5cbiAgLy8gRXhwb3J0IEV2ZW50cyBhcyBCYWNrYm9uZUV2ZW50cyBkZXBlbmRpbmcgb24gY3VycmVudCBjb250ZXh0XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRzO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuICAgIH1cbiAgICBleHBvcnRzLkJhY2tib25lRXZlbnRzID0gRXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH1cbn0pKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG4iLCJcbi8qKlxuICogaXNBcnJheVxuICovXG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiB0b1N0cmluZ1xuICovXG5cbnZhciBzdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBgdmFsYFxuICogaXMgYW4gYXJyYXkuXG4gKlxuICogZXhhbXBsZTpcbiAqXG4gKiAgICAgICAgaXNBcnJheShbXSk7XG4gKiAgICAgICAgLy8gPiB0cnVlXG4gKiAgICAgICAgaXNBcnJheShhcmd1bWVudHMpO1xuICogICAgICAgIC8vID4gZmFsc2VcbiAqICAgICAgICBpc0FycmF5KCcnKTtcbiAqICAgICAgICAvLyA+IGZhbHNlXG4gKlxuICogQHBhcmFtIHttaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtib29sfVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheSB8fCBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiAhISB2YWwgJiYgJ1tvYmplY3QgQXJyYXldJyA9PSBzdHIuY2FsbCh2YWwpO1xufTtcbiIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWRvbVwiXSA9IHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtZG9tXCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1kb21cIl0ucHVzaChcIjEuMi43XCIpO31cbnZhciBkb20gPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0ZXh0OiBmdW5jdGlvbiAoZWwsIHZhbCkge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IGdldFN0cmluZyh2YWwpO1xuICAgIH0sXG4gICAgLy8gb3B0aW1pemUgaWYgd2UgaGF2ZSBjbGFzc0xpc3RcbiAgICBhZGRDbGFzczogZnVuY3Rpb24gKGVsLCBjbHMpIHtcbiAgICAgICAgY2xzID0gZ2V0U3RyaW5nKGNscyk7XG4gICAgICAgIGlmICghY2xzKSByZXR1cm47XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNscykpIHtcbiAgICAgICAgICAgIGNscy5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoZWwsIGMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0NsYXNzKGVsLCBjbHMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgJyArIGNscztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoZWwsIGNscykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjbHMpKSB7XG4gICAgICAgICAgICBjbHMuZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKGVsLCBjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgY2xzID0gZ2V0U3RyaW5nKGNscyk7XG4gICAgICAgICAgICBpZiAoY2xzKSBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBtYXkgYmUgZmFzdGVyIHRvIG5vdCBlZGl0IHVubGVzcyB3ZSBrbm93IHdlIGhhdmUgaXQ/XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xzLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoYXNDbGFzczogaGFzQ2xhc3MsXG4gICAgc3dpdGNoQ2xhc3M6IGZ1bmN0aW9uIChlbCwgcHJldkNscywgbmV3Q2xzKSB7XG4gICAgICAgIGlmIChwcmV2Q2xzKSB0aGlzLnJlbW92ZUNsYXNzKGVsLCBwcmV2Q2xzKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhlbCwgbmV3Q2xzKTtcbiAgICB9LFxuICAgIC8vIG1ha2VzIHN1cmUgYXR0cmlidXRlICh3aXRoIG5vIGNvbnRlbnQpIGlzIGFkZGVkXG4gICAgLy8gaWYgZXhpc3RzIGl0IHdpbGwgYmUgY2xlYXJlZCBvZiBjb250ZW50XG4gICAgYWRkQXR0cmlidXRlOiBmdW5jdGlvbiAoZWwsIGF0dHIpIHtcbiAgICAgICAgLy8gc2V0dGluZyB0byBlbXB0eSBzdHJpbmcgZG9lcyBzYW1lXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCAnJyk7XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgd29uJ3QgdXBkYXRlIFVJIGZvciBib29sZWFuIGF0dHJpYnV0ZXMgdW5sZXNzIHlvdVxuICAgICAgICAvLyBzZXQgaXQgZGlyZWN0bHkuIFNvIHdlIGRvIGJvdGhcbiAgICAgICAgaWYgKGhhc0Jvb2xlYW5Qcm9wZXJ0eShlbCwgYXR0cikpIGVsW2F0dHJdID0gdHJ1ZTtcbiAgICB9LFxuICAgIC8vIGNvbXBsZXRlbHkgcmVtb3ZlcyBhdHRyaWJ1dGVcbiAgICByZW1vdmVBdHRyaWJ1dGU6IGZ1bmN0aW9uIChlbCwgYXR0cikge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIGlmIChoYXNCb29sZWFuUHJvcGVydHkoZWwsIGF0dHIpKSBlbFthdHRyXSA9IGZhbHNlO1xuICAgIH0sXG4gICAgLy8gc2V0cyBhdHRyaWJ1dGUgdG8gc3RyaW5nIHZhbHVlIGdpdmVuLCBjbGVhcmluZyBhbnkgY3VycmVudCB2YWx1ZVxuICAgIHNldEF0dHJpYnV0ZTogZnVuY3Rpb24gKGVsLCBhdHRyLCB2YWx1ZSkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgZ2V0U3RyaW5nKHZhbHVlKSk7XG4gICAgfSxcbiAgICBnZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIChlbCwgYXR0cikge1xuICAgICAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH0sXG4gICAgaGlkZTogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmICghaXNIaWRkZW4oZWwpKSB7XG4gICAgICAgICAgICBzdG9yZURpc3BsYXlTdHlsZShlbCk7XG4gICAgICAgICAgICBoaWRlKGVsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gc2hvdyBlbGVtZW50XG4gICAgc2hvdzogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHNob3coZWwpO1xuICAgIH0sXG4gICAgaHRtbDogZnVuY3Rpb24gKGVsLCBjb250ZW50KSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgfVxufTtcblxuLy8gaGVscGVyc1xuZnVuY3Rpb24gZ2V0U3RyaW5nKHZhbCkge1xuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsLCBjbHMpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xzICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzQm9vbGVhblByb3BlcnR5KGVsLCBwcm9wKSB7XG4gICAgdmFyIHZhbCA9IGVsW3Byb3BdO1xuICAgIHJldHVybiBwcm9wIGluIGVsICYmICh2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGlzSGlkZGVuIChlbCkge1xuICAgIHJldHVybiBkb20uZ2V0QXR0cmlidXRlKGVsLCAnZGF0YS1hbmRkb20taGlkZGVuJykgPT09ICd0cnVlJztcbn1cblxuZnVuY3Rpb24gc3RvcmVEaXNwbGF5U3R5bGUgKGVsKSB7XG4gICAgZG9tLnNldEF0dHJpYnV0ZShlbCwgJ2RhdGEtYW5kZG9tLWRpc3BsYXknLCBlbC5zdHlsZS5kaXNwbGF5KTtcbn1cblxuZnVuY3Rpb24gc2hvdyAoZWwpIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZG9tLmdldEF0dHJpYnV0ZShlbCwgJ2RhdGEtYW5kZG9tLWRpc3BsYXknKSB8fCAnJztcbiAgICBkb20ucmVtb3ZlQXR0cmlidXRlKGVsLCAnZGF0YS1hbmRkb20taGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIGhpZGUgKGVsKSB7XG4gICAgZG9tLnNldEF0dHJpYnV0ZShlbCwgJ2RhdGEtYW5kZG9tLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cbiIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWZvcm0tdmlld1wiXSA9IHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtZm9ybS12aWV3XCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1mb3JtLXZpZXdcIl0ucHVzaChcIjIuMi4wXCIpO31cbnZhciBCQkV2ZW50cyA9IHJlcXVpcmUoJ2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kLW9iamVjdCcpO1xuXG52YXIgcmVzdWx0ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BdID09PSAnZnVuY3Rpb24nKSByZXR1cm4gb2JqW3Byb3BdKCk7XG4gICAgcmV0dXJuIG9ialtwcm9wXTtcbn07XG5cblxuZnVuY3Rpb24gRm9ybVZpZXcob3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgdGhpcy5lbCA9IG9wdHMuZWw7XG4gICAgdGhpcy52YWxpZENhbGxiYWNrID0gb3B0cy52YWxpZENhbGxiYWNrIHx8IHRoaXMudmFsaWRDYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICB0aGlzLnN1Ym1pdENhbGxiYWNrID0gb3B0cy5zdWJtaXRDYWxsYmFjayB8fCB0aGlzLnN1Ym1pdENhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgaWYgKG9wdHMuZGF0YSkgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuICAgIGlmIChvcHRzLm1vZGVsKSB0aGlzLm1vZGVsID0gb3B0cy5tb2RlbDtcblxuICAgIHRoaXMuY2xlYW4gPSBvcHRzLmNsZWFuIHx8IGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlczsgfTtcbiAgICB0aGlzLnZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IG9wdHMucHJldmVudERlZmF1bHQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xuICAgIHRoaXMuYXV0b0FwcGVuZCA9IG9wdHMuYXV0b0FwcGVuZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAvLyBzdG9yYWdlIGZvciBvdXIgZmllbGRzXG4gICAgdGhpcy5fZmllbGRWaWV3cyA9IHt9O1xuICAgIHRoaXMuX2ZpZWxkVmlld3NBcnJheSA9IFtdO1xuXG4gICAgLy8gYWRkIGFsbCBvdXIgZmllbGRzXG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIChvcHRzLmZpZWxkcyB8fCByZXN1bHQodGhpcywgJ2ZpZWxkcycpIHx8IFtdKS5mb3JFYWNoKHRoaXMuYWRkRmllbGQuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAodGhpcy5pbml0aWFsaXplKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vZGVmZXIgdGlsbCBhZnRlciByZXR1cm5pbmcgZnJvbSBpbml0aWFsaXplXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tWYWxpZCh0cnVlKTtcbiAgICB9LmJpbmQodGhpcyksIDApO1xufVxuXG5cbmV4dGVuZChGb3JtVmlldy5wcm90b3R5cGUsIEJCRXZlbnRzLCB7XG4gICAgZGF0YTogbnVsbCxcbiAgICBtb2RlbDogbnVsbCxcbiAgICBmaWVsZHM6IG51bGwsXG5cbiAgICBhZGRGaWVsZDogZnVuY3Rpb24gKGZpZWxkVmlldykge1xuICAgICAgICB0aGlzLl9maWVsZFZpZXdzW2ZpZWxkVmlldy5uYW1lXSA9IGZpZWxkVmlldztcbiAgICAgICAgdGhpcy5fZmllbGRWaWV3c0FycmF5LnB1c2goZmllbGRWaWV3KTtcbiAgICAgICAgaWYgKHRoaXMuZmllbGRDb250YWluZXJFbCkge1xuICAgICAgICAgICAgZmllbGRWaWV3LnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICBmaWVsZFZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmZpZWxkQ29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoZmllbGRWaWV3LmVsKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVGaWVsZDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5nZXRGaWVsZChuYW1lKTtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICBmaWVsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9maWVsZFZpZXdzW25hbWVdO1xuICAgICAgICAgICAgdGhpcy5fZmllbGRWaWV3c0FycmF5LnNwbGljZSh0aGlzLl9maWVsZFZpZXdzQXJyYXkuaW5kZXhPZihmaWVsZCksIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEZpZWxkOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmllbGRWaWV3c1tuYW1lXTtcbiAgICB9LFxuXG4gICAgc2V0VmFsaWQ6IGZ1bmN0aW9uIChub3csIGZvcmNlRmlyZSkge1xuICAgICAgICB2YXIgcHJldiA9IHRoaXMudmFsaWQ7XG4gICAgICAgIHRoaXMudmFsaWQgPSBub3c7XG4gICAgICAgIGlmIChwcmV2ICE9PSBub3cgfHwgZm9yY2VGaXJlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkQ2FsbGJhY2sobm93KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja1ZhbGlkOiBmdW5jdGlvbiAoZm9yY2VGaXJlKSB7XG4gICAgICAgIHZhciB2YWxpZCA9IHRoaXMuX2ZpZWxkVmlld3NBcnJheS5ldmVyeShmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWxpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0VmFsaWQodmFsaWQsIGZvcmNlRmlyZSk7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9LFxuXG4gICAgYmVmb3JlU3VibWl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZpZWxkVmlld3NBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgaWYgKGZpZWxkLmJlZm9yZVN1Ym1pdCkgZmllbGQuYmVmb3JlU3VibWl0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZTonICsgZmllbGQubmFtZSwgZmllbGQpO1xuICAgICAgICAvLyBpZiB0aGlzIG9uZSdzIGdvb2QgY2hlY2sgJ2VtIGFsbFxuICAgICAgICBpZiAoZmllbGQudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWxpZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5oYW5kbGVTdWJtaXQsIGZhbHNlKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZWwucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICAgICAgICB0aGlzLl9maWVsZFZpZXdzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIGZpZWxkLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmJlZm9yZVN1Ym1pdCgpO1xuICAgICAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRDYWxsYmFjayh0aGlzLmdldERhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9maWVsZFZpZXdzKSB7XG4gICAgICAgICAgICByZXNba2V5XSA9IHRoaXMuX2ZpZWxkVmlld3Nba2V5XS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbGVhbihyZXMpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWQpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICAgICAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1dG9BcHBlbmQpIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRDb250YWluZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignW2RhdGEtaG9va349ZmllbGQtY29udGFpbmVyXScpIHx8IHRoaXMuZWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlU3VibWl0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgIH1cbn0pO1xuXG5Gb3JtVmlldy5leHRlbmQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGNoaWxkID0gZnVuY3Rpb24gKCkge1xuICAgICAgIEZvcm1WaWV3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGV4dGVuZChjaGlsZC5wcm90b3R5cGUsIEZvcm1WaWV3LnByb3RvdHlwZSk7XG4gICAgZXh0ZW5kKGNoaWxkLnByb3RvdHlwZSwgb2JqKTtcblxuICAgIHJldHVybiBjaGlsZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybVZpZXc7XG4iLCJ2YXIgUmVzdENvbGxlY3Rpb24gPSByZXF1aXJlKCdhbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uJyk7XG52YXIgaG9vZGllTWl4aW4gPSByZXF1aXJlKCdhbXBlcnNhbmQtaG9vZGllLW1peGluJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZXN0Q29sbGVjdGlvbi5leHRlbmQoaG9vZGllTWl4aW4sIHtcbn0pO1xuIiwidmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vaW1wbGVtZW50aW5nIGNsYXNzZXMgbXVzdCBpbmNsdWRlIGEgSE9PRElFX1RZUEUgc2Vzc2lvbiBwcm9wZXJ0eSwgd2l0aCB0aGUgZGVmYXVsdCBhcmd1bWVudCBmaWxsZWQgaW46XG4gICAgLy8gJ0hPT0RJRV9UWVBFJzogWydzdHJpbmcnLCB0cnVlLCAncGVyc29uJ11cbiAgICBzZXNzaW9uOiB7XG4gICAgICAgICdIT09ESUVfVFlQRSc6IFsnc3RyaW5nJywgdHJ1ZV1cbiAgICB9LFxuXG4gICAgLy9UaGlzIHN5bmMgZnVuY3Rpb24gaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBjb2RlIGluIGFtcGVyc2FuZC1zeW5jXG4gICAgc3luYzogZnVuY3Rpb24gKG1ldGhvZCwgbW9kZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBfLmNsb25lKG9wdGlvbnMpIDoge307XG4gICAgICAgIHZhciBqc29uUGF5bG9hZDtcbiAgICAgICAgdmFyIHByb21pc2U7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgd2UgaGF2ZSBhIGhvb2RpZSBvYmplY3QgdHlwZS5cbiAgICAgICAgaWYgKCFtb2RlbC5IT09ESUVfVFlQRSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIEhPT0RJRV9UWVBFIHByb3BlcnR5IG11c3QgYmUgc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIHRoZSBhcHByb3ByaWF0ZSByZXF1ZXN0IGRhdGEuXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgPT0gbnVsbCAmJiBtb2RlbCAmJiAobWV0aG9kID09PSAnY3JlYXRlJyB8fCBtZXRob2QgPT09ICd1cGRhdGUnIHx8IG1ldGhvZCA9PT0gJ3BhdGNoJykpIHtcbiAgICAgICAgICAgIGpzb25QYXlsb2FkID0gb3B0aW9ucy5hdHRycyB8fCBtb2RlbC50b0pTT04ob3B0aW9ucykgfHwgb3B0aW9ucy5kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKG1ldGhvZCkge1xuICAgICAgICAgICAgY2FzZSAncmVhZCc6XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gd2luZG93Lmhvb2RpZS5zdG9yZS5maW5kKG1vZGVsLkhPT0RJRV9UWVBFLCBvcHRpb25zLmlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gd2luZG93Lmhvb2RpZS5zdG9yZS5maW5kQWxsKG1vZGVsLkhPT0RJRV9UWVBFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgICAgICAgICAgIGlmICghanNvblBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gYWRkIGEgbW9kZWwsIGJ1dCBubyBkYXRhIHByb3ZpZGVkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHdpbmRvdy5ob29kaWUuc3RvcmUuYWRkKG1vZGVsLkhPT0RJRV9UWVBFLCBqc29uUGF5bG9hZCwgb3B0aW9ucy5zaWxlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VwZGF0ZSc6XG4gICAgICAgICAgICBjYXNlICdwYXRjaCc6XG4gICAgICAgICAgICAgICAgaWYgKCEganNvblBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gdXBkYXRlIGEgbW9kZWwsIGJ1dCBubyBkYXRhIHByb3ZpZGVkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbW9kZWwuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXBkYXRlIG1vZGVsIC0gbm8gaWQgcHJvdmlkZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gd2luZG93Lmhvb2RpZS5zdG9yZS51cGRhdGUobW9kZWwuSE9PRElFX1RZUEUsIG1vZGVsLmlkLCBqc29uUGF5bG9hZCwgb3B0aW9ucy5zaWxlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbC5pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkZWxldGUgbW9kZWwgLSBubyBpZCBwcm92aWRlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB3aW5kb3cuaG9vZGllLnN0b3JlLnJlbW92ZShtb2RlbC5IT09ESUVfVFlQRSwgbW9kZWwuaWQsIG9wdGlvbnMuc2lsZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5kZWZpbmVkIGhvb2RpZSBtZXRob2QgcmVxdWVzdGVkOiAnICsgbWV0aG9kTWFwW21ldGhvZF0gKyAnIG9yaWdpbmFsOiAnICsgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZS5kb25lKGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnN1Y2Nlc3MpIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MoYm9keSwgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2UuZmFpbChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXJyb3IpIHJldHVybiBvcHRpb25zLmVycm9yKHt9LCAnZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07IiwiO2lmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7ICB3aW5kb3cuYW1wZXJzYW5kID0gd2luZG93LmFtcGVyc2FuZCB8fCB7fTsgIHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtcmVzdC1jb2xsZWN0aW9uXCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1yZXN0LWNvbGxlY3Rpb25cIl0gfHwgW107ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLXJlc3QtY29sbGVjdGlvblwiXS5wdXNoKFwiMi4wLjRcIik7fVxudmFyIENvbGxlY3Rpb24gPSByZXF1aXJlKCdhbXBlcnNhbmQtY29sbGVjdGlvbicpO1xudmFyIHVuZGVyc2NvcmVNaXhpbiA9IHJlcXVpcmUoJ2FtcGVyc2FuZC1jb2xsZWN0aW9uLXVuZGVyc2NvcmUtbWl4aW4nKTtcbnZhciByZXN0TWl4aW5zID0gcmVxdWlyZSgnYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpbicpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbi5leHRlbmQodW5kZXJzY29yZU1peGluLCByZXN0TWl4aW5zKTtcbiIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWNvbGxlY3Rpb24tcmVzdC1taXhpblwiXSA9IHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtY29sbGVjdGlvbi1yZXN0LW1peGluXCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1jb2xsZWN0aW9uLXJlc3QtbWl4aW5cIl0ucHVzaChcIjMuMC4xXCIpO31cbnZhciBzeW5jID0gcmVxdWlyZSgnYW1wZXJzYW5kLXN5bmMnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQtb2JqZWN0Jyk7XG5cblxuLy8gV3JhcCBhbiBvcHRpb25hbCBlcnJvciBjYWxsYmFjayB3aXRoIGEgZmFsbGJhY2sgZXJyb3IgZXZlbnQuXG52YXIgd3JhcEVycm9yID0gZnVuY3Rpb24obW9kZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgZXJyb3IgPSBvcHRpb25zLmVycm9yO1xuICAgIG9wdGlvbnMuZXJyb3IgPSBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIGlmIChlcnJvcikgZXJyb3IobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICBtb2RlbC50cmlnZ2VyKCdlcnJvcicsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gRmV0Y2ggdGhlIGRlZmF1bHQgc2V0IG9mIG1vZGVscyBmb3IgdGhpcyBjb2xsZWN0aW9uLCByZXNldHRpbmcgdGhlXG4gICAgLy8gY29sbGVjdGlvbiB3aGVuIHRoZXkgYXJyaXZlLiBJZiBgcmVzZXQ6IHRydWVgIGlzIHBhc3NlZCwgdGhlIHJlc3BvbnNlXG4gICAgLy8gZGF0YSB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBgcmVzZXRgIG1ldGhvZCBpbnN0ZWFkIG9mIGBzZXRgLlxuICAgIGZldGNoOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gZXh0ZW5kKHt9LCBvcHRpb25zKSA6IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5wYXJzZSA9PT0gdm9pZCAwKSBvcHRpb25zLnBhcnNlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcztcbiAgICAgICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG9wdGlvbnMucmVzZXQgPyAncmVzZXQnIDogJ3NldCc7XG4gICAgICAgICAgICBjb2xsZWN0aW9uW21ldGhvZF0ocmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhjb2xsZWN0aW9uLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24udHJpZ2dlcignc3luYycsIGNvbGxlY3Rpb24sIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICB3cmFwRXJyb3IodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmMoJ3JlYWQnLCB0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgbW9kZWwgaW4gdGhpcyBjb2xsZWN0aW9uLiBBZGQgdGhlIG1vZGVsIHRvIHRoZVxuICAgIC8vIGNvbGxlY3Rpb24gaW1tZWRpYXRlbHksIHVubGVzcyBgd2FpdDogdHJ1ZWAgaXMgcGFzc2VkLCBpbiB3aGljaCBjYXNlIHdlXG4gICAgLy8gd2FpdCBmb3IgdGhlIHNlcnZlciB0byBhZ3JlZS5cbiAgICBjcmVhdGU6IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gZXh0ZW5kKHt9LCBvcHRpb25zKSA6IHt9O1xuICAgICAgICBpZiAoIShtb2RlbCA9IHRoaXMuX3ByZXBhcmVNb2RlbChtb2RlbCwgb3B0aW9ucykpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghb3B0aW9ucy53YWl0KSB0aGlzLmFkZChtb2RlbCwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcztcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uKG1vZGVsLCByZXNwKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53YWl0KSBjb2xsZWN0aW9uLmFkZChtb2RlbCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIG1vZGVsLnNhdmUobnVsbCwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9LFxuXG4gICAgc3luYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzeW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8vIEdldCBvciBmZXRjaCBhIG1vZGVsIGJ5IElkLlxuICAgIGdldE9yRmV0Y2g6IGZ1bmN0aW9uIChpZCwgb3B0aW9ucywgY2IpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgIGNiID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0KGlkKTtcbiAgICAgICAgaWYgKG1vZGVsKSByZXR1cm4gY2IobnVsbCwgbW9kZWwpO1xuICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgdmFyIG1vZGVsID0gc2VsZi5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSBjYihudWxsLCBtb2RlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNiKG5ldyBFcnJvcignbm90IGZvdW5kJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmFsbCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZG9uZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZG9uZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoQnlJZChpZCwgY2IpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGZldGNoQnlJZDogZmV0Y2hlcyBhIG1vZGVsIGFuZCBhZGRzIGl0IHRvXG4gICAgLy8gY29sbGVjdGlvbiB3aGVuIGZldGNoZWQuXG4gICAgZmV0Y2hCeUlkOiBmdW5jdGlvbiAoaWQsIGNiKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGlkT2JqID0ge307XG4gICAgICAgIGlkT2JqW3RoaXMubW9kZWwucHJvdG90eXBlLmlkQXR0cmlidXRlXSA9IGlkO1xuICAgICAgICB2YXIgbW9kZWwgPSBuZXcgdGhpcy5tb2RlbChpZE9iaiwge2NvbGxlY3Rpb246IHRoaXN9KTtcbiAgICAgICAgbW9kZWwuZmV0Y2goe1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkKG1vZGVsKTtcbiAgICAgICAgICAgICAgICBpZiAoY2IpIGNiKG51bGwsIG1vZGVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbC5jb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChjYikgY2IoRXJyb3IoJ25vdCBmb3VuZCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsInZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIHhociA9IHJlcXVpcmUoJ3hocicpO1xudmFyIHFzID0gcmVxdWlyZSgncXMnKTtcblxuXG4vLyBUaHJvdyBhbiBlcnJvciB3aGVuIGEgVVJMIGlzIG5lZWRlZCwgYW5kIG5vbmUgaXMgc3VwcGxpZWQuXG52YXIgdXJsRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIFwidXJsXCIgcHJvcGVydHkgb3IgZnVuY3Rpb24gbXVzdCBiZSBzcGVjaWZpZWQnKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWV0aG9kLCBtb2RlbCwgb3B0aW9ucykge1xuICAgIHZhciB0eXBlID0gbWV0aG9kTWFwW21ldGhvZF07XG4gICAgdmFyIGhlYWRlcnMgPSB7fTtcblxuICAgIC8vIERlZmF1bHQgb3B0aW9ucywgdW5sZXNzIHNwZWNpZmllZC5cbiAgICBfLmRlZmF1bHRzKG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSksIHtcbiAgICAgICAgZW11bGF0ZUhUVFA6IGZhbHNlLFxuICAgICAgICBlbXVsYXRlSlNPTjogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIERlZmF1bHQgcmVxdWVzdCBvcHRpb25zLlxuICAgIHZhciBwYXJhbXMgPSB7dHlwZTogdHlwZX07XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIGEgVVJMLlxuICAgIGlmICghb3B0aW9ucy51cmwpIHtcbiAgICAgICAgcGFyYW1zLnVybCA9IF8ucmVzdWx0KG1vZGVsLCAndXJsJykgfHwgdXJsRXJyb3IoKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIHRoZSBhcHByb3ByaWF0ZSByZXF1ZXN0IGRhdGEuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSA9PSBudWxsICYmIG1vZGVsICYmIChtZXRob2QgPT09ICdjcmVhdGUnIHx8IG1ldGhvZCA9PT0gJ3VwZGF0ZScgfHwgbWV0aG9kID09PSAncGF0Y2gnKSkge1xuICAgICAgICBwYXJhbXMuanNvbiA9IG9wdGlvbnMuYXR0cnMgfHwgbW9kZWwudG9KU09OKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIElmIHBhc3NlZCBhIGRhdGEgcGFyYW0sIHdlIGFkZCBpdCB0byB0aGUgVVJMIG9yIGJvZHkgZGVwZW5kaW5nIG9uIHJlcXVlc3QgdHlwZVxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgdHlwZSA9PT0gJ0dFVCcpIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlJ3ZlIGdvdCBhICc/J1xuICAgICAgICBwYXJhbXMudXJsICs9IF8uY29udGFpbnMocGFyYW1zLnVybCwgJz8nKSA/ICcmJyA6ICc/JztcbiAgICAgICAgcGFyYW1zLnVybCArPSBxcy5zdHJpbmdpZnkob3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICAvLyBGb3Igb2xkZXIgc2VydmVycywgZW11bGF0ZSBKU09OIGJ5IGVuY29kaW5nIHRoZSByZXF1ZXN0IGludG8gYW4gSFRNTC1mb3JtLlxuICAgIGlmIChvcHRpb25zLmVtdWxhdGVKU09OKSB7XG4gICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XG4gICAgICAgIHBhcmFtcy5ib2R5ID0gcGFyYW1zLmpzb24gPyB7bW9kZWw6IHBhcmFtcy5qc29ufSA6IHt9O1xuICAgICAgICBkZWxldGUgcGFyYW1zLmpzb247XG4gICAgfVxuXG4gICAgLy8gRm9yIG9sZGVyIHNlcnZlcnMsIGVtdWxhdGUgSFRUUCBieSBtaW1pY2tpbmcgdGhlIEhUVFAgbWV0aG9kIHdpdGggYF9tZXRob2RgXG4gICAgLy8gQW5kIGFuIGBYLUhUVFAtTWV0aG9kLU92ZXJyaWRlYCBoZWFkZXIuXG4gICAgaWYgKG9wdGlvbnMuZW11bGF0ZUhUVFAgJiYgKHR5cGUgPT09ICdQVVQnIHx8IHR5cGUgPT09ICdERUxFVEUnIHx8IHR5cGUgPT09ICdQQVRDSCcpKSB7XG4gICAgICAgIHBhcmFtcy50eXBlID0gJ1BPU1QnO1xuICAgICAgICBpZiAob3B0aW9ucy5lbXVsYXRlSlNPTikgcGFyYW1zLmJvZHkuX21ldGhvZCA9IHR5cGU7XG4gICAgICAgIGhlYWRlcnNbJ1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnXSA9IHR5cGU7XG4gICAgfVxuXG4gICAgLy8gV2hlbiBlbXVsYXRpbmcgSlNPTiwgd2UgdHVybiB0aGUgYm9keSBpbnRvIGEgcXVlcnlzdHJpbmcuXG4gICAgLy8gV2UgZG8gdGhpcyBsYXRlciB0byBsZXQgdGhlIGVtdWxhdGVIVFRQIHJ1biBpdHMgY291cnNlLlxuICAgIGlmIChvcHRpb25zLmVtdWxhdGVKU09OKSB7XG4gICAgICAgIHBhcmFtcy5ib2R5ID0gcXMuc3RyaW5naWZ5KHBhcmFtcy5ib2R5KTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCBzZXR0aW5nIGFqYXhDb25maWcgb3B0aW9ucyAoaGVhZGVycywgeGhyRmllbGRzKS5cbiAgICB2YXIgYWpheENvbmZpZyA9IChfLnJlc3VsdChtb2RlbCwgJ2FqYXhDb25maWcnKSB8fCB7fSk7XG5cbiAgICAvLyBDb21iaW5lIGdlbmVyYXRlZCBoZWFkZXJzIHdpdGggdXNlcidzIGhlYWRlcnMuXG4gICAgaWYgKGFqYXhDb25maWcuaGVhZGVycykge1xuICAgICAgICBfLmV4dGVuZChoZWFkZXJzLCBhamF4Q29uZmlnLmhlYWRlcnMpO1xuICAgIH1cbiAgICBwYXJhbXMuaGVhZGVycyA9IGhlYWRlcnM7XG5cbiAgICAvL1NldCBYRFIgZm9yIGNyb3NzIGRvbWFpbiBpbiBJRTgvOVxuICAgIGlmIChhamF4Q29uZmlnLnVzZVhEUikge1xuICAgICAgICBwYXJhbXMudXNlWERSID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBTZXQgcmF3IHhociBvcHRpb25zLlxuICAgIGlmIChhamF4Q29uZmlnLnhockZpZWxkcykge1xuICAgICAgICB2YXIgYmVmb3JlU2VuZCA9IGFqYXhDb25maWcuYmVmb3JlU2VuZDtcbiAgICAgICAgcGFyYW1zLmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYWpheENvbmZpZy54aHJGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICByZXFba2V5XSA9IGFqYXhDb25maWcueGhyRmllbGRzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmVmb3JlU2VuZCkgcmV0dXJuIGJlZm9yZVNlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcGFyYW1zLnhockZpZWxkcyA9IGFqYXhDb25maWcueGhyRmllbGRzO1xuICAgIH1cblxuICAgIC8vIFR1cm4gYSBqUXVlcnkuYWpheCBmb3JtYXR0ZWQgcmVxdWVzdCBpbnRvIHhociBjb21wYXRpYmxlXG4gICAgcGFyYW1zLm1ldGhvZCA9IHBhcmFtcy50eXBlO1xuXG4gICAgdmFyIGFqYXhTZXR0aW5ncyA9IF8uZXh0ZW5kKHBhcmFtcywgb3B0aW9ucyk7XG5cbiAgICAvLyBNYWtlIHRoZSByZXF1ZXN0LiBUaGUgY2FsbGJhY2sgZXhlY3V0ZXMgZnVuY3Rpb25zIHRoYXQgYXJlIGNvbXBhdGlibGVcbiAgICAvLyBXaXRoIGpRdWVyeS5hamF4J3Mgc3ludGF4LlxuICAgIHZhciByZXF1ZXN0ID0gb3B0aW9ucy54aHIgPSB4aHIoYWpheFNldHRpbmdzLCBmdW5jdGlvbiAoZXJyLCByZXNwLCBib2R5KSB7XG4gICAgICAgIGlmIChlcnIgJiYgb3B0aW9ucy5lcnJvcikgcmV0dXJuIG9wdGlvbnMuZXJyb3IocmVzcCwgJ2Vycm9yJywgZXJyLm1lc3NhZ2UpO1xuXG4gICAgICAgIC8vIFBhcnNlIGJvZHkgYXMgSlNPTiBpZiBhIHN0cmluZy5cbiAgICAgICAgaWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSByZXR1cm4gb3B0aW9ucy5zdWNjZXNzKGJvZHksICdzdWNjZXNzJywgcmVzcCk7XG4gICAgfSk7XG4gICAgbW9kZWwudHJpZ2dlcigncmVxdWVzdCcsIG1vZGVsLCByZXF1ZXN0LCBvcHRpb25zLCBhamF4U2V0dGluZ3MpO1xuICAgIHJlcXVlc3QuYWpheFNldHRpbmdzID0gYWpheFNldHRpbmdzO1xuICAgIHJldHVybiByZXF1ZXN0O1xufTtcblxuLy8gTWFwIGZyb20gQ1JVRCB0byBIVFRQIGZvciBvdXIgZGVmYXVsdCBgQmFja2JvbmUuc3luY2AgaW1wbGVtZW50YXRpb24uXG52YXIgbWV0aG9kTWFwID0ge1xuICAgICdjcmVhdGUnOiAnUE9TVCcsXG4gICAgJ3VwZGF0ZSc6ICdQVVQnLFxuICAgICdwYXRjaCc6ICAnUEFUQ0gnLFxuICAgICdkZWxldGUnOiAnREVMRVRFJyxcbiAgICAncmVhZCc6ICAgJ0dFVCdcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliJyk7XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgUGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0cmluZ2lmeTogU3RyaW5naWZ5LFxuICAgIHBhcnNlOiBQYXJzZVxufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBwYXJhbWV0ZXJzTGltaXQ6IDEwMDBcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlVmFsdWVzID0gZnVuY3Rpb24gKHN0ciwgZGVsaW1pdGVyKSB7XG5cbiAgICBkZWxpbWl0ZXIgPSB0eXBlb2YgZGVsaW1pdGVyID09PSAnc3RyaW5nJyA/IGRlbGltaXRlciA6IGludGVybmFscy5kZWxpbWl0ZXI7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KGRlbGltaXRlciwgaW50ZXJuYWxzLnBhcmFtZXRlcnNMaW1pdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIHZhciBwb3MgPSBwYXJ0LmluZGV4T2YoJ109JykgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBwYXJ0LmluZGV4T2YoJ109JykgKyAxO1xuXG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBvYmpbVXRpbHMuZGVjb2RlKHBhcnQpXSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGtleSA9IFV0aWxzLmRlY29kZShwYXJ0LnNsaWNlKDAsIHBvcykpO1xuICAgICAgICAgICAgdmFyIHZhbCA9IFV0aWxzLmRlY29kZShwYXJ0LnNsaWNlKHBvcyArIDEpKTtcblxuICAgICAgICAgICAgaWYgKCFvYmpba2V5XSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwpIHtcblxuICAgIGlmICghY2hhaW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBjaGFpbi5zaGlmdCgpO1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgIG9iaiA9IFtdO1xuICAgICAgICBvYmogPSBvYmouY29uY2F0KGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdFswXSA9PT0gJ1snICYmIHJvb3Rbcm9vdC5sZW5ndGggLSAxXSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCByb290Lmxlbmd0aCAtIDEpIDogcm9vdDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgIGlmICghaXNOYU4oaW5kZXgpICYmXG4gICAgICAgICAgICByb290ICE9PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4IDw9IGludGVybmFscy5hcnJheUxpbWl0KSB7XG5cbiAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgb2JqW2luZGV4XSA9IGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGNoYWluLCB2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlS2V5cyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgZGVwdGgpIHtcblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgcGFyZW50ID0gL14oW15cXFtcXF1dKikvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15cXFtcXF1dKlxcXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IHBhcmVudC5leGVjKGtleSk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB0aGVtIHRvIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHNlZ21lbnRbMV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAoc2VnbWVudFsxXSkge1xuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgZGVwdGgpIHtcblxuICAgICAgICArK2k7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShzZWdtZW50WzFdLnJlcGxhY2UoL1xcW3xcXF0vZywgJycpKSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVybmFscy5wYXJzZU9iamVjdChrZXlzLCB2YWwpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIGRlcHRoLCBkZWxpbWl0ZXIpIHtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8XG4gICAgICAgIHN0ciA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlcHRoICE9PSAnbnVtYmVyJykge1xuICAgICAgICBkZWxpbWl0ZXIgPSBkZXB0aDtcbiAgICAgICAgZGVwdGggPSBpbnRlcm5hbHMuZGVwdGg7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IGludGVybmFscy5wYXJzZVZhbHVlcyhzdHIsIGRlbGltaXRlcikgOiBVdGlscy5jbG9uZShzdHIpO1xuICAgIHZhciBvYmogPSB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcbiAgICAvL1xuICAgIGZvciAodmFyIGtleSBpbiB0ZW1wT2JqKSB7XG4gICAgICAgIGlmICh0ZW1wT2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHZhciBuZXdPYmogPSBpbnRlcm5hbHMucGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBkZXB0aCk7XG4gICAgICAgICAgICBvYmogPSBVdGlscy5tZXJnZShvYmosIG5ld09iaik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gVXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJidcbn07XG5cblxuaW50ZXJuYWxzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIHByZWZpeCkge1xuXG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xuXG4gICAgICAgIHJldHVybiBbZW5jb2RlVVJJQ29tcG9uZW50KHByZWZpeCkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGRlbGltaXRlcikge1xuXG4gICAgZGVsaW1pdGVyID0gdHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBpbnRlcm5hbHMuZGVsaW1pdGVyIDogZGVsaW1pdGVyO1xuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwga2V5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cy5qb2luKGRlbGltaXRlcik7XG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBzb3VyY2UgPT09IG51bGwpIHtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIH1cblxuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IEFycmF5LmlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG4gICAgZm9yICh2YXIgaSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgb2JqW2ldID0gZXhwb3J0cy5jbG9uZShzb3VyY2VbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICB2YXIgb2JqID0gZXhwb3J0cy5jbG9uZSh0YXJnZXQpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtpXSA9IGV4cG9ydHMubWVyZ2Uob2JqW2ldLCBzb3VyY2VbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBleHBvcnRzLmFycmF5VG9PYmplY3Qob2JqKTtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgayA9IDAsIGtsID0ga2V5cy5sZW5ndGg7IGsgPCBrbDsgKytrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2tdO1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgaWYgKCFvYmpba2V5XSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gZXhwb3J0cy5jbG9uZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IGV4cG9ydHMubWVyZ2Uob2JqW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxuXG5leHBvcnRzLmNvbXBhY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgdmFyIGNvbXBhY3RlZCA9IHt9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGNvbXBhY3RlZFtrZXldID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9ialtrZXldLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkW2tleV0ucHVzaChvYmpba2V5XVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wYWN0ZWRba2V5XSA9IGV4cG9ydHMuY29tcGFjdChvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFjdGVkO1xufTtcbiIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuNi4wXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuKGZ1bmN0aW9uKCkge1xuXG4gIC8vIEJhc2VsaW5lIHNldHVwXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBleHBvcnRzYCBvbiB0aGUgc2VydmVyLlxuICB2YXIgcm9vdCA9IHRoaXM7XG5cbiAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBfYCB2YXJpYWJsZS5cbiAgdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcblxuICAvLyBFc3RhYmxpc2ggdGhlIG9iamVjdCB0aGF0IGdldHMgcmV0dXJuZWQgdG8gYnJlYWsgb3V0IG9mIGEgbG9vcCBpdGVyYXRpb24uXG4gIHZhciBicmVha2VyID0ge307XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIGNvbmNhdCAgICAgICAgICAgPSBBcnJheVByb3RvLmNvbmNhdCxcbiAgICB0b1N0cmluZyAgICAgICAgID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgaGFzT3duUHJvcGVydHkgICA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyXG4gICAgbmF0aXZlRm9yRWFjaCAgICAgID0gQXJyYXlQcm90by5mb3JFYWNoLFxuICAgIG5hdGl2ZU1hcCAgICAgICAgICA9IEFycmF5UHJvdG8ubWFwLFxuICAgIG5hdGl2ZVJlZHVjZSAgICAgICA9IEFycmF5UHJvdG8ucmVkdWNlLFxuICAgIG5hdGl2ZVJlZHVjZVJpZ2h0ICA9IEFycmF5UHJvdG8ucmVkdWNlUmlnaHQsXG4gICAgbmF0aXZlRmlsdGVyICAgICAgID0gQXJyYXlQcm90by5maWx0ZXIsXG4gICAgbmF0aXZlRXZlcnkgICAgICAgID0gQXJyYXlQcm90by5ldmVyeSxcbiAgICBuYXRpdmVTb21lICAgICAgICAgPSBBcnJheVByb3RvLnNvbWUsXG4gICAgbmF0aXZlSW5kZXhPZiAgICAgID0gQXJyYXlQcm90by5pbmRleE9mLFxuICAgIG5hdGl2ZUxhc3RJbmRleE9mICA9IEFycmF5UHJvdG8ubGFzdEluZGV4T2YsXG4gICAgbmF0aXZlSXNBcnJheSAgICAgID0gQXJyYXkuaXNBcnJheSxcbiAgICBuYXRpdmVLZXlzICAgICAgICAgPSBPYmplY3Qua2V5cyxcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZDtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QgdmlhIGEgc3RyaW5nIGlkZW50aWZpZXIsXG4gIC8vIGZvciBDbG9zdXJlIENvbXBpbGVyIFwiYWR2YW5jZWRcIiBtb2RlLlxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xuICAgIH1cbiAgICBleHBvcnRzLl8gPSBfO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuXyA9IF87XG4gIH1cblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIF8uVkVSU0lPTiA9ICcxLjYuMCc7XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyBvYmplY3RzIHdpdGggdGhlIGJ1aWx0LWluIGBmb3JFYWNoYCwgYXJyYXlzLCBhbmQgcmF3IG9iamVjdHMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBmb3JFYWNoYCBpZiBhdmFpbGFibGUuXG4gIHZhciBlYWNoID0gXy5lYWNoID0gXy5mb3JFYWNoID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICBpZiAobmF0aXZlRm9yRWFjaCAmJiBvYmouZm9yRWFjaCA9PT0gbmF0aXZlRm9yRWFjaCkge1xuICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdG9yIHRvIGVhY2ggZWxlbWVudC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYG1hcGAgaWYgYXZhaWxhYmxlLlxuICBfLm1hcCA9IF8uY29sbGVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdHM7XG4gICAgaWYgKG5hdGl2ZU1hcCAmJiBvYmoubWFwID09PSBuYXRpdmVNYXApIHJldHVybiBvYmoubWFwKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICByZXN1bHRzLnB1c2goaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICB2YXIgcmVkdWNlRXJyb3IgPSAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZSc7XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgcmVkdWNlYCBpZiBhdmFpbGFibGUuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgbWVtbywgY29udGV4dCkge1xuICAgIHZhciBpbml0aWFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpZiAobmF0aXZlUmVkdWNlICYmIG9iai5yZWR1Y2UgPT09IG5hdGl2ZVJlZHVjZSkge1xuICAgICAgaWYgKGNvbnRleHQpIGl0ZXJhdG9yID0gXy5iaW5kKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiBpbml0aWFsID8gb2JqLnJlZHVjZShpdGVyYXRvciwgbWVtbykgOiBvYmoucmVkdWNlKGl0ZXJhdG9yKTtcbiAgICB9XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKCFpbml0aWFsKSB7XG4gICAgICAgIG1lbW8gPSB2YWx1ZTtcbiAgICAgICAgaW5pdGlhbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZW1vID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBtZW1vLCB2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghaW5pdGlhbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGByZWR1Y2VSaWdodGAgaWYgYXZhaWxhYmxlLlxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIG1lbW8sIGNvbnRleHQpIHtcbiAgICB2YXIgaW5pdGlhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaWYgKG5hdGl2ZVJlZHVjZVJpZ2h0ICYmIG9iai5yZWR1Y2VSaWdodCA9PT0gbmF0aXZlUmVkdWNlUmlnaHQpIHtcbiAgICAgIGlmIChjb250ZXh0KSBpdGVyYXRvciA9IF8uYmluZChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgICByZXR1cm4gaW5pdGlhbCA/IG9iai5yZWR1Y2VSaWdodChpdGVyYXRvciwgbWVtbykgOiBvYmoucmVkdWNlUmlnaHQoaXRlcmF0b3IpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoICE9PSArbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgfVxuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGluZGV4ID0ga2V5cyA/IGtleXNbLS1sZW5ndGhdIDogLS1sZW5ndGg7XG4gICAgICBpZiAoIWluaXRpYWwpIHtcbiAgICAgICAgbWVtbyA9IG9ialtpbmRleF07XG4gICAgICAgIGluaXRpYWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVtbyA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgbWVtbywgb2JqW2luZGV4XSwgaW5kZXgsIGxpc3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghaW5pdGlhbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBhbnkob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgcGFzcyBhIHRydXRoIHRlc3QuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBmaWx0ZXJgIGlmIGF2YWlsYWJsZS5cbiAgLy8gQWxpYXNlZCBhcyBgc2VsZWN0YC5cbiAgXy5maWx0ZXIgPSBfLnNlbGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHRzO1xuICAgIGlmIChuYXRpdmVGaWx0ZXIgJiYgb2JqLmZpbHRlciA9PT0gbmF0aXZlRmlsdGVyKSByZXR1cm4gb2JqLmZpbHRlcihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKSByZXN1bHRzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGZvciB3aGljaCBhIHRydXRoIHRlc3QgZmFpbHMuXG4gIF8ucmVqZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiAhcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGV2ZXJ5YCBpZiBhdmFpbGFibGUuXG4gIC8vIEFsaWFzZWQgYXMgYGFsbGAuXG4gIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBfLmlkZW50aXR5KTtcbiAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKG5hdGl2ZUV2ZXJ5ICYmIG9iai5ldmVyeSA9PT0gbmF0aXZlRXZlcnkpIHJldHVybiBvYmouZXZlcnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAoIShyZXN1bHQgPSByZXN1bHQgJiYgcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSkpIHJldHVybiBicmVha2VyO1xuICAgIH0pO1xuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYHNvbWVgIGlmIGF2YWlsYWJsZS5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgdmFyIGFueSA9IF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IF8uaWRlbnRpdHkpO1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKG5hdGl2ZVNvbWUgJiYgb2JqLnNvbWUgPT09IG5hdGl2ZVNvbWUpIHJldHVybiBvYmouc29tZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChyZXN1bHQgfHwgKHJlc3VsdCA9IHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgbGlzdCkpKSByZXR1cm4gYnJlYWtlcjtcbiAgICB9KTtcbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiB2YWx1ZSAodXNpbmcgYD09PWApLlxuICAvLyBBbGlhc2VkIGFzIGBpbmNsdWRlYC5cbiAgXy5jb250YWlucyA9IF8uaW5jbHVkZSA9IGZ1bmN0aW9uKG9iaiwgdGFyZ2V0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG5hdGl2ZUluZGV4T2YgJiYgb2JqLmluZGV4T2YgPT09IG5hdGl2ZUluZGV4T2YpIHJldHVybiBvYmouaW5kZXhPZih0YXJnZXQpICE9IC0xO1xuICAgIHJldHVybiBhbnkob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB0YXJnZXQ7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiAoaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXSkuYXBwbHkodmFsdWUsIGFyZ3MpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYG1hcGA6IGZldGNoaW5nIGEgcHJvcGVydHkuXG4gIF8ucGx1Y2sgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBfLm1hcChvYmosIF8ucHJvcGVydHkoa2V5KSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmlsdGVyYDogc2VsZWN0aW5nIG9ubHkgb2JqZWN0c1xuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLndoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubWF0Y2hlcyhhdHRycykpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbmRgOiBnZXR0aW5nIHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5maW5kV2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmluZChvYmosIF8ubWF0Y2hlcyhhdHRycykpO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWF4aW11bSBlbGVtZW50IG9yIChlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgLy8gQ2FuJ3Qgb3B0aW1pemUgYXJyYXlzIG9mIGludGVnZXJzIGxvbmdlciB0aGFuIDY1LDUzNSBlbGVtZW50cy5cbiAgLy8gU2VlIFtXZWJLaXQgQnVnIDgwNzk3XShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODA3OTcpXG4gIF8ubWF4ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXRlcmF0b3IgJiYgXy5pc0FycmF5KG9iaikgJiYgb2JqWzBdID09PSArb2JqWzBdICYmIG9iai5sZW5ndGggPCA2NTUzNSkge1xuICAgICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsIG9iaik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBpdGVyYXRvciA/IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSA6IHZhbHVlO1xuICAgICAgaWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpdGVyYXRvciAmJiBfLmlzQXJyYXkob2JqKSAmJiBvYmpbMF0gPT09ICtvYmpbMF0gJiYgb2JqLmxlbmd0aCA8IDY1NTM1KSB7XG4gICAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkoTWF0aCwgb2JqKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eTtcbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBpdGVyYXRvciA/IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSA6IHZhbHVlO1xuICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYW4gYXJyYXksIHVzaW5nIHRoZSBtb2Rlcm4gdmVyc2lvbiBvZiB0aGVcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmFuZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzaHVmZmxlZCA9IFtdO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKGluZGV4KyspO1xuICAgICAgc2h1ZmZsZWRbaW5kZXggLSAxXSA9IHNodWZmbGVkW3JhbmRdO1xuICAgICAgc2h1ZmZsZWRbcmFuZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gIH07XG5cbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24uXG4gIC8vIElmICoqbioqIGlzIG5vdCBzcGVjaWZpZWQsIHJldHVybnMgYSBzaW5nbGUgcmFuZG9tIGVsZW1lbnQuXG4gIC8vIFRoZSBpbnRlcm5hbCBgZ3VhcmRgIGFyZ3VtZW50IGFsbG93cyBpdCB0byB3b3JrIHdpdGggYG1hcGAuXG4gIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHtcbiAgICAgIGlmIChvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICAgIHJldHVybiBvYmpbXy5yYW5kb20ob2JqLmxlbmd0aCAtIDEpXTtcbiAgICB9XG4gICAgcmV0dXJuIF8uc2h1ZmZsZShvYmopLnNsaWNlKDAsIE1hdGgubWF4KDAsIG4pKTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBsb29rdXAgaXRlcmF0b3JzLlxuICB2YXIgbG9va3VwSXRlcmF0b3IgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXy5pZGVudGl0eTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgIHJldHVybiBfLnByb3BlcnR5KHZhbHVlKTtcbiAgfTtcblxuICAvLyBTb3J0IHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24gcHJvZHVjZWQgYnkgYW4gaXRlcmF0b3IuXG4gIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGl0ZXJhdG9yID0gbG9va3VwSXRlcmF0b3IoaXRlcmF0b3IpO1xuICAgIHJldHVybiBfLnBsdWNrKF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgY3JpdGVyaWE6IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0b3IgPSBsb29rdXBJdGVyYXRvcihpdGVyYXRvcik7XG4gICAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgIHZhciBrZXkgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCBrZXksIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwga2V5LCB2YWx1ZSkge1xuICAgIF8uaGFzKHJlc3VsdCwga2V5KSA/IHJlc3VsdFtrZXldLnB1c2godmFsdWUpIDogcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xuICB9KTtcblxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXG4gIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cbiAgXy5pbmRleEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCBrZXksIHZhbHVlKSB7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXG4gIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAvLyBjcml0ZXJpb24uXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwga2V5KSB7XG4gICAgXy5oYXMocmVzdWx0LCBrZXkpID8gcmVzdWx0W2tleV0rKyA6IHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gVXNlIGEgY29tcGFyYXRvciBmdW5jdGlvbiB0byBmaWd1cmUgb3V0IHRoZSBzbWFsbGVzdCBpbmRleCBhdCB3aGljaFxuICAvLyBhbiBvYmplY3Qgc2hvdWxkIGJlIGluc2VydGVkIHNvIGFzIHRvIG1haW50YWluIG9yZGVyLiBVc2VzIGJpbmFyeSBzZWFyY2guXG4gIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGl0ZXJhdG9yID0gbG9va3VwSXRlcmF0b3IoaXRlcmF0b3IpO1xuICAgIHZhciB2YWx1ZSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMTtcbiAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgYXJyYXlbbWlkXSkgPCB2YWx1ZSA/IGxvdyA9IG1pZCArIDEgOiBoaWdoID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG93O1xuICB9O1xuXG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXG4gIF8udG9BcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gW107XG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xuICAgIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBBcnJheSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYGhlYWRgIGFuZCBgdGFrZWAuIFRoZSAqKmd1YXJkKiogY2hlY2tcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmZpcnN0ID0gXy5oZWFkID0gXy50YWtlID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKChuID09IG51bGwpIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgaWYgKG4gPCAwKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIG4pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGxhc3QgZW50cnkgb2YgdGhlIGFycmF5LiBFc3BlY2lhbGx5IHVzZWZ1bCBvblxuICAvLyB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiBhbGwgdGhlIHZhbHVlcyBpblxuICAvLyB0aGUgYXJyYXksIGV4Y2x1ZGluZyB0aGUgbGFzdCBOLiBUaGUgKipndWFyZCoqIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGhcbiAgLy8gYF8ubWFwYC5cbiAgXy5pbml0aWFsID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIGFycmF5Lmxlbmd0aCAtICgobiA9PSBudWxsKSB8fCBndWFyZCA/IDEgOiBuKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5sYXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKChuID09IG51bGwpIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIE1hdGgubWF4KGFycmF5Lmxlbmd0aCAtIG4sIDApKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYHRhaWxgIGFuZCBgZHJvcGAuXG4gIC8vIEVzcGVjaWFsbHkgdXNlZnVsIG9uIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nIGFuICoqbioqIHdpbGwgcmV0dXJuXG4gIC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKlxuICAvLyBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ucmVzdCA9IF8udGFpbCA9IF8uZHJvcCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAobiA9PSBudWxsKSB8fCBndWFyZCA/IDEgOiBuKTtcbiAgfTtcblxuICAvLyBUcmltIG91dCBhbGwgZmFsc3kgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBfLmlkZW50aXR5KTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXG4gIHZhciBmbGF0dGVuID0gZnVuY3Rpb24oaW5wdXQsIHNoYWxsb3csIG91dHB1dCkge1xuICAgIGlmIChzaGFsbG93ICYmIF8uZXZlcnkoaW5wdXQsIF8uaXNBcnJheSkpIHtcbiAgICAgIHJldHVybiBjb25jYXQuYXBwbHkob3V0cHV0LCBpbnB1dCk7XG4gICAgfVxuICAgIGVhY2goaW5wdXQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzQXJndW1lbnRzKHZhbHVlKSkge1xuICAgICAgICBzaGFsbG93ID8gcHVzaC5hcHBseShvdXRwdXQsIHZhbHVlKSA6IGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIG91dHB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICAvLyBGbGF0dGVuIG91dCBhbiBhcnJheSwgZWl0aGVyIHJlY3Vyc2l2ZWx5IChieSBkZWZhdWx0KSwgb3IganVzdCBvbmUgbGV2ZWwuXG4gIF8uZmxhdHRlbiA9IGZ1bmN0aW9uKGFycmF5LCBzaGFsbG93KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIFtdKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cbiAgXy53aXRob3V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9O1xuXG4gIC8vIFNwbGl0IGFuIGFycmF5IGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24oYXJyYXksIHByZWRpY2F0ZSkge1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBlYWNoKGFycmF5LCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAocHJlZGljYXRlKGVsZW0pID8gcGFzcyA6IGZhaWwpLnB1c2goZWxlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtwYXNzLCBmYWlsXTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0b3I7XG4gICAgICBpdGVyYXRvciA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGluaXRpYWwgPSBpdGVyYXRvciA/IF8ubWFwKGFycmF5LCBpdGVyYXRvciwgY29udGV4dCkgOiBhcnJheTtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBzZWVuID0gW107XG4gICAgZWFjaChpbml0aWFsLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGlmIChpc1NvcnRlZCA/ICghaW5kZXggfHwgc2VlbltzZWVuLmxlbmd0aCAtIDFdICE9PSB2YWx1ZSkgOiAhXy5jb250YWlucyhzZWVuLCB2YWx1ZSkpIHtcbiAgICAgICAgc2Vlbi5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGFycmF5W2luZGV4XSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB1bmlvbjogZWFjaCBkaXN0aW5jdCBlbGVtZW50IGZyb20gYWxsIG9mXG4gIC8vIHRoZSBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLnVuaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF8udW5pcShfLmZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3QgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIF8uZmlsdGVyKF8udW5pcShhcnJheSksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHJldHVybiBfLmV2ZXJ5KHJlc3QsIGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBfLmNvbnRhaW5zKG90aGVyLCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFRha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBvbmUgYXJyYXkgYW5kIGEgbnVtYmVyIG9mIG90aGVyIGFycmF5cy5cbiAgLy8gT25seSB0aGUgZWxlbWVudHMgcHJlc2VudCBpbiBqdXN0IHRoZSBmaXJzdCBhcnJheSB3aWxsIHJlbWFpbi5cbiAgXy5kaWZmZXJlbmNlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdCA9IGNvbmNhdC5hcHBseShBcnJheVByb3RvLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpeyByZXR1cm4gIV8uY29udGFpbnMocmVzdCwgdmFsdWUpOyB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBfLm1heChfLnBsdWNrKGFyZ3VtZW50cywgJ2xlbmd0aCcpLmNvbmNhdCgwKSk7XG4gICAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRzW2ldID0gXy5wbHVjayhhcmd1bWVudHMsICcnICsgaSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcbiAgLy8gcGFpcnMsIG9yIHR3byBwYXJhbGxlbCBhcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoIC0tIG9uZSBvZiBrZXlzLCBhbmQgb25lIG9mXG4gIC8vIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgXy5vYmplY3QgPSBmdW5jdGlvbihsaXN0LCB2YWx1ZXMpIHtcbiAgICBpZiAobGlzdCA9PSBudWxsKSByZXR1cm4ge307XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldXSA9IHZhbHVlc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldWzBdXSA9IGxpc3RbaV1bMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gSWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwbHkgdXMgd2l0aCBpbmRleE9mIChJJ20gbG9va2luZyBhdCB5b3UsICoqTVNJRSoqKSxcbiAgLy8gd2UgbmVlZCB0aGlzIGZ1bmN0aW9uLiBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuXG4gIC8vIGl0ZW0gaW4gYW4gYXJyYXksIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBpbmRleE9mYCBpZiBhdmFpbGFibGUuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgaXNTb3J0ZWQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgaWYgKHR5cGVvZiBpc1NvcnRlZCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpID0gKGlzU29ydGVkIDwgMCA/IE1hdGgubWF4KDAsIGxlbmd0aCArIGlzU29ydGVkKSA6IGlzU29ydGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSBfLnNvcnRlZEluZGV4KGFycmF5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIGFycmF5W2ldID09PSBpdGVtID8gaSA6IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmF0aXZlSW5kZXhPZiAmJiBhcnJheS5pbmRleE9mID09PSBuYXRpdmVJbmRleE9mKSByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtLCBpc1NvcnRlZCk7XG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgaWYgKGFycmF5W2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGxhc3RJbmRleE9mYCBpZiBhdmFpbGFibGUuXG4gIF8ubGFzdEluZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgZnJvbSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGhhc0luZGV4ID0gZnJvbSAhPSBudWxsO1xuICAgIGlmIChuYXRpdmVMYXN0SW5kZXhPZiAmJiBhcnJheS5sYXN0SW5kZXhPZiA9PT0gbmF0aXZlTGFzdEluZGV4T2YpIHtcbiAgICAgIHJldHVybiBoYXNJbmRleCA/IGFycmF5Lmxhc3RJbmRleE9mKGl0ZW0sIGZyb20pIDogYXJyYXkubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfVxuICAgIHZhciBpID0gKGhhc0luZGV4ID8gZnJvbSA6IGFycmF5Lmxlbmd0aCk7XG4gICAgd2hpbGUgKGktLSkgaWYgKGFycmF5W2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxuICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxuICBfLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgc3RlcCA9IGFyZ3VtZW50c1syXSB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlKGlkeCA8IGxlbmd0aCkge1xuICAgICAgcmFuZ2VbaWR4KytdID0gc3RhcnQ7XG4gICAgICBzdGFydCArPSBzdGVwO1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJldXNhYmxlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBwcm90b3R5cGUgc2V0dGluZy5cbiAgdmFyIGN0b3IgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlIGEgZnVuY3Rpb24gYm91bmQgdG8gYSBnaXZlbiBvYmplY3QgKGFzc2lnbmluZyBgdGhpc2AsIGFuZCBhcmd1bWVudHMsXG4gIC8vIG9wdGlvbmFsbHkpLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgRnVuY3Rpb24uYmluZGAgaWZcbiAgLy8gYXZhaWxhYmxlLlxuICBfLmJpbmQgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgdmFyIGFyZ3MsIGJvdW5kO1xuICAgIGlmIChuYXRpdmVCaW5kICYmIGZ1bmMuYmluZCA9PT0gbmF0aXZlQmluZCkgcmV0dXJuIG5hdGl2ZUJpbmQuYXBwbHkoZnVuYywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihmdW5jKSkgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSkgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgdmFyIHNlbGYgPSBuZXcgY3RvcjtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHNlbGYsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFBhcnRpYWxseSBhcHBseSBhIGZ1bmN0aW9uIGJ5IGNyZWF0aW5nIGEgdmVyc2lvbiB0aGF0IGhhcyBoYWQgc29tZSBvZiBpdHNcbiAgLy8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xuICAvLyBhcyBhIHBsYWNlaG9sZGVyLCBhbGxvd2luZyBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHByZS1maWxsZWQuXG4gIF8ucGFydGlhbCA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICB2YXIgYm91bmRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IDA7XG4gICAgICB2YXIgYXJncyA9IGJvdW5kQXJncy5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFyZ3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0gPT09IF8pIGFyZ3NbaV0gPSBhcmd1bWVudHNbcG9zaXRpb24rK107XG4gICAgICB9XG4gICAgICB3aGlsZSAocG9zaXRpb24gPCBhcmd1bWVudHMubGVuZ3RoKSBhcmdzLnB1c2goYXJndW1lbnRzW3Bvc2l0aW9uKytdKTtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQmluZCBhIG51bWJlciBvZiBhbiBvYmplY3QncyBtZXRob2RzIHRvIHRoYXQgb2JqZWN0LiBSZW1haW5pbmcgYXJndW1lbnRzXG4gIC8vIGFyZSB0aGUgbWV0aG9kIG5hbWVzIHRvIGJlIGJvdW5kLiBVc2VmdWwgZm9yIGVuc3VyaW5nIHRoYXQgYWxsIGNhbGxiYWNrc1xuICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXG4gIF8uYmluZEFsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBmdW5jcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcbiAgICBlYWNoKGZ1bmNzLCBmdW5jdGlvbihmKSB7IG9ialtmXSA9IF8uYmluZChvYmpbZl0sIG9iaik7IH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW8gPSB7fTtcbiAgICBoYXNoZXIgfHwgKGhhc2hlciA9IF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXkgPSBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBfLmhhcyhtZW1vLCBrZXkpID8gbWVtb1trZXldIDogKG1lbW9ba2V5XSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpeyByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTsgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIF8uZGVsYXkuYXBwbHkoXywgW2Z1bmMsIDFdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2VcbiAgLy8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXG4gIC8vIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcbiAgLy8gYnV0IGlmIHlvdSdkIGxpa2UgdG8gZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIHBhc3NcbiAgLy8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXG4gIF8udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcbiAgICB2YXIgdGltZW91dCA9IG51bGw7XG4gICAgdmFyIHByZXZpb3VzID0gMDtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IF8ubm93KCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm93ID0gXy5ub3coKTtcbiAgICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XG4gICAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGFzdCA9IF8ubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICBpZiAobGFzdCA8IHdhaXQpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRpbWVzdGFtcCA9IF8ubm93KCk7XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcbiAgLy8gb2Z0ZW4geW91IGNhbGwgaXQuIFVzZWZ1bCBmb3IgbGF6eSBpbml0aWFsaXphdGlvbi5cbiAgXy5vbmNlID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocmFuKSByZXR1cm4gbWVtbztcbiAgICAgIHJhbiA9IHRydWU7XG4gICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgZnVuYyA9IG51bGw7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmdW5jcyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGZvciAodmFyIGkgPSBmdW5jcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhcmdzID0gW2Z1bmNzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGFmdGVyIGJlaW5nIGNhbGxlZCBOIHRpbWVzLlxuICBfLmFmdGVyID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIE9iamVjdCBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgXG4gIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIF8udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBDb252ZXJ0IGFuIG9iamVjdCBpbnRvIGEgbGlzdCBvZiBgW2tleSwgdmFsdWVdYCBwYWlycy5cbiAgXy5wYWlycyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBwYWlycyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBlYWNoKHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgb25seSBjb250YWluaW5nIHRoZSB3aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLnBpY2sgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgY29weSA9IHt9O1xuICAgIHZhciBrZXlzID0gY29uY2F0LmFwcGx5KEFycmF5UHJvdG8sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgZWFjaChrZXlzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgaW4gb2JqKSBjb3B5W2tleV0gPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gY29weTtcbiAgfTtcblxuICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ub21pdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBjb3B5ID0ge307XG4gICAgdmFyIGtleXMgPSBjb25jYXQuYXBwbHkoQXJyYXlQcm90bywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoIV8uY29udGFpbnMoa2V5cywga2V5KSkgY29weVtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICAgIHJldHVybiBjb3B5O1xuICB9O1xuXG4gIC8vIEZpbGwgaW4gYSBnaXZlbiBvYmplY3Qgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXMuXG4gIF8uZGVmYXVsdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBlYWNoKHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKG9ialtwcm9wXSA9PT0gdm9pZCAwKSBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIChzaGFsbG93LWNsb25lZCkgZHVwbGljYXRlIG9mIGFuIG9iamVjdC5cbiAgXy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIHJldHVybiBfLmlzQXJyYXkob2JqKSA/IG9iai5zbGljZSgpIDogXy5leHRlbmQoe30sIG9iaik7XG4gIH07XG5cbiAgLy8gSW52b2tlcyBpbnRlcmNlcHRvciB3aXRoIHRoZSBvYmosIGFuZCB0aGVuIHJldHVybnMgb2JqLlxuICAvLyBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvIFwidGFwIGludG9cIiBhIG1ldGhvZCBjaGFpbiwgaW5cbiAgLy8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXG4gIF8udGFwID0gZnVuY3Rpb24ob2JqLCBpbnRlcmNlcHRvcikge1xuICAgIGludGVyY2VwdG9yKG9iaik7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT0gMSAvIGI7XG4gICAgLy8gQSBzdHJpY3QgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgbnVsbCA9PSB1bmRlZmluZWRgLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gYSA9PT0gYjtcbiAgICAvLyBVbndyYXAgYW55IHdyYXBwZWQgb2JqZWN0cy5cbiAgICBpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xuICAgIGlmIChiIGluc3RhbmNlb2YgXykgYiA9IGIuX3dyYXBwZWQ7XG4gICAgLy8gQ29tcGFyZSBgW1tDbGFzc11dYCBuYW1lcy5cbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgLy8gU3RyaW5ncywgbnVtYmVycywgZGF0ZXMsIGFuZCBib29sZWFucyBhcmUgY29tcGFyZWQgYnkgdmFsdWUuXG4gICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICAgIHJldHVybiBhID09IFN0cmluZyhiKTtcbiAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuIEFuIGBlZ2FsYCBjb21wYXJpc29uIGlzIHBlcmZvcm1lZCBmb3JcbiAgICAgICAgLy8gb3RoZXIgbnVtZXJpYyB2YWx1ZXMuXG4gICAgICAgIHJldHVybiBhICE9ICthID8gYiAhPSArYiA6IChhID09IDAgPyAxIC8gYSA9PSAxIC8gYiA6IGEgPT0gK2IpO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09ICtiO1xuICAgICAgLy8gUmVnRXhwcyBhcmUgY29tcGFyZWQgYnkgdGhlaXIgc291cmNlIHBhdHRlcm5zIGFuZCBmbGFncy5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAgIHJldHVybiBhLnNvdXJjZSA9PSBiLnNvdXJjZSAmJlxuICAgICAgICAgICAgICAgYS5nbG9iYWwgPT0gYi5nbG9iYWwgJiZcbiAgICAgICAgICAgICAgIGEubXVsdGlsaW5lID09IGIubXVsdGlsaW5lICYmXG4gICAgICAgICAgICAgICBhLmlnbm9yZUNhc2UgPT0gYi5pZ25vcmVDYXNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PSBhKSByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT0gYjtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzXG4gICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgKGFDdG9yIGluc3RhbmNlb2YgYUN0b3IpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgKGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICB2YXIgc2l6ZSA9IDAsIHJlc3VsdCA9IHRydWU7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgaWYgKGNsYXNzTmFtZSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIHNpemUgPSBhLmxlbmd0aDtcbiAgICAgIHJlc3VsdCA9IHNpemUgPT0gYi5sZW5ndGg7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBlcShhW3NpemVdLCBiW3NpemVdLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgIGlmIChfLmhhcyhhLCBrZXkpKSB7XG4gICAgICAgICAgLy8gQ291bnQgdGhlIGV4cGVjdGVkIG51bWJlciBvZiBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXIuXG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzLlxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBmb3IgKGtleSBpbiBiKSB7XG4gICAgICAgICAgaWYgKF8uaGFzKGIsIGtleSkgJiYgIShzaXplLS0pKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSAhc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIsIFtdLCBbXSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXG4gIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBET00gZWxlbWVudD9cbiAgXy5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcbiAgXy5pc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cC5cbiAgZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFKSwgd2hlcmVcbiAgLy8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcbiAgICBfLmlzQXJndW1lbnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gISEob2JqICYmIF8uaGFzKG9iaiwgJ2NhbGxlZScpKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLlxuICBpZiAodHlwZW9mICgvLi8pICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGVxdWFsIHRvIG51bGw/XG4gIF8uaXNOdWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIHVuZGVmaW5lZD9cbiAgXy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcbiAgfTtcblxuICAvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XG4gIC8vIG9uIGl0c2VsZiAoaW4gb3RoZXIgd29yZHMsIG5vdCBvbiBhIHByb3RvdHlwZSkuXG4gIF8uaGFzID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH07XG5cbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXG4gIC8vIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5fID0gcHJldmlvdXNVbmRlcnNjb3JlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRvcnMuXG4gIF8uaWRlbnRpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBfLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5wcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZiBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5tYXRjaGVzID0gZnVuY3Rpb24oYXR0cnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqID09PSBhdHRycykgcmV0dXJuIHRydWU7IC8vYXZvaWQgY29tcGFyaW5nIGFuIG9iamVjdCB0byBpdHNlbGYuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgaSk7XG4gICAgcmV0dXJuIGFjY3VtO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXG4gIF8ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09IG51bGwpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICB9O1xuXG4gIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cbiAgXy5ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIC8vIExpc3Qgb2YgSFRNTCBlbnRpdGllcyBmb3IgZXNjYXBpbmcuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgZXNjYXBlOiB7XG4gICAgICAnJic6ICcmYW1wOycsXG4gICAgICAnPCc6ICcmbHQ7JyxcbiAgICAgICc+JzogJyZndDsnLFxuICAgICAgJ1wiJzogJyZxdW90OycsXG4gICAgICBcIidcIjogJyYjeDI3OydcbiAgICB9XG4gIH07XG4gIGVudGl0eU1hcC51bmVzY2FwZSA9IF8uaW52ZXJ0KGVudGl0eU1hcC5lc2NhcGUpO1xuXG4gIC8vIFJlZ2V4ZXMgY29udGFpbmluZyB0aGUga2V5cyBhbmQgdmFsdWVzIGxpc3RlZCBpbW1lZGlhdGVseSBhYm92ZS5cbiAgdmFyIGVudGl0eVJlZ2V4ZXMgPSB7XG4gICAgZXNjYXBlOiAgIG5ldyBSZWdFeHAoJ1snICsgXy5rZXlzKGVudGl0eU1hcC5lc2NhcGUpLmpvaW4oJycpICsgJ10nLCAnZycpLFxuICAgIHVuZXNjYXBlOiBuZXcgUmVnRXhwKCcoJyArIF8ua2V5cyhlbnRpdHlNYXAudW5lc2NhcGUpLmpvaW4oJ3wnKSArICcpJywgJ2cnKVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgXy5lYWNoKFsnZXNjYXBlJywgJ3VuZXNjYXBlJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIF9bbWV0aG9kXSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgaWYgKHN0cmluZyA9PSBudWxsKSByZXR1cm4gJyc7XG4gICAgICByZXR1cm4gKCcnICsgc3RyaW5nKS5yZXBsYWNlKGVudGl0eVJlZ2V4ZXNbbWV0aG9kXSwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eU1hcFttZXRob2RdW21hdGNoXTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdCc6ICAgICAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdHxcXHUyMDI4fFxcdTIwMjkvZztcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgZGF0YSwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcmVuZGVyO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IG5ldyBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpXG4gICAgICAgIC5yZXBsYWNlKGVzY2FwZXIsIGZ1bmN0aW9uKG1hdGNoKSB7IHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTsgfSk7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjtcbiAgICAgIH1cbiAgICAgIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH1cbiAgICAgIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuICAgICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyBcInJldHVybiBfX3A7XFxuXCI7XG5cbiAgICB0cnkge1xuICAgICAgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIGlmIChkYXRhKSByZXR1cm4gcmVuZGVyKGRhdGEsIF8pO1xuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgZnVuY3Rpb24gc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonKSArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGRlbGVnYXRlIHRvIHRoZSB3cmFwcGVyLlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8ob2JqKS5jaGFpbigpO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciByZXN1bHQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xuICAgICAgbWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICAgIGlmICgobmFtZSA9PSAnc2hpZnQnIHx8IG5hbWUgPT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICBfLmV4dGVuZChfLnByb3RvdHlwZSwge1xuXG4gICAgLy8gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICAgIGNoYWluOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX2NoYWluID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgICB9XG5cbiAgfSk7XG5cbiAgLy8gQU1EIHJlZ2lzdHJhdGlvbiBoYXBwZW5zIGF0IHRoZSBlbmQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBTUQgbG9hZGVyc1xuICAvLyB0aGF0IG1heSBub3QgZW5mb3JjZSBuZXh0LXR1cm4gc2VtYW50aWNzIG9uIG1vZHVsZXMuIEV2ZW4gdGhvdWdoIGdlbmVyYWxcbiAgLy8gcHJhY3RpY2UgZm9yIEFNRCByZWdpc3RyYXRpb24gaXMgdG8gYmUgYW5vbnltb3VzLCB1bmRlcnNjb3JlIHJlZ2lzdGVyc1xuICAvLyBhcyBhIG5hbWVkIG1vZHVsZSBiZWNhdXNlLCBsaWtlIGpRdWVyeSwgaXQgaXMgYSBiYXNlIGxpYnJhcnkgdGhhdCBpc1xuICAvLyBwb3B1bGFyIGVub3VnaCB0byBiZSBidW5kbGVkIGluIGEgdGhpcmQgcGFydHkgbGliLCBidXQgbm90IGJlIHBhcnQgb2ZcbiAgLy8gYW4gQU1EIGxvYWQgcmVxdWVzdC4gVGhvc2UgY2FzZXMgY291bGQgZ2VuZXJhdGUgYW4gZXJyb3Igd2hlbiBhblxuICAvLyBhbm9ueW1vdXMgZGVmaW5lKCkgaXMgY2FsbGVkIG91dHNpZGUgb2YgYSBsb2FkZXIgcmVxdWVzdC5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgndW5kZXJzY29yZScsIFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIHdpbmRvdyA9IHJlcXVpcmUoXCJnbG9iYWwvd2luZG93XCIpXG52YXIgb25jZSA9IHJlcXVpcmUoXCJvbmNlXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgncGFyc2UtaGVhZGVycycpXG5cbnZhciBtZXNzYWdlcyA9IHtcbiAgICBcIjBcIjogXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiLFxuICAgIFwiNFwiOiBcIjR4eCBDbGllbnQgRXJyb3JcIixcbiAgICBcIjVcIjogXCI1eHggU2VydmVyIEVycm9yXCJcbn1cblxudmFyIFhIUiA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG52YXIgWERSID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IFhIUigpKSA/IFhIUiA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuXG5mdW5jdGlvbiBjcmVhdGVYSFIob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgdXJpOiBvcHRpb25zIH1cbiAgICB9XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGNhbGxiYWNrID0gb25jZShjYWxsYmFjaylcblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgWERSKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgWEhSKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGFcbiAgICB2YXIgaGVhZGVycyA9IHhoci5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9XG4gICAgdmFyIHN5bmMgPSAhIW9wdGlvbnMuc3luY1xuICAgIHZhciBpc0pzb24gPSBmYWxzZVxuICAgIHZhciBrZXlcbiAgICB2YXIgbG9hZCA9IG9wdGlvbnMucmVzcG9uc2UgPyBsb2FkUmVzcG9uc2UgOiBsb2FkWGhyXG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBpc0pzb24gPSB0cnVlXG4gICAgICAgIGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICBpZiAobWV0aG9kICE9PSBcIkdFVFwiICYmIG1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRcbiAgICB4aHIub25lcnJvciA9IGVycm9yXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUUgbXVzdCBkaWVcbiAgICB9XG4gICAgLy8gaGF0ZSBJRVxuICAgIHhoci5vbnRpbWVvdXQgPSBub29wXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9iYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzIHx8IChvcHRpb25zLmNvcnMgJiYgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgIT09IGZhbHNlKSkge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIENhbm5vdCBzZXQgdGltZW91dCB3aXRoIHN5bmMgcmVxdWVzdFxuICAgIGlmICghc3luYykge1xuICAgICAgICB4aHIudGltZW91dCA9IFwidGltZW91dFwiIGluIG9wdGlvbnMgPyBvcHRpb25zLnRpbWVvdXQgOiA1MDAwXG4gICAgfVxuXG4gICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgIGZvcihrZXkgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBpZihoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuICAgIFxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmIFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTZW5kID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocilcbiAgICB9XG5cbiAgICB4aHIuc2VuZChib2R5KVxuXG4gICAgcmV0dXJuIHhoclxuXG4gICAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBsb2FkKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSBudWxsXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2UgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAheGhyLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgeGhyLnJlc3BvbnNlWE1MXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNKc29uKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvZHlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXNDb2RlKCkge1xuICAgICAgICByZXR1cm4geGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXNcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBnZXR0aW5nIGEgbm9uZS1vayBzdGF0dXNDb2RlLCBidWlsZCAmIHJldHVybiBhbiBlcnJvclxuICAgIGZ1bmN0aW9uIGVycm9yRnJvbVN0YXR1c0NvZGUoc3RhdHVzLCBib2R5KSB7XG4gICAgICAgIHZhciBlcnJvciA9IG51bGxcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCB8fCAoc3RhdHVzID49IDQwMCAmJiBzdGF0dXMgPCA2MDApKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIiA/IGJvZHkgOiBmYWxzZSkgfHxcbiAgICAgICAgICAgICAgICBtZXNzYWdlc1tTdHJpbmcoc3RhdHVzKS5jaGFyQXQoMCldXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgICAgICAgICAgZXJyb3Iuc3RhdHVzQ29kZSA9IHN0YXR1c1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9yXG4gICAgfVxuXG4gICAgLy8gd2lsbCBsb2FkIHRoZSBkYXRhICYgcHJvY2VzcyB0aGUgcmVzcG9uc2UgaW4gYSBzcGVjaWFsIHJlc3BvbnNlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGxvYWRSZXNwb25zZSgpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IGdldFN0YXR1c0NvZGUoKVxuICAgICAgICB2YXIgYm9keSA9IGdldEJvZHkoKVxuICAgICAgICB2YXIgZXJyb3IgPSBlcnJvckZyb21TdGF0dXNDb2RlKHN0YXR1cywgYm9keSlcbiAgICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgcmF3OiB4aHJcbiAgICAgICAgfVxuICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSBhbmQgYWRkIHNvbWUgcmVzcG9uc2UgcHJvcGVydGllcyB0byB0aGUgc291cmNlIHhoclxuICAgIC8vIGFuZCB0aGVuIHJlc3BvbmQgd2l0aCB0aGF0XG4gICAgZnVuY3Rpb24gbG9hZFhocigpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IGdldFN0YXR1c0NvZGUoKVxuICAgICAgICB2YXIgZXJyb3IgPSBlcnJvckZyb21TdGF0dXNDb2RlKHN0YXR1cylcblxuICAgICAgICB4aHIuc3RhdHVzID0geGhyLnN0YXR1c0NvZGUgPSBzdGF0dXNcbiAgICAgICAgeGhyLmJvZHkgPSBnZXRCb2R5KClcbiAgICAgICAgeGhyLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB4aHIsIHhoci5ib2R5KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yKGV2dCkge1xuICAgICAgICBjYWxsYmFjayhldnQsIHhocilcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG9uY2Vcblxub25jZS5wcm90byA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZScsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2UodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhbGxlZCkgcmV0dXJuXG4gICAgY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cbn1cbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnaXMtZnVuY3Rpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2hcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBjb250ZXh0ID0gdGhpc1xuICAgIH1cbiAgICBcbiAgICBpZiAodG9TdHJpbmcuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJylcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJylcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlXG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG59XG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIGFycmF5W2ldLCBpLCBhcnJheSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9iamVjdFtrXSwgaywgb2JqZWN0KVxuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHN0cmluZyA9IHRvU3RyaW5nLmNhbGwoZm4pXG4gIHJldHVybiBzdHJpbmcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHxcbiAgICAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHN0cmluZyAhPT0gJ1tvYmplY3QgUmVnRXhwXScpIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIC8vIElFOCBhbmQgYmVsb3dcbiAgICAgKGZuID09PSB3aW5kb3cuc2V0VGltZW91dCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5hbGVydCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5jb25maXJtIHx8XG4gICAgICBmbiA9PT0gd2luZG93LnByb21wdCkpXG59O1xuIiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuIiwidmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59IiwidmFyIEFtcGVyc2FuZE1vZGVsID0gcmVxdWlyZSgnYW1wZXJzYW5kLW1vZGVsJyk7XG52YXIgaG9vZGllTWl4aW4gPSByZXF1aXJlKCdhbXBlcnNhbmQtaG9vZGllLW1peGluJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBbXBlcnNhbmRNb2RlbC5leHRlbmQoaG9vZGllTWl4aW4sIHtcbn0pOyIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWlucHV0LXZpZXdcIl0gPSB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWlucHV0LXZpZXdcIl0gfHwgW107ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWlucHV0LXZpZXdcIl0ucHVzaChcIjMuMS4wXCIpO31cbnZhciBWaWV3ID0gcmVxdWlyZSgnYW1wZXJzYW5kLXZpZXcnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogW1xuICAgICAgICAnPGxhYmVsPicsXG4gICAgICAgICAgICAnPHNwYW4gZGF0YS1ob29rPVwibGFiZWxcIj48L3NwYW4+JyxcbiAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJmb3JtLWlucHV0XCI+JyxcbiAgICAgICAgICAgICc8ZGl2IGRhdGEtaG9vaz1cIm1lc3NhZ2UtY29udGFpbmVyXCIgY2xhc3M9XCJtZXNzYWdlIG1lc3NhZ2UtYmVsb3cgbWVzc2FnZS1lcnJvclwiPicsXG4gICAgICAgICAgICAgICAgJzxwIGRhdGEtaG9vaz1cIm1lc3NhZ2UtdGV4dFwiPjwvcD4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8L2xhYmVsPidcbiAgICBdLmpvaW4oJycpLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgICduYW1lJzoge1xuICAgICAgICAgICAgdHlwZTogJ2F0dHJpYnV0ZScsXG4gICAgICAgICAgICBzZWxlY3RvcjogJ2lucHV0LCB0ZXh0YXJlYScsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZSdcbiAgICAgICAgfSxcbiAgICAgICAgJ2xhYmVsJzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGhvb2s6ICdsYWJlbCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RvZ2dsZScsXG4gICAgICAgICAgICAgICAgaG9vazogJ2xhYmVsJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnbWVzc2FnZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIGhvb2s6ICdtZXNzYWdlLXRleHQnXG4gICAgICAgIH0sXG4gICAgICAgICdzaG93TWVzc2FnZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0b2dnbGUnLFxuICAgICAgICAgICAgaG9vazogJ21lc3NhZ2UtY29udGFpbmVyJ1xuICAgICAgICB9LFxuICAgICAgICAncGxhY2Vob2xkZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnaW5wdXQsIHRleHRhcmVhJyxcbiAgICAgICAgICAgIG5hbWU6ICdwbGFjZWhvbGRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3ZhbGlkaXR5Q2xhc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICAgICAgc2VsZWN0b3I6ICdpbnB1dCwgdGV4dGFyZWEnXG4gICAgICAgIH0sXG4gICAgICAgICdyb290RWxlbWVudENsYXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2NsYXNzJyxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoc3BlYykge1xuICAgICAgICBzcGVjIHx8IChzcGVjID0ge30pO1xuICAgICAgICB0aGlzLnRlc3RzID0gdGhpcy50ZXN0cyB8fCBzcGVjLnRlc3RzIHx8IFtdO1xuICAgICAgICB0aGlzLm9uKCdjaGFuZ2U6dHlwZScsIHRoaXMuaGFuZGxlVHlwZUNoYW5nZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQmx1ciA9IHRoaXMuaGFuZGxlQmx1ci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlZCA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2VkLmJpbmQodGhpcyk7XG4gICAgICAgIHZhciB2YWx1ZSA9ICFzcGVjLnZhbHVlICYmIHNwZWMudmFsdWUgIT09IDAgPyAnJyA6IHNwZWMudmFsdWU7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbignY2hhbmdlOnZhbGlkIGNoYW5nZTp2YWx1ZScsIHRoaXMucmVwb3J0VG9QYXJlbnQsIHRoaXMpO1xuICAgICAgICBpZiAoc3BlYy50ZW1wbGF0ZSkgdGhpcy50ZW1wbGF0ZSA9IHNwZWMudGVtcGxhdGU7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJXaXRoVGVtcGxhdGUoKTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMucXVlcnkoJ2lucHV0JykgfHwgdGhpcy5xdWVyeSgndGV4dGFyZWEnKTtcbiAgICAgICAgLy8gc3dpdGNoZXMgb3V0IGlucHV0IGZvciB0ZXh0YXJlYSBpZiB0aGF0J3Mgd2hhdCB3ZSB3YW50XG4gICAgICAgIHRoaXMuaGFuZGxlVHlwZUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmluaXRJbnB1dEJpbmRpbmdzKCk7XG4gICAgICAgIC8vIFNraXAgdmFsaWRhdGlvbiBvbiBpbml0aWFsIHNldFZhbHVlXG4gICAgICAgIC8vIGlmIHRoZSBmaWVsZCBpcyBub3QgcmVxdWlyZWRcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmlucHV0VmFsdWUsICF0aGlzLnJlcXVpcmVkKTtcbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICAgIGlucHV0VmFsdWU6ICdhbnknLFxuICAgICAgICBzdGFydGluZ1ZhbHVlOiAnYW55JyxcbiAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgIHR5cGU6IFsnc3RyaW5nJywgdHJ1ZSwgJ3RleHQnXSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IFsnc3RyaW5nJywgdHJ1ZSwgJyddLFxuICAgICAgICBsYWJlbDogWydzdHJpbmcnLCB0cnVlLCAnJ10sXG4gICAgICAgIHJlcXVpcmVkOiBbJ2Jvb2xlYW4nLCB0cnVlLCB0cnVlXSxcbiAgICAgICAgZGlyZWN0bHlFZGl0ZWQ6IFsnYm9vbGVhbicsIHRydWUsIGZhbHNlXSxcbiAgICAgICAgc2hvdWxkVmFsaWRhdGU6IFsnYm9vbGVhbicsIHRydWUsIGZhbHNlXSxcbiAgICAgICAgbWVzc2FnZTogWydzdHJpbmcnLCB0cnVlLCAnJ10sXG4gICAgICAgIHJlcXVpcmVkTWVzc2FnZTogWydzdHJpbmcnLCB0cnVlLCAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nXSxcbiAgICAgICAgdmFsaWRDbGFzczogWydzdHJpbmcnLCB0cnVlLCAnaW5wdXQtdmFsaWQnXSxcbiAgICAgICAgaW52YWxpZENsYXNzOiBbJ3N0cmluZycsIHRydWUsICdpbnB1dC1pbnZhbGlkJ10sXG4gICAgICAgIHJvb3RFbGVtZW50Q2xhc3M6IFsnc3RyaW5nJywgdHJ1ZSwgJyddXG4gICAgfSxcbiAgICBkZXJpdmVkOiB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkZXBzOiBbJ2lucHV0VmFsdWUnXSxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWQ6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnaW5wdXRWYWx1ZSddLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMucnVuVGVzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2hvd01lc3NhZ2U6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnbWVzc2FnZScsICdzaG91bGRWYWxpZGF0ZSddLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG91bGRWYWxpZGF0ZSAmJiB0aGlzLm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZWQ6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnaW5wdXRWYWx1ZScsICdzdGFydGluZ1ZhbHVlJ10sXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0VmFsdWUgIT09IHRoaXMuc3RhcnRpbmdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRpdHlDbGFzczoge1xuICAgICAgICAgICAgZGVwczogWyd2YWxpZCcsICd2YWxpZENsYXNzJywgJ2ludmFsaWRDbGFzcycsICdzaG91bGRWYWxpZGF0ZSddLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVmFsaWRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkID8gdGhpcy52YWxpZENsYXNzIDogdGhpcy5pbnZhbGlkQ2xhc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlLCBza2lwVmFsaWRhdGlvbikge1xuICAgICAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICBpZiAoIXNraXBWYWxpZGF0aW9uICYmICF0aGlzLmdldEVycm9yTWVzc2FnZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3VsZFZhbGlkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0RXJyb3JNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmICF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlZE1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAodGhpcy50ZXN0cyB8fCBbXSkuc29tZShmdW5jdGlvbiAodGVzdCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0ZXN0LmNhbGwodGhpcywgdGhpcy52YWx1ZSkgfHwgJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVUeXBlQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdGhpcy5pbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmlucHV0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0ZXh0YXJlYSwgdGhpcy5pbnB1dCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gdGV4dGFyZWE7XG4gICAgICAgICAgICB0aGlzLl9hcHBseUJpbmRpbmdzRm9yS2V5KCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGx5RWRpdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLmNsZWFuKHRoaXMuaW5wdXQudmFsdWUpO1xuICAgIH0sXG4gICAgY2xlYW46IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnR5cGUgPT09ICdudW1iZXInKSA/IE51bWJlcih2YWwpIDogdmFsLnRyaW0oKTtcbiAgICB9LFxuICAgIGhhbmRsZUJsdXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWYWx1ZSAmJiB0aGlzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdWxkVmFsaWRhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucnVuVGVzdHMoKTtcbiAgICB9LFxuICAgIGJlZm9yZVN1Ym1pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBhdCB0aGUgcG9pbnQgd2hlcmUgd2UndmUgdHJpZWRcbiAgICAgICAgLy8gdG8gc3VibWl0LCB3ZSB3YW50IHRvIHZhbGlkYXRlXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZnJvbSBub3cgb24uXG4gICAgICAgIHRoaXMuc2hvdWxkVmFsaWRhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJ1blRlc3RzKCk7XG4gICAgfSxcbiAgICBydW5UZXN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKCk7XG4gICAgICAgIGlmICghbWVzc2FnZSAmJiB0aGlzLmlucHV0VmFsdWUgJiYgdGhpcy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAvLyBpZiBpdCdzIGV2ZXIgYmVlbiB2YWxpZCxcbiAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gdmFsaWRhdGUgZnJvbSBub3dcbiAgICAgICAgICAgIC8vIG9uLlxuICAgICAgICAgICAgdGhpcy5zaG91bGRWYWxpZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSxcbiAgICBpbml0SW5wdXRCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmhhbmRsZUJsdXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2VkLCBmYWxzZSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2VkLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuaGFuZGxlQmx1ciwgZmFsc2UpO1xuICAgICAgICBWaWV3LnByb3RvdHlwZS5yZW1vdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy5zdGFydGluZ1ZhbHVlKTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUoJycpO1xuICAgIH0sXG4gICAgcmVwb3J0VG9QYXJlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC51cGRhdGUodGhpcyk7XG4gICAgfVxufSk7XG4iLCI7aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHsgIHdpbmRvdy5hbXBlcnNhbmQgPSB3aW5kb3cuYW1wZXJzYW5kIHx8IHt9OyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1tb2RlbFwiXSA9IHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtbW9kZWxcIl0gfHwgW107ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLW1vZGVsXCJdLnB1c2goXCI0LjAuM1wiKTt9XG52YXIgU3RhdGUgPSByZXF1aXJlKCdhbXBlcnNhbmQtc3RhdGUnKTtcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIHN5bmMgPSByZXF1aXJlKCdhbXBlcnNhbmQtc3luYycpO1xuXG5cbnZhciBNb2RlbCA9IFN0YXRlLmV4dGVuZCh7XG4gICAgc2F2ZTogZnVuY3Rpb24gKGtleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBhdHRycywgbWV0aG9kLCBzeW5jLCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuXG4gICAgICAgIC8vIEhhbmRsZSBib3RoIGBcImtleVwiLCB2YWx1ZWAgYW5kIGB7a2V5OiB2YWx1ZX1gIC1zdHlsZSBhcmd1bWVudHMuXG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXR0cnMgPSBrZXk7XG4gICAgICAgICAgICBvcHRpb25zID0gdmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF0dHJzID0ge30pW2tleV0gPSB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zID0gXy5leHRlbmQoe3ZhbGlkYXRlOiB0cnVlfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gSWYgd2UncmUgbm90IHdhaXRpbmcgYW5kIGF0dHJpYnV0ZXMgZXhpc3QsIHNhdmUgYWN0cyBhc1xuICAgICAgICAvLyBgc2V0KGF0dHIpLnNhdmUobnVsbCwgb3B0cylgIHdpdGggdmFsaWRhdGlvbi4gT3RoZXJ3aXNlLCBjaGVjayBpZlxuICAgICAgICAvLyB0aGUgbW9kZWwgd2lsbCBiZSB2YWxpZCB3aGVuIHRoZSBhdHRyaWJ1dGVzLCBpZiBhbnksIGFyZSBzZXQuXG4gICAgICAgIGlmIChhdHRycyAmJiAhb3B0aW9ucy53YWl0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0KGF0dHJzLCBvcHRpb25zKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZShhdHRycywgb3B0aW9ucykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFmdGVyIGEgc3VjY2Vzc2Z1bCBzZXJ2ZXItc2lkZSBzYXZlLCB0aGUgY2xpZW50IGlzIChvcHRpb25hbGx5KVxuICAgICAgICAvLyB1cGRhdGVkIHdpdGggdGhlIHNlcnZlci1zaWRlIHN0YXRlLlxuICAgICAgICBpZiAob3B0aW9ucy5wYXJzZSA9PT0gdm9pZCAwKSBvcHRpb25zLnBhcnNlID0gdHJ1ZTtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcztcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgICB2YXIgc2VydmVyQXR0cnMgPSBtb2RlbC5wYXJzZShyZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLndhaXQpIHNlcnZlckF0dHJzID0gXy5leHRlbmQoYXR0cnMgfHwge30sIHNlcnZlckF0dHJzKTtcbiAgICAgICAgICAgIGlmIChfLmlzT2JqZWN0KHNlcnZlckF0dHJzKSAmJiAhbW9kZWwuc2V0KHNlcnZlckF0dHJzLCBvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzKG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIG1vZGVsLnRyaWdnZXIoJ3N5bmMnLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICAgIHdyYXBFcnJvcih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICBtZXRob2QgPSB0aGlzLmlzTmV3KCkgPyAnY3JlYXRlJyA6IChvcHRpb25zLnBhdGNoID8gJ3BhdGNoJyA6ICd1cGRhdGUnKTtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ3BhdGNoJykgb3B0aW9ucy5hdHRycyA9IGF0dHJzO1xuICAgICAgICAvLyBpZiB3ZSdyZSB3YWl0aW5nIHdlIGhhdmVuJ3QgYWN0dWFsbHkgc2V0IG91ciBhdHRyaWJ1dGVzIHlldCBzb1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGRvIG1ha2Ugc3VyZSB3ZSBzZW5kIHJpZ2h0IGRhdGFcbiAgICAgICAgaWYgKG9wdGlvbnMud2FpdCkgb3B0aW9ucy5hdHRycyA9IF8uZXh0ZW5kKG1vZGVsLnNlcmlhbGl6ZSgpLCBhdHRycyk7XG4gICAgICAgIHN5bmMgPSB0aGlzLnN5bmMobWV0aG9kLCB0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gc3luYztcbiAgICB9LFxuXG4gICAgLy8gRmV0Y2ggdGhlIG1vZGVsIGZyb20gdGhlIHNlcnZlci4gSWYgdGhlIHNlcnZlcidzIHJlcHJlc2VudGF0aW9uIG9mIHRoZVxuICAgIC8vIG1vZGVsIGRpZmZlcnMgZnJvbSBpdHMgY3VycmVudCBhdHRyaWJ1dGVzLCB0aGV5IHdpbGwgYmUgb3ZlcnJpZGRlbixcbiAgICAvLyB0cmlnZ2VyaW5nIGEgYFwiY2hhbmdlXCJgIGV2ZW50LlxuICAgIGZldGNoOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyA/IF8uY2xvbmUob3B0aW9ucykgOiB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFyc2UgPT09IHZvaWQgMCkgb3B0aW9ucy5wYXJzZSA9IHRydWU7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXM7XG4gICAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgICBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzcCkge1xuICAgICAgICAgICAgaWYgKCFtb2RlbC5zZXQobW9kZWwucGFyc2UocmVzcCwgb3B0aW9ucyksIG9wdGlvbnMpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBtb2RlbC50cmlnZ2VyKCdzeW5jJywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICB3cmFwRXJyb3IodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmMoJ3JlYWQnLCB0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgLy8gRGVzdHJveSB0aGlzIG1vZGVsIG9uIHRoZSBzZXJ2ZXIgaWYgaXQgd2FzIGFscmVhZHkgcGVyc2lzdGVkLlxuICAgIC8vIE9wdGltaXN0aWNhbGx5IHJlbW92ZXMgdGhlIG1vZGVsIGZyb20gaXRzIGNvbGxlY3Rpb24sIGlmIGl0IGhhcyBvbmUuXG4gICAgLy8gSWYgYHdhaXQ6IHRydWVgIGlzIHBhc3NlZCwgd2FpdHMgZm9yIHRoZSBzZXJ2ZXIgdG8gcmVzcG9uZCBiZWZvcmUgcmVtb3ZhbC5cbiAgICBkZXN0cm95OiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyA/IF8uY2xvbmUob3B0aW9ucykgOiB7fTtcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcztcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG5cbiAgICAgICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtb2RlbC50cmlnZ2VyKCdkZXN0cm95JywgbW9kZWwsIG1vZGVsLmNvbGxlY3Rpb24sIG9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53YWl0IHx8IG1vZGVsLmlzTmV3KCkpIGRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzKG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICghbW9kZWwuaXNOZXcoKSkgbW9kZWwudHJpZ2dlcignc3luYycsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5pc05ldygpKSB7XG4gICAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB3cmFwRXJyb3IodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHN5bmMgPSB0aGlzLnN5bmMoJ2RlbGV0ZScsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIW9wdGlvbnMud2FpdCkgZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gc3luYztcbiAgICB9LFxuXG4gICAgLy8gUHJveHkgYGFtcGVyc2FuZC1zeW5jYCBieSBkZWZhdWx0IC0tIGJ1dCBvdmVycmlkZSB0aGlzIGlmIHlvdSBuZWVkXG4gICAgLy8gY3VzdG9tIHN5bmNpbmcgc2VtYW50aWNzIGZvciAqdGhpcyogcGFydGljdWxhciBtb2RlbC5cbiAgICBzeW5jOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzeW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIC8vIERlZmF1bHQgVVJMIGZvciB0aGUgbW9kZWwncyByZXByZXNlbnRhdGlvbiBvbiB0aGUgc2VydmVyIC0tIGlmIHlvdSdyZVxuICAgIC8vIHVzaW5nIEJhY2tib25lJ3MgcmVzdGZ1bCBtZXRob2RzLCBvdmVycmlkZSB0aGlzIHRvIGNoYW5nZSB0aGUgZW5kcG9pbnRcbiAgICAvLyB0aGF0IHdpbGwgYmUgY2FsbGVkLlxuICAgIHVybDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmFzZSA9IF8ucmVzdWx0KHRoaXMsICd1cmxSb290JykgfHwgXy5yZXN1bHQodGhpcy5jb2xsZWN0aW9uLCAndXJsJykgfHwgdXJsRXJyb3IoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNOZXcoKSkgcmV0dXJuIGJhc2U7XG4gICAgICAgIHJldHVybiBiYXNlICsgKGJhc2UuY2hhckF0KGJhc2UubGVuZ3RoIC0gMSkgPT09ICcvJyA/ICcnIDogJy8nKSArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmdldElkKCkpO1xuICAgIH1cbn0pO1xuXG4vLyBUaHJvdyBhbiBlcnJvciB3aGVuIGEgVVJMIGlzIG5lZWRlZCwgYW5kIG5vbmUgaXMgc3VwcGxpZWQuXG52YXIgdXJsRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIFwidXJsXCIgcHJvcGVydHkgb3IgZnVuY3Rpb24gbXVzdCBiZSBzcGVjaWZpZWQnKTtcbn07XG5cbi8vIFdyYXAgYW4gb3B0aW9uYWwgZXJyb3IgY2FsbGJhY2sgd2l0aCBhIGZhbGxiYWNrIGVycm9yIGV2ZW50LlxudmFyIHdyYXBFcnJvciA9IGZ1bmN0aW9uIChtb2RlbCwgb3B0aW9ucykge1xuICAgIHZhciBlcnJvciA9IG9wdGlvbnMuZXJyb3I7XG4gICAgb3B0aW9ucy5lcnJvciA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgIGlmIChlcnJvcikgZXJyb3IobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICBtb2RlbC50cmlnZ2VyKCdlcnJvcicsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbDtcbiIsIjtpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikgeyAgd2luZG93LmFtcGVyc2FuZCA9IHdpbmRvdy5hbXBlcnNhbmQgfHwge307ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLXN0YXRlXCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1zdGF0ZVwiXSB8fCBbXTsgIHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtc3RhdGVcIl0ucHVzaChcIjQuNC40XCIpO31cbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIEJCRXZlbnRzID0gcmVxdWlyZSgnYmFja2JvbmUtZXZlbnRzLXN0YW5kYWxvbmUnKTtcbnZhciBLZXlUcmVlID0gcmVxdWlyZSgna2V5LXRyZWUtc3RvcmUnKTtcbnZhciBhcnJheU5leHQgPSByZXF1aXJlKCdhcnJheS1uZXh0Jyk7XG52YXIgY2hhbmdlUkUgPSAvXmNoYW5nZTovO1xuXG5mdW5jdGlvbiBCYXNlKGF0dHJzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICB0aGlzLmNpZCB8fCAodGhpcy5jaWQgPSBfLnVuaXF1ZUlkKCdzdGF0ZScpKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB0aGlzLl92YWx1ZXMgPSB7fTtcbiAgICB0aGlzLl9kZWZpbml0aW9uID0gT2JqZWN0LmNyZWF0ZSh0aGlzLl9kZWZpbml0aW9uKTtcbiAgICBpZiAob3B0aW9ucy5wYXJzZSkgYXR0cnMgPSB0aGlzLnBhcnNlKGF0dHJzLCBvcHRpb25zKTtcbiAgICB0aGlzLnBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICAgIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMuY29sbGVjdGlvbjtcbiAgICB0aGlzLl9rZXlUcmVlID0gbmV3IEtleVRyZWUoKTtcbiAgICB0aGlzLl9pbml0Q29sbGVjdGlvbnMoKTtcbiAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcbiAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICAgIHRoaXMuX3ByZXZpb3VzQXR0cmlidXRlcyA9IHt9O1xuICAgIGlmIChhdHRycykgdGhpcy5zZXQoYXR0cnMsIF8uZXh0ZW5kKHtzaWxlbnQ6IHRydWUsIGluaXRpYWw6IHRydWV9LCBvcHRpb25zKSk7XG4gICAgdGhpcy5fY2hhbmdlZCA9IHt9O1xuICAgIGlmICh0aGlzLl9kZXJpdmVkKSB0aGlzLl9pbml0RGVyaXZlZCgpO1xuICAgIGlmIChvcHRpb25zLmluaXQgIT09IGZhbHNlKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuXG5fLmV4dGVuZChCYXNlLnByb3RvdHlwZSwgQkJFdmVudHMsIHtcbiAgICAvLyBjYW4gYmUgYWxsb3csIGlnbm9yZSwgcmVqZWN0XG4gICAgZXh0cmFQcm9wZXJ0aWVzOiAnaWdub3JlJyxcblxuICAgIGlkQXR0cmlidXRlOiAnaWQnLFxuXG4gICAgbmFtZXNwYWNlQXR0cmlidXRlOiAnbmFtZXNwYWNlJyxcblxuICAgIHR5cGVBdHRyaWJ1dGU6ICdtb2RlbFR5cGUnLFxuXG4gICAgLy8gU3R1YmJlZCBvdXQgdG8gYmUgb3ZlcndyaXR0ZW5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgSUQgb2YgbW9kZWwgcGVyIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gU2hvdWxkICphbHdheXMqIGJlIGhvdyBJRCBpcyBkZXRlcm1pbmVkIGJ5IG90aGVyIGNvZGUuXG4gICAgZ2V0SWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdGhpcy5pZEF0dHJpYnV0ZV07XG4gICAgfSxcblxuICAgIC8vIEdldCBuYW1lc3BhY2Ugb2YgbW9kZWwgcGVyIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gU2hvdWxkICphbHdheXMqIGJlIGhvdyBuYW1lc3BhY2UgaXMgZGV0ZXJtaW5lZCBieSBvdGhlciBjb2RlLlxuICAgIGdldE5hbWVzcGFjZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0aGlzLm5hbWVzcGFjZUF0dHJpYnV0ZV07XG4gICAgfSxcblxuICAgIC8vIEdldCB0eXBlIG9mIG1vZGVsIHBlciBjb25maWd1cmF0aW9uLlxuICAgIC8vIFNob3VsZCAqYWx3YXlzKiBiZSBob3cgdHlwZSBpcyBkZXRlcm1pbmVkIGJ5IG90aGVyIGNvZGUuXG4gICAgZ2V0VHlwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0aGlzLnR5cGVBdHRyaWJ1dGVdO1xuICAgIH0sXG5cbiAgICAvLyBBIG1vZGVsIGlzIG5ldyBpZiBpdCBoYXMgbmV2ZXIgYmVlbiBzYXZlZCB0byB0aGUgc2VydmVyLCBhbmQgbGFja3MgYW4gaWQuXG4gICAgaXNOZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SWQoKSA9PSBudWxsO1xuICAgIH0sXG5cbiAgICAvLyBnZXQgSFRNTC1lc2NhcGVkIHZhbHVlIG9mIGF0dHJpYnV0ZVxuICAgIGVzY2FwZTogZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIF8uZXNjYXBlKHRoaXMuZ2V0KGF0dHIpKTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIG1vZGVsIGlzIGN1cnJlbnRseSBpbiBhIHZhbGlkIHN0YXRlLlxuICAgIGlzVmFsaWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZSh7fSwgXy5leHRlbmQob3B0aW9ucyB8fCB7fSwgeyB2YWxpZGF0ZTogdHJ1ZSB9KSk7XG4gICAgfSxcblxuICAgIC8vIFBhcnNlIGNhbiBiZSB1c2VkIHJlbWFwL3Jlc3RydWN0dXJlL3JlbmFtZSBpbmNvbWluZyBwcm9wZXJ0aWVzXG4gICAgLy8gYmVmb3JlIHRoZXkgYXJlIGFwcGxpZWQgdG8gYXR0cmlidXRlcy5cbiAgICBwYXJzZTogZnVuY3Rpb24gKHJlc3AsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgfSxcblxuICAgIC8vIFNlcmlhbGl6ZSBpcyB0aGUgaW52ZXJzZSBvZiBgcGFyc2VgIGl0IGxldHMgeW91IG1hc3NhZ2UgZGF0YVxuICAgIC8vIG9uIHRoZSB3YXkgb3V0LiBCZWZvcmUsIHNlbmRpbmcgdG8gc2VydmVyLCBmb3IgZXhhbXBsZS5cbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuZ2V0QXR0cmlidXRlcyh7cHJvcHM6IHRydWV9LCB0cnVlKTtcbiAgICAgICAgXy5lYWNoKHRoaXMuX2NoaWxkcmVuLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmVzW2tleV0gPSB0aGlzW2tleV0uc2VyaWFsaXplKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBfLmVhY2godGhpcy5fY29sbGVjdGlvbnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXNba2V5XSA9IHRoaXNba2V5XS5zZXJpYWxpemUoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfSxcblxuICAgIC8vIE1haW4gc2V0IG1ldGhvZCB1c2VkIGJ5IGdlbmVyYXRlZCBzZXR0ZXJzL2dldHRlcnMgYW5kIGNhblxuICAgIC8vIGJlIHVzZWQgZGlyZWN0bHkgaWYgeW91IG5lZWQgdG8gcGFzcyBvcHRpb25zIG9yIHNldCBtdWx0aXBsZVxuICAgIC8vIHByb3BlcnRpZXMgYXQgb25jZS5cbiAgICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGV4dHJhUHJvcGVydGllcyA9IHRoaXMuZXh0cmFQcm9wZXJ0aWVzO1xuICAgICAgICB2YXIgdHJpZ2dlcnMgPSBbXTtcbiAgICAgICAgdmFyIGNoYW5naW5nLCBjaGFuZ2VzLCBuZXdUeXBlLCBuZXdWYWwsIGRlZiwgY2FzdCwgZXJyLCBhdHRyLFxuICAgICAgICAgICAgYXR0cnMsIGRhdGFUeXBlLCBzaWxlbnQsIHVuc2V0LCBjdXJyZW50VmFsLCBpbml0aWFsLCBoYXNDaGFuZ2VkLCBpc0VxdWFsO1xuXG4gICAgICAgIC8vIEhhbmRsZSBib3RoIGBcImtleVwiLCB2YWx1ZWAgYW5kIGB7a2V5OiB2YWx1ZX1gIC1zdHlsZSBhcmd1bWVudHMuXG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGtleSkgfHwga2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRycyA9IGtleTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dHJzID0ge307XG4gICAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgYXR0cmlidXRlcyBhbmQgb3B0aW9ucy5cbiAgICAgICAgdW5zZXQgPSBvcHRpb25zLnVuc2V0O1xuICAgICAgICBzaWxlbnQgPSBvcHRpb25zLnNpbGVudDtcbiAgICAgICAgaW5pdGlhbCA9IG9wdGlvbnMuaW5pdGlhbDtcblxuICAgICAgICBjaGFuZ2VzID0gW107XG4gICAgICAgIGNoYW5naW5nID0gdGhpcy5fY2hhbmdpbmc7XG4gICAgICAgIHRoaXMuX2NoYW5naW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBpZiBub3QgYWxyZWFkeSBjaGFuZ2luZywgc3RvcmUgcHJldmlvdXNcbiAgICAgICAgaWYgKCFjaGFuZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRm9yIGVhY2ggYHNldGAgYXR0cmlidXRlLi4uXG4gICAgICAgIGZvciAoYXR0ciBpbiBhdHRycykge1xuICAgICAgICAgICAgbmV3VmFsID0gYXR0cnNbYXR0cl07XG4gICAgICAgICAgICBuZXdUeXBlID0gdHlwZW9mIG5ld1ZhbDtcbiAgICAgICAgICAgIGN1cnJlbnRWYWwgPSB0aGlzLl92YWx1ZXNbYXR0cl07XG4gICAgICAgICAgICBkZWYgPSB0aGlzLl9kZWZpbml0aW9uW2F0dHJdO1xuXG5cbiAgICAgICAgICAgIGlmICghZGVmKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGNoaWxkIG1vZGVsIG9yIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bYXR0cl0gfHwgdGhpcy5fY29sbGVjdGlvbnNbYXR0cl0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1thdHRyXS5zZXQobmV3VmFsLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleHRyYVByb3BlcnRpZXMgPT09ICdpZ25vcmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXh0cmFQcm9wZXJ0aWVzID09PSAncmVqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBcIicgKyBhdHRyICsgJ1wiIHByb3BlcnR5IGRlZmluZWQgb24gJyArICh0aGlzLnR5cGUgfHwgJ3RoaXMnKSArICcgbW9kZWwgYW5kIGV4dHJhUHJvcGVydGllcyBub3Qgc2V0IHRvIFwiaWdub3JlXCIgb3IgXCJhbGxvd1wiJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleHRyYVByb3BlcnRpZXMgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmID0gdGhpcy5fY3JlYXRlUHJvcGVydHlEZWZpbml0aW9uKGF0dHIsICdhbnknKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4dHJhUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBleHRyYVByb3BlcnRpZXM6IFwiJyArIGV4dHJhUHJvcGVydGllcyArICdcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXNFcXVhbCA9IHRoaXMuX2dldENvbXBhcmVGb3JUeXBlKGRlZi50eXBlKTtcbiAgICAgICAgICAgIGRhdGFUeXBlID0gdGhpcy5fZGF0YVR5cGVzW2RlZi50eXBlXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdHlwZSBpZiB3ZSBoYXZlIG9uZVxuICAgICAgICAgICAgaWYgKGRhdGFUeXBlICYmIGRhdGFUeXBlLnNldCkge1xuICAgICAgICAgICAgICAgIGNhc3QgPSBkYXRhVHlwZS5zZXQobmV3VmFsKTtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjYXN0LnZhbDtcbiAgICAgICAgICAgICAgICBuZXdUeXBlID0gY2FzdC50eXBlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBkZWZpbmVkIGEgdGVzdCwgcnVuIGl0XG4gICAgICAgICAgICBpZiAoZGVmLnRlc3QpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBkZWYudGVzdC5jYWxsKHRoaXMsIG5ld1ZhbCwgbmV3VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9wZXJ0eSBcXCcnICsgYXR0ciArICdcXCcgZmFpbGVkIHZhbGlkYXRpb24gd2l0aCBlcnJvcjogJyArIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgcmVxdWlyZWQgYnV0IHVuZGVmaW5lZCwgdGhyb3cgZXJyb3IuXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgbnVsbCBhbmQgYXJlIG5vdCBhbGxvd2luZyBudWxsLCB0aHJvdyBlcnJvclxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGRlZmluZWQgdHlwZSBhbmQgdGhlIG5ldyB0eXBlIGRvZXNuJ3QgbWF0Y2gsIGFuZCB3ZSBhcmUgbm90IG51bGwsIHRocm93IGVycm9yLlxuXG4gICAgICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChuZXdWYWwpICYmIGRlZi5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVpcmVkIHByb3BlcnR5IFxcJycgKyBhdHRyICsgJ1xcJyBtdXN0IGJlIG9mIHR5cGUgJyArIGRlZi50eXBlICsgJy4gVHJpZWQgdG8gc2V0ICcgKyBuZXdWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uaXNOdWxsKG5ld1ZhbCkgJiYgZGVmLnJlcXVpcmVkICYmICFkZWYuYWxsb3dOdWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvcGVydHkgXFwnJyArIGF0dHIgKyAnXFwnIG11c3QgYmUgb2YgdHlwZSAnICsgZGVmLnR5cGUgKyAnIChjYW5ub3QgYmUgbnVsbCkuIFRyaWVkIHRvIHNldCAnICsgbmV3VmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoZGVmLnR5cGUgJiYgZGVmLnR5cGUgIT09ICdhbnknICYmIGRlZi50eXBlICE9PSBuZXdUeXBlKSAmJiAhXy5pc051bGwobmV3VmFsKSAmJiAhXy5pc1VuZGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvcGVydHkgXFwnJyArIGF0dHIgKyAnXFwnIG11c3QgYmUgb2YgdHlwZSAnICsgZGVmLnR5cGUgKyAnLiBUcmllZCB0byBzZXQgJyArIG5ld1ZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVmLnZhbHVlcyAmJiAhXy5jb250YWlucyhkZWYudmFsdWVzLCBuZXdWYWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvcGVydHkgXFwnJyArIGF0dHIgKyAnXFwnIG11c3QgYmUgb25lIG9mIHZhbHVlczogJyArIGRlZi52YWx1ZXMuam9pbignLCAnKSArICcuIFRyaWVkIHRvIHNldCAnICsgbmV3VmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGFzQ2hhbmdlZCA9ICFpc0VxdWFsKGN1cnJlbnRWYWwsIG5ld1ZhbCwgYXR0cik7XG5cbiAgICAgICAgICAgIC8vIGVuZm9yY2UgYHNldE9uY2VgIGZvciBwcm9wZXJ0aWVzIGlmIHNldFxuICAgICAgICAgICAgaWYgKGRlZi5zZXRPbmNlICYmIGN1cnJlbnRWYWwgIT09IHVuZGVmaW5lZCAmJiBoYXNDaGFuZ2VkICYmICFpbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvcGVydHkgXFwnJyArIGF0dHIgKyAnXFwnIGNhbiBvbmx5IGJlIHNldCBvbmNlLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGNoYW5nZWQgYXR0cmlidXRlc1xuICAgICAgICAgICAgLy8gYW5kIHB1c2ggdG8gY2hhbmdlcyBhcnJheVxuICAgICAgICAgICAgaWYgKGhhc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VzLnB1c2goe3ByZXY6IGN1cnJlbnRWYWwsIHZhbDogbmV3VmFsLCBrZXk6IGF0dHJ9KTtcbiAgICAgICAgICAgICAgICBzZWxmLl9jaGFuZ2VkW2F0dHJdID0gbmV3VmFsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZi5fY2hhbmdlZFthdHRyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdHVhbGx5IHVwZGF0ZSBvdXIgdmFsdWVzXG4gICAgICAgIF8uZWFjaChjaGFuZ2VzLCBmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgICAgICBzZWxmLl9wcmV2aW91c0F0dHJpYnV0ZXNbY2hhbmdlLmtleV0gPSBjaGFuZ2UucHJldjtcbiAgICAgICAgICAgIGlmICh1bnNldCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLl92YWx1ZXNbY2hhbmdlLmtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuX3ZhbHVlc1tjaGFuZ2Uua2V5XSA9IGNoYW5nZS52YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc2lsZW50ICYmIGNoYW5nZXMubGVuZ3RoKSBzZWxmLl9wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIF8uZWFjaChjaGFuZ2VzLCBmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50cmlnZ2VyKCdjaGFuZ2U6JyArIGNoYW5nZS5rZXksIHNlbGYsIGNoYW5nZS52YWwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBZb3UgbWlnaHQgYmUgd29uZGVyaW5nIHdoeSB0aGVyZSdzIGEgYHdoaWxlYCBsb29wIGhlcmUuIENoYW5nZXMgY2FuXG4gICAgICAgIC8vIGJlIHJlY3Vyc2l2ZWx5IG5lc3RlZCB3aXRoaW4gYFwiY2hhbmdlXCJgIGV2ZW50cy5cbiAgICAgICAgaWYgKGNoYW5naW5nKSByZXR1cm4gdGhpcztcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9wZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFuZ2luZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0OiBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICByZXR1cm4gdGhpc1thdHRyXTtcbiAgICB9LFxuXG4gICAgLy8gVG9nZ2xlIGJvb2xlYW4gcHJvcGVydGllcyBvciBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBhIGB2YWx1ZXNgXG4gICAgLy8gYXJyYXkgaW4gaXRzIGRlZmluaXRpb24uXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgdmFyIGRlZiA9IHRoaXMuX2RlZmluaXRpb25bcHJvcGVydHldO1xuICAgICAgICBpZiAoZGVmLnR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBhIGJvb2wsIGp1c3QgZmxpcCBpdFxuICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV0gPSAhdGhpc1twcm9wZXJ0eV07XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmICYmIGRlZi52YWx1ZXMpIHtcbiAgICAgICAgICAgIC8vIElmIGl0J3MgYSBwcm9wZXJ0eSB3aXRoIGFuIGFycmF5IG9mIHZhbHVlc1xuICAgICAgICAgICAgLy8gc2tpcCB0byB0aGUgbmV4dCBvbmUgbG9vcGluZyBiYWNrIGlmIGF0IGVuZC5cbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gYXJyYXlOZXh0KGRlZi52YWx1ZXMsIHRoaXNbcHJvcGVydHldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBvbmx5IHRvZ2dsZSBwcm9wZXJ0aWVzIHRoYXQgYXJlIHR5cGUgYGJvb2xlYW5gIG9yIGhhdmUgYHZhbHVlc2AgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEdldCBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIG1vZGVsIGF0IHRoZSB0aW1lIG9mIHRoZSBwcmV2aW91c1xuICAgIC8vIGBcImNoYW5nZVwiYCBldmVudC5cbiAgICBwcmV2aW91c0F0dHJpYnV0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF8uY2xvbmUodGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzKTtcbiAgICB9LFxuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBtb2RlbCBoYXMgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBgXCJjaGFuZ2VcImAgZXZlbnQuXG4gICAgLy8gSWYgeW91IHNwZWNpZnkgYW4gYXR0cmlidXRlIG5hbWUsIGRldGVybWluZSBpZiB0aGF0IGF0dHJpYnV0ZSBoYXMgY2hhbmdlZC5cbiAgICBoYXNDaGFuZ2VkOiBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICBpZiAoYXR0ciA9PSBudWxsKSByZXR1cm4gIV8uaXNFbXB0eSh0aGlzLl9jaGFuZ2VkKTtcbiAgICAgICAgcmV0dXJuIF8uaGFzKHRoaXMuX2NoYW5nZWQsIGF0dHIpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBhdHRyaWJ1dGVzIHRoYXQgaGF2ZSBjaGFuZ2VkLCBvclxuICAgIC8vIGZhbHNlIGlmIHRoZXJlIGFyZSBubyBjaGFuZ2VkIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3IgZGV0ZXJtaW5pbmcgd2hhdFxuICAgIC8vIHBhcnRzIG9mIGEgdmlldyBuZWVkIHRvIGJlIHVwZGF0ZWQgYW5kL29yIHdoYXQgYXR0cmlidXRlcyBuZWVkIHRvIGJlXG4gICAgLy8gcGVyc2lzdGVkIHRvIHRoZSBzZXJ2ZXIuIFVuc2V0IGF0dHJpYnV0ZXMgd2lsbCBiZSBzZXQgdG8gdW5kZWZpbmVkLlxuICAgIC8vIFlvdSBjYW4gYWxzbyBwYXNzIGFuIGF0dHJpYnV0ZXMgb2JqZWN0IHRvIGRpZmYgYWdhaW5zdCB0aGUgbW9kZWwsXG4gICAgLy8gZGV0ZXJtaW5pbmcgaWYgdGhlcmUgKndvdWxkIGJlKiBhIGNoYW5nZS5cbiAgICBjaGFuZ2VkQXR0cmlidXRlczogZnVuY3Rpb24gKGRpZmYpIHtcbiAgICAgICAgaWYgKCFkaWZmKSByZXR1cm4gdGhpcy5oYXNDaGFuZ2VkKCkgPyBfLmNsb25lKHRoaXMuX2NoYW5nZWQpIDogZmFsc2U7XG4gICAgICAgIHZhciB2YWwsIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2NoYW5naW5nID8gdGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzIDogdGhpcy5hdHRyaWJ1dGVzO1xuICAgICAgICB2YXIgZGVmLCBpc0VxdWFsO1xuICAgICAgICBmb3IgKHZhciBhdHRyIGluIGRpZmYpIHtcbiAgICAgICAgICAgIGRlZiA9IHRoaXMuX2RlZmluaXRpb25bYXR0cl07XG4gICAgICAgICAgICBpZiAoIWRlZikgY29udGludWU7XG4gICAgICAgICAgICBpc0VxdWFsID0gdGhpcy5fZ2V0Q29tcGFyZUZvclR5cGUoZGVmLnR5cGUpO1xuICAgICAgICAgICAgaWYgKGlzRXF1YWwob2xkW2F0dHJdLCAodmFsID0gZGlmZlthdHRyXSkpKSBjb250aW51ZTtcbiAgICAgICAgICAgIChjaGFuZ2VkIHx8IChjaGFuZ2VkID0ge30pKVthdHRyXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9LFxuXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcmlhbGl6ZSgpO1xuICAgIH0sXG5cbiAgICB1bnNldDogZnVuY3Rpb24gKGF0dHIsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRlZiA9IHRoaXMuX2RlZmluaXRpb25bYXR0cl07XG4gICAgICAgIHZhciB0eXBlID0gZGVmLnR5cGU7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIGlmIChkZWYucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhbCA9IF8ucmVzdWx0KGRlZiwgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldChhdHRyLCB2YWwsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KGF0dHIsIHZhbCwgXy5leHRlbmQoe30sIG9wdGlvbnMsIHt1bnNldDogdHJ1ZX0pKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBfLmVhY2goXy5rZXlzKHRoaXMuYXR0cmlidXRlcyksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHNlbGYudW5zZXQoa2V5LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBwcmV2aW91czogZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgaWYgKGF0dHIgPT0gbnVsbCB8fCAhT2JqZWN0LmtleXModGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzKS5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzW2F0dHJdO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgZGVmYXVsdCB2YWx1ZXMgZm9yIGEgY2VydGFpbiB0eXBlXG4gICAgX2dldERlZmF1bHRGb3JUeXBlOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgZGF0YVR5cGUgPSB0aGlzLl9kYXRhVHlwZXNbdHlwZV07XG4gICAgICAgIHJldHVybiBkYXRhVHlwZSAmJiBkYXRhVHlwZS5kZWZhdWx0O1xuICAgIH0sXG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggY29tcGFyaXNvbiBhbGdvcml0aG0gdG8gdXNlIGZvciBjb21wYXJpbmcgYSBwcm9wZXJ0eVxuICAgIF9nZXRDb21wYXJlRm9yVHlwZTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIGRhdGFUeXBlID0gdGhpcy5fZGF0YVR5cGVzW3R5cGVdO1xuICAgICAgICBpZiAoZGF0YVR5cGUgJiYgZGF0YVR5cGUuY29tcGFyZSkgcmV0dXJuIF8uYmluZChkYXRhVHlwZS5jb21wYXJlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIF8uaXNFcXVhbDtcbiAgICB9LFxuXG4gICAgLy8gUnVuIHZhbGlkYXRpb24gYWdhaW5zdCB0aGUgbmV4dCBjb21wbGV0ZSBzZXQgb2YgbW9kZWwgYXR0cmlidXRlcyxcbiAgICAvLyByZXR1cm5pbmcgYHRydWVgIGlmIGFsbCBpcyB3ZWxsLiBPdGhlcndpc2UsIGZpcmUgYW4gYFwiaW52YWxpZFwiYCBldmVudC5cbiAgICBfdmFsaWRhdGU6IGZ1bmN0aW9uIChhdHRycywgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGUgfHwgIXRoaXMudmFsaWRhdGUpIHJldHVybiB0cnVlO1xuICAgICAgICBhdHRycyA9IF8uZXh0ZW5kKHt9LCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHJzKTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy52YWxpZGF0aW9uRXJyb3IgPSB0aGlzLnZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSB8fCBudWxsO1xuICAgICAgICBpZiAoIWVycm9yKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdpbnZhbGlkJywgdGhpcywgZXJyb3IsIF8uZXh0ZW5kKG9wdGlvbnMgfHwge30sIHt2YWxpZGF0aW9uRXJyb3I6IGVycm9yfSkpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIF9jcmVhdGVQcm9wZXJ0eURlZmluaXRpb246IGZ1bmN0aW9uIChuYW1lLCBkZXNjLCBpc1Nlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVmaW5pdGlvbih0aGlzLCBuYW1lLCBkZXNjLCBpc1Nlc3Npb24pO1xuICAgIH0sXG5cbiAgICAvLyBqdXN0IG1ha2VzIGZyaWVuZGxpZXIgZXJyb3JzIHdoZW4gdHJ5aW5nIHRvIGRlZmluZSBhIG5ldyBtb2RlbFxuICAgIC8vIG9ubHkgdXNlZCB3aGVuIHNldHRpbmcgdXAgb3JpZ2luYWwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICBfZW5zdXJlVmFsaWRUeXBlOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICByZXR1cm4gXy5jb250YWlucyhbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsICdhcnJheScsICdvYmplY3QnLCAnZGF0ZScsICdhbnknXS5jb25jYXQoXy5rZXlzKHRoaXMuX2RhdGFUeXBlcykpLCB0eXBlKSA/IHR5cGUgOiB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIGdldEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChvcHRpb25zLCByYXcpIHtcbiAgICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgICAgXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICAgICAgICBzZXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BzOiBmYWxzZSxcbiAgICAgICAgICAgIGRlcml2ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgIHZhciB2YWwsIGl0ZW0sIGRlZjtcbiAgICAgICAgZm9yIChpdGVtIGluIHRoaXMuX2RlZmluaXRpb24pIHtcbiAgICAgICAgICAgIGRlZiA9IHRoaXMuX2RlZmluaXRpb25baXRlbV07XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMuc2Vzc2lvbiAmJiBkZWYuc2Vzc2lvbikgfHwgKG9wdGlvbnMucHJvcHMgJiYgIWRlZi5zZXNzaW9uKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IChyYXcpID8gdGhpcy5fdmFsdWVzW2l0ZW1dIDogdGhpc1tpdGVtXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHZhbCA9IF8ucmVzdWx0KGRlZiwgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHJlc1tpdGVtXSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kZXJpdmVkKSB7XG4gICAgICAgICAgICBmb3IgKGl0ZW0gaW4gdGhpcy5fZGVyaXZlZCkgcmVzW2l0ZW1dID0gdGhpc1tpdGVtXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG5cbiAgICBfaW5pdERlcml2ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIF8uZWFjaCh0aGlzLl9kZXJpdmVkLCBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBkZWYgPSBzZWxmLl9kZXJpdmVkW25hbWVdO1xuICAgICAgICAgICAgZGVmLmRlcHMgPSBkZWYuZGVwTGlzdDtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gZGVmLmZuLmNhbGwoc2VsZik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fY2FjaGVbbmFtZV0gIT09IG5ld1ZhbCB8fCAhZGVmLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWYuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ByZXZpb3VzQXR0cmlidXRlc1tuYW1lXSA9IHNlbGYuX2NhY2hlW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NhY2hlW25hbWVdID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyaWdnZXIoJ2NoYW5nZTonICsgbmFtZSwgc2VsZiwgc2VsZi5fY2FjaGVbbmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlZi5kZXBzLmZvckVhY2goZnVuY3Rpb24gKHByb3BTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9rZXlUcmVlLmFkZChwcm9wU3RyaW5nLCB1cGRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub24oJ2FsbCcsIGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VSRS50ZXN0KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9rZXlUcmVlLmdldChldmVudE5hbWUuc3BsaXQoJzonKVsxXSkuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9nZXREZXJpdmVkUHJvcGVydHk6IGZ1bmN0aW9uIChuYW1lLCBmbHVzaENhY2hlKSB7XG4gICAgICAgIC8vIGlzIHRoaXMgYSBkZXJpdmVkIHByb3BlcnR5IHRoYXQgaXMgY2FjaGVkXG4gICAgICAgIGlmICh0aGlzLl9kZXJpdmVkW25hbWVdLmNhY2hlKSB7XG4gICAgICAgICAgICAvL3NldCBpZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lLCBvciBmbHVzaENhY2hlIGlzIHNldFxuICAgICAgICAgICAgaWYgKGZsdXNoQ2FjaGUgfHwgIXRoaXMuX2NhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVbbmFtZV0gPSB0aGlzLl9kZXJpdmVkW25hbWVdLmZuLmFwcGx5KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW25hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rlcml2ZWRbbmFtZV0uZm4uYXBwbHkodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXRDb2xsZWN0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbDtcbiAgICAgICAgaWYgKCF0aGlzLl9jb2xsZWN0aW9ucykgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbGwgaW4gdGhpcy5fY29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXNbY29sbF0gPSBuZXcgdGhpcy5fY29sbGVjdGlvbnNbY29sbF0obnVsbCwge3BhcmVudDogdGhpc30pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0Q2hpbGRyZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkO1xuICAgICAgICBpZiAoIXRoaXMuX2NoaWxkcmVuKSByZXR1cm47XG4gICAgICAgIGZvciAoY2hpbGQgaW4gdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXNbY2hpbGRdID0gbmV3IHRoaXMuX2NoaWxkcmVuW2NoaWxkXSh7fSwge3BhcmVudDogdGhpc30pO1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzW2NoaWxkXSwgJ2FsbCcsIHRoaXMuX2dldEV2ZW50QnViYmxpbmdIYW5kbGVyKGNoaWxkKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUmV0dXJucyBhIGJvdW5kIGhhbmRsZXIgZm9yIGRvaW5nIGV2ZW50IGJ1YmJsaW5nIHdoaWxlXG4gICAgLy8gYWRkaW5nIGEgbmFtZSB0byB0aGUgY2hhbmdlIHN0cmluZy5cbiAgICBfZ2V0RXZlbnRCdWJibGluZ0hhbmRsZXI6IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF8uYmluZChmdW5jdGlvbiAobmFtZSwgbW9kZWwsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlOicgKyBwcm9wZXJ0eU5hbWUgKyAnLicgKyBuYW1lLnNwbGl0KCc6JylbMV0sIG1vZGVsLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8vIENoZWNrIHRoYXQgYWxsIHJlcXVpcmVkIGF0dHJpYnV0ZXMgYXJlIHByZXNlbnRcbiAgICBfdmVyaWZ5UmVxdWlyZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVzOyAvLyBzaG91bGQgaW5jbHVkZSBzZXNzaW9uXG4gICAgICAgIGZvciAodmFyIGRlZiBpbiB0aGlzLl9kZWZpbml0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGVmaW5pdGlvbltkZWZdLnJlcXVpcmVkICYmIHR5cGVvZiBhdHRyc1tkZWZdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcblxuLy8gZ2V0dGVyIGZvciBhdHRyaWJ1dGVzXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCYXNlLnByb3RvdHlwZSwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGVzKHtwcm9wczogdHJ1ZSwgc2Vzc2lvbjogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhbGw6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByb3BzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlcml2ZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpc1N0YXRlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7IH1cbiAgICB9XG59KTtcblxuLy8gaGVscGVyIGZvciBjcmVhdGluZy9zdG9yaW5nIHByb3BlcnR5IGRlZmluaXRpb25zIGFuZCBjcmVhdGluZ1xuLy8gYXBwcm9wcmlhdGUgZ2V0dGVycy9zZXR0ZXJzXG5mdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eURlZmluaXRpb24ob2JqZWN0LCBuYW1lLCBkZXNjLCBpc1Nlc3Npb24pIHtcbiAgICB2YXIgZGVmID0gb2JqZWN0Ll9kZWZpbml0aW9uW25hbWVdID0ge307XG4gICAgdmFyIHR5cGUsIGRlc2NBcnJheTtcblxuICAgIGlmIChfLmlzU3RyaW5nKGRlc2MpKSB7XG4gICAgICAgIC8vIGdyYWIgb3VyIHR5cGUgaWYgYWxsIHdlJ3ZlIGdvdCBpcyBhIHN0cmluZ1xuICAgICAgICB0eXBlID0gb2JqZWN0Ll9lbnN1cmVWYWxpZFR5cGUoZGVzYyk7XG4gICAgICAgIGlmICh0eXBlKSBkZWYudHlwZSA9IHR5cGU7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICAvL1RyYW5zZm9ybSBhcnJheSBvZiBbJ3R5cGUnLCByZXF1aXJlZCwgZGVmYXVsdF0gdG8gb2JqZWN0IGZvcm1cbiAgICAgICAgaWYgKF8uaXNBcnJheShkZXNjKSkge1xuICAgICAgICAgICAgZGVzY0FycmF5ID0gZGVzYztcbiAgICAgICAgICAgIGRlc2MgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogZGVzY0FycmF5WzBdLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBkZXNjQXJyYXlbMV0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZGVzY0FycmF5WzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdHlwZSA9IG9iamVjdC5fZW5zdXJlVmFsaWRUeXBlKGRlc2MudHlwZSk7XG4gICAgICAgIGlmICh0eXBlKSBkZWYudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgaWYgKGRlc2MucmVxdWlyZWQpIGRlZi5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGRlc2MuZGVmYXVsdCAmJiB0eXBlb2YgZGVzYy5kZWZhdWx0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGRlZmF1bHQgdmFsdWUgZm9yICcgKyBuYW1lICsgJyBjYW5ub3QgYmUgYW4gb2JqZWN0L2FycmF5LCBtdXN0IGJlIGEgdmFsdWUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgdmFsdWUvb2JqZWN0L2FycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmLmRlZmF1bHQgPSBkZXNjLmRlZmF1bHQ7XG5cbiAgICAgICAgZGVmLmFsbG93TnVsbCA9IGRlc2MuYWxsb3dOdWxsID8gZGVzYy5hbGxvd051bGwgOiBmYWxzZTtcbiAgICAgICAgaWYgKGRlc2Muc2V0T25jZSkgZGVmLnNldE9uY2UgPSB0cnVlO1xuICAgICAgICBpZiAoZGVmLnJlcXVpcmVkICYmIF8uaXNVbmRlZmluZWQoZGVmLmRlZmF1bHQpICYmICFkZWYuc2V0T25jZSkgZGVmLmRlZmF1bHQgPSBvYmplY3QuX2dldERlZmF1bHRGb3JUeXBlKHR5cGUpO1xuICAgICAgICBkZWYudGVzdCA9IGRlc2MudGVzdDtcbiAgICAgICAgZGVmLnZhbHVlcyA9IGRlc2MudmFsdWVzO1xuICAgIH1cbiAgICBpZiAoaXNTZXNzaW9uKSBkZWYuc2Vzc2lvbiA9IHRydWU7XG5cbiAgICAvLyBkZWZpbmUgYSBnZXR0ZXIvc2V0dGVyIG9uIHRoZSBwcm90b3R5cGVcbiAgICAvLyBidXQgdGhleSBnZXQvc2V0IG9uIHRoZSBpbnN0YW5jZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLnNldChuYW1lLCB2YWwpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl92YWx1ZXNbbmFtZV07XG4gICAgICAgICAgICB2YXIgdHlwZURlZiA9IHRoaXMuX2RhdGFUeXBlc1tkZWYudHlwZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZURlZiAmJiB0eXBlRGVmLmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0eXBlRGVmLmdldChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gXy5yZXN1bHQoZGVmLCAnZGVmYXVsdCcpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzW25hbWVdID0gcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlZjtcbn1cblxuLy8gaGVscGVyIGZvciBjcmVhdGluZyBkZXJpdmVkIHByb3BlcnR5IGRlZmluaXRpb25zXG5mdW5jdGlvbiBjcmVhdGVEZXJpdmVkUHJvcGVydHkobW9kZWxQcm90bywgbmFtZSwgZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWYgPSBtb2RlbFByb3RvLl9kZXJpdmVkW25hbWVdID0ge1xuICAgICAgICBmbjogXy5pc0Z1bmN0aW9uKGRlZmluaXRpb24pID8gZGVmaW5pdGlvbiA6IGRlZmluaXRpb24uZm4sXG4gICAgICAgIGNhY2hlOiAoZGVmaW5pdGlvbi5jYWNoZSAhPT0gZmFsc2UpLFxuICAgICAgICBkZXBMaXN0OiBkZWZpbml0aW9uLmRlcHMgfHwgW11cbiAgICB9O1xuXG4gICAgLy8gYWRkIHRvIG91ciBzaGFyZWQgZGVwZW5kZW5jeSBsaXN0XG4gICAgXy5lYWNoKGRlZi5kZXBMaXN0LCBmdW5jdGlvbiAoZGVwKSB7XG4gICAgICAgIG1vZGVsUHJvdG8uX2RlcHNbZGVwXSA9IF8obW9kZWxQcm90by5fZGVwc1tkZXBdIHx8IFtdKS51bmlvbihbbmFtZV0pO1xuICAgIH0pO1xuXG4gICAgLy8gZGVmaW5lZCBhIHRvcC1sZXZlbCBnZXR0ZXIgZm9yIGRlcml2ZWQgbmFtZXNcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWxQcm90bywgbmFtZSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXREZXJpdmVkUHJvcGVydHkobmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCInICsgbmFtZSArICdcIiBpcyBhIGRlcml2ZWQgcHJvcGVydHksIGl0IGNhblxcJ3QgYmUgc2V0IGRpcmVjdGx5LicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbnZhciBkYXRhVHlwZXMgPSB7XG4gICAgc3RyaW5nOiB7XG4gICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGF0ZToge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgIHZhciBuZXdUeXBlO1xuICAgICAgICAgICAgaWYgKCFfLmlzRGF0ZShuZXdWYWwpKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVWYWwgPSBuZXcgRGF0ZShuZXdWYWwpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGVWYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbmV3VmFsIGNhbnQgYmUgcGFyc2VkLCB0aGVuIHRyeSBwYXJzZUludCBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVZhbCA9IG5ldyBEYXRlKHBhcnNlSW50KG5ld1ZhbCwgMTApKS52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZVZhbCkpIHRocm93IFR5cGVFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSBkYXRlVmFsO1xuICAgICAgICAgICAgICAgICAgICBuZXdUeXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VHlwZSA9IHR5cGVvZiBuZXdWYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdUeXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IG5ld1ZhbC52YWx1ZU9mKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbDogbmV3VmFsLFxuICAgICAgICAgICAgICAgIHR5cGU6IG5ld1R5cGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhcnJheToge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsOiBuZXdWYWwsXG4gICAgICAgICAgICAgICAgdHlwZTogXy5pc0FycmF5KG5ld1ZhbCkgPyAnYXJyYXknIDogdHlwZW9mIG5ld1ZhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvYmplY3Q6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICB2YXIgbmV3VHlwZSA9IHR5cGVvZiBuZXdWYWw7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGhhdmUgYSB3YXkgb2Ygc3VwcG9ydGluZyBcIm1pc3NpbmdcIiBvYmplY3RzLlxuICAgICAgICAgICAgLy8gTnVsbCBpcyBhbiBvYmplY3QsIGJ1dCBzZXR0aW5nIGEgdmFsdWUgdG8gdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyBzaG91bGQgd29yayB0b28sIElNTy4gV2UganVzdCBvdmVycmlkZSBpdCwgaW4gdGhhdCBjYXNlLlxuICAgICAgICAgICAgaWYgKG5ld1R5cGUgIT09ICdvYmplY3QnICYmIF8uaXNVbmRlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbmV3VHlwZSA9ICdvYmplY3QnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWw6IG5ld1ZhbCxcbiAgICAgICAgICAgICAgICB0eXBlOiBuZXdUeXBlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIHRoZSBgc3RhdGVgIGRhdGEgdHlwZSBpcyBhIGJpdCBzcGVjaWFsIGluIHRoYXQgc2V0dGluZyBpdCBzaG91bGRcbiAgICAvLyBhbHNvIGJ1YmJsZSBldmVudHNcbiAgICBzdGF0ZToge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgIHZhciBpc0luc3RhbmNlID0gbmV3VmFsIGluc3RhbmNlb2YgQmFzZSB8fCAobmV3VmFsICYmIG5ld1ZhbC5pc1N0YXRlKTtcbiAgICAgICAgICAgIGlmIChpc0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiBuZXdWYWwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdGF0ZSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6IG5ld1ZhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZW9mIG5ld1ZhbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uIChjdXJyZW50VmFsLCBuZXdWYWwsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBpc1NhbWUgPSBjdXJyZW50VmFsID09PSBuZXdWYWw7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaGFzIGNoYW5nZWQgd2Ugd2FudCB0byBhbHNvIGhhbmRsZVxuICAgICAgICAgICAgLy8gZXZlbnQgcHJvcGFnYXRpb25cbiAgICAgICAgICAgIGlmICghaXNTYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKGN1cnJlbnRWYWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlblRvKG5ld1ZhbCwgJ2FsbCcsIHRoaXMuX2dldEV2ZW50QnViYmxpbmdIYW5kbGVyKGF0dHJpYnV0ZU5hbWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpc1NhbWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyB0aGUgZXh0ZW5kIG1ldGhvZCB1c2VkIHRvIGV4dGVuZCBwcm90b3R5cGVzLCBtYWludGFpbiBpbmhlcml0YW5jZSBjaGFpbnMgZm9yIGluc3RhbmNlb2Zcbi8vIGFuZCBhbGxvdyBmb3IgYWRkaXRpb25zIHRvIHRoZSBtb2RlbCBkZWZpbml0aW9ucy5cbmZ1bmN0aW9uIGV4dGVuZChwcm90b1Byb3BzKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBwcm9wLCBpdGVtO1xuXG4gICAgLy8gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgbmV3IHN1YmNsYXNzIGlzIGVpdGhlciBkZWZpbmVkIGJ5IHlvdVxuICAgIC8vICh0aGUgXCJjb25zdHJ1Y3RvclwiIHByb3BlcnR5IGluIHlvdXIgYGV4dGVuZGAgZGVmaW5pdGlvbiksIG9yIGRlZmF1bHRlZFxuICAgIC8vIGJ5IHVzIHRvIHNpbXBseSBjYWxsIHRoZSBwYXJlbnQncyBjb25zdHJ1Y3Rvci5cbiAgICBpZiAocHJvdG9Qcm9wcyAmJiBwcm90b1Byb3BzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XG4gICAgICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBBZGQgc3RhdGljIHByb3BlcnRpZXMgdG8gdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZyb20gcGFyZW50XG4gICAgXy5leHRlbmQoY2hpbGQsIHBhcmVudCk7XG5cbiAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBjaGFpbiB0byBpbmhlcml0IGZyb20gYHBhcmVudGAsIHdpdGhvdXQgY2FsbGluZ1xuICAgIC8vIGBwYXJlbnRgJ3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgdmFyIFN1cnJvZ2F0ZSA9IGZ1bmN0aW9uICgpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9O1xuICAgIFN1cnJvZ2F0ZS5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBTdXJyb2dhdGUoKTtcblxuICAgIC8vIHNldCBwcm90b3R5cGUgbGV2ZWwgb2JqZWN0c1xuICAgIGNoaWxkLnByb3RvdHlwZS5fZGVyaXZlZCA9ICBfLmV4dGVuZCh7fSwgcGFyZW50LnByb3RvdHlwZS5fZGVyaXZlZCk7XG4gICAgY2hpbGQucHJvdG90eXBlLl9kZXBzID0gXy5leHRlbmQoe30sIHBhcmVudC5wcm90b3R5cGUuX2RlcHMpO1xuICAgIGNoaWxkLnByb3RvdHlwZS5fZGVmaW5pdGlvbiA9IF8uZXh0ZW5kKHt9LCBwYXJlbnQucHJvdG90eXBlLl9kZWZpbml0aW9uKTtcbiAgICBjaGlsZC5wcm90b3R5cGUuX2NvbGxlY3Rpb25zID0gXy5leHRlbmQoe30sIHBhcmVudC5wcm90b3R5cGUuX2NvbGxlY3Rpb25zKTtcbiAgICBjaGlsZC5wcm90b3R5cGUuX2NoaWxkcmVuID0gXy5leHRlbmQoe30sIHBhcmVudC5wcm90b3R5cGUuX2NoaWxkcmVuKTtcbiAgICBjaGlsZC5wcm90b3R5cGUuX2RhdGFUeXBlcyA9IF8uZXh0ZW5kKHt9LCBwYXJlbnQucHJvdG90eXBlLl9kYXRhVHlwZXMgfHwgZGF0YVR5cGVzKTtcblxuICAgIC8vIE1peCBpbiBhbGwgcHJvdG90eXBlIHByb3BlcnRpZXMgdG8gdGhlIHN1YmNsYXNzIGlmIHN1cHBsaWVkLlxuICAgIGlmIChwcm90b1Byb3BzKSB7XG4gICAgICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiBwcm9jZXNzQXJnKGRlZikge1xuICAgICAgICAgICAgdmFyIG9taXRGcm9tRXh0ZW5kID0gW1xuICAgICAgICAgICAgICAgICdkYXRhVHlwZXMnLCAncHJvcHMnLCAnc2Vzc2lvbicsICdkZXJpdmVkJywgJ2NvbGxlY3Rpb25zJywgJ2NoaWxkcmVuJ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChkZWYuZGF0YVR5cGVzKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRlZi5kYXRhVHlwZXMsIGZ1bmN0aW9uIChkZWYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucHJvdG90eXBlLl9kYXRhVHlwZXNbbmFtZV0gPSBkZWY7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVmLnByb3BzKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRlZi5wcm9wcywgZnVuY3Rpb24gKGRlZiwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVQcm9wZXJ0eURlZmluaXRpb24oY2hpbGQucHJvdG90eXBlLCBuYW1lLCBkZWYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZi5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRlZi5zZXNzaW9uLCBmdW5jdGlvbiAoZGVmLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVByb3BlcnR5RGVmaW5pdGlvbihjaGlsZC5wcm90b3R5cGUsIG5hbWUsIGRlZiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVmLmRlcml2ZWQpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goZGVmLmRlcml2ZWQsIGZ1bmN0aW9uIChkZWYsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGVyaXZlZFByb3BlcnR5KGNoaWxkLnByb3RvdHlwZSwgbmFtZSwgZGVmKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWYuY29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goZGVmLmNvbGxlY3Rpb25zLCBmdW5jdGlvbiAoY29uc3RydWN0b3IsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucHJvdG90eXBlLl9jb2xsZWN0aW9uc1tuYW1lXSA9IGNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZi5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIF8uZWFjaChkZWYuY2hpbGRyZW4sIGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wcm90b3R5cGUuX2NoaWxkcmVuW25hbWVdID0gY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLmV4dGVuZChjaGlsZC5wcm90b3R5cGUsIF8ub21pdChkZWYsIG9taXRGcm9tRXh0ZW5kKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbiAgICAvLyBTZXQgYSBjb252ZW5pZW5jZSBwcm9wZXJ0eSBpbiBjYXNlIHRoZSBwYXJlbnQncyBwcm90b3R5cGUgaXMgbmVlZGVkXG4gICAgLy8gbGF0ZXIuXG4gICAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcblxuICAgIHJldHVybiBjaGlsZDtcbn1cblxuQmFzZS5leHRlbmQgPSBleHRlbmQ7XG5cbi8vIE91ciBtYWluIGV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gQmFzZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlOZXh0KGFycmF5LCBjdXJyZW50SXRlbSkge1xuICAgIHZhciBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIG5ld0luZGV4ID0gYXJyYXkuaW5kZXhPZihjdXJyZW50SXRlbSkgKyAxO1xuICAgIGlmIChuZXdJbmRleCA+IChsZW4gLSAxKSkgbmV3SW5kZXggPSAwO1xuICAgIHJldHVybiBhcnJheVtuZXdJbmRleF07XG59O1xuIiwiZnVuY3Rpb24gS2V5VHJlZVN0b3JlKCkge1xuICAgIHRoaXMuc3RvcmFnZSA9IHt9O1xufVxuXG4vLyBhZGQgYW4gb2JqZWN0IHRvIHRoZSBzdG9yZVxuS2V5VHJlZVN0b3JlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoa2V5cGF0aCwgb2JqKSB7XG4gICAgdmFyIGFyciA9IHRoaXMuc3RvcmFnZVtrZXlwYXRoXSB8fCAodGhpcy5zdG9yYWdlW2tleXBhdGhdID0gW10pO1xuICAgIGFyci5wdXNoKG9iaik7XG59O1xuXG4vLyByZW1vdmUgYW4gb2JqZWN0XG5LZXlUcmVlU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgcGF0aCwgYXJyO1xuICAgIGZvciAocGF0aCBpbiB0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgYXJyID0gdGhpcy5zdG9yYWdlW3BhdGhdO1xuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBvYmopIHtcbiAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLy8gZ3JhYiBhbGwgcmVsZXZhbnQgb2JqZWN0c1xuS2V5VHJlZVN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICB2YXIga2V5O1xuXG4gICAgZm9yIChrZXkgaW4gdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIGlmIChrZXlwYXRoID09PSBrZXkgfHwga2V5LmluZGV4T2Yoa2V5cGF0aCArICcuJykgPT09IDApIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5jb25jYXQodGhpcy5zdG9yYWdlW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5VHJlZVN0b3JlO1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJ1xufTtcblxuXG5pbnRlcm5hbHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4KSB7XG5cbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgcmV0dXJuIFtlbmNvZGVVUklDb21wb25lbnQocHJlZml4KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmopXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBwcmVmaXggKyAnWycgKyBrZXkgKyAnXScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgZGVsaW1pdGVyKSB7XG5cbiAgICBkZWxpbWl0ZXIgPSB0eXBlb2YgZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGludGVybmFscy5kZWxpbWl0ZXIgOiBkZWxpbWl0ZXI7XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBrZXkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge307XG5cblxuZXhwb3J0cy5hcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLmNsb25lID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8XG4gICAgICAgIHNvdXJjZSA9PT0gbnVsbCkge1xuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuXG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgb2JqID0gQXJyYXkuaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcbiAgICBmb3IgKHZhciBpIGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBleHBvcnRzLmNsb25lKHNvdXJjZVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHZhciBvYmogPSBleHBvcnRzLmNsb25lKHRhcmdldCk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2ldID0gZXhwb3J0cy5tZXJnZShvYmpbaV0sIHNvdXJjZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IGV4cG9ydHMuYXJyYXlUb09iamVjdChvYmopO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICBmb3IgKHZhciBrID0gMCwga2wgPSBrZXlzLmxlbmd0aDsgayA8IGtsOyArK2spIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNba107XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICBpZiAoIW9ialtrZXldKSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBleHBvcnRzLmNsb25lKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gZXhwb3J0cy5tZXJnZShvYmpba2V5XSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5cbmV4cG9ydHMuY29tcGFjdCA9IGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICB2YXIgY29tcGFjdGVkID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgY29tcGFjdGVkW2tleV0gPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqW2tleV0ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV1baV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWRba2V5XS5wdXNoKG9ialtrZXldW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXBhY3RlZFtrZXldID0gZXhwb3J0cy5jb21wYWN0KG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wYWN0ZWQ7XG59O1xuIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwidmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxuXG4vLyBIYW5kbGVzIGNyb3NzLWJyb3dzZXIgaGlzdG9yeSBtYW5hZ2VtZW50LCBiYXNlZCBvbiBlaXRoZXJcbi8vIFtwdXNoU3RhdGVdKGh0dHA6Ly9kaXZlaW50b2h0bWw1LmluZm8vaGlzdG9yeS5odG1sKSBhbmQgcmVhbCBVUkxzLCBvclxuLy8gW29uaGFzaGNoYW5nZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vd2luZG93Lm9uaGFzaGNoYW5nZSlcbi8vIGFuZCBVUkwgZnJhZ21lbnRzLiBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBuZWl0aGVyLlxudmFyIEhpc3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIHRoaXMuY2hlY2tVcmwgPSBfLmJpbmQodGhpcy5jaGVja1VybCwgdGhpcyk7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBgSGlzdG9yeWAgY2FuIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgYnJvd3Nlci5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gICAgfVxufTtcblxuLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgYSBsZWFkaW5nIGhhc2gvc2xhc2ggYW5kIHRyYWlsaW5nIHNwYWNlLlxudmFyIHJvdXRlU3RyaXBwZXIgPSAvXlsjXFwvXXxcXHMrJC9nO1xuXG4vLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzLlxudmFyIHJvb3RTdHJpcHBlciA9IC9eXFwvK3xcXC8rJC9nO1xuXG4vLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyB1cmxzIG9mIGhhc2guXG52YXIgcGF0aFN0cmlwcGVyID0gLyMuKiQvO1xuXG4vLyBIYXMgdGhlIGhpc3RvcnkgaGFuZGxpbmcgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQ/XG5IaXN0b3J5LnN0YXJ0ZWQgPSBmYWxzZTtcblxuLy8gU2V0IHVwIGFsbCBpbmhlcml0YWJsZSAqKkJhY2tib25lLkhpc3RvcnkqKiBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxuXy5leHRlbmQoSGlzdG9yeS5wcm90b3R5cGUsIEV2ZW50cywge1xuXG4gICAgLy8gVGhlIGRlZmF1bHQgaW50ZXJ2YWwgdG8gcG9sbCBmb3IgaGFzaCBjaGFuZ2VzLCBpZiBuZWNlc3NhcnksIGlzXG4gICAgLy8gdHdlbnR5IHRpbWVzIGEgc2Vjb25kLlxuICAgIGludGVydmFsOiA1MCxcblxuICAgIC8vIEFyZSB3ZSBhdCB0aGUgYXBwIHJvb3Q/XG4gICAgYXRSb290OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9bXlxcL10kLywgJyQmLycpO1xuICAgICAgICByZXR1cm4gcGF0aCA9PT0gdGhpcy5yb290ICYmICF0aGlzLmxvY2F0aW9uLnNlYXJjaDtcbiAgICB9LFxuXG4gICAgLy8gR2V0cyB0aGUgdHJ1ZSBoYXNoIHZhbHVlLiBDYW5ub3QgdXNlIGxvY2F0aW9uLmhhc2ggZGlyZWN0bHkgZHVlIHRvIGJ1Z1xuICAgIC8vIGluIEZpcmVmb3ggd2hlcmUgbG9jYXRpb24uaGFzaCB3aWxsIGFsd2F5cyBiZSBkZWNvZGVkLlxuICAgIGdldEhhc2g6IGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gKHdpbmRvdyB8fCB0aGlzKS5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcbiAgICB9LFxuXG4gICAgLy8gR2V0IHRoZSBwYXRobmFtZSBhbmQgc2VhcmNoIHBhcmFtcywgd2l0aG91dCB0aGUgcm9vdC5cbiAgICBnZXRQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXRoID0gZGVjb2RlVVJJKHRoaXMubG9jYXRpb24ucGF0aG5hbWUgKyB0aGlzLmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIHZhciByb290ID0gdGhpcy5yb290LnNsaWNlKDAsIC0xKTtcbiAgICAgICAgaWYgKCFwYXRoLmluZGV4T2Yocm9vdCkpIHBhdGggPSBwYXRoLnNsaWNlKHJvb3QubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHBhdGguc2xpY2UoMSk7XG4gICAgfSxcblxuICAgIC8vIEdldCB0aGUgY3Jvc3MtYnJvd3NlciBub3JtYWxpemVkIFVSTCBmcmFnbWVudCBmcm9tIHRoZSBwYXRoIG9yIGhhc2guXG4gICAgZ2V0RnJhZ21lbnQ6IGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSB8fCAhdGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldFBhdGgoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEhhc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZShyb3V0ZVN0cmlwcGVyLCAnJyk7XG4gICAgfSxcblxuICAgIC8vIFN0YXJ0IHRoZSBoYXNoIGNoYW5nZSBoYW5kbGluZywgcmV0dXJuaW5nIGB0cnVlYCBpZiB0aGUgY3VycmVudCBVUkwgbWF0Y2hlc1xuICAgIC8vIGFuIGV4aXN0aW5nIHJvdXRlLCBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChIaXN0b3J5LnN0YXJ0ZWQpIHRocm93IG5ldyBFcnJvcihcIkJhY2tib25lLmhpc3RvcnkgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkXCIpO1xuICAgICAgICBIaXN0b3J5LnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGluaXRpYWwgY29uZmlndXJhdGlvbi5cbiAgICAgICAgLy8gSXMgcHVzaFN0YXRlIGRlc2lyZWQgLi4uIGlzIGl0IGF2YWlsYWJsZT9cbiAgICAgICAgdGhpcy5vcHRpb25zICAgICAgICAgID0gXy5leHRlbmQoe3Jvb3Q6ICcvJ30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMucm9vdCAgICAgICAgICAgICA9IHRoaXMub3B0aW9ucy5yb290O1xuICAgICAgICB0aGlzLl93YW50c0hhc2hDaGFuZ2UgPSB0aGlzLm9wdGlvbnMuaGFzaENoYW5nZSAhPT0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hhc0hhc2hDaGFuZ2UgICA9ICdvbmhhc2hjaGFuZ2UnIGluIHdpbmRvdztcbiAgICAgICAgdGhpcy5fd2FudHNQdXNoU3RhdGUgID0gISF0aGlzLm9wdGlvbnMucHVzaFN0YXRlO1xuICAgICAgICB0aGlzLl9oYXNQdXNoU3RhdGUgICAgPSAhISh0aGlzLm9wdGlvbnMucHVzaFN0YXRlICYmIHRoaXMuaGlzdG9yeSAmJiB0aGlzLmhpc3RvcnkucHVzaFN0YXRlKTtcbiAgICAgICAgdGhpcy5mcmFnbWVudCAgICAgICAgID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuXG4gICAgICAgIC8vIEFkZCBhIGNyb3NzLXBsYXRmb3JtIGBhZGRFdmVudExpc3RlbmVyYCBzaGltIGZvciBvbGRlciBicm93c2Vycy5cbiAgICAgICAgdmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICAgICAgICAvLyBOb3JtYWxpemUgcm9vdCB0byBhbHdheXMgaW5jbHVkZSBhIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoLlxuICAgICAgICB0aGlzLnJvb3QgPSAoJy8nICsgdGhpcy5yb290ICsgJy8nKS5yZXBsYWNlKHJvb3RTdHJpcHBlciwgJy8nKTtcblxuICAgICAgICAvLyBEZXBlbmRpbmcgb24gd2hldGhlciB3ZSdyZSB1c2luZyBwdXNoU3RhdGUgb3IgaGFzaGVzLCBhbmQgd2hldGhlclxuICAgICAgICAvLyAnb25oYXNoY2hhbmdlJyBpcyBzdXBwb3J0ZWQsIGRldGVybWluZSBob3cgd2UgY2hlY2sgdGhlIFVSTCBzdGF0ZS5cbiAgICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSkge1xuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmNoZWNrVXJsLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlICYmIHRoaXMuX2hhc0hhc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmNoZWNrVXJsLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja1VybEludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja1VybCwgdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmFuc2l0aW9uIGZyb20gaGFzaENoYW5nZSB0byBwdXNoU3RhdGUgb3IgdmljZSB2ZXJzYSBpZiBib3RoIGFyZVxuICAgICAgICAvLyByZXF1ZXN0ZWQuXG4gICAgICAgIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UgJiYgdGhpcy5fd2FudHNQdXNoU3RhdGUpIHtcblxuICAgICAgICAgICAgLy8gSWYgd2UndmUgc3RhcnRlZCBvZmYgd2l0aCBhIHJvdXRlIGZyb20gYSBgcHVzaFN0YXRlYC1lbmFibGVkXG4gICAgICAgICAgICAvLyBicm93c2VyLCBidXQgd2UncmUgY3VycmVudGx5IGluIGEgYnJvd3NlciB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBpdC4uLlxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNQdXNoU3RhdGUgJiYgIXRoaXMuYXRSb290KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLnJlcGxhY2UodGhpcy5yb290ICsgJyMnICsgdGhpcy5nZXRQYXRoKCkpO1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiBpbW1lZGlhdGVseSBhcyBicm93c2VyIHdpbGwgZG8gcmVkaXJlY3QgdG8gbmV3IHVybFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAvLyBPciBpZiB3ZSd2ZSBzdGFydGVkIG91dCB3aXRoIGEgaGFzaC1iYXNlZCByb3V0ZSwgYnV0IHdlJ3JlIGN1cnJlbnRseVxuICAgICAgICAgICAgLy8gaW4gYSBicm93c2VyIHdoZXJlIGl0IGNvdWxkIGJlIGBwdXNoU3RhdGVgLWJhc2VkIGluc3RlYWQuLi5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzUHVzaFN0YXRlICYmIHRoaXMuYXRSb290KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHRoaXMuZ2V0SGFzaCgpLCB7cmVwbGFjZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2lsZW50KSByZXR1cm4gdGhpcy5sb2FkVXJsKCk7XG4gICAgfSxcblxuICAgIC8vIERpc2FibGUgQmFja2JvbmUuaGlzdG9yeSwgcGVyaGFwcyB0ZW1wb3JhcmlseS4gTm90IHVzZWZ1bCBpbiBhIHJlYWwgYXBwLFxuICAgIC8vIGJ1dCBwb3NzaWJseSB1c2VmdWwgZm9yIHVuaXQgdGVzdGluZyBSb3V0ZXJzLlxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQWRkIGEgY3Jvc3MtcGxhdGZvcm0gYHJlbW92ZUV2ZW50TGlzdGVuZXJgIHNoaW0gZm9yIG9sZGVyIGJyb3dzZXJzLlxuICAgICAgICB2YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyO1xuXG4gICAgICAgIC8vIFJlbW92ZSB3aW5kb3cgbGlzdGVuZXJzLlxuICAgICAgICBpZiAodGhpcy5faGFzUHVzaFN0YXRlKSB7XG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuY2hlY2tVcmwsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl93YW50c0hhc2hDaGFuZ2UgJiYgdGhpcy5faGFzSGFzaENoYW5nZSkge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuY2hlY2tVcmwsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbWUgZW52aXJvbm1lbnRzIHdpbGwgdGhyb3cgd2hlbiBjbGVhcmluZyBhbiB1bmRlZmluZWQgaW50ZXJ2YWwuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja1VybEludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2NoZWNrVXJsSW50ZXJ2YWwpO1xuICAgICAgICBIaXN0b3J5LnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gQWRkIGEgcm91dGUgdG8gYmUgdGVzdGVkIHdoZW4gdGhlIGZyYWdtZW50IGNoYW5nZXMuIFJvdXRlcyBhZGRlZCBsYXRlclxuICAgIC8vIG1heSBvdmVycmlkZSBwcmV2aW91cyByb3V0ZXMuXG4gICAgcm91dGU6IGZ1bmN0aW9uIChyb3V0ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycy51bnNoaWZ0KHtyb3V0ZTogcm91dGUsIGNhbGxiYWNrOiBjYWxsYmFja30pO1xuICAgIH0sXG5cbiAgICAvLyBDaGVja3MgdGhlIGN1cnJlbnQgVVJMIHRvIHNlZSBpZiBpdCBoYXMgY2hhbmdlZCwgYW5kIGlmIGl0IGhhcyxcbiAgICAvLyBjYWxscyBgbG9hZFVybGAuXG4gICAgY2hlY2tVcmw6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mcmFnbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRVcmwoKTtcbiAgICB9LFxuXG4gICAgLy8gQXR0ZW1wdCB0byBsb2FkIHRoZSBjdXJyZW50IFVSTCBmcmFnbWVudC4gSWYgYSByb3V0ZSBzdWNjZWVkcyB3aXRoIGFcbiAgICAvLyBtYXRjaCwgcmV0dXJucyBgdHJ1ZWAuIElmIG5vIGRlZmluZWQgcm91dGVzIG1hdGNoZXMgdGhlIGZyYWdtZW50LFxuICAgIC8vIHJldHVybnMgYGZhbHNlYC5cbiAgICBsb2FkVXJsOiBmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50ID0gdGhpcy5nZXRGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLnNvbWUoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLnJvdXRlLnRlc3QoZnJhZ21lbnQpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBTYXZlIGEgZnJhZ21lbnQgaW50byB0aGUgaGFzaCBoaXN0b3J5LCBvciByZXBsYWNlIHRoZSBVUkwgc3RhdGUgaWYgdGhlXG4gICAgLy8gJ3JlcGxhY2UnIG9wdGlvbiBpcyBwYXNzZWQuIFlvdSBhcmUgcmVzcG9uc2libGUgZm9yIHByb3Blcmx5IFVSTC1lbmNvZGluZ1xuICAgIC8vIHRoZSBmcmFnbWVudCBpbiBhZHZhbmNlLlxuICAgIC8vXG4gICAgLy8gVGhlIG9wdGlvbnMgb2JqZWN0IGNhbiBjb250YWluIGB0cmlnZ2VyOiB0cnVlYCBpZiB5b3Ugd2lzaCB0byBoYXZlIHRoZVxuICAgIC8vIHJvdXRlIGNhbGxiYWNrIGJlIGZpcmVkIChub3QgdXN1YWxseSBkZXNpcmFibGUpLCBvciBgcmVwbGFjZTogdHJ1ZWAsIGlmXG4gICAgLy8geW91IHdpc2ggdG8gbW9kaWZ5IHRoZSBjdXJyZW50IFVSTCB3aXRob3V0IGFkZGluZyBhbiBlbnRyeSB0byB0aGUgaGlzdG9yeS5cbiAgICBuYXZpZ2F0ZTogZnVuY3Rpb24gKGZyYWdtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghSGlzdG9yeS5zdGFydGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCBvcHRpb25zID09PSB0cnVlKSBvcHRpb25zID0ge3RyaWdnZXI6ICEhb3B0aW9uc307XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMucm9vdCArIChmcmFnbWVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoZnJhZ21lbnQgfHwgJycpKTtcblxuICAgICAgICAvLyBTdHJpcCB0aGUgaGFzaCBhbmQgZGVjb2RlIGZvciBtYXRjaGluZy5cbiAgICAgICAgZnJhZ21lbnQgPSBkZWNvZGVVUkkoZnJhZ21lbnQucmVwbGFjZShwYXRoU3RyaXBwZXIsICcnKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnQgPT09IGZyYWdtZW50KSByZXR1cm47XG4gICAgICAgIHRoaXMuZnJhZ21lbnQgPSBmcmFnbWVudDtcblxuICAgICAgICAvLyBEb24ndCBpbmNsdWRlIGEgdHJhaWxpbmcgc2xhc2ggb24gdGhlIHJvb3QuXG4gICAgICAgIGlmIChmcmFnbWVudCA9PT0gJycgJiYgdXJsICE9PSAnLycpIHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cbiAgICAgICAgLy8gSWYgcHVzaFN0YXRlIGlzIGF2YWlsYWJsZSwgd2UgdXNlIGl0IHRvIHNldCB0aGUgZnJhZ21lbnQgYXMgYSByZWFsIFVSTC5cbiAgICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5W29wdGlvbnMucmVwbGFjZSA/ICdyZXBsYWNlU3RhdGUnIDogJ3B1c2hTdGF0ZSddKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsKTtcblxuICAgICAgICAgICAgLy8gSWYgaGFzaCBjaGFuZ2VzIGhhdmVuJ3QgYmVlbiBleHBsaWNpdGx5IGRpc2FibGVkLCB1cGRhdGUgdGhlIGhhc2hcbiAgICAgICAgICAgIC8vIGZyYWdtZW50IHRvIHN0b3JlIGhpc3RvcnkuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIYXNoKHRoaXMubG9jYXRpb24sIGZyYWdtZW50LCBvcHRpb25zLnJlcGxhY2UpO1xuICAgICAgICAgICAgLy8gSWYgeW91J3ZlIHRvbGQgdXMgdGhhdCB5b3UgZXhwbGljaXRseSBkb24ndCB3YW50IGZhbGxiYWNrIGhhc2hjaGFuZ2UtXG4gICAgICAgICAgICAvLyBiYXNlZCBoaXN0b3J5LCB0aGVuIGBuYXZpZ2F0ZWAgYmVjb21lcyBhIHBhZ2UgcmVmcmVzaC5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmFzc2lnbih1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnRyaWdnZXIpIHJldHVybiB0aGlzLmxvYWRVcmwoZnJhZ21lbnQpO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgdGhlIGhhc2ggbG9jYXRpb24sIGVpdGhlciByZXBsYWNpbmcgdGhlIGN1cnJlbnQgZW50cnksIG9yIGFkZGluZ1xuICAgIC8vIGEgbmV3IG9uZSB0byB0aGUgYnJvd3NlciBoaXN0b3J5LlxuICAgIF91cGRhdGVIYXNoOiBmdW5jdGlvbiAobG9jYXRpb24sIGZyYWdtZW50LCByZXBsYWNlKSB7XG4gICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICB2YXIgaHJlZiA9IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvKGphdmFzY3JpcHQ6fCMpLiokLywgJycpO1xuICAgICAgICAgICAgbG9jYXRpb24ucmVwbGFjZShocmVmICsgJyMnICsgZnJhZ21lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU29tZSBicm93c2VycyByZXF1aXJlIHRoYXQgYGhhc2hgIGNvbnRhaW5zIGEgbGVhZGluZyAjLlxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjJyArIGZyYWdtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgSGlzdG9yeSgpO1xuIiwiO2lmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7ICB3aW5kb3cuYW1wZXJzYW5kID0gd2luZG93LmFtcGVyc2FuZCB8fCB7fTsgIHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtcm91dGVyXCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1yb3V0ZXJcIl0gfHwgW107ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLXJvdXRlclwiXS5wdXNoKFwiMS4wLjZcIik7fVxudmFyIGNsYXNzRXh0ZW5kID0gcmVxdWlyZSgnYW1wZXJzYW5kLWNsYXNzLWV4dGVuZCcpO1xudmFyIEV2ZW50cyA9IHJlcXVpcmUoJ2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG52YXIgYW1wSGlzdG9yeSA9IHJlcXVpcmUoJy4vYW1wZXJzYW5kLWhpc3RvcnknKTtcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG5cbi8vIFJvdXRlcnMgbWFwIGZhdXgtVVJMcyB0byBhY3Rpb25zLCBhbmQgZmlyZSBldmVudHMgd2hlbiByb3V0ZXMgYXJlXG4vLyBtYXRjaGVkLiBDcmVhdGluZyBhIG5ldyBvbmUgc2V0cyBpdHMgYHJvdXRlc2AgaGFzaCwgaWYgbm90IHNldCBzdGF0aWNhbGx5LlxudmFyIFJvdXRlciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIHRoaXMuaGlzdG9yeSA9IG9wdGlvbnMuaGlzdG9yeSB8fCBhbXBIaXN0b3J5O1xuICAgIGlmIChvcHRpb25zLnJvdXRlcykgdGhpcy5yb3V0ZXMgPSBvcHRpb25zLnJvdXRlcztcbiAgICB0aGlzLl9iaW5kUm91dGVzKCk7XG4gICAgdGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG4vLyBDYWNoZWQgcmVndWxhciBleHByZXNzaW9ucyBmb3IgbWF0Y2hpbmcgbmFtZWQgcGFyYW0gcGFydHMgYW5kIHNwbGF0dGVkXG4vLyBwYXJ0cyBvZiByb3V0ZSBzdHJpbmdzLlxudmFyIG9wdGlvbmFsUGFyYW0gPSAvXFwoKC4qPylcXCkvZztcbnZhciBuYW1lZFBhcmFtICAgID0gLyhcXChcXD8pPzpcXHcrL2c7XG52YXIgc3BsYXRQYXJhbSAgICA9IC9cXCpcXHcrL2c7XG52YXIgZXNjYXBlUmVnRXhwICA9IC9bXFwte31cXFtcXF0rPy4sXFxcXFxcXiR8I1xcc10vZztcblxuLy8gU2V0IHVwIGFsbCBpbmhlcml0YWJsZSAqKkJhY2tib25lLlJvdXRlcioqIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG5fLmV4dGVuZChSb3V0ZXIucHJvdG90eXBlLCBFdmVudHMsIHtcblxuICAgIC8vIEluaXRpYWxpemUgaXMgYW4gZW1wdHkgZnVuY3Rpb24gYnkgZGVmYXVsdC4gT3ZlcnJpZGUgaXQgd2l0aCB5b3VyIG93blxuICAgIC8vIGluaXRpYWxpemF0aW9uIGxvZ2ljLlxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHt9LFxuXG4gICAgLy8gTWFudWFsbHkgYmluZCBhIHNpbmdsZSBuYW1lZCByb3V0ZSB0byBhIGNhbGxiYWNrLiBGb3IgZXhhbXBsZTpcbiAgICAvL1xuICAgIC8vICAgICB0aGlzLnJvdXRlKCdzZWFyY2gvOnF1ZXJ5L3A6bnVtJywgJ3NlYXJjaCcsIGZ1bmN0aW9uIChxdWVyeSwgbnVtKSB7XG4gICAgLy8gICAgICAgLi4uXG4gICAgLy8gICAgIH0pO1xuICAgIC8vXG4gICAgcm91dGU6IGZ1bmN0aW9uIChyb3V0ZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFfLmlzUmVnRXhwKHJvdXRlKSkgcm91dGUgPSB0aGlzLl9yb3V0ZVRvUmVnRXhwKHJvdXRlKTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBuYW1lO1xuICAgICAgICAgICAgbmFtZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIGNhbGxiYWNrID0gdGhpc1tuYW1lXTtcbiAgICAgICAgdmFyIHJvdXRlciA9IHRoaXM7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5yb3V0ZShyb3V0ZSwgZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IHJvdXRlci5fZXh0cmFjdFBhcmFtZXRlcnMocm91dGUsIGZyYWdtZW50KTtcbiAgICAgICAgICAgIGlmIChyb3V0ZXIuZXhlY3V0ZShjYWxsYmFjaywgYXJncywgbmFtZSkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcm91dGVyLnRyaWdnZXIuYXBwbHkocm91dGVyLCBbJ3JvdXRlOicgKyBuYW1lXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIHJvdXRlci50cmlnZ2VyKCdyb3V0ZScsIG5hbWUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJvdXRlci5oaXN0b3J5LnRyaWdnZXIoJ3JvdXRlJywgcm91dGVyLCBuYW1lLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBFeGVjdXRlIGEgcm91dGUgaGFuZGxlciB3aXRoIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLiAgVGhpcyBpcyBhblxuICAgIC8vIGV4Y2VsbGVudCBwbGFjZSB0byBkbyBwcmUtcm91dGUgc2V0dXAgb3IgcG9zdC1yb3V0ZSBjbGVhbnVwLlxuICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChjYWxsYmFjaywgYXJncywgbmFtZSkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0sXG5cbiAgICAvLyBTaW1wbGUgcHJveHkgdG8gYGFtcEhpc3RvcnlgIHRvIHNhdmUgYSBmcmFnbWVudCBpbnRvIHRoZSBoaXN0b3J5LlxuICAgIG5hdmlnYXRlOiBmdW5jdGlvbiAoZnJhZ21lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5Lm5hdmlnYXRlKGZyYWdtZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEhlbHBlciBmb3IgZG9pbmcgYGludGVybmFsYCByZWRpcmVjdHMgd2l0aG91dCBhZGRpbmcgdG8gaGlzdG9yeVxuICAgIC8vIGFuZCB0aGVyZWJ5IGJyZWFraW5nIGJhY2tidXR0b24gZnVuY3Rpb25hbGl0eS5cbiAgICByZWRpcmVjdFRvOiBmdW5jdGlvbiAobmV3VXJsKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGUobmV3VXJsLCB7cmVwbGFjZTogdHJ1ZSwgdHJpZ2dlcjogdHJ1ZX0pO1xuICAgIH0sXG5cbiAgICAvLyBCaW5kIGFsbCBkZWZpbmVkIHJvdXRlcyB0byBgaGlzdG9yeWAuIFdlIGhhdmUgdG8gcmV2ZXJzZSB0aGVcbiAgICAvLyBvcmRlciBvZiB0aGUgcm91dGVzIGhlcmUgdG8gc3VwcG9ydCBiZWhhdmlvciB3aGVyZSB0aGUgbW9zdCBnZW5lcmFsXG4gICAgLy8gcm91dGVzIGNhbiBiZSBkZWZpbmVkIGF0IHRoZSBib3R0b20gb2YgdGhlIHJvdXRlIG1hcC5cbiAgICBfYmluZFJvdXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucm91dGVzKSByZXR1cm47XG4gICAgICAgIHRoaXMucm91dGVzID0gXy5yZXN1bHQodGhpcywgJ3JvdXRlcycpO1xuICAgICAgICB2YXIgcm91dGUsIHJvdXRlcyA9IE9iamVjdC5rZXlzKHRoaXMucm91dGVzKTtcbiAgICAgICAgd2hpbGUgKChyb3V0ZSA9IHJvdXRlcy5wb3AoKSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZShyb3V0ZSwgdGhpcy5yb3V0ZXNbcm91dGVdKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgcm91dGUgc3RyaW5nIGludG8gYSByZWd1bGFyIGV4cHJlc3Npb24sIHN1aXRhYmxlIGZvciBtYXRjaGluZ1xuICAgIC8vIGFnYWluc3QgdGhlIGN1cnJlbnQgbG9jYXRpb24gaGFzaC5cbiAgICBfcm91dGVUb1JlZ0V4cDogZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIHJvdXRlID0gcm91dGVcbiAgICAgICAgICAgIC5yZXBsYWNlKGVzY2FwZVJlZ0V4cCwgJ1xcXFwkJicpXG4gICAgICAgICAgICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXG4gICAgICAgICAgICAucmVwbGFjZShuYW1lZFBhcmFtLCBmdW5jdGlvbiAobWF0Y2gsIG9wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbmFsID8gbWF0Y2ggOiAnKFteLz9dKyknO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKHNwbGF0UGFyYW0sICcoW14/XSo/KScpO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByb3V0ZSArICcoPzpcXFxcPyhbXFxcXHNcXFxcU10qKSk/JCcpO1xuICAgIH0sXG5cbiAgICAvLyBHaXZlbiBhIHJvdXRlLCBhbmQgYSBVUkwgZnJhZ21lbnQgdGhhdCBpdCBtYXRjaGVzLCByZXR1cm4gdGhlIGFycmF5IG9mXG4gICAgLy8gZXh0cmFjdGVkIGRlY29kZWQgcGFyYW1ldGVycy4gRW1wdHkgb3IgdW5tYXRjaGVkIHBhcmFtZXRlcnMgd2lsbCBiZVxuICAgIC8vIHRyZWF0ZWQgYXMgYG51bGxgIHRvIG5vcm1hbGl6ZSBjcm9zcy1icm93c2VyIGJlaGF2aW9yLlxuICAgIF9leHRyYWN0UGFyYW1ldGVyczogZnVuY3Rpb24gKHJvdXRlLCBmcmFnbWVudCkge1xuICAgICAgICB2YXIgcGFyYW1zID0gcm91dGUuZXhlYyhmcmFnbWVudCkuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybiBwYXJhbXMubWFwKGZ1bmN0aW9uIChwYXJhbSwgaSkge1xuICAgICAgICAgICAgLy8gRG9uJ3QgZGVjb2RlIHRoZSBzZWFyY2ggcGFyYW1zLlxuICAgICAgICAgICAgaWYgKGkgPT09IHBhcmFtcy5sZW5ndGggLSAxKSByZXR1cm4gcGFyYW0gfHwgbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbSA/IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbSkgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5Sb3V0ZXIuZXh0ZW5kID0gY2xhc3NFeHRlbmQ7XG4iLCI7aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHsgIHdpbmRvdy5hbXBlcnNhbmQgPSB3aW5kb3cuYW1wZXJzYW5kIHx8IHt9OyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3LXN3aXRjaGVyXCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3LXN3aXRjaGVyXCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3LXN3aXRjaGVyXCJdLnB1c2goXCIxLjEuMlwiKTt9XG5mdW5jdGlvbiBWaWV3U3dpdGNoZXIoZWwsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgaGlkZTogbnVsbCxcbiAgICAgICAgc2hvdzogbnVsbCxcbiAgICAgICAgZW1wdHk6IG51bGwsXG4gICAgICAgIHdhaXRGb3JSZW1vdmU6IGZhbHNlXG4gICAgfTtcbiAgICBmb3IgKHZhciBpdGVtIGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmhhc093blByb3BlcnR5KGl0ZW0pKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1tpdGVtXSA9IG9wdGlvbnNbaXRlbV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudmlldykge1xuICAgICAgICB0aGlzLnNldChvcHRpb25zLnZpZXcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNhbGwgdGhpcyBzbyB0aGUgZW1wdHkgY2FsbGJhY2sgZ2V0cyBjYWxsZWRcbiAgICAgICAgdGhpcy5fb25WaWV3UmVtb3ZlKCk7XG4gICAgfVxufVxuXG5WaWV3U3dpdGNoZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcmV2ID0gdGhpcy5wcmV2aW91cyA9IHRoaXMuY3VycmVudDtcbiAgICB2YXIgY3VycmVudCA9IHRoaXMuX3NldEN1cnJlbnQodmlldyk7XG4gICAgaWYgKHRoaXMuY29uZmlnLndhaXRGb3JSZW1vdmUpIHtcbiAgICAgICAgdGhpcy5faGlkZShwcmV2LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UncmUgc3RpbGwgZGVhbGluZyB3aXRoIHRoZSBzYW1lIG9uZVxuICAgICAgICAgICAgLy8gdGhhdCB3YXkgaWYgd2UncmUgbmF2aWdhdGluZyBxdWlja2x5IHdlIGRvbid0IHN0YXJ0XG4gICAgICAgICAgICAvLyB0byBzaG93IG9uZSB0aGF0J3MgYWxyZWFkeSBvbGQuXG4gICAgICAgICAgICBpZiAocHJldiA9PT0gc2VsZi5wcmV2aW91cyAmJiBjdXJyZW50ID09PSBzZWxmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93KGN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oaWRlKHByZXYpO1xuICAgICAgICB0aGlzLl9zaG93KGN1cnJlbnQpO1xuICAgIH1cbn07XG5cblZpZXdTd2l0Y2hlci5wcm90b3R5cGUuX3NldEN1cnJlbnQgPSBmdW5jdGlvbiAodmlldykge1xuICAgIHRoaXMuY3VycmVudCA9IHZpZXc7XG4gICAgaWYgKHZpZXcpIHRoaXMuX3JlZ2lzdGVyUmVtb3ZlTGlzdGVuZXIodmlldyk7XG4gICAgdmFyIGVtcHR5Q2IgPSB0aGlzLmNvbmZpZy5lbXB0eTtcbiAgICBpZiAoZW1wdHlDYiAmJiAhdGhpcy5jdXJyZW50KSB7XG4gICAgICAgIGVtcHR5Q2IoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZpZXc7XG59O1xuXG5WaWV3U3dpdGNoZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgdGhpcy5faGlkZSh0aGlzLmN1cnJlbnQsIGNiKTtcbn07XG5cbi8vIElmIHRoZSB2aWV3IHN3aXRjaGVyIGl0c2VsZiBpcyByZW1vdmVkLCByZW1vdmUgaXRzIGNoaWxkIHRvIGF2b2lkIG1lbW9yeSBsZWFrc1xuVmlld1N3aXRjaGVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkgdGhpcy5jdXJyZW50LnJlbW92ZSgpO1xufTtcblxuVmlld1N3aXRjaGVyLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uICh2aWV3LCBjYikge1xuICAgIHZhciBjdXN0b21TaG93ID0gdGhpcy5jb25maWcuc2hvdztcbiAgICBpZiAoY3VzdG9tU2hvdykge1xuICAgICAgICAvLyBhc3luY1xuICAgICAgICBpZiAoY3VzdG9tU2hvdy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcih2aWV3KTtcbiAgICAgICAgICAgIGN1c3RvbVNob3codmlldywgY2IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKHZpZXcpO1xuICAgICAgICAgICAgY3VzdG9tU2hvdyh2aWV3KTtcbiAgICAgICAgICAgIGlmIChjYikgY2IoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcih2aWV3KTtcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH1cbn07XG5cblZpZXdTd2l0Y2hlci5wcm90b3R5cGUuX3JlZ2lzdGVyUmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAodmlldykge1xuICAgIGlmICh2aWV3KSB2aWV3Lm9uY2UoJ3JlbW92ZScsIHRoaXMuX29uVmlld1JlbW92ZSwgdGhpcyk7XG59O1xuXG5WaWV3U3dpdGNoZXIucHJvdG90eXBlLl9vblZpZXdSZW1vdmUgPSBmdW5jdGlvbiAodmlldykge1xuICAgIHZhciBlbXB0eUNiID0gdGhpcy5jb25maWcuZW1wdHk7XG4gICAgaWYgKHRoaXMuY3VycmVudCA9PT0gdmlldykge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZW1wdHlDYiAmJiAhdGhpcy5jdXJyZW50KSB7XG4gICAgICAgIGVtcHR5Q2IoKTtcbiAgICB9XG59O1xuXG5WaWV3U3dpdGNoZXIucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAodmlldykge1xuICAgIGlmICghdmlldy5yZW5kZXJlZCkgdmlldy5yZW5kZXIoe2NvbnRhaW5lckVsOiB0aGlzLmVsfSk7XG4gICAgaWYgKCF2aWV3Lmluc2VydFNlbGYpIHRoaXMuZWwuYXBwZW5kQ2hpbGQodmlldy5lbCk7XG59O1xuXG5WaWV3U3dpdGNoZXIucHJvdG90eXBlLl9oaWRlID0gZnVuY3Rpb24gKHZpZXcsIGNiKSB7XG4gICAgaWYgKCF2aWV3KSByZXR1cm4gY2IgJiYgY2IoKTtcbiAgICB2YXIgY3VzdG9tSGlkZSA9IHRoaXMuY29uZmlnLmhpZGU7XG4gICAgaWYgKGN1c3RvbUhpZGUpIHtcbiAgICAgICAgLy8gYXN5bmNcbiAgICAgICAgaWYgKGN1c3RvbUhpZGUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjdXN0b21IaWRlKHZpZXcsIHRoaXMuY3VycmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZpZXcucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXN0b21IaWRlKHZpZXcsIHRoaXMuY3VycmVudCk7XG4gICAgICAgICAgICB2aWV3LnJlbW92ZSgpO1xuICAgICAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmlldy5yZW1vdmUoKTtcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3U3dpdGNoZXI7XG4iLCI7aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHsgIHdpbmRvdy5hbXBlcnNhbmQgPSB3aW5kb3cuYW1wZXJzYW5kIHx8IHt9OyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3XCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3XCJdIHx8IFtdOyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC12aWV3XCJdLnB1c2goXCI3LjIuMFwiKTt9XG52YXIgU3RhdGUgPSByZXF1aXJlKCdhbXBlcnNhbmQtc3RhdGUnKTtcbnZhciBDb2xsZWN0aW9uVmlldyA9IHJlcXVpcmUoJ2FtcGVyc2FuZC1jb2xsZWN0aW9uLXZpZXcnKTtcbnZhciBkb21pZnkgPSByZXF1aXJlKCdkb21pZnknKTtcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cy1taXhpbicpO1xudmFyIG1hdGNoZXMgPSByZXF1aXJlKCdtYXRjaGVzLXNlbGVjdG9yJyk7XG52YXIgYmluZGluZ3MgPSByZXF1aXJlKCdhbXBlcnNhbmQtZG9tLWJpbmRpbmdzJyk7XG52YXIgZ2V0UGF0aCA9IHJlcXVpcmUoJ2dldC1vYmplY3QtcGF0aCcpO1xuXG5cbmZ1bmN0aW9uIFZpZXcoYXR0cnMpIHtcbiAgICB0aGlzLmNpZCA9IF8udW5pcXVlSWQoJ3ZpZXcnKTtcbiAgICBhdHRycyB8fCAoYXR0cnMgPSB7fSk7XG4gICAgdmFyIHBhcmVudCA9IGF0dHJzLnBhcmVudDtcbiAgICBkZWxldGUgYXR0cnMucGFyZW50O1xuICAgIEJhc2VTdGF0ZS5jYWxsKHRoaXMsIGF0dHJzLCB7aW5pdDogZmFsc2UsIHBhcmVudDogcGFyZW50fSk7XG4gICAgdGhpcy5vbignY2hhbmdlOmVsJywgdGhpcy5faGFuZGxlRWxlbWVudENoYW5nZSwgdGhpcyk7XG4gICAgdGhpcy5fcGFyc2VkQmluZGluZ3MgPSBiaW5kaW5ncyh0aGlzLmJpbmRpbmdzLCB0aGlzKTtcbiAgICB0aGlzLl9pbml0aWFsaXplQmluZGluZ3MoKTtcbiAgICBpZiAoYXR0cnMuZWwgJiYgIXRoaXMuYXV0b1JlbmRlcikge1xuICAgICAgICB0aGlzLl9oYW5kbGVFbGVtZW50Q2hhbmdlKCk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVTdWJ2aWV3cygpO1xuICAgIHRoaXMudGVtcGxhdGUgPSBhdHRycy50ZW1wbGF0ZSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuc2V0KF8ucGljayhhdHRycywgdmlld09wdGlvbnMpKTtcbiAgICBpZiAodGhpcy5hdXRvUmVuZGVyICYmIHRoaXMudGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG59XG5cbnZhciBCYXNlU3RhdGUgPSBTdGF0ZS5leHRlbmQoe1xuICAgIGRhdGFUeXBlczoge1xuICAgICAgICBlbGVtZW50OiB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6IG5ld1ZhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbmV3VmFsIGluc3RhbmNlb2YgRWxlbWVudCA/ICdlbGVtZW50JyA6IHR5cGVvZiBuZXdWYWxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uIChlbDEsIGVsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDEgPT09IGVsMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiBuZXdWYWwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG5ld1ZhbCAmJiBuZXdWYWwuaXNDb2xsZWN0aW9uID8gJ2NvbGxlY3Rpb24nIDogdHlwZW9mIG5ld1ZhbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGFyZTogZnVuY3Rpb24gKGN1cnJlbnRWYWwsIG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50VmFsID09PSBuZXdWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb3BzOiB7XG4gICAgICAgIG1vZGVsOiAnc3RhdGUnLFxuICAgICAgICBlbDogJ2VsZW1lbnQnLFxuICAgICAgICBjb2xsZWN0aW9uOiAnY29sbGVjdGlvbidcbiAgICB9LFxuICAgIGRlcml2ZWQ6IHtcbiAgICAgICAgcmVuZGVyZWQ6IHtcbiAgICAgICAgICAgIGRlcHM6IFsnZWwnXSxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5lbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGFzRGF0YToge1xuICAgICAgICAgICAgZGVwczogWydtb2RlbCddLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aGlzLm1vZGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8vIENhY2hlZCByZWdleCB0byBzcGxpdCBrZXlzIGZvciBgZGVsZWdhdGVgLlxudmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkLztcblxuLy8gTGlzdCBvZiB2aWV3IG9wdGlvbnMgdG8gYmUgbWVyZ2VkIGFzIHByb3BlcnRpZXMuXG52YXIgdmlld09wdGlvbnMgPSBbJ21vZGVsJywgJ2NvbGxlY3Rpb24nLCAnZWwnXTtcblxuVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VTdGF0ZS5wcm90b3R5cGUpO1xuXG4vLyBTZXQgdXAgYWxsIGluaGVyaXRhYmxlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG5fLmV4dGVuZChWaWV3LnByb3RvdHlwZSwge1xuICAgIC8vICMjIHF1ZXJ5XG4gICAgLy8gR2V0IGFuIHNpbmdsZSBlbGVtZW50IGJhc2VkIG9uIENTUyBzZWxlY3RvciBzY29wZWQgdG8gdGhpcy5lbFxuICAgIC8vIGlmIHlvdSBwYXNzIGFuIGVtcHR5IHN0cmluZyBpdCByZXR1cm4gYHRoaXMuZWxgLlxuICAgIC8vIElmIHlvdSBwYXNzIGFuIGVsZW1lbnQgd2UganVzdCByZXR1cm4gaXQgYmFjay5cbiAgICAvLyBUaGlzIGxldHMgdXMgdXNlIGBnZXRgIHRvIGhhbmRsZSBjYXNlcyB3aGVyZSB1c2Vyc1xuICAgIC8vIGNhbiBwYXNzIGEgc2VsZWN0b3Igb3IgYW4gYWxyZWFkeSBzZWxlY3RlZCBlbGVtZW50LlxuICAgIHF1ZXJ5OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFzZWxlY3RvcikgcmV0dXJuIHRoaXMuZWw7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcyh0aGlzLmVsLCBzZWxlY3RvcikpIHJldHVybiB0aGlzLmVsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgfHwgdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9LFxuXG4gICAgLy8gIyMgcXVlcnlBbGxcbiAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIGVsZW1lbnRzIGJhc2VkIG9uIENTUyBzZWxlY3RvciBzY29wZWQgdG8gdGhpcy5lbFxuICAgIC8vIGlmIHlvdSBwYXNzIGFuIGVtcHR5IHN0cmluZyBpdCByZXR1cm4gYHRoaXMuZWxgLiBBbHNvIGluY2x1ZGVzIHJvb3RcbiAgICAvLyBlbGVtZW50LlxuICAgIHF1ZXJ5QWxsOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBpZiAoIXRoaXMuZWwpIHJldHVybiByZXM7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHJldHVybiBbdGhpcy5lbF07XG4gICAgICAgIGlmIChtYXRjaGVzKHRoaXMuZWwsIHNlbGVjdG9yKSkgcmVzLnB1c2godGhpcy5lbCk7XG4gICAgICAgIHJldHVybiByZXMuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpKTtcbiAgICB9LFxuXG4gICAgLy8gIyMgcXVlcnlCeUhvb2tcbiAgICAvLyBDb252ZW5pZW5jZSBtZXRob2QgZm9yIGZldGNoaW5nIGVsZW1lbnQgYnkgaXQncyBgZGF0YS1ob29rYCBhdHRyaWJ1dGUuXG4gICAgLy8gQWxzbyB0cmllcyB0byBtYXRjaCBhZ2FpbnN0IHJvb3QgZWxlbWVudC5cbiAgICAvLyBBbHNvIHN1cHBvcnRzIG1hdGNoaW5nICdvbmUnIG9mIHNldmVyYWwgc3BhY2Ugc2VwYXJhdGVkIGhvb2tzLlxuICAgIHF1ZXJ5QnlIb29rOiBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSgnW2RhdGEtaG9va349XCInICsgaG9vayArICdcIl0nKTtcbiAgICB9LFxuXG4gICAgLy8gSW5pdGlhbGl6ZSBpcyBhbiBlbXB0eSBmdW5jdGlvbiBieSBkZWZhdWx0LiBPdmVycmlkZSBpdCB3aXRoIHlvdXIgb3duXG4gICAgLy8gaW5pdGlhbGl6YXRpb24gbG9naWMuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge30sXG5cbiAgICAvLyAqKnJlbmRlcioqIGlzIHRoZSBjb3JlIGZ1bmN0aW9uIHRoYXQgeW91ciB2aWV3IGNhbiBvdmVycmlkZSwgaXRzIGpvYiBpc1xuICAgIC8vIHRvIHBvcHVsYXRlIGl0cyBlbGVtZW50IChgdGhpcy5lbGApLCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBIVE1MLlxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlbmRlcldpdGhUZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSB0aGlzIHZpZXcgYnkgdGFraW5nIHRoZSBlbGVtZW50IG91dCBvZiB0aGUgRE9NLCBhbmQgcmVtb3ZpbmcgYW55XG4gICAgLy8gYXBwbGljYWJsZSBldmVudHMgbGlzdGVuZXJzLlxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyc2VkQmluZGluZ3MgPSB0aGlzLl9wYXJzZWRCaW5kaW5ncztcbiAgICAgICAgaWYgKHRoaXMuZWwgJiYgdGhpcy5lbC5wYXJlbnROb2RlKSB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIGlmICh0aGlzLl9zdWJ2aWV3cykgXy5jaGFpbih0aGlzLl9zdWJ2aWV3cykuZmxhdHRlbigpLmludm9rZSgncmVtb3ZlJyk7XG4gICAgICAgIHRoaXMuc3RvcExpc3RlbmluZygpO1xuICAgICAgICAvLyBUT0RPOiBOb3Qgc3VyZSBpZiB0aGlzIGlzIGFjdHVhbGx5IG5lY2Vzc2FyeS5cbiAgICAgICAgLy8gSnVzdCB0cnlpbmcgdG8gZGUtcmVmZXJlbmNlIHRoaXMgcG90ZW50aWFsbHkgbGFyZ2VcbiAgICAgICAgLy8gYW1vdW50IG9mIGdlbmVyYXRlZCBmdW5jdGlvbnMgdG8gYXZvaWQgbWVtb3J5IGxlYWtzLlxuICAgICAgICBfLmVhY2gocGFyc2VkQmluZGluZ3MsIGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBtb2RlbE5hbWUpIHtcbiAgICAgICAgICAgIF8uZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJzZWRCaW5kaW5nc1ttb2RlbE5hbWVdW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJzZWRCaW5kaW5nc1ttb2RlbE5hbWVdO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdyZW1vdmUnLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIENoYW5nZSB0aGUgdmlldydzIGVsZW1lbnQgKGB0aGlzLmVsYCBwcm9wZXJ0eSksIGluY2x1ZGluZyBldmVudFxuICAgIC8vIHJlLWRlbGVnYXRpb24uXG4gICAgX2hhbmRsZUVsZW1lbnRDaGFuZ2U6IGZ1bmN0aW9uIChlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgICBpZiAodGhpcy5ldmVudE1hbmFnZXIpIHRoaXMuZXZlbnRNYW5hZ2VyLnVuYmluZCgpO1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IGV2ZW50cyh0aGlzLmVsLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgICAgICB0aGlzLl9hcHBseUJpbmRpbmdzRm9yS2V5KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBTZXQgY2FsbGJhY2tzLCB3aGVyZSBgdGhpcy5ldmVudHNgIGlzIGEgaGFzaCBvZlxuICAgIC8vXG4gICAgLy8gKntcImV2ZW50IHNlbGVjdG9yXCI6IFwiY2FsbGJhY2tcIn0qXG4gICAgLy9cbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICdtb3VzZWRvd24gLnRpdGxlJzogICdlZGl0JyxcbiAgICAvLyAgICAgICAnY2xpY2sgLmJ1dHRvbic6ICAgICAnc2F2ZScsXG4gICAgLy8gICAgICAgJ2NsaWNrIC5vcGVuJzogICAgICAgZnVuY3Rpb24gKGUpIHsgLi4uIH1cbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gcGFpcnMuIENhbGxiYWNrcyB3aWxsIGJlIGJvdW5kIHRvIHRoZSB2aWV3LCB3aXRoIGB0aGlzYCBzZXQgcHJvcGVybHkuXG4gICAgLy8gVXNlcyBldmVudCBkZWxlZ2F0aW9uIGZvciBlZmZpY2llbmN5LlxuICAgIC8vIE9taXR0aW5nIHRoZSBzZWxlY3RvciBiaW5kcyB0aGUgZXZlbnQgdG8gYHRoaXMuZWxgLlxuICAgIC8vIFRoaXMgb25seSB3b3JrcyBmb3IgZGVsZWdhdGUtYWJsZSBldmVudHM6IG5vdCBgZm9jdXNgLCBgYmx1cmAsIGFuZFxuICAgIC8vIG5vdCBgY2hhbmdlYCwgYHN1Ym1pdGAsIGFuZCBgcmVzZXRgIGluIEludGVybmV0IEV4cGxvcmVyLlxuICAgIGRlbGVnYXRlRXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKSB7XG4gICAgICAgIGlmICghKGV2ZW50cyB8fCAoZXZlbnRzID0gXy5yZXN1bHQodGhpcywgJ2V2ZW50cycpKSkpIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIuYmluZChrZXksIGV2ZW50c1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQ2xlYXJzIGFsbCBjYWxsYmFja3MgcHJldmlvdXNseSBib3VuZCB0byB0aGUgdmlldyB3aXRoIGBkZWxlZ2F0ZUV2ZW50c2AuXG4gICAgLy8gWW91IHVzdWFsbHkgZG9uJ3QgbmVlZCB0byB1c2UgdGhpcywgYnV0IG1heSB3aXNoIHRvIGlmIHlvdSBoYXZlIG11bHRpcGxlXG4gICAgLy8gQmFja2JvbmUgdmlld3MgYXR0YWNoZWQgdG8gdGhlIHNhbWUgRE9NIGVsZW1lbnQuXG4gICAgdW5kZWxlZ2F0ZUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci51bmJpbmQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vICMjIHJlZ2lzdGVyU3Vidmlld1xuICAgIC8vIFBhc3MgaXQgYSB2aWV3LiBUaGlzIGNhbiBiZSBhbnl0aGluZyB3aXRoIGEgYHJlbW92ZWAgbWV0aG9kXG4gICAgcmVnaXN0ZXJTdWJ2aWV3OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAvLyBTdG9yYWdlIGZvciBvdXIgc3Vidmlld3MuXG4gICAgICAgIHRoaXMuX3N1YnZpZXdzIHx8ICh0aGlzLl9zdWJ2aWV3cyA9IFtdKTtcbiAgICAgICAgdGhpcy5fc3Vidmlld3MucHVzaCh2aWV3KTtcbiAgICAgICAgLy8gSWYgdmlldyBoYXMgYW4gJ2VsJyBpdCdzIGEgc2luZ2xlIHZpZXcgbm90XG4gICAgICAgIC8vIGFuIGFycmF5IG9mIHZpZXdzIHJlZ2lzdGVyZWQgYnkgcmVuZGVyQ29sbGVjdGlvblxuICAgICAgICAvLyBzbyB3ZSBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHZpZXcuXG4gICAgICAgIGlmICh2aWV3LmVsKSB2aWV3LnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH0sXG5cbiAgICAvLyAjIyByZW5kZXJTdWJ2aWV3XG4gICAgLy8gUGFzcyBpdCBhIHZpZXcgaW5zdGFuY2UgYW5kIGEgY29udGFpbmVyIGVsZW1lbnRcbiAgICAvLyB0byByZW5kZXIgaXQgaW4uIEl0J3MgYHJlbW92ZWAgbWV0aG9kIHdpbGwgYmUgY2FsbGVkXG4gICAgLy8gd2hlbiB0aGUgcGFyZW50IHZpZXcgaXMgZGVzdHJveWVkLlxuICAgIHJlbmRlclN1YnZpZXc6IGZ1bmN0aW9uICh2aWV3LCBjb250YWluZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLnF1ZXJ5KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWdpc3RlclN1YnZpZXcodmlldyk7XG4gICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgICAgIChjb250YWluZXIgfHwgdGhpcy5lbCkuYXBwZW5kQ2hpbGQodmlldy5lbCk7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH0sXG5cbiAgICBfYXBwbHlCaW5kaW5nc0ZvcktleTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsKSByZXR1cm47XG4gICAgICAgIHZhciBmbnMgPSB0aGlzLl9wYXJzZWRCaW5kaW5ncy5nZXRHcm91cGVkKG5hbWUpO1xuICAgICAgICB2YXIgaXRlbTtcbiAgICAgICAgZm9yIChpdGVtIGluIGZucykge1xuICAgICAgICAgICAgZm5zW2l0ZW1dLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4odGhpcy5lbCwgZ2V0UGF0aCh0aGlzLCBpdGVtKSwgXy5sYXN0KGl0ZW0uc3BsaXQoJy4nKSkpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXRpYWxpemVCaW5kaW5nczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuYmluZGluZ3MpIHJldHVybjtcbiAgICAgICAgdGhpcy5vbignYWxsJywgZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZS5zbGljZSgwLCA3KSA9PT0gJ2NoYW5nZTonKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlCaW5kaW5nc0ZvcktleShldmVudE5hbWUuc3BsaXQoJzonKVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvLyAjIyBfaW5pdGlhbGl6ZVN1YnZpZXdzXG4gICAgLy8gdGhpcyBpcyBjYWxsZWQgYXQgc2V0dXAgYW5kIGdyYWJzIGRlY2xhcmVkIHN1YnZpZXdzXG4gICAgX2luaXRpYWxpemVTdWJ2aWV3czogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3Vidmlld3MpIHJldHVybjtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBpbiB0aGlzLnN1YnZpZXdzKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVN1YnZpZXcodGhpcy5zdWJ2aWV3c1tpdGVtXSwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gIyMgX3BhcnNlU3Vidmlld1xuICAgIC8vIGhlbHBlciBmb3IgcGFyc2luZyBvdXQgdGhlIHN1YnZpZXcgZGVjbGFyYXRpb24gYW5kIHJlZ2lzdGVyaW5nXG4gICAgLy8gdGhlIGB3YWl0Rm9yYCBpZiBuZWVkIGJlLlxuICAgIF9wYXJzZVN1YnZpZXc6IGZ1bmN0aW9uIChzdWJ2aWV3LCBuYW1lKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG9wdHMgPSB7XG4gICAgICAgICAgICBzZWxlY3Rvcjogc3Vidmlldy5jb250YWluZXIgfHwgJ1tkYXRhLWhvb2s9XCInICsgc3Vidmlldy5ob29rICsgJ1wiXScsXG4gICAgICAgICAgICB3YWl0Rm9yOiBzdWJ2aWV3LndhaXRGb3IgfHwgJycsXG4gICAgICAgICAgICBwcmVwYXJlVmlldzogc3Vidmlldy5wcmVwYXJlVmlldyB8fCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHN1YnZpZXcuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICBlbDogZWwsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogc2VsZlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBhY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwsIHN1YnZpZXc7XG4gICAgICAgICAgICAvLyBpZiBub3QgcmVuZGVyZWQgb3Igd2UgY2FuJ3QgZmluZCBvdXIgZWxlbWVudCwgc3RvcCBoZXJlLlxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsIHx8ICEoZWwgPSB0aGlzLnF1ZXJ5KG9wdHMuc2VsZWN0b3IpKSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFvcHRzLndhaXRGb3IgfHwgZ2V0UGF0aCh0aGlzLCBvcHRzLndhaXRGb3IpKSB7XG4gICAgICAgICAgICAgICAgc3VidmlldyA9IHRoaXNbbmFtZV0gPSBvcHRzLnByZXBhcmVWaWV3LmNhbGwodGhpcywgZWwpO1xuICAgICAgICAgICAgICAgIHN1YnZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlclN1YnZpZXcoc3Vidmlldyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoJ2NoYW5nZScsIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgbGlzdGVuIGZvciBtYWluIGBjaGFuZ2VgIGl0ZW1zXG4gICAgICAgIHRoaXMub24oJ2NoYW5nZScsIGFjdGlvbiwgdGhpcyk7XG4gICAgfSxcblxuXG4gICAgLy8gU2hvcnRjdXQgZm9yIGRvaW5nIGV2ZXJ5dGhpbmcgd2UgbmVlZCB0byBkbyB0b1xuICAgIC8vIHJlbmRlciBhbmQgZnVsbHkgcmVwbGFjZSBjdXJyZW50IHJvb3QgZWxlbWVudC5cbiAgICAvLyBFaXRoZXIgZGVmaW5lIGEgYHRlbXBsYXRlYCBwcm9wZXJ0eSBvZiB5b3VyIHZpZXdcbiAgICAvLyBvciBwYXNzIGluIGEgdGVtcGxhdGUgZGlyZWN0bHkuXG4gICAgLy8gVGhlIHRlbXBsYXRlIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbi5cbiAgICAvLyBJZiBpdCdzIGEgZnVuY3Rpb24gaXQgd2lsbCBiZSBwYXNzZWQgdGhlIGBjb250ZXh0YFxuICAgIC8vIGFyZ3VtZW50LlxuICAgIHJlbmRlcldpdGhUZW1wbGF0ZTogZnVuY3Rpb24gKGNvbnRleHQsIHRlbXBsYXRlQXJnKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRlbXBsYXRlQXJnIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgICAgIGlmICghdGVtcGxhdGUpIHRocm93IG5ldyBFcnJvcignVGVtcGxhdGUgc3RyaW5nIG9yIGZ1bmN0aW9uIG5lZWRlZC4nKTtcbiAgICAgICAgdmFyIG5ld0RvbSA9IF8uaXNTdHJpbmcodGVtcGxhdGUpID8gdGVtcGxhdGUgOiB0ZW1wbGF0ZS5jYWxsKHRoaXMsIGNvbnRleHQgfHwgdGhpcyk7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKG5ld0RvbSkpIG5ld0RvbSA9IGRvbWlmeShuZXdEb20pO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5lbCAmJiB0aGlzLmVsLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RG9tLCB0aGlzLmVsKTtcbiAgICAgICAgaWYgKG5ld0RvbS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudC1mcmFnbWVudCcpIHRocm93IG5ldyBFcnJvcignVmlld3MgY2FuIG9ubHkgaGF2ZSBvbmUgcm9vdCBlbGVtZW50LicpO1xuICAgICAgICB0aGlzLmVsID0gbmV3RG9tO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gIyMgY2FjaGVFbGVtZW50c1xuICAgIC8vIFRoaXMgaXMgYSBzaG9ydGN1dCBmb3IgYWRkaW5nIHJlZmVyZW5jZSB0byBzcGVjaWZpYyBlbGVtZW50cyB3aXRoaW4geW91ciB2aWV3IGZvclxuICAgIC8vIGFjY2VzcyBsYXRlci4gVGhpcyBhdm9pZHMgZXhjZXNzaXZlIERPTSBxdWVyaWVzIGFuZCBtYWtlcyBpdCBlYXNpZXIgdG8gdXBkYXRlXG4gICAgLy8geW91ciB2aWV3IGlmIHlvdXIgdGVtcGxhdGUgY2hhbmdlcy5cbiAgICAvL1xuICAgIC8vIEluIHlvdXIgYHJlbmRlcmAgbWV0aG9kLiBVc2UgaXQgbGlrZSBzbzpcbiAgICAvL1xuICAgIC8vICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICB0aGlzLmJhc2ljUmVuZGVyKCk7XG4gICAgLy8gICAgICAgdGhpcy5jYWNoZUVsZW1lbnRzKHtcbiAgICAvLyAgICAgICAgIHBhZ2VzOiAnI3BhZ2VzJyxcbiAgICAvLyAgICAgICAgIGNoYXQ6ICcjdGVhbUNoYXQnLFxuICAgIC8vICAgICAgICAgbmF2OiAnbmF2I3ZpZXdzIHVsJyxcbiAgICAvLyAgICAgICAgIG1lOiAnI21lJyxcbiAgICAvLyAgICAgICAgIGNoZWF0U2hlZXQ6ICcjY2hlYXRTaGVldCcsXG4gICAgLy8gICAgICAgICBvbW5pQm94OiAnI2F3ZXNvbWVTYXVjZSdcbiAgICAvLyAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gVGhlbiBsYXRlciB5b3UgY2FuIGFjY2VzcyBlbGVtZW50cyBieSByZWZlcmVuY2UgbGlrZSBzbzogYHRoaXMucGFnZXNgLCBvciBgdGhpcy5jaGF0YC5cbiAgICBjYWNoZUVsZW1lbnRzOiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICBmb3IgKHZhciBpdGVtIGluIGhhc2gpIHtcbiAgICAgICAgICAgIHRoaXNbaXRlbV0gPSB0aGlzLnF1ZXJ5KGhhc2hbaXRlbV0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vICMjIGxpc3RlblRvQW5kUnVuXG4gICAgLy8gU2hvcnRjdXQgZm9yIHJlZ2lzdGVyaW5nIGEgbGlzdGVuZXIgZm9yIGEgbW9kZWxcbiAgICAvLyBhbmQgYWxzbyB0cmlnZ2VyaW5nIGl0IHJpZ2h0IGF3YXkuXG4gICAgbGlzdGVuVG9BbmRSdW46IGZ1bmN0aW9uIChvYmplY3QsIGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICB2YXIgYm91bmQgPSBfLmJpbmQoaGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8ob2JqZWN0LCBldmVudHMsIGJvdW5kKTtcbiAgICAgICAgYm91bmQoKTtcbiAgICB9LFxuXG4gICAgLy8gIyMgYW5pbWF0ZVJlbW92ZVxuICAgIC8vIFBsYWNlaG9sZGVyIGZvciBpZiB5b3Ugd2FudCB0byBkbyBzb21ldGhpbmcgc3BlY2lhbCB3aGVuIHRoZXkncmUgcmVtb3ZlZC5cbiAgICAvLyBGb3IgZXhhbXBsZSBmYWRlIGl0IG91dCwgZXRjLlxuICAgIC8vIEFueSBvdmVycmlkZSBoZXJlIHNob3VsZCBjYWxsIGAucmVtb3ZlKClgIHdoZW4gZG9uZS5cbiAgICBhbmltYXRlUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vICMjIHJlbmRlckNvbGxlY3Rpb25cbiAgICAvLyBNZXRob2QgZm9yIHJlbmRlcmluZyBhIGNvbGxlY3Rpb25zIHdpdGggaW5kaXZpZHVhbCB2aWV3cy5cbiAgICAvLyBKdXN0IHBhc3MgaXQgdGhlIGNvbGxlY3Rpb24sIGFuZCB0aGUgdmlldyB0byB1c2UgZm9yIHRoZSBpdGVtcyBpbiB0aGVcbiAgICAvLyBjb2xsZWN0aW9uLiBUaGUgY29sbGVjdGlvblZpZXcgaXMgcmV0dXJuZWQuXG4gICAgcmVuZGVyQ29sbGVjdGlvbjogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIFZpZXdDbGFzcywgY29udGFpbmVyLCBvcHRzKSB7XG4gICAgICAgIHZhciBjb250YWluZXJFbCA9ICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykgPyB0aGlzLnF1ZXJ5KGNvbnRhaW5lcikgOiBjb250YWluZXI7XG4gICAgICAgIHZhciBjb25maWcgPSBfLmV4dGVuZCh7XG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uLFxuICAgICAgICAgICAgZWw6IGNvbnRhaW5lckVsIHx8IHRoaXMuZWwsXG4gICAgICAgICAgICB2aWV3OiBWaWV3Q2xhc3MsXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICB2aWV3T3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHBhcmVudDogdGhpc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb25WaWV3ID0gbmV3IENvbGxlY3Rpb25WaWV3KGNvbmZpZyk7XG4gICAgICAgIGNvbGxlY3Rpb25WaWV3LnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlclN1YnZpZXcoY29sbGVjdGlvblZpZXcpO1xuICAgIH1cbn0pO1xuXG5WaWV3LmV4dGVuZCA9IEJhc2VTdGF0ZS5leHRlbmQ7XG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7XG4iLCI7aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHsgIHdpbmRvdy5hbXBlcnNhbmQgPSB3aW5kb3cuYW1wZXJzYW5kIHx8IHt9OyAgd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1jb2xsZWN0aW9uLXZpZXdcIl0gPSB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWNvbGxlY3Rpb24tdmlld1wiXSB8fCBbXTsgIHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtY29sbGVjdGlvbi12aWV3XCJdLnB1c2goXCIxLjEuM1wiKTt9XG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbnZhciBCQkV2ZW50cyA9IHJlcXVpcmUoJ2JhY2tib25lLWV2ZW50cy1zdGFuZGFsb25lJyk7XG52YXIgYW1wRXh0ZW5kID0gcmVxdWlyZSgnYW1wZXJzYW5kLWNsYXNzLWV4dGVuZCcpO1xuXG4vLyBvcHRpb25zXG52YXIgb3B0aW9ucyA9IFsnY29sbGVjdGlvbicsICdlbCcsICd2aWV3T3B0aW9ucycsICd2aWV3JywgJ2ZpbHRlcicsICdyZXZlcnNlJywgJ3BhcmVudCddO1xuXG5cbmZ1bmN0aW9uIENvbGxlY3Rpb25WaWV3KHNwZWMpIHtcbiAgICBpZiAoIXNwZWMpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDb2xsZWN0aW9uIHZpZXcgbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXJzOiBjb2xsZWN0aW9uLCBlbCcpO1xuICAgIH1cbiAgICBpZiAoIXNwZWMuY29sbGVjdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0NvbGxlY3Rpb24gdmlldyByZXF1aXJlcyBhIGNvbGxlY3Rpb24nKTtcbiAgICB9XG4gICAgaWYgKCFzcGVjLmVsICYmICF0aGlzLmluc2VydFNlbGYpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDb2xsZWN0aW9uIHZpZXcgcmVxdWlyZXMgYW4gZWwnKTtcbiAgICB9XG4gICAgXy5leHRlbmQodGhpcywgXy5waWNrKHNwZWMsIG9wdGlvbnMpKTtcbiAgICB0aGlzLnZpZXdzID0gW107XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICdhZGQnLCB0aGlzLl9hZGRWaWV3Rm9yTW9kZWwpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAncmVtb3ZlJywgdGhpcy5fcmVtb3ZlVmlld0Zvck1vZGVsKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwgJ3NvcnQnLCB0aGlzLl9yZXJlbmRlckFsbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICdyZWZyZXNoIHJlc2V0JywgdGhpcy5fcmVzZXQpO1xufVxuXG5fLmV4dGVuZChDb2xsZWN0aW9uVmlldy5wcm90b3R5cGUsIEJCRXZlbnRzLCB7XG4gICAgLy8gZm9yIHZpZXcgY29udHJhY3QgY29tcGxpYW5jZVxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJBbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXy5pbnZva2UodGhpcy52aWV3cywgJ3JlbW92ZScpO1xuICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICB9LFxuICAgIF9nZXRWaWV3QnlNb2RlbDogZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiBfLmZpbmQodGhpcy52aWV3cywgZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbCA9PT0gdmlldy5tb2RlbDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBfY3JlYXRlVmlld0Zvck1vZGVsOiBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgdGhpcy52aWV3KF8oe21vZGVsOiBtb2RlbCwgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9ufSkuZXh0ZW5kKHRoaXMudmlld09wdGlvbnMpKTtcbiAgICAgICAgdGhpcy52aWV3cy5wdXNoKHZpZXcpO1xuICAgICAgICB2aWV3LnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHZpZXcucmVuZGVyZWRCeVBhcmVudFZpZXcgPSB0cnVlO1xuICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9LFxuICAgIF9nZXRPckNyZWF0ZUJ5TW9kZWw6IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Vmlld0J5TW9kZWwobW9kZWwpIHx8IHRoaXMuX2NyZWF0ZVZpZXdGb3JNb2RlbChtb2RlbCk7XG4gICAgfSxcbiAgICBfYWRkVmlld0Zvck1vZGVsOiBmdW5jdGlvbiAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzLl9nZXRWaWV3QnlNb2RlbChtb2RlbCk7XG4gICAgICAgIHZhciBtYXRjaGVzID0gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlcihtb2RlbCkgOiB0cnVlO1xuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgdGhpcy52aWV3KF8oe21vZGVsOiBtb2RlbCwgY29sbGVjdGlvbjogdGhpcy5jb2xsZWN0aW9ufSkuZXh0ZW5kKHRoaXMudmlld09wdGlvbnMpKTtcbiAgICAgICAgICAgIHRoaXMudmlld3MucHVzaCh2aWV3KTtcbiAgICAgICAgICAgIHZpZXcucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHZpZXcucmVuZGVyZWRCeVBhcmVudFZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgdmlldy5yZW5kZXIoe2NvbnRhaW5lckVsOiB0aGlzLmVsfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5faW5zZXJ0Vmlldyh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2luc2VydFZpZXdBdEluZGV4KHZpZXcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaW5zZXJ0Vmlld0F0SW5kZXg6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgIGlmICghdmlldy5pbnNlcnRTZWxmKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5jb2xsZWN0aW9uLmluZGV4T2Yodmlldy5tb2RlbCk7XG4gICAgICAgICAgICB2YXIgbW9kZWxUb0luc2VydEJlZm9yZSwgdmlld1RvSW5zZXJ0QmVmb3JlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxUb0luc2VydEJlZm9yZSA9IHRoaXMuY29sbGVjdGlvbi5hdChwb3MgLSAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kZWxUb0luc2VydEJlZm9yZSA9IHRoaXMuY29sbGVjdGlvbi5hdChwb3MgKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmlld1RvSW5zZXJ0QmVmb3JlID0gdGhpcy5fZ2V0Vmlld0J5TW9kZWwobW9kZWxUb0luc2VydEJlZm9yZSk7XG5cbiAgICAgICAgICAgIC8vIEZJWCBJRSBidWcgKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlLmluc2VydEJlZm9yZSlcbiAgICAgICAgICAgIC8vIFwiSW4gSW50ZXJuZXQgRXhwbG9yZXIgYW4gdW5kZWZpbmVkIHZhbHVlIGFzIHJlZmVyZW5jZUVsZW1lbnQgd2lsbCB0aHJvdyBlcnJvcnMsIHdoaWxlIGluIHJlc3Qgb2YgdGhlIG1vZGVybiBicm93c2VycywgdGhpcyB3b3JrcyBmaW5lLlwiXG4gICAgICAgICAgICBpZih2aWV3VG9JbnNlcnRCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmluc2VydEJlZm9yZSh2aWV3LmVsLCB2aWV3VG9JbnNlcnRCZWZvcmUgJiYgdmlld1RvSW5zZXJ0QmVmb3JlLmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh2aWV3LmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2luc2VydFZpZXc6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgIGlmICghdmlldy5pbnNlcnRTZWxmKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXZlcnNlICYmIHRoaXMuZWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuaW5zZXJ0QmVmb3JlKHZpZXcuZWwsIHRoaXMuZWwuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodmlldy5lbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9yZW1vdmVWaWV3Rm9yTW9kZWw6IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXMuX2dldFZpZXdCeU1vZGVsKG1vZGVsKTtcbiAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy52aWV3cy5pbmRleE9mKHZpZXcpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgaXQgaWYgd2UgZm91bmQgaXQgY2FsbGluZyBhbmltYXRlUmVtb3ZlXG4gICAgICAgICAgICAvLyB0byBnaXZlIHVzZXIgb3B0aW9uIG9mIGdyYWNlZnVsbHkgZGVzdHJveWluZy5cbiAgICAgICAgICAgIHZpZXcgPSB0aGlzLnZpZXdzLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVWaWV3KHZpZXcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfcmVtb3ZlVmlldzogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgaWYgKHZpZXcuYW5pbWF0ZVJlbW92ZSkge1xuICAgICAgICAgICAgdmlldy5hbmltYXRlUmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfcmVuZGVyQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5lYWNoKHRoaXMuX2FkZFZpZXdGb3JNb2RlbCwgdGhpcyk7XG4gICAgfSxcbiAgICBfcmVyZW5kZXJBbGw6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZpZXdGb3JNb2RlbChtb2RlbCwgdGhpcywgXy5leHRlbmQob3B0aW9ucywge3JlcmVuZGVyOiB0cnVlfSkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuICAgIF9yZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3Vmlld3MgPSB0aGlzLmNvbGxlY3Rpb24ubWFwKHRoaXMuX2dldE9yQ3JlYXRlQnlNb2RlbCwgdGhpcyk7XG5cbiAgICAgICAgLy9SZW1vdmUgZXhpc3Rpbmcgdmlld3MgZnJvbSB0aGUgdWlcbiAgICAgICAgdmFyIHRvUmVtb3ZlID0gXy5kaWZmZXJlbmNlKHRoaXMudmlld3MsIG5ld1ZpZXdzKTtcbiAgICAgICAgdG9SZW1vdmUuZm9yRWFjaCh0aGlzLl9yZW1vdmVWaWV3LCB0aGlzKTtcblxuICAgICAgICAvL1JlcmVuZGVyIHRoZSBmdWxsIGxpc3Qgd2l0aCB0aGUgbmV3IHZpZXdzXG4gICAgICAgIHRoaXMudmlld3MgPSBuZXdWaWV3cztcbiAgICAgICAgdGhpcy5fcmVyZW5kZXJBbGwoKTtcbiAgICB9XG59KTtcblxuQ29sbGVjdGlvblZpZXcuZXh0ZW5kID0gYW1wRXh0ZW5kO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25WaWV3O1xuIiwiLyoqXG4gKiBTdGFuZGFsb25lIGV4dHJhY3Rpb24gb2YgQmFja2JvbmUuRXZlbnRzLCBubyBleHRlcm5hbCBkZXBlbmRlbmN5IHJlcXVpcmVkLlxuICogRGVncmFkZXMgbmljZWx5IHdoZW4gQmFja29uZS91bmRlcnNjb3JlIGFyZSBhbHJlYWR5IGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudFxuICogZ2xvYmFsIGNvbnRleHQuXG4gKlxuICogTm90ZSB0aGF0IGRvY3Mgc3VnZ2VzdCB0byB1c2UgdW5kZXJzY29yZSdzIGBfLmV4dGVuZCgpYCBtZXRob2QgdG8gYWRkIEV2ZW50c1xuICogc3VwcG9ydCB0byBzb21lIGdpdmVuIG9iamVjdC4gQSBgbWl4aW4oKWAgbWV0aG9kIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBFdmVudHNcbiAqIHByb3RvdHlwZSB0byBhdm9pZCB1c2luZyB1bmRlcnNjb3JlIGZvciB0aGF0IHNvbGUgcHVycG9zZTpcbiAqXG4gKiAgICAgdmFyIG15RXZlbnRFbWl0dGVyID0gQmFja2JvbmVFdmVudHMubWl4aW4oe30pO1xuICpcbiAqIE9yIGZvciBhIGZ1bmN0aW9uIGNvbnN0cnVjdG9yOlxuICpcbiAqICAgICBmdW5jdGlvbiBNeUNvbnN0cnVjdG9yKCl7fVxuICogICAgIE15Q29uc3RydWN0b3IucHJvdG90eXBlLmZvbyA9IGZ1bmN0aW9uKCl7fVxuICogICAgIEJhY2tib25lRXZlbnRzLm1peGluKE15Q29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAqXG4gKiAoYykgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBJbmMuXG4gKiAoYykgMjAxMyBOaWNvbGFzIFBlcnJpYXVsdFxuICovXG4vKiBnbG9iYWwgZXhwb3J0czp0cnVlLCBkZWZpbmUsIG1vZHVsZSAqL1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgcm9vdCA9IHRoaXMsXG4gICAgICBicmVha2VyID0ge30sXG4gICAgICBuYXRpdmVGb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgIGlkQ291bnRlciA9IDA7XG5cbiAgLy8gUmV0dXJucyBhIHBhcnRpYWwgaW1wbGVtZW50YXRpb24gbWF0Y2hpbmcgdGhlIG1pbmltYWwgQVBJIHN1YnNldCByZXF1aXJlZFxuICAvLyBieSBCYWNrYm9uZS5FdmVudHNcbiAgZnVuY3Rpb24gbWluaXNjb3JlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBrZXlzOiBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIiB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwia2V5cygpIGNhbGxlZCBvbiBhIG5vbi1vYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSwga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXNba2V5cy5sZW5ndGhdID0ga2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgIH0sXG5cbiAgICAgIHVuaXF1ZUlkOiBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICAgICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gICAgICB9LFxuXG4gICAgICBoYXM6IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICAgIH0sXG5cbiAgICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBicmVha2VyKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBvbmNlOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHZhciByYW4gPSBmYWxzZSwgbWVtbztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChyYW4pIHJldHVybiBtZW1vO1xuICAgICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIF8gPSBtaW5pc2NvcmUoKSwgRXZlbnRzO1xuXG4gIC8vIEJhY2tib25lLkV2ZW50c1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBBIG1vZHVsZSB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byAqYW55IG9iamVjdCogaW4gb3JkZXIgdG8gcHJvdmlkZSBpdCB3aXRoXG4gIC8vIGN1c3RvbSBldmVudHMuIFlvdSBtYXkgYmluZCB3aXRoIGBvbmAgb3IgcmVtb3ZlIHdpdGggYG9mZmAgY2FsbGJhY2tcbiAgLy8gZnVuY3Rpb25zIHRvIGFuIGV2ZW50OyBgdHJpZ2dlcmAtaW5nIGFuIGV2ZW50IGZpcmVzIGFsbCBjYWxsYmFja3MgaW5cbiAgLy8gc3VjY2Vzc2lvbi5cbiAgLy9cbiAgLy8gICAgIHZhciBvYmplY3QgPSB7fTtcbiAgLy8gICAgIF8uZXh0ZW5kKG9iamVjdCwgQmFja2JvbmUuRXZlbnRzKTtcbiAgLy8gICAgIG9iamVjdC5vbignZXhwYW5kJywgZnVuY3Rpb24oKXsgYWxlcnQoJ2V4cGFuZGVkJyk7IH0pO1xuICAvLyAgICAgb2JqZWN0LnRyaWdnZXIoJ2V4cGFuZCcpO1xuICAvL1xuICBFdmVudHMgPSB7XG5cbiAgICAvLyBCaW5kIGFuIGV2ZW50IHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi4gUGFzc2luZyBgXCJhbGxcImAgd2lsbCBiaW5kXG4gICAgLy8gdGhlIGNhbGxiYWNrIHRvIGFsbCBldmVudHMgZmlyZWQuXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb24nLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSB8fCAhY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdIHx8ICh0aGlzLl9ldmVudHNbbmFtZV0gPSBbXSk7XG4gICAgICBldmVudHMucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0LCBjdHg6IGNvbnRleHQgfHwgdGhpc30pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gb25seSBiZSB0cmlnZ2VyZWQgYSBzaW5nbGUgdGltZS4gQWZ0ZXIgdGhlIGZpcnN0IHRpbWVcbiAgICAvLyB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZCwgaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgIG9uY2U6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgb25jZSA9IF8ub25jZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5vZmYobmFtZSwgb25jZSk7XG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICAgIG9uY2UuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBvbmNlLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIG9uZSBvciBtYW55IGNhbGxiYWNrcy4gSWYgYGNvbnRleHRgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIHdpdGggdGhhdCBmdW5jdGlvbi4gSWYgYGNhbGxiYWNrYCBpcyBudWxsLCByZW1vdmVzIGFsbFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgdGhlIGV2ZW50LiBJZiBgbmFtZWAgaXMgbnVsbCwgcmVtb3ZlcyBhbGwgYm91bmRcbiAgICAvLyBjYWxsYmFja3MgZm9yIGFsbCBldmVudHMuXG4gICAgb2ZmOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgdmFyIHJldGFpbiwgZXYsIGV2ZW50cywgbmFtZXMsIGksIGwsIGosIGs7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkgcmV0dXJuIHRoaXM7XG4gICAgICBpZiAoIW5hbWUgJiYgIWNhbGxiYWNrICYmICFjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogXy5rZXlzKHRoaXMuX2V2ZW50cyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgaWYgKGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXSA9IHJldGFpbiA9IFtdO1xuICAgICAgICAgIGlmIChjYWxsYmFjayB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gVHJpZ2dlciBvbmUgb3IgbWFueSBldmVudHMsIGZpcmluZyBhbGwgYm91bmQgY2FsbGJhY2tzLiBDYWxsYmFja3MgYXJlXG4gICAgLy8gcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBgdHJpZ2dlcmAgaXMsIGFwYXJ0IGZyb20gdGhlIGV2ZW50IG5hbWVcbiAgICAvLyAodW5sZXNzIHlvdSdyZSBsaXN0ZW5pbmcgb24gYFwiYWxsXCJgLCB3aGljaCB3aWxsIGNhdXNlIHlvdXIgY2FsbGJhY2sgdG9cbiAgICAvLyByZWNlaXZlIHRoZSB0cnVlIG5hbWUgb2YgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCkuXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICB2YXIgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICAgIGlmIChldmVudHMpIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzKTtcbiAgICAgIGlmIChhbGxFdmVudHMpIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRlbGwgdGhpcyBvYmplY3QgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gZWl0aGVyIHNwZWNpZmljIGV2ZW50cyAuLi4gb3JcbiAgICAvLyB0byBldmVyeSBvYmplY3QgaXQncyBjdXJyZW50bHkgbGlzdGVuaW5nIHRvLlxuICAgIHN0b3BMaXN0ZW5pbmc6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZGVsZXRlTGlzdGVuZXIgPSAhbmFtZSAmJiAhY2FsbGJhY2s7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBpZiAob2JqKSAobGlzdGVuZXJzID0ge30pW29iai5fbGlzdGVuZXJJZF0gPSBvYmo7XG4gICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgbGlzdGVuZXJzW2lkXS5vZmYobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBpZiAoZGVsZXRlTGlzdGVuZXIpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbaWRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gc3BsaXQgZXZlbnQgc3RyaW5ncy5cbiAgdmFyIGV2ZW50U3BsaXR0ZXIgPSAvXFxzKy87XG5cbiAgLy8gSW1wbGVtZW50IGZhbmN5IGZlYXR1cmVzIG9mIHRoZSBFdmVudHMgQVBJIHN1Y2ggYXMgbXVsdGlwbGUgZXZlbnRcbiAgLy8gbmFtZXMgYFwiY2hhbmdlIGJsdXJcImAgYW5kIGpRdWVyeS1zdHlsZSBldmVudCBtYXBzIGB7Y2hhbmdlOiBhY3Rpb259YFxuICAvLyBpbiB0ZXJtcyBvZiB0aGUgZXhpc3RpbmcgQVBJLlxuICB2YXIgZXZlbnRzQXBpID0gZnVuY3Rpb24ob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBba2V5LCBuYW1lW2tleV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHNwYWNlIHNlcGFyYXRlZCBldmVudCBuYW1lcy5cbiAgICBpZiAoZXZlbnRTcGxpdHRlci50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBbbmFtZXNbaV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gQSBkaWZmaWN1bHQtdG8tYmVsaWV2ZSwgYnV0IG9wdGltaXplZCBpbnRlcm5hbCBkaXNwYXRjaCBmdW5jdGlvbiBmb3JcbiAgLy8gdHJpZ2dlcmluZyBldmVudHMuIFRyaWVzIHRvIGtlZXAgdGhlIHVzdWFsIGNhc2VzIHNwZWVkeSAobW9zdCBpbnRlcm5hbFxuICAvLyBCYWNrYm9uZSBldmVudHMgaGF2ZSAzIGFyZ3VtZW50cykuXG4gIHZhciB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzKSB7XG4gICAgdmFyIGV2LCBpID0gLTEsIGwgPSBldmVudHMubGVuZ3RoLCBhMSA9IGFyZ3NbMF0sIGEyID0gYXJnc1sxXSwgYTMgPSBhcmdzWzJdO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgpOyByZXR1cm47XG4gICAgICBjYXNlIDE6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7IHJldHVybjtcbiAgICAgIGNhc2UgMjogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7IHJldHVybjtcbiAgICAgIGNhc2UgMzogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpOyByZXR1cm47XG4gICAgICBkZWZhdWx0OiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbGlzdGVuTWV0aG9kcyA9IHtsaXN0ZW5UbzogJ29uJywgbGlzdGVuVG9PbmNlOiAnb25jZSd9O1xuXG4gIC8vIEludmVyc2lvbi1vZi1jb250cm9sIHZlcnNpb25zIG9mIGBvbmAgYW5kIGBvbmNlYC4gVGVsbCAqdGhpcyogb2JqZWN0IHRvXG4gIC8vIGxpc3RlbiB0byBhbiBldmVudCBpbiBhbm90aGVyIG9iamVjdCAuLi4ga2VlcGluZyB0cmFjayBvZiB3aGF0IGl0J3NcbiAgLy8gbGlzdGVuaW5nIHRvLlxuICBfLmVhY2gobGlzdGVuTWV0aG9kcywgZnVuY3Rpb24oaW1wbGVtZW50YXRpb24sIG1ldGhvZCkge1xuICAgIEV2ZW50c1ttZXRob2RdID0gZnVuY3Rpb24ob2JqLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCAodGhpcy5fbGlzdGVuZXJzID0ge30pO1xuICAgICAgdmFyIGlkID0gb2JqLl9saXN0ZW5lcklkIHx8IChvYmouX2xpc3RlbmVySWQgPSBfLnVuaXF1ZUlkKCdsJykpO1xuICAgICAgbGlzdGVuZXJzW2lkXSA9IG9iajtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIG9ialtpbXBsZW1lbnRhdGlvbl0obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWxpYXNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIEV2ZW50cy5iaW5kICAgPSBFdmVudHMub247XG4gIEV2ZW50cy51bmJpbmQgPSBFdmVudHMub2ZmO1xuXG4gIC8vIE1peGluIHV0aWxpdHlcbiAgRXZlbnRzLm1peGluID0gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICB2YXIgZXhwb3J0cyA9IFsnb24nLCAnb25jZScsICdvZmYnLCAndHJpZ2dlcicsICdzdG9wTGlzdGVuaW5nJywgJ2xpc3RlblRvJyxcbiAgICAgICAgICAgICAgICAgICAnbGlzdGVuVG9PbmNlJywgJ2JpbmQnLCAndW5iaW5kJ107XG4gICAgXy5lYWNoKGV4cG9ydHMsIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHByb3RvW25hbWVdID0gdGhpc1tuYW1lXTtcbiAgICB9LCB0aGlzKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH07XG5cbiAgLy8gRXhwb3J0IEV2ZW50cyBhcyBCYWNrYm9uZUV2ZW50cyBkZXBlbmRpbmcgb24gY3VycmVudCBjb250ZXh0XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRXZlbnRzO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuICAgIH1cbiAgICBleHBvcnRzLkJhY2tib25lRXZlbnRzID0gRXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuQmFja2JvbmVFdmVudHMgPSBFdmVudHM7XG4gIH1cbn0pKHRoaXMpO1xuIiwiO2lmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7ICB3aW5kb3cuYW1wZXJzYW5kID0gd2luZG93LmFtcGVyc2FuZCB8fCB7fTsgIHdpbmRvdy5hbXBlcnNhbmRbXCJhbXBlcnNhbmQtZG9tLWJpbmRpbmdzXCJdID0gd2luZG93LmFtcGVyc2FuZFtcImFtcGVyc2FuZC1kb20tYmluZGluZ3NcIl0gfHwgW107ICB3aW5kb3cuYW1wZXJzYW5kW1wiYW1wZXJzYW5kLWRvbS1iaW5kaW5nc1wiXS5wdXNoKFwiMy4zLjNcIik7fVxudmFyIFN0b3JlID0gcmVxdWlyZSgna2V5LXRyZWUtc3RvcmUnKTtcbnZhciBkb20gPSByZXF1aXJlKCdhbXBlcnNhbmQtZG9tJyk7XG52YXIgbWF0Y2hlc1NlbGVjdG9yID0gcmVxdWlyZSgnbWF0Y2hlcy1zZWxlY3RvcicpO1xuXG5cbi8vIHJldHVybnMgYSBrZXktdHJlZS1zdG9yZSBvZiBmdW5jdGlvbnNcbi8vIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gYW55IGVsZW1lbnQvbW9kZWwuXG5cbi8vIGFsbCByZXN1bHRpbmcgZnVuY3Rpb25zIHNob3VsZCBiZSBjYWxsZWRcbi8vIGxpa2UgZnVuYyhlbCwgdmFsdWUsIGxhc3RLZXlOYW1lKVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYmluZGluZ3MsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RvcmUgPSBuZXcgU3RvcmUoKTtcbiAgICB2YXIga2V5LCBjdXJyZW50O1xuXG4gICAgZm9yIChrZXkgaW4gYmluZGluZ3MpIHtcbiAgICAgICAgY3VycmVudCA9IGJpbmRpbmdzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHN0b3JlLmFkZChrZXksIGdldEJpbmRpbmdGdW5jKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGN1cnJlbnRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmZvckVhY2gpIHtcbiAgICAgICAgICAgIGN1cnJlbnQuZm9yRWFjaChmdW5jdGlvbiAoYmluZGluZykge1xuICAgICAgICAgICAgICAgIHN0b3JlLmFkZChrZXksIGdldEJpbmRpbmdGdW5jKGJpbmRpbmcsIGNvbnRleHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RvcmUuYWRkKGtleSwgZ2V0QmluZGluZ0Z1bmMoY3VycmVudCwgY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3JlO1xufTtcblxuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbmZ1bmN0aW9uIGdldE1hdGNoZXMoZWwsIHNlbGVjdG9yKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSAnJykgcmV0dXJuIFtlbF07XG4gICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKGVsLCBzZWxlY3RvcikpIG1hdGNoZXMucHVzaChlbCk7XG4gICAgcmV0dXJuIG1hdGNoZXMuY29uY2F0KHNsaWNlLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpKTtcbn1cblxuZnVuY3Rpb24gbWFrZUFycmF5KHZhbCkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbdmFsXTtcbn1cblxuZnVuY3Rpb24gZ2V0QmluZGluZ0Z1bmMoYmluZGluZywgY29udGV4dCkge1xuICAgIHZhciB0eXBlID0gYmluZGluZy50eXBlIHx8ICd0ZXh0JztcbiAgICB2YXIgaXNDdXN0b21CaW5kaW5nID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgdmFyIHNlbGVjdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nLnNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmcuc2VsZWN0b3I7XG4gICAgICAgIH0gZWxzZSBpZiAoYmluZGluZy5ob29rKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tkYXRhLWhvb2t+PVwiJyArIGJpbmRpbmcuaG9vayArICdcIl0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICB2YXIgeWVzID0gYmluZGluZy55ZXM7XG4gICAgdmFyIG5vID0gYmluZGluZy5ubztcbiAgICB2YXIgaGFzWWVzTm8gPSAhISh5ZXMgfHwgbm8pO1xuXG4gICAgLy8gc3RvcmFnZSB2YXJpYWJsZSBmb3IgcHJldmlvdXMgaWYgcmVsZXZhbnRcbiAgICB2YXIgcHJldmlvdXNWYWx1ZTtcblxuICAgIGlmIChpc0N1c3RvbUJpbmRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHR5cGUuY2FsbChjb250ZXh0LCBtYXRjaCwgdmFsdWUsIHByZXZpb3VzVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGRvbS50ZXh0KG1hdGNoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbGFzcycpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGRvbS5zd2l0Y2hDbGFzcyhtYXRjaCwgcHJldmlvdXNWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXR0cmlidXRlJykge1xuICAgICAgICBpZiAoIWJpbmRpbmcubmFtZSkgdGhyb3cgRXJyb3IoJ2F0dHJpYnV0ZSBiaW5kaW5ncyBtdXN0IGhhdmUgYSBcIm5hbWVcIicpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIG5hbWVzID0gbWFrZUFycmF5KGJpbmRpbmcubmFtZSk7XG4gICAgICAgICAgICBnZXRNYXRjaGVzKGVsLCBzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUobWF0Y2gsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xuICAgICAgICAgICAgZ2V0TWF0Y2hlcyhlbCwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkgdmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGFwcGx5IGJpbmRpbmdzIGlmIGVsZW1lbnQgaXMgbm90IGN1cnJlbnRseSBmb2N1c2VkXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IG1hdGNoKSBtYXRjaC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYm9vbGVhbkNsYXNzJykge1xuICAgICAgICAvLyBpZiB0aGVyZSdzIGEgYG5vYCBjYXNlIHRoaXMgaXMgYWN0dWFsbHkgYSBzd2l0Y2hcbiAgICAgICAgaWYgKGhhc1llc05vKSB7XG4gICAgICAgICAgICB5ZXMgPSBtYWtlQXJyYXkoeWVzIHx8ICcnKTtcbiAgICAgICAgICAgIG5vID0gbWFrZUFycmF5KG5vIHx8ICcnKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZDbGFzcyA9IHZhbHVlID8gbm8gOiB5ZXM7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0NsYXNzID0gdmFsdWUgPyB5ZXMgOiBubztcbiAgICAgICAgICAgICAgICBnZXRNYXRjaGVzKGVsLCBzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNsYXNzLmZvckVhY2goZnVuY3Rpb24gKHBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MobWF0Y2gsIHBjKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0NsYXNzLmZvckVhY2goZnVuY3Rpb24gKG5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MobWF0Y2gsIG5jKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUsIGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG1ha2VBcnJheShiaW5kaW5nLm5hbWUgfHwga2V5TmFtZSk7XG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcyhlbCwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21bdmFsdWUgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10obWF0Y2gsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Jvb2xlYW5BdHRyaWJ1dGUnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHZhbHVlLCBrZXlOYW1lKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1ha2VBcnJheShiaW5kaW5nLm5hbWUgfHwga2V5TmFtZSk7XG4gICAgICAgICAgICBnZXRNYXRjaGVzKGVsLCBzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBuYW1lLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tW3ZhbHVlID8gJ2FkZEF0dHJpYnV0ZScgOiAncmVtb3ZlQXR0cmlidXRlJ10obWF0Y2gsIGF0dHIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndG9nZ2xlJykge1xuICAgICAgICAvLyB0aGlzIGRvZXNuJ3QgcmVxdWlyZSBhIHNlbGVjdG9yIHNpbmNlIHdlIGNhbiBwYXNzIHllcy9ubyBzZWxlY3RvcnNcbiAgICAgICAgaWYgKGhhc1llc05vKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIHllcykuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tW3ZhbHVlID8gJ3Nob3cnIDogJ2hpZGUnXShtYXRjaCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcyhlbCwgbm8pLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVt2YWx1ZSA/ICdoaWRlJyA6ICdzaG93J10obWF0Y2gpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcyhlbCwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVt2YWx1ZSA/ICdzaG93JyA6ICdoaWRlJ10obWF0Y2gpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N3aXRjaCcpIHtcbiAgICAgICAgaWYgKCFiaW5kaW5nLmNhc2VzKSB0aHJvdyBFcnJvcignc3dpdGNoIGJpbmRpbmdzIG11c3QgaGF2ZSBcImNhc2VzXCInKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gaW4gYmluZGluZy5jYXNlcykge1xuICAgICAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIGJpbmRpbmcuY2FzZXNbaXRlbV0pLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVt2YWx1ZSA9PT0gaXRlbSA/ICdzaG93JyA6ICdoaWRlJ10obWF0Y2gpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2lubmVySFRNTCcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGdldE1hdGNoZXMoZWwsIHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGRvbS5odG1sKG1hdGNoLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzd2l0Y2hDbGFzcycpIHtcbiAgICAgICAgaWYgKCFiaW5kaW5nLmNhc2VzKSB0aHJvdyBFcnJvcignc3dpdGNoQ2xhc3MgYmluZGluZ3MgbXVzdCBoYXZlIFwiY2FzZXNcIicpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsLCB2YWx1ZSwga2V5TmFtZSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBtYWtlQXJyYXkoYmluZGluZy5uYW1lIHx8IGtleU5hbWUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBiaW5kaW5nLmNhc2VzKSB7XG4gICAgICAgICAgICAgICAgZ2V0TWF0Y2hlcyhlbCwgYmluZGluZy5jYXNlc1tpdGVtXSkuZm9yRWFjaChmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbVt2YWx1ZSA9PT0gaXRlbSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShtYXRjaCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIGJpbmRpbmcgdHlwZTogJyArIHR5cGUpO1xuICAgIH1cbn1cbiIsInZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gb3VyIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBLZXlUcmVlU3RvcmUoKSB7XG4gICAgdGhpcy5zdG9yYWdlID0ge307XG59XG5cbi8vIGFkZCBhbiBvYmplY3QgdG8gdGhlIHN0b3JlXG5LZXlUcmVlU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXlwYXRoLCBvYmopIHtcbiAgICB2YXIgYXJyID0gdGhpcy5zdG9yYWdlW2tleXBhdGhdIHx8ICh0aGlzLnN0b3JhZ2Vba2V5cGF0aF0gPSBbXSk7XG4gICAgYXJyLnB1c2gob2JqKTtcbn07XG5cbi8vIHJlbW92ZSBhbiBvYmplY3RcbktleVRyZWVTdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwYXRoLCBhcnI7XG4gICAgZm9yIChwYXRoIGluIHRoaXMuc3RvcmFnZSkge1xuICAgICAgICBhcnIgPSB0aGlzLnN0b3JhZ2VbcGF0aF07XG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IG9iaikge1xuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vLyBnZXQgYXJyYXkgb2YgYWxsIGFsbCByZWxldmFudCBmdW5jdGlvbnMsIHdpdGhvdXQga2V5c1xuS2V5VHJlZVN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICB2YXIga2V5O1xuXG4gICAgZm9yIChrZXkgaW4gdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIGlmICgha2V5cGF0aCB8fCBrZXlwYXRoID09PSBrZXkgfHwga2V5LmluZGV4T2Yoa2V5cGF0aCArICcuJykgPT09IDApIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5jb25jYXQodGhpcy5zdG9yYWdlW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8vIGdldCBhbGwgcmVzdWx0cyB0aGF0IG1hdGNoIGtleXBhdGggYnV0IHN0aWxsIGdyb3VwZWQgYnkga2V5XG5LZXlUcmVlU3RvcmUucHJvdG90eXBlLmdldEdyb3VwZWQgPSBmdW5jdGlvbiAoa2V5cGF0aCkge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIga2V5O1xuXG4gICAgZm9yIChrZXkgaW4gdGhpcy5zdG9yYWdlKSB7XG4gICAgICAgIGlmICgha2V5cGF0aCB8fCBrZXlwYXRoID09PSBrZXkgfHwga2V5LmluZGV4T2Yoa2V5cGF0aCArICcuJykgPT09IDApIHtcbiAgICAgICAgICAgIHJlc1trZXldID0gc2xpY2UuY2FsbCh0aGlzLnN0b3JhZ2Vba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xufTtcblxuLy8gZ2V0IGFsbCByZXN1bHRzIHRoYXQgbWF0Y2gga2V5cGF0aCBidXQgc3RpbGwgZ3JvdXBlZCBieSBrZXlcbktleVRyZWVTdG9yZS5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKGtleXBhdGgpIHtcbiAgICB2YXIgcmVzID0ge307XG4gICAgdmFyIGtleTtcblxuICAgIGZvciAoa2V5IGluIHRoaXMuc3RvcmFnZSkge1xuICAgICAgICBpZiAoa2V5cGF0aCA9PT0ga2V5IHx8IGtleS5pbmRleE9mKGtleXBhdGggKyAnLicpID09PSAwKSB7XG4gICAgICAgICAgICByZXNba2V5XSA9IHNsaWNlLmNhbGwodGhpcy5zdG9yYWdlW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8vIHJ1biBhbGwgbWF0Y2hlcyB3aXRoIG9wdGlvbmFsIGNvbnRleHRcbktleVRyZWVTdG9yZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKGtleXBhdGgsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB0aGlzLmdldChrZXlwYXRoKS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICBmbi5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuICAgIH0pO1xufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gS2V5VHJlZVN0b3JlO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2NvbXBvbmVudC1ldmVudCcpO1xudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnZGVsZWdhdGUtZXZlbnRzJyk7XG52YXIgZm9yY2VDYXB0dXJlRXZlbnRzID0gWydmb2N1cycsICdibHVyJ107XG5cbi8qKlxuICogRXhwb3NlIGBFdmVudHNgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYW4gYEV2ZW50c2Agd2l0aCB0aGUgZ2l2ZW5cbiAqIGBlbGAgb2JqZWN0IHdoaWNoIGV2ZW50cyB3aWxsIGJlIGJvdW5kIHRvLFxuICogYW5kIHRoZSBgb2JqYCB3aGljaCB3aWxsIHJlY2VpdmUgbWV0aG9kIGNhbGxzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbFxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFdmVudHMoZWwsIG9iaikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXZlbnRzKSkgcmV0dXJuIG5ldyBFdmVudHMoZWwsIG9iaik7XG4gIGlmICghZWwpIHRocm93IG5ldyBFcnJvcignZWxlbWVudCByZXF1aXJlZCcpO1xuICBpZiAoIW9iaikgdGhyb3cgbmV3IEVycm9yKCdvYmplY3QgcmVxdWlyZWQnKTtcbiAgdGhpcy5lbCA9IGVsO1xuICB0aGlzLm9iaiA9IG9iajtcbiAgdGhpcy5fZXZlbnRzID0ge307XG59XG5cbi8qKlxuICogU3Vic2NyaXB0aW9uIGhlbHBlci5cbiAqL1xuXG5FdmVudHMucHJvdG90eXBlLnN1YiA9IGZ1bmN0aW9uKGV2ZW50LCBtZXRob2QsIGNiKXtcbiAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF0gfHwge307XG4gIHRoaXMuX2V2ZW50c1tldmVudF1bbWV0aG9kXSA9IGNiO1xufTtcblxuLyoqXG4gKiBCaW5kIHRvIGBldmVudGAgd2l0aCBvcHRpb25hbCBgbWV0aG9kYCBuYW1lLlxuICogV2hlbiBgbWV0aG9kYCBpcyB1bmRlZmluZWQgaXQgYmVjb21lcyBgZXZlbnRgXG4gKiB3aXRoIHRoZSBcIm9uXCIgcHJlZml4LlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBEaXJlY3QgZXZlbnQgaGFuZGxpbmc6XG4gKlxuICogICAgZXZlbnRzLmJpbmQoJ2NsaWNrJykgLy8gaW1wbGllcyBcIm9uY2xpY2tcIlxuICogICAgZXZlbnRzLmJpbmQoJ2NsaWNrJywgJ3JlbW92ZScpXG4gKiAgICBldmVudHMuYmluZCgnY2xpY2snLCAnc29ydCcsICdhc2MnKVxuICpcbiAqICBEZWxlZ2F0ZWQgZXZlbnQgaGFuZGxpbmc6XG4gKlxuICogICAgZXZlbnRzLmJpbmQoJ2NsaWNrIGxpID4gYScpXG4gKiAgICBldmVudHMuYmluZCgnY2xpY2sgbGkgPiBhJywgJ3JlbW92ZScpXG4gKiAgICBldmVudHMuYmluZCgnY2xpY2sgYS5zb3J0LWFzY2VuZGluZycsICdzb3J0JywgJ2FzYycpXG4gKiAgICBldmVudHMuYmluZCgnY2xpY2sgYS5zb3J0LWRlc2NlbmRpbmcnLCAnc29ydCcsICdkZXNjJylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfGZ1bmN0aW9ufSBbbWV0aG9kXVxuICogQHJldHVybiB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkV2ZW50cy5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGV2ZW50LCBtZXRob2Qpe1xuICB2YXIgZSA9IHBhcnNlKGV2ZW50KTtcbiAgdmFyIGVsID0gdGhpcy5lbDtcbiAgdmFyIG9iaiA9IHRoaXMub2JqO1xuICB2YXIgbmFtZSA9IGUubmFtZTtcbiAgdmFyIG1ldGhvZCA9IG1ldGhvZCB8fCAnb24nICsgbmFtZTtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgLy8gY2FsbGJhY2tcbiAgZnVuY3Rpb24gY2IoKXtcbiAgICB2YXIgYSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5jb25jYXQoYXJncyk7XG4gICAgb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhKTtcbiAgfVxuXG4gIC8vIGJpbmRcbiAgaWYgKGUuc2VsZWN0b3IpIHtcbiAgICBjYiA9IGRlbGVnYXRlLmJpbmQoZWwsIGUuc2VsZWN0b3IsIG5hbWUsIGNiKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudHMuYmluZChlbCwgbmFtZSwgY2IpO1xuICB9XG5cbiAgLy8gc3Vic2NyaXB0aW9uIGZvciB1bmJpbmRpbmdcbiAgdGhpcy5zdWIobmFtZSwgbWV0aG9kLCBjYik7XG5cbiAgcmV0dXJuIGNiO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgYSBzaW5nbGUgYmluZGluZywgYWxsIGJpbmRpbmdzIGZvciBgZXZlbnRgLFxuICogb3IgYWxsIGJpbmRpbmdzIHdpdGhpbiB0aGUgbWFuYWdlci5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgVW5iaW5kIGRpcmVjdCBoYW5kbGVyczpcbiAqXG4gKiAgICAgZXZlbnRzLnVuYmluZCgnY2xpY2snLCAncmVtb3ZlJylcbiAqICAgICBldmVudHMudW5iaW5kKCdjbGljaycpXG4gKiAgICAgZXZlbnRzLnVuYmluZCgpXG4gKlxuICogVW5iaW5kIGRlbGVnYXRlIGhhbmRsZXJzOlxuICpcbiAqICAgICBldmVudHMudW5iaW5kKCdjbGljaycsICdyZW1vdmUnKVxuICogICAgIGV2ZW50cy51bmJpbmQoJ2NsaWNrJylcbiAqICAgICBldmVudHMudW5iaW5kKClcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gW2V2ZW50XVxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IFttZXRob2RdXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkV2ZW50cy5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oZXZlbnQsIG1ldGhvZCl7XG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLnVuYmluZEFsbCgpO1xuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy51bmJpbmRBbGxPZihldmVudCk7XG5cbiAgLy8gbm8gYmluZGluZ3MgZm9yIHRoaXMgZXZlbnRcbiAgdmFyIGJpbmRpbmdzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgdmFyIGNhcHR1cmUgPSAoZm9yY2VDYXB0dXJlRXZlbnRzLmluZGV4T2YoZXZlbnQpICE9PSAtMSk7XG4gIGlmICghYmluZGluZ3MpIHJldHVybjtcblxuICAvLyBubyBiaW5kaW5ncyBmb3IgdGhpcyBtZXRob2RcbiAgdmFyIGNiID0gYmluZGluZ3NbbWV0aG9kXTtcbiAgaWYgKCFjYikgcmV0dXJuO1xuXG4gIGV2ZW50cy51bmJpbmQodGhpcy5lbCwgZXZlbnQsIGNiLCBjYXB0dXJlKTtcbn07XG5cbi8qKlxuICogVW5iaW5kIGFsbCBldmVudHMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuRXZlbnRzLnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbigpe1xuICBmb3IgKHZhciBldmVudCBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICB0aGlzLnVuYmluZEFsbE9mKGV2ZW50KTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbmJpbmQgYWxsIGV2ZW50cyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkV2ZW50cy5wcm90b3R5cGUudW5iaW5kQWxsT2YgPSBmdW5jdGlvbihldmVudCl7XG4gIHZhciBiaW5kaW5ncyA9IHRoaXMuX2V2ZW50c1tldmVudF07XG4gIGlmICghYmluZGluZ3MpIHJldHVybjtcblxuICBmb3IgKHZhciBtZXRob2QgaW4gYmluZGluZ3MpIHtcbiAgICB0aGlzLnVuYmluZChldmVudCwgbWV0aG9kKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQYXJzZSBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2UoZXZlbnQpIHtcbiAgdmFyIHBhcnRzID0gZXZlbnQuc3BsaXQoLyArLyk7XG4gIHJldHVybiB7XG4gICAgbmFtZTogcGFydHMuc2hpZnQoKSxcbiAgICBzZWxlY3RvcjogcGFydHMuam9pbignICcpXG4gIH1cbn1cbiIsInZhciBiaW5kID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgIHVuYmluZCA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICBwcmVmaXggPSBiaW5kICE9PSAnYWRkRXZlbnRMaXN0ZW5lcicgPyAnb24nIDogJyc7XG5cbi8qKlxuICogQmluZCBgZWxgIGV2ZW50IGB0eXBlYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWxbYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICByZXR1cm4gZm47XG59O1xuXG4vKipcbiAqIFVuYmluZCBgZWxgIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsW3VuYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICByZXR1cm4gZm47XG59OyIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgY2xvc2VzdCA9IHJlcXVpcmUoJ2Nsb3Nlc3QnKVxuICAsIGV2ZW50ID0gcmVxdWlyZSgnZXZlbnQnKTtcblxuLyoqXG4gKiBEZWxlZ2F0ZSBldmVudCBgdHlwZWAgdG8gYHNlbGVjdG9yYFxuICogYW5kIGludm9rZSBgZm4oZSlgLiBBIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBpcyByZXR1cm5lZCB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIGAudW5iaW5kKClgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG4vLyBTb21lIGV2ZW50cyBkb24ndCBidWJibGUsIHNvIHdlIHdhbnQgdG8gYmluZCB0byB0aGUgY2FwdHVyZSBwaGFzZSBpbnN0ZWFkXG4vLyB3aGVuIGRlbGVnYXRpbmcuXG52YXIgZm9yY2VDYXB0dXJlRXZlbnRzID0gWydmb2N1cycsICdibHVyJ107XG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3RvciwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBpZiAoZm9yY2VDYXB0dXJlRXZlbnRzLmluZGV4T2YodHlwZSkgIT09IC0xKSBjYXB0dXJlID0gdHJ1ZTtcblxuICByZXR1cm4gZXZlbnQuYmluZChlbCwgdHlwZSwgZnVuY3Rpb24oZSl7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLmRlbGVnYXRlVGFyZ2V0ID0gY2xvc2VzdCh0YXJnZXQsIHNlbGVjdG9yLCB0cnVlLCBlbCk7XG4gICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIGZuLmNhbGwoZWwsIGUpO1xuICB9LCBjYXB0dXJlKTtcbn07XG5cbi8qKlxuICogVW5iaW5kIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBpZiAoZm9yY2VDYXB0dXJlRXZlbnRzLmluZGV4T2YodHlwZSkgIT09IC0xKSBjYXB0dXJlID0gdHJ1ZTtcblxuICBldmVudC51bmJpbmQoZWwsIHR5cGUsIGZuLCBjYXB0dXJlKTtcbn07XG4iLCJ2YXIgbWF0Y2hlcyA9IHJlcXVpcmUoJ21hdGNoZXMtc2VsZWN0b3InKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IsIGNoZWNrWW9TZWxmKSB7XHJcbiAgdmFyIHBhcmVudCA9IGNoZWNrWW9TZWxmID8gZWxlbWVudCA6IGVsZW1lbnQucGFyZW50Tm9kZVxyXG5cclxuICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQpIHtcclxuICAgIGlmIChtYXRjaGVzKHBhcmVudCwgc2VsZWN0b3IpKSByZXR1cm4gcGFyZW50O1xyXG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGVcclxuICB9XHJcbn1cclxuIiwiXHJcbi8qKlxyXG4gKiBFbGVtZW50IHByb3RvdHlwZS5cclxuICovXHJcblxyXG52YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiBWZW5kb3IgZnVuY3Rpb24uXHJcbiAqL1xyXG5cclxudmFyIHZlbmRvciA9IHByb3RvLm1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1vek1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ub01hdGNoZXNTZWxlY3RvcjtcclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYG1hdGNoKClgLlxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWF0Y2g7XHJcblxyXG4vKipcclxuICogTWF0Y2ggYGVsYCB0byBgc2VsZWN0b3JgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1hdGNoKGVsLCBzZWxlY3Rvcikge1xyXG4gIGlmICh2ZW5kb3IpIHJldHVybiB2ZW5kb3IuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gIHZhciBub2RlcyA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKG5vZGVzW2ldID09IGVsKSByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG5cbmZ1bmN0aW9uIGdldCAoY29udGV4dCwgcGF0aCkge1xuICBpZiAocGF0aC5pbmRleE9mKCcuJykgPT0gLTEgJiYgcGF0aC5pbmRleE9mKCdbJykgPT0gLTEpIHtcbiAgICByZXR1cm4gY29udGV4dFtwYXRoXTtcbiAgfVxuXG4gIHZhciBjcnVtYnMgPSBwYXRoLnNwbGl0KC9cXC58XFxbfFxcXS9nKTtcbiAgdmFyIGkgPSAtMTtcbiAgdmFyIGxlbiA9IGNydW1icy5sZW5ndGg7XG4gIHZhciByZXN1bHQ7XG5cbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIGlmIChpID09IDApIHJlc3VsdCA9IGNvbnRleHQ7XG4gICAgaWYgKCFjcnVtYnNbaV0pIGNvbnRpbnVlO1xuICAgIGlmIChyZXN1bHQgPT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICByZXN1bHQgPSByZXN1bHRbY3J1bWJzW2ldXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xudmFyIHZlbmRvciA9IHByb3RvLm1hdGNoZXNcbiAgfHwgcHJvdG8ubWF0Y2hlc1NlbGVjdG9yXG4gIHx8IHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICB8fCBwcm90by5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgfHwgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3JcbiAgfHwgcHJvdG8ub01hdGNoZXNTZWxlY3RvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaDtcblxuLyoqXG4gKiBNYXRjaCBgZWxgIHRvIGBzZWxlY3RvcmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBtYXRjaChlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKHZlbmRvcikgcmV0dXJuIHZlbmRvci5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIHZhciBub2RlcyA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobm9kZXNbaV0gPT0gZWwpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0iLCJcbi8qKlxuICogRXhwb3NlIGBwYXJzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcblxuLyoqXG4gKiBUZXN0cyBmb3IgYnJvd3NlciBzdXBwb3J0LlxuICovXG5cbnZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIFNldHVwXG5kaXYuaW5uZXJIVE1MID0gJyAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9XCIvYVwiPmE8L2E+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiLz4nO1xuLy8gTWFrZSBzdXJlIHRoYXQgbGluayBlbGVtZW50cyBnZXQgc2VyaWFsaXplZCBjb3JyZWN0bHkgYnkgaW5uZXJIVE1MXG4vLyBUaGlzIHJlcXVpcmVzIGEgd3JhcHBlciBlbGVtZW50IGluIElFXG52YXIgaW5uZXJIVE1MQnVnID0gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpLmxlbmd0aDtcbmRpdiA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBXcmFwIG1hcCBmcm9tIGpxdWVyeS5cbiAqL1xuXG52YXIgbWFwID0ge1xuICBsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gIGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG4gIC8vIGZvciBzY3JpcHQvbGluay9zdHlsZSB0YWdzIHRvIHdvcmsgaW4gSUU2LTgsIHlvdSBoYXZlIHRvIHdyYXBcbiAgLy8gaW4gYSBkaXYgd2l0aCBhIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciBpbiBmcm9udCwgaGEhXG4gIF9kZWZhdWx0OiBpbm5lckhUTUxCdWcgPyBbMSwgJ1g8ZGl2PicsICc8L2Rpdj4nXSA6IFswLCAnJywgJyddXG59O1xuXG5tYXAudGQgPVxubWFwLnRoID0gWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J107XG5cbm1hcC5vcHRpb24gPVxubWFwLm9wdGdyb3VwID0gWzEsICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLCAnPC9zZWxlY3Q+J107XG5cbm1hcC50aGVhZCA9XG5tYXAudGJvZHkgPVxubWFwLmNvbGdyb3VwID1cbm1hcC5jYXB0aW9uID1cbm1hcC50Zm9vdCA9IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddO1xuXG5tYXAudGV4dCA9XG5tYXAuY2lyY2xlID1cbm1hcC5lbGxpcHNlID1cbm1hcC5saW5lID1cbm1hcC5wYXRoID1cbm1hcC5wb2x5Z29uID1cbm1hcC5wb2x5bGluZSA9XG5tYXAucmVjdCA9IFsxLCAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiPicsJzwvc3ZnPiddO1xuXG4vKipcbiAqIFBhcnNlIGBodG1sYCBhbmQgcmV0dXJuIGEgRE9NIE5vZGUgaW5zdGFuY2UsIHdoaWNoIGNvdWxkIGJlIGEgVGV4dE5vZGUsXG4gKiBIVE1MIERPTSBOb2RlIG9mIHNvbWUga2luZCAoPGRpdj4gZm9yIGV4YW1wbGUpLCBvciBhIERvY3VtZW50RnJhZ21lbnRcbiAqIGluc3RhbmNlLCBkZXBlbmRpbmcgb24gdGhlIGNvbnRlbnRzIG9mIHRoZSBgaHRtbGAgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sIC0gSFRNTCBzdHJpbmcgdG8gXCJkb21pZnlcIlxuICogQHBhcmFtIHtEb2N1bWVudH0gZG9jIC0gVGhlIGBkb2N1bWVudGAgaW5zdGFuY2UgdG8gY3JlYXRlIHRoZSBOb2RlIGZvclxuICogQHJldHVybiB7RE9NTm9kZX0gdGhlIFRleHROb2RlLCBET00gTm9kZSwgb3IgRG9jdW1lbnRGcmFnbWVudCBpbnN0YW5jZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2UoaHRtbCwgZG9jKSB7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgaHRtbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignU3RyaW5nIGV4cGVjdGVkJyk7XG5cbiAgLy8gZGVmYXVsdCB0byB0aGUgZ2xvYmFsIGBkb2N1bWVudGAgb2JqZWN0XG4gIGlmICghZG9jKSBkb2MgPSBkb2N1bWVudDtcblxuICAvLyB0YWcgbmFtZVxuICB2YXIgbSA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuICBpZiAoIW0pIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoaHRtbCk7XG5cbiAgaHRtbCA9IGh0bWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpOyAvLyBSZW1vdmUgbGVhZGluZy90cmFpbGluZyB3aGl0ZXNwYWNlXG5cbiAgdmFyIHRhZyA9IG1bMV07XG5cbiAgLy8gYm9keSBzdXBwb3J0XG4gIGlmICh0YWcgPT0gJ2JvZHknKSB7XG4gICAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiBlbC5yZW1vdmVDaGlsZChlbC5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gd3JhcCBtYXBcbiAgdmFyIHdyYXAgPSBtYXBbdGFnXSB8fCBtYXAuX2RlZmF1bHQ7XG4gIHZhciBkZXB0aCA9IHdyYXBbMF07XG4gIHZhciBwcmVmaXggPSB3cmFwWzFdO1xuICB2YXIgc3VmZml4ID0gd3JhcFsyXTtcbiAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbC5pbm5lckhUTUwgPSBwcmVmaXggKyBodG1sICsgc3VmZml4O1xuICB3aGlsZSAoZGVwdGgtLSkgZWwgPSBlbC5sYXN0Q2hpbGQ7XG5cbiAgLy8gb25lIGVsZW1lbnRcbiAgaWYgKGVsLmZpcnN0Q2hpbGQgPT0gZWwubGFzdENoaWxkKSB7XG4gICAgcmV0dXJuIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gc2V2ZXJhbCBlbGVtZW50c1xuICB2YXIgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpKTtcbiAgfVxuXG4gIHJldHVybiBmcmFnbWVudDtcbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gZm4oKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwidmFyIGFyciA9IFtdO1xudmFyIGVhY2ggPSBhcnIuZm9yRWFjaDtcbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2guY2FsbChzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG59O1xuIiwiLy8gZm9sbG93IEBIZW5yaWtKb3JldGVnIGFuZCBAYW5keWV0IGlmIHlvdSBsaWtlIHRoaXMgOylcbi8vIHByb3BzIHRvIEBtYXRoaWFzIGZvciB0aGlzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzQyODYyNiB3aGljaCBzZXJ2ZWQgYXMgc3RhcnRpbmcgcG9pbnRcbi8vIGZvciB0aGlzIGNvZGUuXG4oZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHNldEZhdmljb24oaHJlZikge1xuICAgICAgICB2YXIgaGVhZCA9IChkb2N1bWVudC5oZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSk7XG4gICAgICAgIHZhciBmYXZpY29uSWQgPSAnZmF2aWNvbic7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICB2YXIgb2xkTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZhdmljb25JZCk7XG4gICAgICAgIGxpbmsuaWQgPSBmYXZpY29uSWQ7XG4gICAgICAgIGxpbmsucmVsID0gJ3Nob3J0Y3V0IGljb24nO1xuICAgICAgICBsaW5rLmhyZWYgPSBocmVmO1xuICAgICAgICBpZiAob2xkTGluaykge1xuICAgICAgICAgICAgaGVhZC5yZW1vdmVDaGlsZChvbGRMaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvLyBleHBvcnQgZm9yIHZhcmlvdXMgc3lzdGVtc1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHNldEZhdmljb247XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgJCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgJC5zZXRGYXZpY29uID0gc2V0RmF2aWNvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2V0RmF2aWNvbiA9IHNldEZhdmljb247XG4gICAgfVxufSkoKTtcbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpcy1hcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbnZhciBrTWF4TGVuZ3RoID0gMHgzZmZmZmZmZlxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqIC0gSW1wbGVtZW50YXRpb24gbXVzdCBzdXBwb3J0IGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLlxuICogICBGaXJlZm94IDQtMjkgbGFja2VkIHN1cHBvcnQsIGZpeGVkIGluIEZpcmVmb3ggMzArLlxuICogICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuICpcbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5IHdpbGxcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IHdpbGwgd29yayBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIG5ldyBVaW50OEFycmF5KDEpLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IHN1YmplY3QgPiAwID8gc3ViamVjdCA+Pj4gMCA6IDBcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnKVxuICAgICAgc3ViamVjdCA9IGJhc2U2NGNsZWFuKHN1YmplY3QpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcgJiYgc3ViamVjdCAhPT0gbnVsbCkgeyAvLyBhc3N1bWUgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgICBpZiAoc3ViamVjdC50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KHN1YmplY3QuZGF0YSkpXG4gICAgICBzdWJqZWN0ID0gc3ViamVjdC5kYXRhXG4gICAgbGVuZ3RoID0gK3N1YmplY3QubGVuZ3RoID4gMCA/IE1hdGguZmxvb3IoK3N1YmplY3QubGVuZ3RoKSA6IDBcbiAgfSBlbHNlXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbXVzdCBzdGFydCB3aXRoIG51bWJlciwgYnVmZmVyLCBhcnJheSBvciBzdHJpbmcnKVxuXG4gIGlmICh0aGlzLmxlbmd0aCA+IGtNYXhMZW5ndGgpXG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIGJ1ZltpXSA9ICgoc3ViamVjdFtpXSAlIDI1NikgKyAyNTYpICUgMjU2XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbiAmJiBhW2ldID09PSBiW2ldOyBpKyspIHt9XG4gIGlmIChpICE9PSBsZW4pIHtcbiAgICB4ID0gYVtpXVxuICAgIHkgPSBiW2ldXG4gIH1cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3RbLCBsZW5ndGhdKScpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodG90YWxMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCA+Pj4gMVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICB9XG4gIHJldHVybiByZXRcbn1cblxuLy8gcHJlLXNldCBmb3IgdmFsdWVzIHRoYXQgbWF5IGV4aXN0IGluIHRoZSBmdXR1cmVcbkJ1ZmZlci5wcm90b3R5cGUubGVuZ3RoID0gdW5kZWZpbmVkXG5CdWZmZXIucHJvdG90eXBlLnBhcmVudCA9IHVuZGVmaW5lZFxuXG4vLyB0b1N0cmluZyhlbmNvZGluZywgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPT09IEluZmluaXR5ID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoZW5kIDw9IHN0YXJ0KSByZXR1cm4gJydcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBiaW5hcnlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChiKSB7XG4gIGlmKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KVxuICAgICAgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4oYnl0ZSkpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgsIDIpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IGJpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlbjtcbiAgICBpZiAoc3RhcnQgPCAwKVxuICAgICAgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApXG4gICAgICBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpXG4gICAgZW5kID0gc3RhcnRcblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMClcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aClcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKVxuICAgIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYnVmZmVyIG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbHVlIGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignaW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSB2YWx1ZVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gdmFsdWVcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSB2YWx1ZVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gdmFsdWVcbiAgfSBlbHNlIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydClcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Ugb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9IHZhbHVlXG4gIH0gZWxzZSBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KVxuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmIChlbmQgPCBzdGFydCkgdGhyb3cgbmV3IFR5cGVFcnJvcignc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBpZiAodGFyZ2V0X3N0YXJ0IDwgMCB8fCB0YXJnZXRfc3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSBzb3VyY2UubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDAgfHwgZW5kID4gc291cmNlLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydClcbiAgfVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmIChlbmQgPCBzdGFydCkgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICB0aGlzW2ldID0gdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gdXRmOFRvQnl0ZXModmFsdWUudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgdGhpc1tpXSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLmNvbnN0cnVjdG9yID0gQnVmZmVyXG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5lcXVhbHMgPSBCUC5lcXVhbHNcbiAgYXJyLmNvbXBhcmUgPSBCUC5jb21wYXJlXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS16XS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3Rikge1xuICAgICAgYnl0ZUFycmF5LnB1c2goYilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKykge1xuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoLCB1bml0U2l6ZSkge1xuICBpZiAodW5pdFNpemUpIGxlbmd0aCAtPSBsZW5ndGggJSB1bml0U2l6ZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG4iLCJ2YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSClcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBuQml0cyA9IC03LFxuICAgICAgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwLFxuICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXG4gICAgICBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgcyA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBlID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcbiAgICAgIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKSxcbiAgICAgIGQgPSBpc0xFID8gMSA6IC0xLFxuICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjcuMFxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIGNvbmNhdCAgICAgICAgICAgPSBBcnJheVByb3RvLmNvbmNhdCxcbiAgICB0b1N0cmluZyAgICAgICAgID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgaGFzT3duUHJvcGVydHkgICA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyXG4gICAgbmF0aXZlSXNBcnJheSAgICAgID0gQXJyYXkuaXNBcnJheSxcbiAgICBuYXRpdmVLZXlzICAgICAgICAgPSBPYmplY3Qua2V5cyxcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZDtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuNy4wJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIGNyZWF0ZUNhbGxiYWNrID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSByZXR1cm4gZnVuYztcbiAgICBzd2l0Y2ggKGFyZ0NvdW50ID09IG51bGwgPyAzIDogYXJnQ291bnQpIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUpO1xuICAgICAgfTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBvdGhlcik7XG4gICAgICB9O1xuICAgICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQSBtb3N0bHktaW50ZXJuYWwgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgY2FsbGJhY2tzIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgLy8gdG8gZWFjaCBlbGVtZW50IGluIGEgY29sbGVjdGlvbiwgcmV0dXJuaW5nIHRoZSBkZXNpcmVkIHJlc3VsdCDigJQgZWl0aGVyXG4gIC8vIGlkZW50aXR5LCBhbiBhcmJpdHJhcnkgY2FsbGJhY2ssIGEgcHJvcGVydHkgbWF0Y2hlciwgb3IgYSBwcm9wZXJ0eSBhY2Nlc3Nvci5cbiAgXy5pdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXy5pZGVudGl0eTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuIGNyZWF0ZUNhbGxiYWNrKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVzKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gb2JqO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBpLCBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09ICtsZW5ndGgpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudC5cbiAgXy5tYXAgPSBfLmNvbGxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gW107XG4gICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0cyA9IEFycmF5KGxlbmd0aCksXG4gICAgICAgIGN1cnJlbnRLZXk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIHZhciByZWR1Y2VFcnJvciA9ICdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJztcblxuICAvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXG4gIC8vIG9yIGBmb2xkbGAuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gMCwgY3VycmVudEtleTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGlmICghbGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbaW5kZXgrK10gOiBpbmRleCsrXTtcbiAgICB9XG4gICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICsgb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgaW5kZXggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgY3VycmVudEtleTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGlmICghaW5kZXgpIHRocm93IG5ldyBUeXBlRXJyb3IocmVkdWNlRXJyb3IpO1xuICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1stLWluZGV4XSA6IC0taW5kZXhdO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgbWVtbyA9IGl0ZXJhdGVlKG1lbW8sIG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5zb21lKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgc2VsZWN0YC5cbiAgXy5maWx0ZXIgPSBfLnNlbGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHRzO1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxuICBfLnJlamVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5uZWdhdGUoXy5pdGVyYXRlZShwcmVkaWNhdGUpKSwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgYWxsIG9mIHRoZSBlbGVtZW50cyBtYXRjaCBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFsbGAuXG4gIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGluZGV4LCBjdXJyZW50S2V5O1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgaWYgKCFwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgb2JqZWN0IG1hdGNoZXMgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxuICBfLnNvbWUgPSBfLmFueSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCwgY3VycmVudEtleTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiB0aGUgYXJyYXkgb3Igb2JqZWN0IGNvbnRhaW5zIGEgZ2l2ZW4gdmFsdWUgKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGUgPSBmdW5jdGlvbihvYmosIHRhcmdldCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICByZXR1cm4gXy5pbmRleE9mKG9iaiwgdGFyZ2V0KSA+PSAwO1xuICB9O1xuXG4gIC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxuICBfLmludm9rZSA9IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGlzRnVuYyA9IF8uaXNGdW5jdGlvbihtZXRob2QpO1xuICAgIHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKGlzRnVuYyA/IG1ldGhvZCA6IHZhbHVlW21ldGhvZF0pLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxuICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbHRlcmA6IHNlbGVjdGluZyBvbmx5IG9iamVjdHNcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy53aGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXMoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uZmluZFdoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXMoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1heGltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWF4ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSAtSW5maW5pdHkgJiYgcmVzdWx0ID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1pbiA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPCBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IEluZmluaXR5ICYmIHJlc3VsdCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhIGNvbGxlY3Rpb24sIHVzaW5nIHRoZSBtb2Rlcm4gdmVyc2lvbiBvZiB0aGVcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgc2V0ID0gb2JqICYmIG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0gc2V0Lmxlbmd0aDtcbiAgICB2YXIgc2h1ZmZsZWQgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgcmFuZDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJhbmQgPSBfLnJhbmRvbSgwLCBpbmRleCk7XG4gICAgICBpZiAocmFuZCAhPT0gaW5kZXgpIHNodWZmbGVkW2luZGV4XSA9IHNodWZmbGVkW3JhbmRdO1xuICAgICAgc2h1ZmZsZWRbcmFuZF0gPSBzZXRbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gIH07XG5cbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24uXG4gIC8vIElmICoqbioqIGlzIG5vdCBzcGVjaWZpZWQsIHJldHVybnMgYSBzaW5nbGUgcmFuZG9tIGVsZW1lbnQuXG4gIC8vIFRoZSBpbnRlcm5hbCBgZ3VhcmRgIGFyZ3VtZW50IGFsbG93cyBpdCB0byB3b3JrIHdpdGggYG1hcGAuXG4gIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHtcbiAgICAgIGlmIChvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICAgIHJldHVybiBvYmpbXy5yYW5kb20ob2JqLmxlbmd0aCAtIDEpXTtcbiAgICB9XG4gICAgcmV0dXJuIF8uc2h1ZmZsZShvYmopLnNsaWNlKDAsIE1hdGgubWF4KDAsIG4pKTtcbiAgfTtcblxuICAvLyBTb3J0IHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24gcHJvZHVjZWQgYnkgYW4gaXRlcmF0ZWUuXG4gIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICB2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIHZhbHVlLCBrZXkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xuICB9KTtcblxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXG4gIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cbiAgXy5pbmRleEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXG4gIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAvLyBjcml0ZXJpb24uXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldKys7IGVsc2UgcmVzdWx0W2tleV0gPSAxO1xuICB9KTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICB2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gbG93ICsgaGlnaCA+Pj4gMTtcbiAgICAgIGlmIChpdGVyYXRlZShhcnJheVttaWRdKSA8IHZhbHVlKSBsb3cgPSBtaWQgKyAxOyBlbHNlIGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH07XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSByZXR1cm4gXy5tYXAob2JqLCBfLmlkZW50aXR5KTtcbiAgICByZXR1cm4gXy52YWx1ZXMob2JqKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBhbiBvYmplY3QuXG4gIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXG4gIC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cbiAgXy5wYXJ0aXRpb24gPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIgcGFzcyA9IFtdLCBmYWlsID0gW107XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7XG4gICAgICAocHJlZGljYXRlKHZhbHVlLCBrZXksIG9iaikgPyBwYXNzIDogZmFpbCkucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtwYXNzLCBmYWlsXTtcbiAgfTtcblxuICAvLyBBcnJheSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYGhlYWRgIGFuZCBgdGFrZWAuIFRoZSAqKmd1YXJkKiogY2hlY2tcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmZpcnN0ID0gXy5oZWFkID0gXy50YWtlID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5WzBdO1xuICAgIGlmIChuIDwgMCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBuKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBsYXN0IGVudHJ5IG9mIHRoZSBhcnJheS4gRXNwZWNpYWxseSB1c2VmdWwgb25cbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cbiAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoXG4gIC8vIGBfLm1hcGAuXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5sYXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBNYXRoLm1heChhcnJheS5sZW5ndGggLSBuLCAwKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgZmlyc3QgZW50cnkgb2YgdGhlIGFycmF5LiBBbGlhc2VkIGFzIGB0YWlsYCBhbmQgYGRyb3BgLlxuICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxuICAvLyB0aGUgcmVzdCBOIHZhbHVlcyBpbiB0aGUgYXJyYXkuIFRoZSAqKmd1YXJkKipcbiAgLy8gY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpIHtcbiAgICBpZiAoc2hhbGxvdyAmJiBfLmV2ZXJ5KGlucHV0LCBfLmlzQXJyYXkpKSB7XG4gICAgICByZXR1cm4gY29uY2F0LmFwcGx5KG91dHB1dCwgaW5wdXQpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaW5wdXQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKCFfLmlzQXJyYXkodmFsdWUpICYmICFfLmlzQXJndW1lbnRzKHZhbHVlKSkge1xuICAgICAgICBpZiAoIXN0cmljdCkgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChzaGFsbG93KSB7XG4gICAgICAgIHB1c2guYXBwbHkob3V0cHV0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QsIG91dHB1dCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSwgW10pO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxuICBfLndpdGhvdXQgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGFycmF5LiBJZiB0aGUgYXJyYXkgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBzb3J0ZWQsIHlvdSBoYXZlIHRoZSBvcHRpb24gb2YgdXNpbmcgYSBmYXN0ZXIgYWxnb3JpdGhtLlxuICAvLyBBbGlhc2VkIGFzIGB1bmlxdWVgLlxuICBfLnVuaXEgPSBfLnVuaXF1ZSA9IGZ1bmN0aW9uKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBzZWVuID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpXTtcbiAgICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgICBpZiAoIWkgfHwgc2VlbiAhPT0gdmFsdWUpIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgc2VlbiA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpdGVyYXRlZSkge1xuICAgICAgICB2YXIgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpO1xuICAgICAgICBpZiAoXy5pbmRleE9mKHNlZW4sIGNvbXB1dGVkKSA8IDApIHtcbiAgICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmluZGV4T2YocmVzdWx0LCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlLCBbXSkpO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyBldmVyeSBpdGVtIHNoYXJlZCBiZXR3ZWVuIGFsbCB0aGVcbiAgLy8gcGFzc2VkLWluIGFycmF5cy5cbiAgXy5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnJheSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gW107XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoXy5jb250YWlucyhyZXN1bHQsIGl0ZW0pKSBjb250aW51ZTtcbiAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgYXJnc0xlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICghXy5jb250YWlucyhhcmd1bWVudHNbal0sIGl0ZW0pKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChqID09PSBhcmdzTGVuZ3RoKSByZXN1bHQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBUYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb25lIGFycmF5IGFuZCBhIG51bWJlciBvZiBvdGhlciBhcnJheXMuXG4gIC8vIE9ubHkgdGhlIGVsZW1lbnRzIHByZXNlbnQgaW4ganVzdCB0aGUgZmlyc3QgYXJyYXkgd2lsbCByZW1haW4uXG4gIF8uZGlmZmVyZW5jZSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3QgPSBmbGF0dGVuKHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgdHJ1ZSwgdHJ1ZSwgW10pO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiBbXTtcbiAgICB2YXIgbGVuZ3RoID0gXy5tYXgoYXJndW1lbnRzLCAnbGVuZ3RoJykubGVuZ3RoO1xuICAgIHZhciByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRzW2ldID0gXy5wbHVjayhhcmd1bWVudHMsIGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgaWYgKGxpc3QgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSxcbiAgLy8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpc1NvcnRlZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGlzU29ydGVkKSB7XG4gICAgICBpZiAodHlwZW9mIGlzU29ydGVkID09ICdudW1iZXInKSB7XG4gICAgICAgIGkgPSBpc1NvcnRlZCA8IDAgPyBNYXRoLm1heCgwLCBsZW5ndGggKyBpc1NvcnRlZCkgOiBpc1NvcnRlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSBfLnNvcnRlZEluZGV4KGFycmF5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIGFycmF5W2ldID09PSBpdGVtID8gaSA6IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBfLmxhc3RJbmRleE9mID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGZyb20pIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIHZhciBpZHggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKHR5cGVvZiBmcm9tID09ICdudW1iZXInKSB7XG4gICAgICBpZHggPSBmcm9tIDwgMCA/IGlkeCArIGZyb20gKyAxIDogTWF0aC5taW4oaWR4LCBmcm9tICsgMSk7XG4gICAgfVxuICAgIHdoaWxlICgtLWlkeCA+PSAwKSBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxuICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxuICBfLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcblxuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XG4gICAgdmFyIHJhbmdlID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KyssIHN0YXJ0ICs9IHN0ZXApIHtcbiAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSZXVzYWJsZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgcHJvdG90eXBlIHNldHRpbmcuXG4gIHZhciBDdG9yID0gZnVuY3Rpb24oKXt9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGJvdW5kIHRvIGEgZ2l2ZW4gb2JqZWN0IChhc3NpZ25pbmcgYHRoaXNgLCBhbmQgYXJndW1lbnRzLFxuICAvLyBvcHRpb25hbGx5KS4gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYEZ1bmN0aW9uLmJpbmRgIGlmXG4gIC8vIGF2YWlsYWJsZS5cbiAgXy5iaW5kID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgIHZhciBhcmdzLCBib3VuZDtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgYm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkpIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgQ3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBzZWxmID0gbmV3IEN0b3I7XG4gICAgICBDdG9yLnByb3RvdHlwZSA9IG51bGw7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseShzZWxmLCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXG4gIC8vIGFyZ3VtZW50cyBwcmUtZmlsbGVkLCB3aXRob3V0IGNoYW5naW5nIGl0cyBkeW5hbWljIGB0aGlzYCBjb250ZXh0LiBfIGFjdHNcbiAgLy8gYXMgYSBwbGFjZWhvbGRlciwgYWxsb3dpbmcgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZSBwcmUtZmlsbGVkLlxuICBfLnBhcnRpYWwgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgdmFyIGJvdW5kQXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwO1xuICAgICAgdmFyIGFyZ3MgPSBib3VuZEFyZ3Muc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmdzW2ldID09PSBfKSBhcmdzW2ldID0gYXJndW1lbnRzW3Bvc2l0aW9uKytdO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEJpbmQgYSBudW1iZXIgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gUmVtYWluaW5nIGFyZ3VtZW50c1xuICAvLyBhcmUgdGhlIG1ldGhvZCBuYW1lcyB0byBiZSBib3VuZC4gVXNlZnVsIGZvciBlbnN1cmluZyB0aGF0IGFsbCBjYWxsYmFja3NcbiAgLy8gZGVmaW5lZCBvbiBhbiBvYmplY3QgYmVsb25nIHRvIGl0LlxuICBfLmJpbmRBbGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCwga2V5O1xuICAgIGlmIChsZW5ndGggPD0gMSkgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzJyk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbaV07XG4gICAgICBvYmpba2V5XSA9IF8uYmluZChvYmpba2V5XSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxuICBfLm1lbW9pemUgPSBmdW5jdGlvbihmdW5jLCBoYXNoZXIpIHtcbiAgICB2YXIgbWVtb2l6ZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGNhY2hlID0gbWVtb2l6ZS5jYWNoZTtcbiAgICAgIHZhciBhZGRyZXNzID0gaGFzaGVyID8gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBrZXk7XG4gICAgICBpZiAoIV8uaGFzKGNhY2hlLCBhZGRyZXNzKSkgY2FjaGVbYWRkcmVzc10gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gY2FjaGVbYWRkcmVzc107XG4gICAgfTtcbiAgICBtZW1vaXplLmNhY2hlID0ge307XG4gICAgcmV0dXJuIG1lbW9pemU7XG4gIH07XG5cbiAgLy8gRGVsYXlzIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBjYWxsc1xuICAvLyBpdCB3aXRoIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQuXG4gIF8uZGVsYXkgPSBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIHdhaXQpO1xuICB9O1xuXG4gIC8vIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhc1xuICAvLyBjbGVhcmVkLlxuICBfLmRlZmVyID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiBfLmRlbGF5LmFwcGx5KF8sIFtmdW5jLCAxXS5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPiAwKSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRpbWVzdGFtcCA9IF8ubm93KCk7XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGlmICghdGltZW91dCkgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgZnVuY3Rpb24gcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBzZWNvbmQsXG4gIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcbiAgLy8gY29uZGl0aW9uYWxseSBleGVjdXRlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cbiAgXy53cmFwID0gZnVuY3Rpb24oZnVuYywgd3JhcHBlcikge1xuICAgIHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cbiAgXy5uZWdhdGUgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIGEgbGlzdCBvZiBmdW5jdGlvbnMsIGVhY2hcbiAgLy8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpID0gc3RhcnQ7XG4gICAgICB2YXIgcmVzdWx0ID0gYXJnc1tzdGFydF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlIChpLS0pIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCBhZnRlciBiZWluZyBjYWxsZWQgTiB0aW1lcy5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYmVmb3JlIGJlaW5nIGNhbGxlZCBOIHRpbWVzLlxuICBfLmJlZm9yZSA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgdmFyIG1lbW87XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPiAwKSB7XG4gICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXNbaV0gPSBvYmpba2V5c1tpXV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICB2YXIgc291cmNlLCBwcm9wO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAocHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBwcm9wKSkge1xuICAgICAgICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSB7fSwga2V5O1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IGNvbmNhdC5hcHBseShbXSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIG9iaiA9IG5ldyBPYmplY3Qob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmIChrZXkgaW4gb2JqKSByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpdGVyYXRlZSA9IF8ubmVnYXRlKGl0ZXJhdGVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLm1hcChjb25jYXQuYXBwbHkoW10sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSksIFN0cmluZyk7XG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKGtleXMsIGtleSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gXy5waWNrKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIEZpbGwgaW4gYSBnaXZlbiBvYmplY3Qgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXMuXG4gIF8uZGVmYXVsdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKG9ialtwcm9wXSA9PT0gdm9pZCAwKSBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIHZhciBlcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gICAgLy8gQSBzdHJpY3QgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgbnVsbCA9PSB1bmRlZmluZWRgLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gYSA9PT0gYjtcbiAgICAvLyBVbndyYXAgYW55IHdyYXBwZWQgb2JqZWN0cy5cbiAgICBpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xuICAgIGlmIChiIGluc3RhbmNlb2YgXykgYiA9IGIuX3dyYXBwZWQ7XG4gICAgLy8gQ29tcGFyZSBgW1tDbGFzc11dYCBuYW1lcy5cbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9PSB0b1N0cmluZy5jYWxsKGIpKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxuICAgICAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICAgIC8vIFJlZ0V4cHMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBmb3IgY29tcGFyaXNvbiAoTm90ZTogJycgKyAvYS9pID09PSAnL2EvaScpXG4gICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICAgIHJldHVybiAnJyArIGEgPT09ICcnICsgYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOXG4gICAgICAgIGlmICgrYSAhPT0gK2EpIHJldHVybiArYiAhPT0gK2I7XG4gICAgICAgIC8vIEFuIGBlZ2FsYCBjb21wYXJpc29uIGlzIHBlcmZvcm1lZCBmb3Igb3RoZXIgbnVtZXJpYyB2YWx1ZXMuXG4gICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xuICAgIH1cbiAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHNcbiAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoXG4gICAgICBhQ3RvciAhPT0gYkN0b3IgJiZcbiAgICAgIC8vIEhhbmRsZSBPYmplY3QuY3JlYXRlKHgpIGNhc2VzXG4gICAgICAnY29uc3RydWN0b3InIGluIGEgJiYgJ2NvbnN0cnVjdG9yJyBpbiBiICYmXG4gICAgICAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICBfLmlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICB2YXIgc2l6ZSwgcmVzdWx0O1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgIGlmIChjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgc2l6ZSA9IGEubGVuZ3RoO1xuICAgICAgcmVzdWx0ID0gc2l6ZSA9PT0gYi5sZW5ndGg7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBlcShhW3NpemVdLCBiW3NpemVdLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKGEpLCBrZXk7XG4gICAgICBzaXplID0ga2V5cy5sZW5ndGg7XG4gICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgICByZXN1bHQgPSBfLmtleXMoYikubGVuZ3RoID09PSBzaXplO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgICAgICAgLy8gRGVlcCBjb21wYXJlIGVhY2ggbWVtYmVyXG4gICAgICAgICAga2V5ID0ga2V5c1tzaXplXTtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBfLmhhcyhiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucG9wKCk7XG4gICAgYlN0YWNrLnBvcCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSBhIGRlZXAgY29tcGFyaXNvbiB0byBjaGVjayBpZiB0d28gb2JqZWN0cyBhcmUgZXF1YWwuXG4gIF8uaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYiwgW10sIFtdKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBET00gZWxlbWVudD9cbiAgXy5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcbiAgXy5pc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xuICBfLmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICB9O1xuXG4gIC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLlxuICBfLmVhY2goWydBcmd1bWVudHMnLCAnRnVuY3Rpb24nLCAnU3RyaW5nJywgJ051bWJlcicsICdEYXRlJywgJ1JlZ0V4cCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgX1snaXMnICsgbmFtZV0gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIERlZmluZSBhIGZhbGxiYWNrIHZlcnNpb24gb2YgdGhlIG1ldGhvZCBpbiBicm93c2VycyAoYWhlbSwgSUUpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBhbiBJRSAxMSBidWcuXG4gIGlmICh0eXBlb2YgLy4vICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xuICBfLmlzTnVsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG4gIH07XG5cbiAgLy8gU2hvcnRjdXQgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBwcm9wZXJ0eSBkaXJlY3RseVxuICAvLyBvbiBpdHNlbGYgKGluIG90aGVyIHdvcmRzLCBub3Qgb24gYSBwcm90b3R5cGUpLlxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9O1xuXG4gIC8vIFV0aWxpdHkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUnVuIFVuZGVyc2NvcmUuanMgaW4gKm5vQ29uZmxpY3QqIG1vZGUsIHJldHVybmluZyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0c1xuICAvLyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJvb3QuXyA9IHByZXZpb3VzVW5kZXJzY29yZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBLZWVwIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBhcm91bmQgZm9yIGRlZmF1bHQgaXRlcmF0ZWVzLlxuICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgcHJlZGljYXRlIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgdmFyIHBhaXJzID0gXy5wYWlycyhhdHRycyksIGxlbmd0aCA9IHBhaXJzLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xuICAgICAgb2JqID0gbmV3IE9iamVjdChvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHBhaXJzW2ldLCBrZXkgPSBwYWlyWzBdO1xuICAgICAgICBpZiAocGFpclsxXSAhPT0gb2JqW2tleV0gfHwgIShrZXkgaW4gb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IG9iamVjdFtwcm9wZXJ0eV0oKSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIF8uZWFjaChfLmZ1bmN0aW9ucyhvYmopLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IF9bbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxuICBfLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcbiJdfQ==
