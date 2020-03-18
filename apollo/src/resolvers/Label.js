const status = (parent, args, context) => {
  const res = context.prisma.label({ id: parent.id }).status();
  return res;
};
module.exports = {
  status,
};
