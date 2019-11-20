// import dotenv 
require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')

// Importing Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
// const Project = require('./resolvers/Project');
// const Subscription = require('./resolvers/Subscription');


//  RESOLVERS
const resolvers = {
    Query, 
    Mutation,
    // Product,
    // Project,
    // Subscription,
}


//  SERVER 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request, 
            prisma,
        }
    },
})

//  Options 
const options = {
//  PORT DEFINED
    port: process.env.PORT || 6000,
    endpoint: '/',
    subscriptions: '/subscriptions',
    playground: '/playground'
}

//  RUN SERVER 
server.start(options, ({port}) => {
    console.log(`\n\n*****************************************\nServer is Running on http:localhost:${port}!\n*****************************************\n\n`)
})
