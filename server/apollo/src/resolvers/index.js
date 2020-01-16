const Mutation = require('./Mutation');
const Query = require('./Query');
const Program = require('./Program');
const Product = require('./Product');
const Project = require('./Project');
const ProjectRole = require('./ProjectRole');

const resolvers = {
  Mutation,
  Query,
  Program,
  Product,
  Project,
  ProjectRole,
};

module.exports = resolvers;
