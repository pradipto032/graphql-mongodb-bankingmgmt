// This is the imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// This is the connection URL for mongoDB Atlas
const MONGODB = "mongodb+srv://pdaw:pdaw@mongodbgrahql.xrkxwro.mongodb.net/?retryWrites=true&w=majority"

// Declarations for typeDefs and resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Declaration for Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Connecting the mongoDB server
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
        return server.listen(5001)
    })
    .then((res) => {
        console.log(`Server listening on ${res.port}`)
    });