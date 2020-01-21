const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    programs: [Program!]!
    products: [Product!]!
    projects: [Project!]!
    persons: [Person!]!
    me: User!
  }

  type Mutation {
    createProgram(name: String!): Program!
    createProduct(name: String!, id: ID!): Product!
    createProject(name: String!, id: ID!): Project!
    createPerson(name: String!, email: String!, role: String!): Person!
    addProjectSectionLead(id: ID!, email: String!): Person!
    addProjectTeamLead(id: ID!, email: String!): Person!
    addProjectMember(id: ID!, email: String!): Person!
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
    sectionLead: Person
    teamLead: Person
    projectManagers: [Person!]!
    team: [Person!]!
    meetings: [Meeting!]!
    createdAt: String!
    updatedAt: String!
  }

  type Meeting {
    id: ID!
    title: String!
    attendedBy: [Person!]!
    project: Project!
    notes: [Note!]!
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    meeting: Meeting!
    author: Person!
  }

  type Person {
    id: ID!
    name: String!
    email: String!
    role: Role!
    notes: [Note!]!
    manages: [Project!]!
    team: Project
    sl: [Project!]!
    tl: Project
  }

  type User {
    id: ID!
    email: String!
    claims: [String!]!
    projects: [Project!]!
  }

  enum Role {
    SL
    TL
    WEB
    DS
    UX
    PM
  }
`;

module.exports = typeDefs;
