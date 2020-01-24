const PORT = process.env.PORT || 8000;
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

  const { url } = await server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(url);
})();
