// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Person }
 */
const author = (parent, _, context) => {
  return context.prisma.note({ id: parent.id }).author();
};

// const attendedBy = (parent, args, context) => {
//   const res = context.prisma.note({ id: parent.id }).attendedBy();
//   return res;
// };

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Project }
 */
const project = (parent, _, context) => {
  return context.prisma.note({ id: parent.id }).project();
};

module.exports = {
  author,
  // attendedBy,
  project,
};
