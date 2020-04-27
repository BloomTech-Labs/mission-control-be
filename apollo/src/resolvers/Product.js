// @ts-check

/**
 * @param { import('../generated/prisma-client').Product } parent
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').ProgramPromise }
 */
const program = (parent, _, context) => {
  return context.prisma.product({ id: parent.id }).program();
};

/**
 * @param { import('../generated/prisma-client').Product } parent
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Project> }
 */
const projects = (parent, args, context) => {
  return context.prisma.product({ id: parent.id }).projects(args);
};

/**
 * @param { import('../generated/prisma-client').Product } parent
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').GithubRepo> }
 */
const githubRepos = (parent, args, context) => {
  return context.prisma.product({ id: parent.id }).githubRepos(args);
};

// const grades = async (parent, args, context) => {
//   const ccapi = context.dataSources.codeClimateAPI;
//   const repos = await context.prisma.product({ id: parent.id }).Ghrepos();
//   try {
//     return repos.map(async repo => {
//       const GHRepoId = repo.id
//       const ccRepo = await ccapi.getRepobyGHSlug(`${repo.owner}/${repo.name}`);
//       let snapShotID
//       let ccSnapshot
//       if(ccRepo.data[0].relationships.latest_default_branch_snapshot.data !== null){
//         snapShotID =
//         ccRepo.data[0].relationships.latest_default_branch_snapshot.data.id;
//         ccSnapshot = await ccapi.getSnapshot(repo.CCId, snapShotID);
//       } else {
//             ccSnapshot = { id: Date.now(), grade: '!' }
//       }
//       const name = ccRepo.data[0].attributes.human_name;
//       const link = ccRepo.data[0].links.self;
//       return { ...ccSnapshot, name, link, GHRepoId };
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = {
  program,
  projects,
  githubRepos,
};
