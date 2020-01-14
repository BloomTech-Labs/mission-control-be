const project = ({ id }, _, { prisma }) => prisma.projectNote({ id }).project();

const meetingAttendees = ({ id }, _, { prisma }) =>
  prisma.projectNote({ id }).meetingAttendees();

const performanceRating = ({ id }, _, { prisma }) =>
  prisma.projectNote({ id }).performanceRating();

module.exports = {
  project,
  meetingAttendees,
  performanceRating,
};
