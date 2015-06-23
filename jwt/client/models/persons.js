var Collection = require('./baseCollection');
var Person = require('./person');

module.exports = Collection.extend({
    model: Person,
    url: '/api/people'
});
