const createProgram = (parent, args, context) => {
  const program = context.prisma.createProgram({
    name: args.name,
  });

  return program;
};

const createProduct = (parent, args, context) => {
  const product = context.prisma.createProduct({
    name: args.name,
    program: { connect: { id: args.id } },
  });

  return product;
};

const createProject = (parent, args, context) => {
  const project = context.prisma.createProject({
    name: args.name,
    status: args.status,
    product: { connect: { id: args.id } },
  });

  return project;
};

const createProjectRole = (parent, args, context) => {
  const { projectId, email, name } = args;
  const projectRole = context.prisma.createProjectRole({
    name,
    person: { connect: { email } },
    project: { connect: { id: projectId } },
  });

  return projectRole;
};

const createPerson = (parent, args, context) => {
  const { name, email } = args;
  const person = context.prisma.createPerson({ name, email });

  return person;
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createProjectRole,
  createPerson,
};
