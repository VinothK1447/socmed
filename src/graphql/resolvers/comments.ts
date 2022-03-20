import { AuthenticationError, UserInputError } from 'apollo-server'
const checkAuth = require('../../utils/check-auth')
const Post = require('../../models/Post')

module.exports = {
	Mutation: {
		createComment: async (parent, { postId, body }, context) => {
			const { userName } = checkAuth(context)

			if (!body) {
				throw new UserInputError('Comment cannot be empty!')
			}
			const post = await Post.findById(postId)
			if (post) {
				post.comments.unshift({
					body,
					userName,
					createdAt: new Date().toISOString()
				})
				await post.save()
				return post
			} else {
				throw new UserInputError('Post not found!')
			}
		},

		deleteComment: async (parent, { postId, commentId }, context) => {
			const { userName } = checkAuth(context)

			if (!postId || !commentId) {
				throw new UserInputError('Post or comment cannot be empty!')
			}
			const post = await Post.findById(postId)
			if (post) {
				const commentIdx = post.comments.findIndex((_comment) => _comment.id === commentId)
				if (commentIdx < 0) {
					throw new UserInputError('Comment does not exist!')
				}

				if (post.comments[commentIdx].userName === userName) {
					post.comments.splice(commentIdx, 1)
					await post.save()
					return post
				} else {
					throw new AuthenticationError('User not allowed to delete this comment!')
				}
			} else {
				throw new UserInputError('Post not found!')
			}
		}
	}
}
