const Query = require('./Query');
const Mutation = require('./Mutation');
const Program = require('./Program');
const Product = require('./Product');
const Project = require('./Project');
const ProjectNote = require('./ProjectNote');
const ProjectRole = require('./ProjectRole');
const ProductRole = require('./ProductRole');
const ProgramRole = require('./ProgramRole');
const Person = require('./Person');

const resolvers = {
  Query,
  Mutation,
  Program,
  Product,
  Project,
  ProjectNote,
  ProjectRole,
  ProductRole,
  ProgramRole,
  Person,
};

module.exports = resolvers;
