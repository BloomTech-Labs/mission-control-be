const PORT = process.env.PORT || 8000;
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./context');
const dataSources = require('./datasources');

(async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    dataSources, // Adds our CodeClimateAPI class to our server.
    // ↑↑ All dataSources are attached to the context object
    cors: true,
  });

  const { url } = await server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`=========Running on ${url}=========`);
})();
