// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on ProgramRole type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const person = ({ id }, _, { prisma }) => {
  const res = prisma.programRole({ id }).person();

  return res;
};

const program = ({ id }, _, { prisma }) => {
  const res = prisma.programRole({ id }).program();

  return res;
};

const role = ({ id }, _, { prisma }) => {
  const res = prisma.programRole({ id }).role();

  return res;
};

module.exports = {
  program,
  person,
  role,
};
