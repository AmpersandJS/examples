import app from 'ampersand-app';
import Router from 'ampersand-router';
import HomePage from './pages/home';
import CollectionDemo from './pages/collection-demo';
import InfoPage from './pages/info';
import PersonAddPage from './pages/person-add';
import PersonEditPage from './pages/person-edit';
import PersonShowPage from './pages/person-show';

module.exports = Router.extend({
  routes: {
    '': 'home',
    'collections': 'collectionDemo',
    'info': 'info',
    'person/add': 'personAdd',
    'person/:id': 'personView',
    'person/:id/edit': 'personEdit',
    '(*path)': 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  home() {
    app.trigger('page', new HomePage({
      model: app.me
    }));
  },

  collectionDemo() {
    app.trigger('page', new CollectionDemo({
      model: app.me,
      collection: app.people
    }));
  },

  info() {
    app.trigger('page', new InfoPage({
      model: app.me
    }));
  },

  personAdd() {
    app.trigger('page', new PersonAddPage());
  },

  personEdit(id) {
    app.trigger('page', new PersonEditPage({
      id: id
    }));
  },

  personView(id) {
    app.trigger('page', new PersonShowPage({
      id: id
    }));
  },

  catchAll() {
    this.redirectTo('');
  }
});
