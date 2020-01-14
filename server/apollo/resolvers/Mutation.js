// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

// ===================================================================
// The purpose of these functions is to resolver Mutations where the
// name of the mutation is a function of the same name. Required params
// come through from arguments and context on a per-mutation basis.

// Required: name @unique
const createProgram = (_, { name }, { prisma }) => {
  const program = prisma.createProgram({ name });

  return program;
};

// Required: name @unique, where pogram id == args id
const createProduct = (_, { name, id }, { prisma }) => {
  const product = prisma.createProduct({
    name,
    program: { connect: { id } },
  });

  return product;
};

// Required: name, start, end, where program id == args id
const createProject = (_, { id, name, start, end }, { prisma }) => {
  const project = prisma.createProject({
    name,
    start,
    end,
    product: { connect: { id } },
  });

  return project;
};

const createProjectNote = (_, { id, title, content, rating }, { prisma, user } ) => 
  prisma.createProjectNote({
    title,
    content,
    project: { connect: { id }},
    performanceRating: rating,
    author: user.email
  })

// Required: email @unique
const createUser = (_, _args, { prisma, user: { email } }) => {
  const user = prisma.createUser({ email });

  return user;
};

// Required fields: name, githubId, slackId, avatarURL, timeZone
// where context.user.email == args.email
const createPerson = (_, args, { prisma, user: { email } }) => {
  const { id } = args;
  const person = prisma.createPerson({
    ...args,
    program: { connect: { id } },
    user: { connect: { email } },
  });

  return person;
};

// Required: title
const createRole = (_, { title }, { prisma }) => {
  const role = prisma.createRole({ title });

  return role;
};

// Requied: title where id == this.id
const updateRole = (_, { title, id }, { prisma }) => {
  const role = prisma.updateRole({ data: { title }, where: { id } });

  return role;
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createRole,
  updateRole,
  createUser,
  createPerson,
  createProjectNote
};
