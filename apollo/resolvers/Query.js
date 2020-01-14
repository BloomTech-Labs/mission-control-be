// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve queries by type
// where the function resolves a type field of the same name

// ===================================================================
// Singular fields require a "where" clause to be useful
// All introspective (read: own) queries can use context to get
// information about the user currently logged in, otherwise, use args.

const program = (_, _args, { prisma: { program: Program } }) => Program();
const project = (_, _args, { prisma: { project: Project } }) => Project();
const product = (_, _args, { prisma: { product: Product } }) => Product();

// ===================================================================
// Pagination and filtering params can likewise be passed into plurals
// See the documentation for informatin on filtering, pagination, sorting

const products = (_, _args, { prisma: { products: Products } }) => Products();
const projects = (_, _args, { prisma: { projects: Projects } }) => Projects();
const programs = (_, _args, { prisma: { programs: Programs } }) => Programs();
const notes = (_, _args, { prisma: { notes: Notes } }) => Notes();

// Hello, world!
const info = () => 'Hello from the API';

module.exports = {
  info,
  programs,
  program,
  products,
  product,
  projects,
  project,
  notes,
};
