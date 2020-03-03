const labels = (parent, args, context) => {
    const res = context.prisma.column({ id: parent.id }).labels();
    return res;
  };
  module.exports = {
    labels,
  };