// Resolves all relational fields on type CCRepo
// where the name of the function is an exact match to the field

const product = (parent, args, context) => {
  const res = context.prisma.ccrepo({ id: parent.id }).product();

  return res;
};

module.exports = {
  product,
};
