// Resolves all relational fields on type GHRepo
// where the name of the function is an exact match to the field

const product = (parent, args, context) => {
  const res = context.prisma.ghrepo({ id: parent.id }).product();

  return res;
};

module.exports = {
  product,
};
