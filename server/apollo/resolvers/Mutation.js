// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

const createProgram = (_, { name }, { prisma }) =>
  prisma.createProgram({ name });

const createProduct = (_, { name, id }, { prisma }) =>
  prisma.createProduct({
    name,
    program: { connect: { id } },
  });

module.exports = {
  createProgram,
  createProduct,
};
