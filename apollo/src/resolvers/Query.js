// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples
const CodeClimateAPI = require("../datasources/codeclimate")
const axios = require("axios")

const info = () => `Hello World`;

const programs = (parent, args, context) => {
  const res = context.prisma.programs();
  return res;
};

const products = (parent, args, context) => {
  const res = context.prisma.products();
  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.projects();
  return res;
};

const project = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.project({ id });
  return res;
};

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
  return res;
};

const me = (parent, args, context) => context.user;

const note = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.note({ id });
  return res;
};

const notes = (parent, args, context) => {
  const { orderBy } = args;
  const res = context.prisma.notes({ orderBy });
  return res;
};

const codeclimate = async (parent, args, context) => {
  try {
    const { id } = args;
    const res = await axios.get(`https://api.codeclimate.com/v1/repos/${id}`)
    const repoId = res.data.data.id
    const snapShot = res.data.data.relationships.latest_default_branch_snapshot.data.id
    const res2 = await axios.get(`https://api.codeclimate.com/v1/repos/${repoId}/snapshots/${snapShot}`)
    return { grade: res2.data.data.attributes.ratings[0].letter, id:repoId }
  }

  catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

module.exports = {
  info,
  programs,
  products,
  projects,
  project,
  persons,
  me,
  note,
  notes,
  codeclimate
};
