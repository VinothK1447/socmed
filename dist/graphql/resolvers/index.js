"use strict";
const usersResolvers = require('./users');
const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');
module.exports = {
    Query: Object.assign(Object.assign(Object.assign({}, postsResolvers.Query), commentsResolvers.Query), likesResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, usersResolvers.Mutation), postsResolvers.Mutation), commentsResolvers.Mutation), likesResolvers.Mutation)
};
//# sourceMappingURL=index.js.map