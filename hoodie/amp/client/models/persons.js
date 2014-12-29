var Collection = require('ampersand-hoodie-collection');
var Person = require('./person');


module.exports = Collection.extend({
    model: Person,
    HOODIE_TYPE: 'person'
});
