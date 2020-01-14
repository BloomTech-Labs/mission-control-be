// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on Product type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const program = ({ id }, _, { prisma }) => {
  const res = prisma.product({ id }).program();

  return res;
};

const projects = ({ id }, _, { prisma }) => {
  const res = prisma.product({ id }).projects();

  return res;
};

module.exports = {
  program,
  projects,
};
