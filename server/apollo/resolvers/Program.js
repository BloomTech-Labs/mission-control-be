const products = ({ id }, _, { prisma }) => prisma.program({ id }).products();

module.exports = {
  products,
};
