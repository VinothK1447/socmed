const { gql } = require('apollo-server')

module.exports = gql`
	type Post {
		id: ID!
		userName: String!
		body: String!
		createdAt: String!
	}
	type Query {
		getPosts: [Post]
	}
`
