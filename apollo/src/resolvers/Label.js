const column = (parent, args, context) => {
  const res = context.prisma.label({ id: parent.id }).column();
  return res;
};
module.exports = {
  column,
};
