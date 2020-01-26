// All resolvers must be imported here and declared in the resolvers
// object in order to be received by the client. If you are logging
// your resolvers but not seeing anything print to stdout, this is
// the most likely culprit

const Query = require('./Query');
const Mutation = require('./Mutation');
const Program = require('./Program');
const Product = require('./Product');
const Project = require('./Project');
const User = require('./User');
const Person = require('./Person');
const Note = require('./Note');

const resolvers = {
  Query,
  Mutation,
  Program,
  Product,
  Project,
  User,
  Person,
  Note,
};

module.exports = resolvers;
