const usersResolvers = require('./users')
const postsResolvers = require('./posts')
const commentsResolvers = require('./comments')
const likesResolvers = require('./likes')

module.exports = {
	Post: {
		likesCount: (parent) => parent.likes.length,
		commentsCount: (parent) => parent.comments.length
	},
	Query: {
		...postsResolvers.Query,
		...commentsResolvers.Query,
		...likesResolvers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postsResolvers.Mutation,
		...commentsResolvers.Mutation,
		...likesResolvers.Mutation
	}
}
