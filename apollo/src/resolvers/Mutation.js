const createProgram = (parent, args, context) => {
  const program = context.prisma.createProgram({ name: args.name });

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
  const program = context.prisma.createProject({
    name: args.name,
    product: { connect: { id: args.id } },
  });

  return program;
};

const createPerson = (parent, args, context) => {
  const { name, email, role } = args;
  const person = context.prisma.createPerson({ name, email, role });

  return person;
};

const addProjectSectionLead = (parent, args, context) => {
  const { id, email } = args;
  const project = context.prisma.updateProject({
    data: { sectionLead: { connect: { email } } },
    where: { id },
  });

  return project;
};

const addProjectTeamLead = (parent, args, context) => {
  const { id, email } = args;
  const project = context.prisma.updateProject({
    data: { teamLead: { connect: { email } } },
    where: { id },
  });

  return project;
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createPerson,
  addProjectSectionLead,
  addProjectTeamLead,
};
