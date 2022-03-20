import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

const { MONGODB } = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
})

mongoose
	.connect(MONGODB)
	.then(() => {
		console.log('Connected to MongoDB!')
		return server.listen()
	})
	.then(() => {
		console.log(`Server started successfully!`)
	})
