/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('../templates');
var tracking = require('../helpers/metrics');
var setFavicon = require('favicon-setter');
var InfoDialog = require('./dialogs/info');
var MessageDialog = require('./dialogs/message');


module.exports = View.extend({
    template: templates.body,
    initialize: function () {
        // this marks the correct nav item selected
        this.listenTo(app.router, 'page', this.handleNewPage);
    },
    events: {
        'click a:not([href="#"])': 'handleLinkClick',
        'click [data-hook=info]': 'handleInfoClick'
    },
    render: function () {
        var self = this;
        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate({me: me});

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (newView, oldView) {
                // it's inserted and rendered for me
                document.title = _.result(newView, 'pageTitle') || 'Modal Dialog Example';
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        this.modalSwitcher = new ViewSwitcher(this.queryByHook("modal-container"), {
            show: function (view) {
                dom.addClass(document.body, "has-modal");  //TODO, I don't see where/how this is used
                view.listenTo(view, "dialog:closed", function () {
                    self.modalSwitcher.clear();
                });
            }, hide: function () {
                dom.removeClass(document.body, "has-modal");  //TODO, I don't see where/how this is used
            }
        });

        // setting a favicon for fun (note, it's dynamic)
        setFavicon('/images/ampersand.png');
        return this;
    },

    handleNewPage: function (view) {
        if (this.modalSwitcher.current) {
            this.modalSwitcher.clear();
        }

        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();
    },

    showModal: function (view, done) {
        view.listenTo(view, "dialog:closed", done);
        this.modalSwitcher.set(view);
    },

    showMessageDialog: function(messageTitle, message) {
        var dialog = new MessageDialog({
            messageTitle: messageTitle,
            message: message
        });
        this.showModal(dialog);
    },

    handleLinkClick: function (e) {
        var aTag = e.target;
        var local = aTag.host === window.location.host;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && !e.defaultPrevented) {
            e.preventDefault();
            app.navigate(aTag.pathname);
        }
    },

    handleInfoClick: function (e) {
        //prevent the '#' from the a tag from showing up in the address bar
        e.preventDefault();
        var infoDialog =  new InfoDialog();
        app.view.showModal(infoDialog);
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.queryAll('.nav a:not([href="#"])').forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});
