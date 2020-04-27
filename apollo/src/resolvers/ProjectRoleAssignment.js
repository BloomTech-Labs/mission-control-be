// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Person }
 */
const person = (parent, _, context) => {
  return context.prisma.projectRoleAssignment({ id: parent.id }).person();
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Project }
 */
const project = (parent, _, context) => {
  return context.prisma.projectRoleAssignment({ id: parent.id }).project();
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Role }
 */
const role = (parent, _, context) => {
  return context.prisma.projectRoleAssignment({ id: parent.id }).role();
};

module.exports = {
  person,
  project,
  role,
}
