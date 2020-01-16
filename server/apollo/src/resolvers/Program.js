const products = (parent, args, context) => {
  const res = context.prisma.program({ id: parent.id }).products();

  return res;
};

module.exports = {
  products,
};
