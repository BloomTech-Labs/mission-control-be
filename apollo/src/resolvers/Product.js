// Resolves all relational fields on type Product
// where the name of the function is an exact match to the field

const program = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).program();

  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).projects();

  return res;
};

const productStatus = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).productStatus();

  return res;
}

const productHealth = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).productHealth();

  return res;
}

const CCRepos = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).ccrepos();

  return res;
};

module.exports = {
  program,
  projects,
  productStatus,
  productHealth,
  CCRepos,
};
