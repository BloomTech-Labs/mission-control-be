const teamLead = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).teamLead();

  return res;
};
const sectionLead = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).sectionLead();

  return res;
};
const team = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).team();

  return res;
};

module.exports = {
  teamLead,
  sectionLead,
  team,
};
