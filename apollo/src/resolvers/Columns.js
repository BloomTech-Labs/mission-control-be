const labels = (parent, args, context) => {
  const res = context.prisma.column({ id: parent.id }).labels();
  return res;
};

const program = (parent, args, context) => {
  const res = context.prisma.column({ id: parent.id }).program();

  return res;
};
module.exports = {
  labels,
  program,
};
