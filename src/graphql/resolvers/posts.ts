const Post = require('./../../models/Post')
const checkAuth = require('../../utils/check-auth')

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: -1 })
				return posts
			} catch (error) {
				throw new Error('Error')
			}
		},

		async getPost(parent, { postId }) {
			try {
				const post = await Post.findById(postId)
				if (post) {
					return post
				} else {
					throw new Error('Post not found!')
				}
			} catch (err) {
				throw new Error(err)
			}
		}
	},
	Mutation: {
		async createPost(parent, { body }, context) {
			const user = checkAuth(context)
			const newPost = new Post({
				body,
				user: user.id,
				userName: user.userName,
				createdAt: new Date().toISOString()
			})

			const post = await newPost.save()
			return post
		},

		async deletePost(parent, { postId }, context) {
			try {
				const user = checkAuth(context)
				const post = await Post.findById(postId)

				if (post && post.userName === user.userName) {
					await post.delete()
					return 'Post deleted successfully!'
				} else {
					throw new Error('Deleting post not allowed!')
				}
			} catch (error) {
				throw new Error('Error deleting post!')
			}
		}
	}
}
