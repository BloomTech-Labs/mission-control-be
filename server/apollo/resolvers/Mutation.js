// Resolvers receive four arguments: parent, args, context, info
// Prefer destructuring and indicators for unused fields

const createProgram = (_, { name }, { prisma }) =>
  prisma.createProgram({ name });

const createProduct = (_, { name, id }, { prisma }) =>
  prisma.createProduct({
    name,
    program: { connect: { id } },
  });

const createProject = (_, { id, name, start, end }, { prisma }) =>
  prisma.createProject({
    name,
    start,
    end,
    product: { connect: { id } },
  });

const createProjectNote = (_, { id, title, content, rating }, { prisma, user } ) => 
  prisma.createProjectNote({
    title,
    content,
    project: { connect: { id }},
    performanceRating: rating,
    author: user.email
  })

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createProjectNote
};