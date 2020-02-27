// Resolves all relational fields on type Person
// where the name of the function is an exact match to the field

// DEPRECATED CODE
// const team = (parent, args, context) => {
//   const res = context.prisma.person({ id: parent.id }).team();

//   return res;
// };

// DEPRECATED CODE
// const manages = (parent, args, context) => {
//   const res = context.prisma.person({ id: parent.id }).manages();

//   return res;
// };

// DEPRECATED CODE
// const sl = (parent, args, context) => {
//   const res = context.prisma.person({ id: parent.id }).sl();

//   return res;
// };

// DEPRECATED CODE
// const tl = (parent, args, context) => {
//   const res = context.prisma.person({ id: parent.id }).tl();

//   return res;
// };

const role = (parent, args, context) => {
  const res = context.prisma.person({ id: parent.id }).role();
  return res;
};

const authored = (parent, args, context) => {
  const res = context.prisma.person({id: parent.id}).authored();
  return res;
};

const manages = (parent, args, context) => {
  const res = context.prisma.person({id: parent.id}).manages();
  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.person({id: parent.id}).projects();
  return res;
};


module.exports = {
  // team,
  // manages,
  // sl,
  // tl,
  role,
  authored,
  manages,
  projects,
};
