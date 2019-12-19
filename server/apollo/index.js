const { ApolloServer, gql } = require('apollo-server');

const resolvers = {
  Query: {
    allBoys: () => boys,
    // Resolvers take in four params -> parent, args, context, info
    oneBoy: (_, args) => {
      const { id } = args;
      const result = boys.filter(x => x.id === id);
      return result[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`\n *** Listening on ${url} ***\n`));
