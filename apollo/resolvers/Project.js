// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on Project type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const product = ({ id }, _, { prisma }) => {
  const res = prisma.project({ id }).product();

  return res;
};

const notes = ({ id }, _, { prisma }) => {
  const res = prisma.project({ id }).notes();

  return res;
};

const projectRoles = ({ id }, _, { prisma }) => {
  const res = prisma.project({ id }).projectRoles();

  return res;
};

module.exports = {
  product,
  notes,
  projectRoles,
};
