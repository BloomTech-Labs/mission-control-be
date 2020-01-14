// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

const program = ({ id }, _, { prisma }) => prisma.product({ id }).program();

const projects = ({ id }, _, { prisma }) => prisma.product({ id }).projects();

module.exports = {
  program,
  projects,
};
