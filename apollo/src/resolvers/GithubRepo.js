// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').Product }
 */
const product = (parent, _, context) => {
  return context.prisma.githubRepo({ id: parent.id }).product();
};

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').GithubRepoGrade }
 */
const grade = (parent, _, context) => {
  return context.prisma.githubRepo({ id: parent.id }).grade();
};

module.exports = {
  product,
  grade,
};
