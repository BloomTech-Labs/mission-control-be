// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').Product> }
 */
const products = (parent, _, context) => {
  return context.prisma.program({ id: parent.id }).products();
};

module.exports = {
  products,
};
