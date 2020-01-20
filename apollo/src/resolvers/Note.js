const author = (parent, args, context) => {
  const res = context.prisma.note({ id: parent.id }).author();

  return res;
};

module.exports = {
  author,
};
