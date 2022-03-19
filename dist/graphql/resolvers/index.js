"use strict";
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
module.exports = {
    Query: Object.assign({}, postsResolvers.Query),
    Mutation: Object.assign({}, usersResolvers.Mutation)
};
//# sourceMappingURL=index.js.map