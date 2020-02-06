// createNote sends an email to project managers
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Mutations must be defined explicitly in the type definition
// inside of the graphql schema to be valid.
// See schema.js in src for examples

// Create a new program, takes a string
const createProgram = (parent, args, context) => {
  const program = context.prisma.createProgram({ name: args.name });

  return program;
};

// Create a new product, takes a string and a program ID
const createProduct = (parent, args, context) => {
  const product = context.prisma.createProduct({
    name: args.name,
    program: { connect: { id: args.id } },
  });

  return product;
};

// Create a new project, takes a string and a product ID
const createProject = (parent, args, context) => {
  const program = context.prisma.createProject({
    name: args.name,
    product: { connect: { id: args.id } },
  });

  return program;
};

// Create a new person, takes two strings and a role enum
// NOTE: email field is @unique, for enum see type defs
const createPerson = (parent, args, context) => {
  const { name, email, role } = args;
  const person = context.prisma.createPerson({ name, email, role });

  return person;
};

// Create a new Note , takes strings for topic, content/int for rating
// and takes email strings for attendedBy and Author
// ID input will have to be a project ID
const createNote = async (parent, args, context) => {
  const { topic, content, attendedBy, rating, id, notification } = args;
  const note = {
    topic,
    content,
    author: { connect: { email: context.user.email } },
    attendedBy: {
      connect: attendedBy.map(email => {
        return { email };
      }),
    },
    project: { connect: { id } },
    rating,
  };

  const newNote = await context.prisma.createNote(note);

  if (notification) {
    const noteProject = await context.prisma.project({ id });
    const noteProjectManagers = await context.prisma
      .project({ id })
      .projectManagers();
    const noteAuthor = await context.prisma.note({ id: newNote.id }).author();

    // missioncontrolpm will receive all updates in staging/development
    const recipients =
      process.env.ENVIRONMENT_NAME === 'production'
        ? Array.from(noteProjectManagers, ({ email }) => email)
        : 'missioncontrolpm@gmail.com';

    const emailAlert = {
      to: recipients,
      from: 'missioncontrol@lambdaschool.com',
      subject: `${noteAuthor.name} has posted a note in ${noteProject.name}`,
      text: 'Mission Control',
      html: `<p>${content}<p>`,
    };

    try {
      sgMail.send(emailAlert);
    } catch (error) {
      throw Error(error);
    }
  }

  return newNote;
};

// Takes in the same args are create note AND a specific note ID
// uses note id to pull attendees to remove them and then pushes new data
const updateNote = async (parent, args, context) => {
  const { topic, content, attendedBy, rating, id } = args;

  // pulls the attendee data on the note where: id
  const oldAttendees = await context.prisma.note({ id }).attendedBy();

  // reshapes the attendee data to match expected structure
  const emails = oldAttendees.map(({ email }) => ({ email }));

  const newAttendees = attendedBy.map(email => ({ email }));

  const updatedNote = context.prisma
    .updateNote({
      data: {
        topic,
        rating,
        content,
        attendedBy: {
          // cleares the attendedBy field so it can be refill with new inputs
          disconnect: emails,
        },
      },
      where: {
        id,
      },
    })
    .then(() => {
      return context.prisma.updateNote({
        data: {
          attendedBy: {
            // Adds in the new Attendees.
            connect: newAttendees,
          },
        },
        where: {
          id,
        },
      });
    });

  return updatedNote;
};

const deleteNote = async (_, args, context) => {
  const { id } = args;
  const author = await context.prisma.note({ id }).author();
  if (context.user.email === author.email) {
    const res = context.prisma.deleteNote({ id });
    return res;
  }
  throw new Error('Only the author can delete this note.');
};

// Adds a Section Lead to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectSectionLead = (parent, args, context) => {
  const { id, email } = args;
  const addSectionLead = context.prisma.updateProject({
    data: { sectionLead: { connect: { email } } },
    where: { id },
  });

  return addSectionLead;
};

// Adds a Team Lead to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectTeamLead = (parent, args, context) => {
  const { id, email } = args;
  const addTeamLead = context.prisma.updateProject({
    data: { teamLead: { connect: { email } } },
    where: { id },
  });

  return addTeamLead;
};

// Adds a new member to a project, takes a string where email = person email
// Takes a project ID where a project exists
const addProjectMember = (parent, args, context) => {
  const { id, email } = args;
  const addMember = context.prisma.updateProject({
    data: { team: { connect: { email } } },
    where: { id },
  });

  return addMember;
};

module.exports = {
  createProgram,
  createProduct,
  createProject,
  createPerson,
  createNote,
  deleteNote,
  addProjectSectionLead,
  addProjectTeamLead,
  addProjectMember,
  updateNote,
};
