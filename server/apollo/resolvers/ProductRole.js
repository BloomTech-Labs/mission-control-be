const person = ({ id }, _, { prisma }) => prisma.productRole({ id }).person();

const product = ({ id }, _, { prisma }) => prisma.productRole({ id }).product();

const role = ({ id }, _, { prisma }) => prisma.productRole({ id }).role();

module.exports = {
  product,
  person,
  role,
};
