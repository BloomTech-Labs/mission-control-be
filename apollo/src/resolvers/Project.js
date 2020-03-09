// Resolves all relational fields on type Project
// where the name of the function is an exact match to the field

const product = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).product();

  return res;
};

const team = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).team();

  return res;
};

const projectManagers = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).projectManagers();

  return res;
};

const notes = (parent, args, context) => {
  const { id } = parent;
  const { orderBy, privatePerm } = args;

  const res = context.prisma.project({ id }).notes({ orderBy });
  const where = { privateNote: false }
  const resPublic = context.prisma.project({ id }).notes({ where })


  if(privatePerm) {
    return res
  } else {
    return resPublic
  }


//  const res = context.prisma.project({ id }).notes({ orderBy });

//  return res;
};

const projectColumn = (parent, args, context) => {
  const { id } = parent;
  const res = context.prisma.project({ id }).projectColumn();

  return res;
};

module.exports = {
  product,
  team,
  projectManagers,
  notes,
};
