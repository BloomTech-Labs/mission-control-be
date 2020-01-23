const attendedBy = (parent, args, context) => {
  const res = context.prisma.meeting({ id: parent.id }).attendedBy();

  return res;
};

const project = (parent, args, context) => {
  const res = context.prisma.meeting({ id: parent.id }).project();

  return res;
};

const notes = (parent, args, context) => {
  const res = context.prisma.meeting({ id: parent.id }).notes();

  return res;
};

module.exports = {
  attendedBy,
  project,
  notes,
};
