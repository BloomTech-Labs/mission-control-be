const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Boy {
    id: ID!
    name: String!
  }

  type Query {
    allBoys: [Boy!]!
    oneBoy(id: ID!): Boy!
  }
`;

const boys = [
  { name: 'Nicholas', id: 'one' },
  { name: 'Kevin', id: 'two' },
  { name: 'Roy', id: 'three' },
];

const resolvers = {
  Query: {
    allBoys: () => boys,
    // Resolvers take in four params -> parent, args, context, info
    oneBoy: (parent, args) => {
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
