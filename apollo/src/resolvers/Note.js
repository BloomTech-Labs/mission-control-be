
const author = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).author();
  return res;
};

const attendedBy = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).attendedBy();
  return res;
};

module.exports = {
  author,
  attendedBy
};
