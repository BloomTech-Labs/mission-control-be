// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

const info = (parent, args, context) => `Hello World`;

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

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
  return res;
};

const me = (parent, args, context) => context.user;

module.exports = {
  info,
  programs,
  products,
  projects,
  persons,
  me,
};
