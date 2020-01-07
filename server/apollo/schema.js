const { gql } = require('apollo-server');

const typeDefs = gql`
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
