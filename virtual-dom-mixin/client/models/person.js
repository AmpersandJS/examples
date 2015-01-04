var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
  props: {
    name: 'string',
    age: 'number'
  },
  derived: {
    message: {
      deps: ['age'],
      fn: function () {
        if(this.age % 2 == 0) {
          return 'An even number of years!'
        }
        return 'An odd number of years!';
      }
    }
  }
});
