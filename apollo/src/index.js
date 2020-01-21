const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./context');

(async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    playground: true,
    cors: true,
  });

  const { url } = await server.listen(8000);
  // eslint-disable-next-line no-console
  console.log(url);
})();
