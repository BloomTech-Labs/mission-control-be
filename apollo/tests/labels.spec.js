const fs = require('fs');
const { mockServer } = require('graphql-tools');

const schema = fs.readFileSync('./schema/generated/prisma.graphql', 'utf8');

const MyServer = mockServer(schema);

// Queries if there is a label
describe('Label', () => {
  it('label query is there', async () => {
    const server = MyServer;
    const query = `
          {
            labels {
              name
              color
            }
          }
        `;
    await expect(server.query(query)).resolves.toBeTruthy();
    const { errors } = await server.query(query);
    expect(errors).not.toBeTruthy();
  });
});

// Adds a label mutation

describe('Add Label', () => {
  it('adds a label query', async () => {
    const server = MyServer;

    const mutation = `
    mutation {
      createLabel(
        data: 
        {name:"Levin", color: "red", 
      status: { create: {name: "Mission Control", 
      program: { create: {name: "Labs 21"}}
    }}
  })
  {
        name
        color
        id
      }
    }
    `;

    await expect(server.query(mutation)).toBeTruthy();
    const { errors } = await server.query(mutation);
    expect(errors).not.toBeTruthy();
  });
});

describe('Delete Label', () => {
  it('deletes a label', async () => {
    const server = MyServer;

  });
});

describe('Updates Label', () => {
  it('deletes a label', async () => {
    const server = MyServer;

  });
});