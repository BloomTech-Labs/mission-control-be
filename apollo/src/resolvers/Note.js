const author = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).author();
  return res;
};

const attendedBy = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).attendedBy();
  return res;
};

const project = ({ id }, args, context) => {
  const res = context.prisma.note({ id }).project();
  return res;
};

module.exports = {
  author,
  attendedBy,
  project,
};
