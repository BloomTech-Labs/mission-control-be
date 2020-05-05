// @ts-check

/**
 * @param { import('../context').ApolloContext } context
 * @returns { import('../generated/prisma-client').FragmentableArray<import('../generated/prisma-client').StatusValueOption> }
 */
const valueOptions = (parent, _, context) => {
  return context.prisma.statusCategory({ id: parent.id }).valueOptions();
};

module.exports = {
  valueOptions,
};
