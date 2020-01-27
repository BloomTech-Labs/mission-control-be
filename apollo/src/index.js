const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./context');

(async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    cors: true,
  });

  const { url } = await server.listen(process.env.PORT);
  // eslint-disable-next-line no-console
  console.log(`Running on ${url}`);
})();
