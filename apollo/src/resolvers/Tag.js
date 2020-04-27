const tag = (parent, args, context) => {
    const res = context.prisma.tag({ id: parent.id }).tag();
    return res;
  };
 
  module.exports = {
    tag
  };