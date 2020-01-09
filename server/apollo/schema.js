const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String!
    claims: [Group!]!
  }

  type Group {
    name: String!
  }

  type Query {
    info: String!
  }
`;

module.exports = typeDefs;
