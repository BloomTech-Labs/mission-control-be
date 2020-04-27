// @ts-check

// Resolves all relational fields on type Project
// where the name of the function is an exact match to the field

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').ProductPromise }
 */
const product = (parent, _, context) => {
  const res = context.prisma.project({ id: parent.id }).product();

  return res;
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').ProjectRoleAssignment> }
 */
const assignments = (parent, args, context) => {
  context.logger.debug('Project.assignments(%O - %O)', parent, args);
  return context.prisma.project({ id: parent.id }).assignments(args);
};

// const teamMembers = (parent, _, context) => {
//   const res = context.prisma.project({ id: parent.id }).teamMembers();

//   return res;
// };

// const projectManagers = (parent, _, context) => {
//   const res = context.prisma.project({ id: parent.id }).projectManagers();

//   return res;
// };

/**
 * @param { import('../context').ApolloContext } context
 * @param { import('../generated/prisma-client').Project } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Note> }
 */
const notes = (parent, args, context) => {
  return context.prisma.project({ id: parent.id }).notes();
  // const { id } = parent;
  // const { orderBy, privatePerm } = args;

  // const res = context.prisma.project({ id }).notes({ orderBy });
  // const where = { privateNote: false };
  // const resPublic = context.prisma.project({ id }).notes({ where });

  // if (privatePerm) {
  //   return res;
  // }
  // return resPublic;

  //  const res = context.prisma.project({ id }).notes({ orderBy });

  //  return res;
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').ProjectStatusElement> }
 */
const status = (parent, _, context) => {
  return context.prisma.project({ id: parent.id }).status();
};

module.exports = {
  product,
  assignments,
  // teamMembers,
  // projectManagers,
  notes,
  status,
};
