// Resolvers receive up to four arguments: parent, args, context, info.
// Unused parameters are denoted by underscores, and methods have been
// destructured and aliased with a capital letter where possible.

const info = () => 'Hello from the API';

const programs = (_, _args, { prisma: { programs: Programs } }) => Programs();

const program = (_, _args, { prisma: { program: Program } }) => Program();

const products = (_, _args, { prisma: { products: Products } }) => Products();

const product = (_, _args, { prisma: { product: Product } }) => Product();

const projects = (_, _args, { prisma: { projects: Projects } }) => Projects();

const project = (_, _args, { prisma: { project: Project } }) => Project();

module.exports = {
  info,
  programs,
  program,
  products,
  product,
  projects,
  project,
};
