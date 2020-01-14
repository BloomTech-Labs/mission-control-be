const program = ({ id }, _, { prisma }) => prisma.person({ id }).program();

const timeZone = ({ id }, _, { prisma }) => prisma.person({ id }).timeZone();

const meetingsAttended = ({ id }, _, { prisma }) =>
  prisma.person({ id }).meetingsAttended();

const user = ({ id }, _, { prisma }) => prisma.person({ id }).user();

module.exports = {
  program,
  timeZone,
  meetingsAttended,
  user,
};
