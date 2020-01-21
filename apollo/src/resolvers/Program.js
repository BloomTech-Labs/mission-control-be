// Resolves all relational fields on type Program
// where the name of the function is an exact match to the field

const products = (parent, args, context) => {
  const res = context.prisma.program({ id: parent.id }).products();

  return res;
};

module.exports = {
  products,
};
