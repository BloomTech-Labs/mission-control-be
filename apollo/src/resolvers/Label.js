const labels = (parent, args, context) => {
  const res = context.prisma.products({ id: parent.id }).labels();

  return res;
};

const project = (parent, args, context) => {
  const res = context.prisma.label({ id: parent.id }).project();

  return res;
};

module.exports = {
  labels,
  project,
};
