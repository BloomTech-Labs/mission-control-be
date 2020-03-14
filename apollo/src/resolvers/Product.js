// Resolves all relational fields on type Product
// where the name of the function is an exact match to the field

const program = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).program();

  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).projects();

  return res;
};

const GHRepos = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).Ghrepos();

  return res;
};

const grades = async (parent, args, context) => {
  const ccapi = context.dataSources.codeClimateAPI;
  const repos = await context.prisma.product({ id: parent.id }).Ghrepos();
  try {
    return repos.map(async repo => {
      const ccRepo = await ccapi.getRepobyGHSlug(`${repo.owner}/${repo.name}`);
      const snapShotID =
        ccRepo.data[0].relationships.latest_default_branch_snapshot.data.id;
      const ccSnapshot = await ccapi.getSnapshot(repo.CCId, snapShotID);
      const name = ccRepo.data[0].attributes.human_name;
      const link = ccRepo.data[0].links.self;
      return { ...ccSnapshot, name, link };
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  program,
  projects,
  grades,
  GHRepos,
};