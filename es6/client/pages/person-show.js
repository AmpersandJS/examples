/*global alert*/
import app from 'ampersand-app';
import PageView from './base';
import templates from '../templates';
import PersonForm from '../forms/person';

module.exports = PageView.extend({
  pageTitle: 'view person',
  template: templates.pages.personView,
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
  initialize(spec) {
    const self = this;
    app.people.getOrFetch(spec.id, {
      all: true
    }, (err, model) => {
      if (err) alert('couldnt find a model with id: ' + spec.id);
      self.model = model;
    });
  },
  handleDeleteClick() {
    this.model.destroy({
      success: () => {
        app.navigate('collections');
      }
    });
  }
});
