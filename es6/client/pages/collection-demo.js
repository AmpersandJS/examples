import PageView from './base';
import templates from '../templates';
import PersonView from '../views/person';


module.exports = PageView.extend({
  pageTitle: 'collection demo',
  template: templates.pages.collectionDemo,
  events: {
    'click [data-hook~=shuffle]': 'shuffle',
    'click [data-hook~=fetch]': 'fetchCollection',
    'click [data-hook~=reset]': 'resetCollection',
    'click [data-hook~=add]': 'addRandom'
  },
  render() {
    this.renderWithTemplate();
    this.renderCollection(this.collection, PersonView, this.queryByHook('people-list'));
    if (!this.collection.length) {
      this.fetchCollection();
    }
  },
  fetchCollection() {
    this.collection.fetch();
    return false;
  },
  resetCollection() {
    this.collection.reset();
  },
  shuffle() {
    this.collection.comparator = () => {
      return !Math.round(Math.random());
    };
    this.collection.sort();
    delete this.collection.comparator;
    return false;
  },
  addRandom() {
    const getRandom = (min, max) => {
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    const firstNames = 'Joe Harry Larry Sue Bob Rose Angela Tom Merle Joseph Josephine'.split(' ');
    const lastNames = 'Smith Jewel Barker Stephenson Rossum Crockford'.split(' ');

    this.collection.create({
      firstName: firstNames[getRandom(0, firstNames.length - 1)],
      lastName: lastNames[getRandom(0, lastNames.length - 1)],
      coolnessFactor: getRandom(0, 11)
    });
  }
});
