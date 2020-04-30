/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
// @ts-check

const faker = require('faker');
const { prisma } = require('../apollo/src/generated/prisma-client');


//LAB23-T1
const TAGS = [
  'Apollo',
  'React',
  'GraphQL',
  'Postgress',
  'Prisma',
]


const ROLES = [
  'Software Engineer',
  'UX Designer',
  'Data Scientist',
  'Team Lead',
  'Section Lead',
];

const STATUS_CATEGORIES = [
  'Team Health',
  'Product Quality',
  'Design Quality',
  'Engineering Quality',
  'DS Quality',
];

const STATUS_VALUE_OPTIONS = [
  { label: 'Crushing it! 🚀', color: 'Purple' },
  { label: 'Healthy ✅', color: 'Green' },
  { label: 'At Risk ⚠️', color: 'Yellow' },
  { label: 'On Fire 🔥', color: 'Red' },
];

const repoDetails = [
  {
    repoOwner: 'Lambda-School-Labs',
    repoName: 'mission-control-fe',
    repoUrl: 'https://github.com/Lambda-School-Labs/mission-control-fe',
    gradeUrl:
      'https://codeclimate.com/github/Lambda-School-Labs/mission-control-fe',
  },
  {
    repoOwner: 'Lambda-School-Labs',
    repoName: 'mission-control-be',
    repoUrl: 'https://github.com/Lambda-School-Labs/mission-control-be',
    gradeUrl:
      'https://codeclimate.com/github/Lambda-School-Labs/mission-control-be',
  },
  {
    repoOwner: 'Lambda-School-Labs',
    repoName: 'miracle-messages-fe',
    repoUrl: 'https://github.com/Lambda-School-Labs/miracle-messages-fe',
    gradeUrl:
      'https://codeclimate.com/github/Lambda-School-Labs/miracle-messages-fe',
  },
  {
    repoOwner: 'Lambda-School-Labs',
    repoName: 'miracle-messages-be',
    repoUrl: 'https://github.com/Lambda-School-Labs/miracle-messages-be',
    gradeUrl:
      'https://codeclimate.com/github/Lambda-School-Labs/miracle-messages-be',
  },
];

