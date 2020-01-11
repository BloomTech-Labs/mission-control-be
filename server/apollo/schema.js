const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String!
    claims: [Group!]!
  }

  type Group {
    name: String!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(id: ID!, name: String!): Product!
  }

  type Program {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    program: Program!
    projects: [Project!]!
  }

  type Query {
    info: String!
    programs: [Program]
    products: [Product]
    projects: [Project]
  }

  type Project {
    id: ID!
    name: String!
    product: Product!
    # projectNotes: [ProjectNote]!
    # projectRoles: [ProjectRole]!
  }
`;

module.exports = typeDefs;
