const labels = (parent, args, context) => {
  const res = context.prisma.products({ id: parent.id }).labels();

  return res;
};

module.exports = {
  labels,
};
