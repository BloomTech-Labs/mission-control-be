const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    project(id: ID!): Project!
    columns: [Column!]!
    column(idL: ID!): Column!
    labels: [Label!]!
    label(id: ID!): Label!
    persons: [Person!]!
    me: User!
    notes(orderBy: NoteOrderByInput): [Note!]!
    note(id: ID!): Note!
    CodeClimateSnapshot(slug: String!): CodeClimateSnapshot
    CCRepos: [CCRepo]!
    CCRepo(id: ID, name: String): CCRepo!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    createLabel(name: String!, color: String!, column: String): Label!
    createColumn(name: String!, labels: String): Column!
    updateLabel(id: ID!, name: String, color: String): Label!
    deleteLabel(id: ID!): Label!
    createPerson(name: String!, email: String!): Person!
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
    addColumnToProject(id: ID!, name: String!): Project!
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
    productActive: Boolean
    CCRepos: [CCRepo]!
    grades: [CodeClimateSnapshot!]
  }

  type Project {
    id: ID!
    name: String!
    product: Product!
    status: Boolean!
    projectManagers: [Person!]!
    team: [Person!]!
    notes(orderBy: NoteOrderByInput): [Note]
    CCRepoIds: [String]
    createdAt: String!
    updatedAt: String!
    projectColumns: [Column]!
    projectActive: Boolean
  }

  type CCRepo {
    id: ID!
    name: String!
    CCId: String!
    product: Product!
  }

  type Person {
    id: ID!
    name: String!
    email: String!
    manages: [Project!]!
    notes: [Note]
    team: Project
    avatar: String
  }

  type User {
    id: ID!
    email: String!
    claims: [String!]!
    projects: [Project!]!
  }

  type Note {
    id: ID!
    topic: String!
    content: String!
    author: Person!
    project: Project!
    attendedBy: [Person!]!
    createdAt: String!
    updatedAt: String!
    rating: Int!
  }

  type CodeClimateSnapshot {
    id: ID!
    grade: String!
    name: String!
    link: String!
  }

  type Label {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    color: String!
    column: Column
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

  type Column {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String
    labels: [Label]!
  }
`;

module.exports = typeDefs;
