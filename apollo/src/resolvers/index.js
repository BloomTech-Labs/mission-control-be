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
const CCRepo = require('./CCRepos');
<<<<<<< HEAD
=======
const Label = require('./Label');
const Column = require('./Columns');
const GHRepo = require('./GHRepos');
>>>>>>> ba65d365e5621fb4f22bba8cea5536bcf0fb5131

const resolvers = {
  Query,
  Mutation,
  Program,
  Product,
  Project,
  User,
  Person,
  Note,
  CCRepo,
<<<<<<< HEAD
=======
  Label,
  Column,
  GHRepo,
>>>>>>> ba65d365e5621fb4f22bba8cea5536bcf0fb5131
};

module.exports = resolvers;
