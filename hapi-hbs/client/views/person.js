var View = require('ampersand-view');

module.exports = View.extend({
  template: require('../../templates/includes/person.hbs'),
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
