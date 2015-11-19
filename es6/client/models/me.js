import AmpersandModel from 'ampersand-model';

module.exports = AmpersandModel.extend({
  type: 'user',
  props: {
    id: ['string'],
    firstName: ['string', true, ''],
    lastName: ['string', true, ''],
    username: ['string']
  },
  derived: {
    fullName: {
      deps: ['firstName', 'lastName'],
      cache: true,
      fn() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    initials: {
      deps: ['firstName', 'lastName'],
      cache: true,
      fn() {
        return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
      }
    }
  }
});
