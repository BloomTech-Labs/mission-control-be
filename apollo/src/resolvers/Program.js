// Resolves all relational fields on type Program
// where the name of the function is an exact match to the field

const products = (parent, args, context) => {
  const res = context.prisma.program({ id: parent.id }).products();

  return res;
};

const columns = (parent, args, context) => {
  const res = context.prisma.program({ id: parent.id }).columns();

  return res;
};

module.exports = {
  products,
  columns,
};
