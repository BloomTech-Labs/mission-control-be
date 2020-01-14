// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on ProjectNote type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const project = ({ id }, _, { prisma }) => {
  const res = prisma.projectNote({ id }).project();

  return res;
};

const meetingAttendees = ({ id }, _, { prisma }) => {
  const res = prisma.projectNote({ id }).meetingAttendees();

  return res;
};

const performanceRating = ({ id }, _, { prisma }) => {
  const res = prisma.projectNote({ id }).performanceRating();

  return res;
};

module.exports = {
  project,
  meetingAttendees,
  performanceRating,
};
