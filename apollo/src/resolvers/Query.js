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
}

const label = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.label({ id });
  return res;
}

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
  return res;
};

const CCRepos = (parent, args, context) => {
  const res = context.prisma.ccrepos();
  return res;
};

const CCRepo = (parent, args, context) => {
  const { id, name } = args;
  const res = context.prisma.ccrepo({ id, name });
  return res;
};

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

const codeclimateSnapshot = async (parent, args, context) => {
  // Pulling our specific codeClimate class out of our context object
  // To see how the dataSources are connected to the context obj, check out "../index.js"
  const CodeClimateConnection = context.dataSources.codeClimateAPI;
  try {
    const { slug } = args; // Pulling our slug out of arguments
    const res = await CodeClimateConnection.getRepobyGHSlug(slug);

    // Getting the RepoId and the SnapshotId from our response
    const repoId = res.data[0].id;
    const snapShot =
      res.data[0].relationships.latest_default_branch_snapshot.data.id;
    const name = res.data[0].attributes.human_name;
    
    // This part doesnt work, but this is what would save the repo id in the database
    // const { CCRepoIds } = await context.prisma.project({
    //   id: 'ck6bhpaw200dh078919sckrag',
    // });
    // const newArr = [...CCRepoIds, repoId];
    // context.prisma.updateProject({
    //   data: { CCRepoIds: newArr },
    //   where: { id: 'ck6bhpaw200dh078919sckrag' },
    // });

    // With the repoId and the snapshotId, we can get the grade of the CC repo
    let snapShotResponse = await CodeClimateConnection.getSnapshot(repoId, snapShot);
    snapShotResponse = {...snapShotResponse, name: name}
    return snapShotResponse;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const codeclimateRepository = async (parent, args, context) => {
  const CodeClimateConnection = context.dataSources.codeClimateAPI;

  const productId = context.prisma.products.repositories

  try{
    const { slug } = args; // Pulling our slug out of arguments
    const res = await CodeClimateConnection.getAllRepos( {} );



    return
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }

}

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
  codeclimateSnapshot,
  CCRepos,
  CCRepo,
};
