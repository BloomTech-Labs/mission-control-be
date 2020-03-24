const status = (parent, args, context) => {
  const res = context.prisma.label({ id: parent.id }).status();
  return res;
};

const selected = (parent, args, context) => {
  const res = context.prisma.label({ id: parent.id }).selected();
  return res;
}

module.exports = {
  status,
  selected
};
