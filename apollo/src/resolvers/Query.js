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

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
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

module.exports = {
  info,
  programs,
  products,
  projects,
  project,
  persons,
  me,
  note,
  notes,
};
