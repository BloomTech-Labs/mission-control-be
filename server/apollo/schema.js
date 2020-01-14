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
    notes: [ProjectNote!]!
    people: [Person!]!
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
    createProjectNote(
      id: ID!
      title: String!
      content: String!
      rating: String!
    ): ProjectNote!
    createRole(title: String!): Role!
    updateRole(id: ID!, title: String!): Role!
    createUser: User!
    createPerson(
      id: ID!
      name: String!
      githubId: String!
      slackId: String!
      avatarURL: String!
      timeZone: String!
    ): Person!
  }

  type User {
    id: ID!
    email: String!
    info: Person!
  }

  type Program {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product]!
    people: [Person!]!
  }

  type Product {
    id: ID!
    name: String!
    program: Program!
    createdAt: String!
    updatedAt: String!
    projects: [Project]!
  }

  type Project {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    start: String!
    end: String!
    product: Product!
    notes: [ProjectNote!]!
    projectRoles: [ProjectRole]!
  }

  ## Ideally, the author field would return type Person, but
  ## there are limitations in the prisma API that prevent this
  ## from functioning correctly until Prisma 2 release
  ## See: https://github.com/prisma/prisma/issues/1907

  type ProjectNote {
    id: ID!
    project: Project!
    ## author: See comment
    author: String!
    meetingAttendees: [Person!]!
    createdAt: String!
    updatedAt: String!
    title: String!
    content: String!
    performanceRating: Rating!
  }

  enum Rating {
    LOW
    MEDIUM
    HIGH
  }

  type Role {
    id: ID!
    title: String!
    createdAt: String!
    updatedAt: String!
  }

  type ProjectRole {
    id: ID!
    person: Person!
    project: Project!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type ProductRole {
    id: ID!
    person: Person!
    product: Product!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type ProgramRole {
    id: ID!
    person: Person!
    program: Program!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type Person {
    id: ID!
    name: String!
    program: Program!
    githubId: String!
    slackId: String!
    avatarURL: String!
    timeZone: TimeZone!
    meetingsAttended: [ProjectNote!]!
    user: User!
  }

  enum TimeZone {
    PST
    CST
    EST
  }
`;

module.exports = typeDefs;
