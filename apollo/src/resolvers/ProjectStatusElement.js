// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Project }
 */
const project = (parent, _, context) => {
  return context.prisma.projectStatusElement({ id: parent.id }).project();
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').StatusCategory }
 */
const category = (parent, _, context) => {
  return context.prisma.projectStatusElement({ id: parent.id }).category();
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').StatusValueOption }
 */
const value = (parent, _, context) => {
  return context.prisma.projectStatusElement({ id: parent.id }).value();
};

module.exports = {
  project,
  category,
  value,
};
