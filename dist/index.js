"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req
    })
});
mongoose_1.default
    .connect(MONGODB)
    .then(() => {
    console.log('Connected to MongoDB!');
    return server.listen();
})
    .then(() => {
    console.log(`Server started successfully!`);
});
//# sourceMappingURL=index.js.map