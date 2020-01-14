// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on Person type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const program = ({ id }, _, { prisma }) => {
  const res = prisma.person({ id }).program();

  return res;
};

const timeZone = ({ id }, _, { prisma }) => {
  const res = prisma.person({ id }).timeZone();

  return res;
};

const meetingsAttended = ({ id }, _, { prisma }) => {
  const res = prisma.person({ id }).meetingsAttended();

  return res;
};

const user = ({ id }, _, { prisma }) => {
  const res = prisma.person({ id }).user();

  return res;
};

module.exports = {
  program,
  timeZone,
  meetingsAttended,
  user,
};
