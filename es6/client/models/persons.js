import Collection from 'ampersand-rest-collection';
import Person from './person';

module.exports = Collection.extend({
    model: Person,
    url: '/api/people'
});
