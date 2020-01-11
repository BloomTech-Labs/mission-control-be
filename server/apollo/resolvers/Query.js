// Resolvers receive up to four arguments: parent, args, context, info.
// Unused parameters are denoted by underscores, and methods have been
// destructured and aliased with a capital letter where possible.

const info = () => 'Hello from the API';

const products = (_, _args, { prisma: { products: Products } }) => Products();

const programs = (_, _args, { prisma: { programs: Programs } }) => Programs();

const projects = (_, _args, { prisma: { projects: Projects } }) => Projects();

module.exports = {
  info,
  products,
  programs,
  projects,
};
