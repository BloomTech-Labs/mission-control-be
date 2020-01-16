const product = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).product();

  return res;
};

const roles = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).roles();

  return res;
};

module.exports = {
  product,
  roles,
};
