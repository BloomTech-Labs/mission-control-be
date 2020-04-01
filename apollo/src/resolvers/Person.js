// Resolves all relational fields on type Person
// where the name of the function is an exact match to the field

const role = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).role();
  return res;
};

const manages = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).manages();

  return res;
};

const team = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).team();

  return res;
};

module.exports = {
  role,
  manages,
  team,
};
