const labels = (parent, args, context) => {
  const res = context.prisma.status({ id: parent.id }).labels();
  return res;
};

const program = (parent, args, context) => {
  const res = context.prisma.status({ id: parent.id }).program();

  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.status({ id: parent.id }).projects();

  return res;
}

module.exports = {
  labels,
  program,
  projects
};
