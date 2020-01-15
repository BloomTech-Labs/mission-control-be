// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these funtions is to resolve fields on ProductRole type
// where there exists a relation rather than a Scalar value.
// They capture the ID from the parent element and resolve
// a field of the same name as the function by ID.

const person = ({ id }, _, { prisma }) => {
  const res = prisma.productRole({ id }).person();

  return res;
};

const product = ({ id }, _, { prisma }) => {
  const res = prisma.productRole({ id }).product();

  return res;
};

const role = ({ id }, _, { prisma }) => {
  const res = prisma.productRole({ id }).role();

  return res;
};

module.exports = {
  product,
  person,
  role,
};
