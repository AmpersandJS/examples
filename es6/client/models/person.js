import AmpersandModel from 'ampersand-model';

module.exports = AmpersandModel.extend({
  props: {
    id: 'any',
    firstName: ['string', true, ''],
    lastName: ['string', true, ''],
    coolnessFactor: ['number', true, 5]
  },
  session: {
    selected: ['boolean', true, false]
  },
  derived: {
    fullName: {
      deps: ['firstName', 'lastName'],
      fn() {
        return this.firstName + ' ' + this.lastName;
      }
    },
    avatar: {
      deps: ['firstName', 'lastName'],
      fn() {
        return 'http://robohash.org/' + encodeURIComponent(this.fullName) + '?size=80x80';
      }
    },
    editUrl: {
      deps: ['id'],
      fn() {
        return '/person/' + this.id + '/edit';
      }
    },
    viewUrl: {
      deps: ['id'],
      fn() {
        return '/person/' + this.id;
      }
    }
  }
});
