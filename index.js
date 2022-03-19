const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
	typeDefs,
	resolvers
})

mongoose
	.connect(MONGODB)
	.then((res) => {
		console.log('Connected to MongoDB!')
		return server.listen()
	})
	.then((res) => {
		console.log(`Server ${res.url} started at port ${res.port}!`)
	})
