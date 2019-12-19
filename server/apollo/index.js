const { ApolloServer, gql } = require('apollo-server');
const GraphQLDateTime = require('graphql-type-datetime');

const typeDefs = gql`
  type Boi {
    id: Int!
    name: String!
  }
  type Query {
    allBois: [Boi!]!
    oneBoi(id: Int!): Boi!
  }
`;
const bois = [
  {
    name: 'Nick',
    id: 0,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Roy',
    id: 1,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Kevin',
    id: 2,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Dakotah',
    id: 3,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Tony',
    id: 4,
    createdAt: new Date().toISOString(),
  },
];

const resolvers = {
  // DateTime: GraphQLDateTime,
  Query: {
    allBois: () => bois,
    oneBoi: id => bois.filter(boi => boi.id === id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
