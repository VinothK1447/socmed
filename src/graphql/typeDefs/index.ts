const { gql } = require('apollo-server')

module.exports = gql`
	type Post {
		id: ID!
		userName: String!
		body: String!
		createdAt: String!
		comments: [Comment]!
		likes: [Like]!
	}

	type Comment {
		id: ID!
		userName: String!
		body: String!
		createdAt: String!
	}

	type Like {
		id: ID!
		createdAt: String!
		userName: String!
	}

	input RegisterInput {
		userName: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type User {
		id: ID!
		email: String!
		createdAt: String
		token: String!
		userName: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(userName: String!, password: String!): User!
		createPost(body: String): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
`
