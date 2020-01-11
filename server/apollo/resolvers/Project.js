// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

const product = ({ id }, _, { prisma }) => prisma.project({ id }).product();

module.exports = {
  product,
};
