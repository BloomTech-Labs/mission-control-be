const author = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).author();

  return res;
};

const meeting = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).meeting();

  return res;
};

module.exports = {
  author,
  meeting,
};
