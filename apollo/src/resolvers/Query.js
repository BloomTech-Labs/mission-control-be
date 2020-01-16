const program = (parent, args, context) => {
  const res = context.prisma.program();

  return res;
};

const product = (parent, args, context) => {
  const res = context.prisma.product();

  return res;
};

const project = (parent, args, context) => {
  const res = context.prisma.project();

  return res;
};

const person = (parent, args, context) => {
  const res = context.prisma.person();

  return res;
};

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

const info = (a, b, context) => {
  console.log(context.user);
  return `Hello World`;
};

module.exports = {
  program,
  product,
  project,
  programs,
  products,
  projects,
  person,
  info,
};
