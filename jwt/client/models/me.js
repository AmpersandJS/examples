var BaseModel = require('./baseModel');

module.exports = BaseModel.extend({
  type: 'user',
  urlRoot: '/api/people',
  props: {
    id: ['any'],
    firstName: ['string', true, ''],
    lastName: ['string', true, ''],
    username: ['string']
  },
  session: {
    token: 'string'
  },
  derived: {
    fullName: {
      deps: ['firstName', 'lastName'],
      cache: true,
      fn: function() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    initials: {
      deps: ['firstName', 'lastName'],
      cache: true,
      fn: function() {
        return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
      }
    }
  }
});
