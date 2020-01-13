// Resolvers receive up to four arguments: parent, args, context, info.
// Unused parameters are denoted by underscores, and methods have been
// destructured and aliased with a capital letter where possible.

const info = () => 'Hello from the API';

// Requires where, filter, pagination
const program = (_, _args, { prisma: { program: Program } }) => Program();
const project = (_, _args, { prisma: { project: Project } }) => Project();
const product = (_, _args, { prisma: { product: Product } }) => Product();

// Done
const products = (_, _args, { prisma: { products: Products } }) => Products();
const projects = (_, _args, { prisma: { projects: Projects } }) => Projects();
const programs = (_, _args, { prisma: { programs: Programs } }) => Programs();
const notes = (_, _args, { prisma: { notes: Notes } }) => Notes();

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
