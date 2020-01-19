const team = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).team();

  return res;
};

const manages = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).manages();

  return res;
};

const leads = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).manages();

  return res;
};

module.exports = {
  team,
  manages,
  leads,
};
