const info = ({ id }, _, { prisma }) => prisma.user({ id }).info();

module.exports = {
  info,
};