const seed = async () => {

  /**
   * ====================================================================
   *  Create the tags
   * ====================================================================
   */
  /** @type {import('../apollo/src/generated/prisma-client').Tag[]} */
  const tags = [];
  for (let i = 0; i < TAGS.length; i += 1) {
    tags.push(
      await prisma.createTag({
        name: TAGS[i],
      }),
    );
  }
  /**
   * ====================================================================
   *  Create the roles
   * ====================================================================
   */
  /** @type {import('../apollo/src/generated/prisma-client').Role[]} */
  const roles = [];
  for (let i = 0; i < ROLES.length; i += 1) {
    roles.push(
      await prisma.createRole({
        name: ROLES[i],
      }),
    );
  }

  /**
   * ====================================================================
   *  Create the status value options
   * ====================================================================
   */
  /** @type {import('../apollo/src/generated/prisma-client').StatusValueOption[]} */
  const statusValueOptions = [];
  for (let i = 0; i < STATUS_VALUE_OPTIONS.length; i += 1) {
    statusValueOptions.push(
      await prisma.createStatusValueOption({
        label: STATUS_VALUE_OPTIONS[i].label,
        color: STATUS_VALUE_OPTIONS[i].color,
      }),
    );
  }

  /**
   * ====================================================================
   *  Create the status categories
   * ====================================================================
   */
  /** @type {import('../apollo/src/generated/prisma-client').StatusCategory[]} */
  const statusCategories = [];
  for (let i = 0; i < STATUS_CATEGORIES.length; i += 1) {
    statusCategories.push(
      await prisma.createStatusCategory({
        name: STATUS_CATEGORIES[i],
        valueOptions: {
          connect: [
            { id: statusValueOptions[0].id },
            { id: statusValueOptions[1].id },
            { id: statusValueOptions[2].id },
            { id: statusValueOptions[3].id },
          ],
        },
      }),
    );
  }

  /**
   * ====================================================================
   *  Create a bunch of persons
   * ====================================================================
   */

  /** @type {import('../apollo/src/generated/prisma-client').Person[]} */
  const persons = [];
  for (let i = 0; i < 300; i += 1) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email(
      firstname,
      `${lastname}${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
    );

    persons.push(
      // eslint-disable-next-line no-await-in-loop
      await prisma.createPerson({
        name: `${firstname} ${lastname}`,
        email,
        avatar: faker.internet.avatar(),
      }),
    );
  }

  /**
   * ====================================================================
   *  Create a bunch of programs
   * ====================================================================
   */
  const programPromises = [];
  for (let i = 0; i < 2; i += 1) {
    const programName = faker.company.companyName();
    programPromises.push(prisma.createProgram({ name: programName }));
  }

  /** @type {import('../apollo/src/generated/prisma-client').Program[]} */
  const programs = await Promise.all(programPromises);

  /**
   * ====================================================================
   *  Create a bunch of products
   * ====================================================================
   */
  const productPromises = [];
  for (let i = 0; i < programs.length; i += 1) {
    const program = programs[i];

    for (let j = 0; j < 20; j += 1) {
      productPromises.push(
        prisma.createProduct({
          name: faker.commerce.productName(),
          program: { connect: { id: program.id } },
        }),
      );
    }
  }

  /** @type {import('../apollo/src/generated/prisma-client').Product[]} */
  const products = await Promise.all(productPromises);

  /**
   * ====================================================================
   *  Add a bunch of stuff to the products
   * ====================================================================
   */
  /** @type {import('../apollo/src/generated/prisma-client').Project[]} */
  const projects = [];

  /** @type {import('../apollo/src/generated/prisma-client').GithubRepo[]} */
  const githubRepos = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];

    // Add some projects
    for (let j = Math.floor(Math.random() * 10) + 1; j > 0; j -= 1) {
      projects.push(
        await prisma.createProject({
          name: `Project ${faker.commerce.productAdjective()}`,
          product: { connect: { id: product.id } },
        }),
      );
    }

    // Add some GitHub repositories
    for (let j = Math.floor(Math.random() * 5) + 2; j > 0; j -= 1) {
      // Grab a random URL for the repo and grade
      const randomRepoDetails = faker.random.arrayElement(repoDetails);

      githubRepos.push(
        await prisma.createGithubRepo({
          repoId: (Math.floor(Math.random() * 9000000) + 1000000).toString(),
          owner: randomRepoDetails.repoOwner,
          name: randomRepoDetails.repoName,
          product: { connect: { id: product.id } },
          url: randomRepoDetails.repoUrl,
          grade: {
            create: {
              value: faker.random.arrayElement(['A', 'B', 'C', 'D', 'F']),
              url: randomRepoDetails.gradeUrl,
            },
          },
        }),
      );
    }
  }

  /**
   * ====================================================================
   *  Add a bunch of stuff to the projects
   * ====================================================================
   */

  /** @type {import('../apollo/src/generated/prisma-client').Note[]} */
  const projectNotes = [];
  for (let i = 0; i < projects.length; i += 1) {
    const project = projects[i];

    // Add some notes
    for (let j = Math.floor(Math.random() * 5); j > 0; j -= 1) {
      projectNotes.push(
        await prisma.createNote({
          topic: faker.hacker.phrase(),
          content: faker.lorem.paragraphs(Math.ceil(Math.random() * 5)),
          project: { connect: { id: project.id } },
          author: {
            connect: {
              id: persons[Math.floor(Math.random() * persons.length)].id,
            },
          },
          rating: Math.floor(Math.random() * 3) + 1,
        }),
      );
    }

    // Create some assignments for the project
    for (let j = Math.floor(Math.random() * 15) + 3; j > 0; j -= 1) {
      await prisma.createProjectRoleAssignment({
        project: {
          connect: {
            id: project.id,
          },
        },
        person: {
          connect: {
            id: persons[Math.floor(Math.random() * persons.length)].id,
          },
        },
        role: {
          connect: { id: roles[Math.floor(Math.random() * roles.length)].id },
        },
      });
    }

    // Add all the status categories to the project, each with a random value
    for (let j = 0; j < statusCategories.length; j += 1) {
      await prisma.createProjectStatusElement({
        project: { connect: { id: project.id } },
        category: {
          connect: {
            id: statusCategories[j].id,
          },
        },
        value: {
          connect: {
            id: faker.random.arrayElement(statusValueOptions).id,
          },
        },
      });
    }
  }
};

seed().catch(e => console.error(e));
