const newNoteSubscribe = (parent, args, context) => {
  const res = context.prisma.$subscribe
    .note({ mutation_in: ['CREATED'] })
    .node();
  return res;
};

const newNote = {
  subscribe: newNoteSubscribe,
  resolve: payload => {
    return payload;
  },
};

module.exports = {
  newNote,
};
