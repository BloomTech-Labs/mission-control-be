// @ts-check

// All resolvers must be imported here and declared in the resolvers
// object in order to be received by the client. If you are logging
// your resolvers but not seeing anything print to stdout, this is
// the most likely culprit

const Query = require('./Query');
const Mutation = require('./Mutation');
const Program = require('./Program');
const Product = require('./Product');
const Project = require('./Project');
const ProjectRoleAssignment = require('./ProjectRoleAssignment');
const ProjectStatusElement = require('./ProjectStatusElement');
const User = require('./User');
const Person = require('./Person');
const Note = require('./Note');
const GithubRepo = require('./GithubRepo');
const StatusCategory = require('./StatusCategory');
const Tag = require('./Tag');
const Feed = require('./Feed');

const resolvers = {
  Query,
  Mutation,
  Program,
  Product,
  Project,
  ProjectRoleAssignment,
  ProjectStatusElement,
  User,
  Person,
  Note,
  GithubRepo,
  StatusCategory,
  Tag,
  Feed
};

module.exports = resolvers;
