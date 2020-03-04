// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

const info = () => `Hello World`;

const programs = (parent, args, context) => {
  const res = context.prisma.programs();
  return res;
};

const products = (parent, args, context) => {
  const res = context.prisma.products();
  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.projects();
  return res;
};

const project = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.project({ id });
  return res;
};

const labels = (parent, args, context) => {
  const res = context.prisma.labels();
  return res;
};

const label = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.label({ id });
  return res;
};

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
  return res;
};

const CCRepos = (parent, args, context) => {
  const res = context.prisma.ccrepoes();
  return res;
};

const CCRepo = (parent, args, context) => {
  const { id, name } = args;
  const res = context.prisma.ccrepo({ id, name });
  return res;
};

const GHRepos = (parents, args, context) => {
  const res = context.prisma.ghrepos();
  return res;
};

const GHRepo = (parent, args, context) => {
  const { id, name } = args;
  const res = context.p
}

const me = (parent, args, context) => context.user;

const note = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.note({ id });
  return res;
};

const notes = (parent, args, context) => {
  const { orderBy } = args;
  const res = context.prisma.notes({ orderBy });
  return res;
};

const CodeClimateSnapshot = async (parent, args, context) => {
  const CodeClimateConnection = context.dataSources.codeClimateAPI;
  try {
    const { slug } = args;
    const res = await CodeClimateConnection.getRepobyGHSlug(slug);
    const link = res.data[0].links.self;
    const repoId = res.data[0].id;
    const snapShot =
      res.data[0].relationships.latest_default_branch_snapshot.data.id;
    const name = res.data[0].attributes.human_name;

    let snapShotResponse = await CodeClimateConnection.getSnapshot(
      repoId,
      snapShot,
    );
    snapShotResponse = { ...snapShotResponse, name, link };
    return snapShotResponse;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const GithubRepos =  async (parent, args, context) => {
  const GithubConnection = context.dataSources.gitHubAPI;
  try {
    const res = await GithubConnection.getReposByOrg();
   
  }
  catch(err) {
    console.log(err)
  }
};

module.exports = {
  info,
  programs,
  products,
  projects,
  project,
  labels,
  label,
  persons,
  me,
  note,
  notes,
  CodeClimateSnapshot,
  CCRepos,
  CCRepo,
  GithubRepos
};
