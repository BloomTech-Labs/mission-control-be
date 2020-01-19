// Mutations must be defined explicitly in the type definition
// inside of the graphql schema to be valid.
// See schema.js in src for examples

// Create a new program, takes a string
const createProgram = (parent, args, context) => {
  const program = context.prisma.createProgram({ name: args.name });

  return program;
};

// Create a new product, takes a string and a program ID
const createProduct = (parent, args, context) => {
  const product = context.prisma.createProduct({
    name: args.name,
    program: { connect: { id: args.id } },
  });

  return product;
};

// Create a new project, takes a string and a product ID
const createProject = (parent, args, context) => {
  const program = context.prisma.createProject({
    name: args.name,
    product: { connect: { id: args.id } },
  });

  return program;
};

// Create a new person, takes two strings and a role enum
// NOTE: email field is @unique, for enum see type defs
const createPerson = (parent, args, context) => {
  const { name, email, role } = args;
  const person = context.prisma.createPerson({ name, email, role });

  return person;
};

// Adds a Section Lead to a project, takes a string where email = person email
// Takes a project ID
const addProjectSectionLead = (parent, args, context) => {
  const { id, email } = args;
  const project = context.prisma.updateProject({
    data: { sectionLead: { connect: { email } } },
    where: { id },
  });

  return project;
};

// Adds a Team Lead to a project, takes a string where email = person email
// Takes a project ID
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
