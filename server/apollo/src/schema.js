const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
  }
`;

module.exports = typeDefs;
