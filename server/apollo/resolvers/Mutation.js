// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

const createProgram = (_, { name }, { prisma }) =>
  prisma.createProgram({ name });

const createProduct = (_, { name, id }, { prisma }) =>
  prisma.createProduct({
    name,
    program: { connect: { id } },
  });

const createProject = (_, { id, name, start, end }, { prisma }) =>
  prisma.createProject({
    name,
    start,
    end,
    product: { connect: { id } },
  });

const createUser = (_, _args, { prisma, user }) => {
  return prisma.createUser({ email: user.email });
};

const createPerson = (
  parent,
  { id, name, githubId, slackId, avatarURL, timeZone },
  { prisma, user: User },
) => {
  return prisma.createPerson({
    name,
    githubId,
    slackId,
    avatarURL,
    timeZone,
    program: { connect: { id } },
    // meetingsAttended: { connect: { id: noteId } },
    user: { connect: { email: User.email } },
  });
};

const createRole = (_, { title }, { prisma }) => prisma.createRole({ title });

const updateRole = (_, { title, id }, { prisma }) => {
  return prisma.updateRole({ data: { title }, where: { id } });
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createRole,
  updateRole,
  createUser,
  createPerson,
};
