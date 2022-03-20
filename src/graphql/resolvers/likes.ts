const checkAuth = require('../../utils/check-auth')
const Post = require('../../models/Post')

module.exports = {
	Mutation: {
		likePost: async (parent, { postId }, context) => {
			const { userName } = checkAuth(context)
			const post = await Post.findById(postId)
			if (post) {
				if (post.likes.find((like) => like.userName === userName)) {
					post.likes = post.likes.filter((like) => like.userName !== userName)
				} else {
					post.likes.push({
						userName,
						createdAt: new Date().toISOString()
					})
				}
				await post.save()
				return post
			} else {
				throw new Error('Post not found!')
			}
		}
	}
}
