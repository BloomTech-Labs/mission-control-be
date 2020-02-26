// Resolves all relational fields on type Product
// where the name of the function is an exact match to the field

const project = (parent, args, context) => {
  const res = context.prisma.repository({ id: parent.id }).project();

  return res;
};

module.exports = {
  project,
};