const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    project(id: ID!): Project!
    persons: [Person!]!
    me: User!
    notes(orderBy: NoteOrderByInput): [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    createPerson(name: String!, email: String!, role: String!): Person!
    addProjectSectionLead(id: ID!, email: String!): Person!
    addProjectTeamLead(id: ID!, email: String!): Person!
    addProjectMember(id: ID!, email: String!): Person!
    createNote(
      topic: String!
      content: String!
      attendedBy: [String!]!
      id: ID!
      rating: Int!
      notification: Boolean
    ): Note!
    updateNote(
      topic: String
      content: String
      attendedBy: [String]
      oldAttendees: [String]
      id: ID!
      rating: Int
    ): Note!
    deleteNote(id: ID!): Note!
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
    createdAt: String!
    updatedAt: String!
    projects: [Project!]!
  }

  type Project {
    id: ID!
    name: String!
    product: Product!
    status: Boolean!
    projectManagers: [Person!]!
    team: [Person!]!
    notes(orderBy: NoteOrderByInput): [Note]
    createdAt: String!
    updatedAt: String!
  }

  type Person {
    id: ID!
    name: String!
    email: String!
    role: Role!
    authored: [Note!]!
    avatar: String
    projects: [Project!]!
  }

  type User {
    id: ID!
    email: String!
    claims: [String!]!
    projects: [Project!]!
  }

  type Role {
    id: ID!
    name: String!
    privateNote: Boolean!
    viewProducts: Boolean!
  }

  type Note {
    id: ID!
    topic: String!
    content: String!
    author: Person!
    private: Boolean!
    project: Project!
    createdAt: String!
    updatedAt: String!
  }

  enum NoteOrderByInput {
    id_ASC
    id_DESC
    topic_ASC
    topic_DESC
    content_ASC
    content_DESC
    rating_ASC
    rating_DESC
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }
`;

module.exports = typeDefs;
