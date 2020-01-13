const note = ({ id }, _, { prisma }) => {
  console.log(id);
  return prisma.projectNote({ id }).note();
};

const project = ({ id }, _, { prisma }) => prisma.projectNote({ id }).project();

module.exports = {
  note,
  project,
};
