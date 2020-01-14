// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on Program type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const products = ({ id }, _, { prisma }) => {
  const res = prisma.program({ id }).products();

  return res;
};

const people = ({ id }, _, { prisma }) => {
  const res = prisma.program({ id }).people();

  return res;
};

module.exports = {
  products,
  people,
};
