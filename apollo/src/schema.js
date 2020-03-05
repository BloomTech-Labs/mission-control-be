const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    project(id: ID!): Project!
    labels: [Label!]!
    label(id: ID!): Label!
    persons: [Person!]!
    person(email: String!): Person!
    roles: [Role!]!
    role(id: ID!): Role!
    me: User!
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note!]!
    note(id: ID!): Note!
    CodeClimateSnapshot(slug: String!): CodeClimateSnapshot
    CCRepos: [CCRepo]!
    CCRepo(id: ID, name: String): CCRepo!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    createLabel(name: String!, color: String!): Label!
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
    productStatus: [Label]
    productHealth: Label
    productState: Boolean
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
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note]
    CCRepoIds: [String]
    createdAt: String!
    updatedAt: String!
    projectStatus: [Label]
    projectHealth: Label
    projectState: Boolean
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
    role: Role!
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
    role: Role!
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
    privateNote: Boolean!
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
  }

  type Role {
    id: ID!
    name: String!
    privateNote: Boolean!
    viewProducts: Boolean!
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
