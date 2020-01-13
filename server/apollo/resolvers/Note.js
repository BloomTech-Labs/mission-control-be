const project = ({ id }, _, { prisma }) => prisma.note({ id }).project();

const projectNote = ({ id }, _, { prisma }) =>
  prisma.note({ id }).projectNote();

module.exports = {
  project,
  projectNote,
};
