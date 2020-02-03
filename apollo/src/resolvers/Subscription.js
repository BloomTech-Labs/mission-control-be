const newNoteSubscribe = (parent, args, context) => {
  const res = context.prisma.$subscribe
    .note({ mutation_in: ['CREATED'] })
    .node();
  console.log(res);
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
