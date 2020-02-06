// Resolves all relational fields on type Person
// where the name of the function is an exact match to the field

const team = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).team();

  return res;
};

const manages = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).manages();

  return res;
};

const sl = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).sl();

  return res;
};

const tl = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).tl();

  return res;
};


module.exports = {
  team,
  manages,
  sl,
  tl,
};
