const products = ({ id }, _, { prisma }) => prisma.program({ id }).products();

const people = ({ id }, _, { prisma }) => prisma.program({ id }).people();

module.exports = {
  products,
  people,
};
