const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    program: Program!
    product: Product!
    project: Project!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    person: [Person!]!
  }
  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, status: Boolean, id: ID!): Project!
    createProjectRole(
      projectId: ID!
      email: String!
      name: String!
    ): ProjectRole!
    createPerson(name: String!, email: String!): Person!
  }
  type Program {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product]!
  }
  type Product {
    id: ID!
    name: String!
    program: Program!
    project: [Project!]!
  }
  type Project {
    id: ID!
    name: String!
    product: Product!
    status: Boolean!
    roles: [ProjectRole!]!
  }
  type ProjectRole {
    id: ID!
    name: String!
    person: Person!
    project: Project!
  }
  type Person {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;
