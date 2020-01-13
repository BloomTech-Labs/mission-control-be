const person = ({ id }, _, { prisma }) => prisma.projectRole({ id }).person();

const project = ({ id }, _, { prisma }) => prisma.projectRole({ id }).project();

const role = ({ id }, _, { prisma }) => prisma.projectRole({ id }).role();

module.exports = {
  person,
  project,
  role,
};
