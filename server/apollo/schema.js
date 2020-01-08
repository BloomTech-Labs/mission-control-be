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
    info: [Project!]!
  }

  type Project {
    project: String!
    team_lead: String!
    section_lead: String!
    update: String!
    status: String!
  }
`;

module.exports = typeDefs;
