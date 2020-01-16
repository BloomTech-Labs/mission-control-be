const program = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).program();

  return res;
};

const project = (parent, args, context) => {
  const res = context.prisma.product({ id: parent.id }).project();

  return res;
};

module.exports = {
  program,
  project,
};
