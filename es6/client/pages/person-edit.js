/*global alert*/
import app from 'ampersand-app';
import PageView from './base';
import templates from '../templates';
import PersonForm from '../forms/person';

module.exports = PageView.extend({
  pageTitle: 'edit person',
  template: templates.pages.personEdit,
  initialize(spec) {
    const self = this;
    app.people.getOrFetch(spec.id, {
      all: true
    }, (err, model) => {
      if (err) alert('couldnt find a model with id: ' + spec.id);
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
      prepareView(el) {
        const model = this.model;
        return new PersonForm({
          el: el,
          model: this.model,
          submitCallback(data) {
            model.save(data, {
              wait: true,
              success() {
                app.navigate('/collections');
              }
            });
          }
        });
      }
    }
  }
});
