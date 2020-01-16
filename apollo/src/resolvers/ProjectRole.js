const person = (parent, args, context) => {
  const res = context.prisma.projectRole({ id: parent.id }).person();

  return res;
};

const project = (parent, args, context) => {
  const res = context.prisma.projectRole({ id: parent.id }).person();

  return res;
};

module.exports = {
  person,
  project,
};
