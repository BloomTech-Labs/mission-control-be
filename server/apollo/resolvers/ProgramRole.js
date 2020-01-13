const person = ({ id }, _, { prisma }) => prisma.programRole({ id }).person();

const program = ({ id }, _, { prisma }) => prisma.programRole({ id }).program();

const role = ({ id }, _, { prisma }) => prisma.programRole({ id }).role();

module.exports = {
  program,
  person,
  role,
};
