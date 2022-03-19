"use strict";
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
module.exports = {
    Query: Object.assign({}, postsResolvers.Query),
    Mutation: Object.assign(Object.assign({}, usersResolvers.Mutation), postsResolvers.Mutation)
};
//# sourceMappingURL=index.js.map