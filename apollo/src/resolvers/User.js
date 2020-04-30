// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Project> }
 */
const projects = context => {
  const {
    user: { email },
    prisma,
  } = context;

  const where = {
    OR: [
      { sectionLead: { email } },
      { teamLead: { email } },
      { projectManagers_some: { email } },
      { team_some: { email_in: email } },
    ],
  };
  const res = prisma.projects({ where });

  return res;
};

// /**
//  * @param { import('../context').ApolloContext } context
//  * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Project> }
//  */
// const role = context => {
//   const res = context.prisma.user({ id: parent.id }).role();
//   return res;
// };

module.exports = {
  projects,
  // role,
};
