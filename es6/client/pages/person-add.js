import app from 'ampersand-app';
import PageView from './base';
import templates from '../templates';
import PersonForm from '../forms/person';

module.exports = PageView.extend({
  pageTitle: 'add person',
  template: templates.pages.personAdd,
  subviews: {
    form: {
      container: 'form',
      prepareView(el) {
        return new PersonForm({
          el: el,
          submitCallback(data) {
            app.people.create(data, {
              wait: true,
              success() {
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
