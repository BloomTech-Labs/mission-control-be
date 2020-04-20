// @ts-check

// Apollo dependencies
const { importSchema } = require('graphql-import');
const { ApolloServer, gql } = require('apollo-server');

const PORT = process.env.PORT || 8000;

const resolvers = require('./resolvers');
const context = require('./context');
const dataSources = require('./datasources');

const typeDefs = gql(importSchema('schema/apollo.graphql'));

(async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    dataSources, // Adds our CodeClimateAPI class to our server.
    // ↑↑ All dataSources are attached to the context object
    cors: true,
    formatError: err => {
      // Don't give the specific errors to the client.
      console.log('%O', err);
      console.log('%O', err.extensions);

      // Otherwise return the original error.  The error can also
      // be manipulated in other ways, so long as it's returned.
      return err;
    },
  });

  const { url } = await server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`=========Running on ${url}=========`);
})();
