const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    CodeClimateSnapshot(slug: String!): CodeClimateSnapshot
    GithubPulse(owner: String!, name: String!): Pulse!
    GithubRepos(search: String!, org: String): [GHRepo]!
    GHRepos: [GHRepo]!
    GHRepo(id: String!, name: String!): GHRepo!
    statuses: [Status!]!
    status(id: ID!): Status!
    labels: [Label]
    label(id: ID!): Label
    persons: [Person!]!
    person(email: String!): Person!
    products: [Product!]!
    programs: [Program!]!
    projects(filter: String): [Project!]!
    project(id: ID!): Project!
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note!]!
    note(id: ID!): Note!
    roles: [Role!]!
    role(id: ID!): Role!
    SparkyBoy(owner: String!, name: String!): [Sparkline!]!
    SparkyDate(owner: String!, name: String!, until: String!): [Sparkline!]!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    # createLabel(name: String!, color: String!, id: ID!): Label!
    createStatus(
      name: String!
      projects: [String]
      display: Boolean
      id: ID!
    ): Status!
    updateLabel(id: ID!, name: String, color: String): Label!
    updateSelectedLabel(id: ID!, selected: ID!, columnId: String): Label!
    deleteLabel(id: ID!, columnId: String): Label!
    updateStatus(id: ID!, name: String, display: Boolean): Status!
    disconnectSelectedLabel(id: ID!, selected: ID!, columnId: String): Label!
    deleteStatus(id: ID!): Status!
    createPerson(name: String!, email: String!): Person!
    addProjectMember(id: ID!, email: String!): Person!
    createNote(
      topic: String!
      content: String!
      privateNote: Boolean
      attendedBy: [String!]!
      id: ID!
      rating: Int!
      notification: Boolean
    ): Note!
    updateNote(
      topic: String
      content: String
      privateNote: Boolean
      attendedBy: [String]
      oldAttendees: [String]
      id: ID!
      rating: Int
    ): Note!
    deleteNote(id: ID!): Note!
    addStatusToProject(id: ID!, name: String!): Project!
    addLabelToStatus(id: ID!, name: String!): Status!
    createGithubRepo(
      repoId: String!
      name: String!
      id: String!
      owner: String!
      ownerId: String!
    ): GHRepo!
    deleteGithubRepo(id: ID!): GHRepo!
  }

  type CodeClimateSnapshot {
    id: ID!
    grade: String!
    name: String!
    link: String!
    GHRepoId: String!
  }

  type GHRepo {
    id: ID!
    name: String!
    owner: String!
    ownerId: String!
    repoId: String!
    product: Product
  }

  # type Label {
  #   id: ID!
  #   createdAt: String!
  #   updatedAt: String!
  #   name: String!
  #   color: String!
  #   status: Status!
  #   selected: [Project]
  # }

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

  type Product {
    id: ID!
    name: String!
    program: Program!
    createdAt: String!
    updatedAt: String!
    projects: [Project!]!
    productActive: Boolean
    GHRepos: [GHRepo]!
    grades: [CodeClimateSnapshot!]
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

  type Program {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
    products: [Product!]!
    statuses: [Status!]
  }

  type Project {
    id: ID!
    name: String!
    product: Product!
    projectManagers: [Person!]!
    team: [Person!]!
    notes(orderBy: NoteOrderByInput, privatePerm: Boolean): [Note]
    createdAt: String!
    updatedAt: String!
    projectStatus: [Status]
    projectActive: Boolean
  }

  type Pulse {
    id: ID!
    issueCount: Int!
    closedIssues: Int!
    openIssues: Int!
    prCount: Int!
    closedPRs: Int!
    openPRs: Int!
    mergedPRs: Int!
  }

  type Role {
    id: ID!
    name: String!
    privateNote: Boolean!
    viewProducts: Boolean!
  }

  type Sparkline {
    id: ID!
    message: String!
    additions: Int!
    deletions: Int!
    changedFiles: Int!
    committedDate: String!
  }

  type User {
    id: ID!
    email: String!
    claims: [String!]!
    projects: [Project!]!
    role: Role!
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

  type Status {
    id: ID!
    createdAt: String!
    updatedAt: String!
    name: String!
    labels: [Label]
    projects: [Project!]
    program: Program
    display: Boolean!
  }

  #LAB23-T1 TAG  Needs Order by input
  type Tag {
    id: ID!
    name: String!
    isUsed: Boolean!
  }

#Lab23-T1 Search
enum ProjectsOrderByInput {
  name_ASC
  name_DESC
  product
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
}'

type Feed {
  id:ID! @id
  filter: String!
  projects: [Project!]!
  count: Int!
}


`;

module.exports = typeDefs;
