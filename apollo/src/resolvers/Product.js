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

const CCRepos = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).Ccrepos();

  return res;
};

const grades = async (parent, args, context) => {
  const ccapi = context.dataSources.codeClimateAPI;
  const repos = await context.prisma.product({ id: parent.id }).Ccrepos();
  try {
    return repos.map(async repo => {
      const ccRepo = await ccapi.getRepobyID(repo.CCId);
      const snapShotID =
        ccRepo.data.relationships.latest_default_branch_snapshot.data.id;
      const ccSnapshot = await ccapi.getSnapshot(repo.CCId, snapShotID);
      const name = ccRepo.data.attributes.human_name;
      const link = ccRepo.data.links.self;
      return { ...ccSnapshot, name, link };
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  program,
  projects,
  CCRepos,
  grades,
};
