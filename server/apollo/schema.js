const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program]
    program: Program
    products: [Product]
    product: Product
    projects: [Project]
    project: Project
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(id: ID!, name: String!): Product!
    createProject(
      id: ID!
      name: String!
      start: String!
      end: String!
    ): Project!
  }

  type User {
    id: String!
    claims: [Group!]!
  }

  type Group {
    name: String!
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

  type Project {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    start: String!
    end: String!
    product: Product!
    # notes: [ProjectNote!]!
    # projectRoles: [ProjectRole!]!
  }
`;

module.exports = typeDefs;
