import View from 'ampersand-view';
import templates from '../templates';

module.exports = View.extend({
  template: templates.includes.person,
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
  handleRemoveClick() {
    this.model.destroy();
    return false;
  }
});
