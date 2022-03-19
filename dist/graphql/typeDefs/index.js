"use strict";
const { gql } = require('apollo-server');
module.exports = gql `
	type Post {
		id: ID!
		userName: String!
		body: String!
		createdAt: String!
	}

	type Query {
		getPosts: [Post]
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

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(userName: String!, password: String!): User!
	}
`;
//# sourceMappingURL=index.js.map