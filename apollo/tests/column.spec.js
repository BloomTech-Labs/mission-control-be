const fs = require('fs');
const { mockServer } = require('graphql-tools');

const schema = fs.readFileSync('./schema/generated/prisma.graphql', 'utf8');

const MyServer = mockServer(schema);

// Queries if there is a label
describe('Column', () => {
  it('Column query is there', async () => {
    const server = MyServer;
    const query = `
    query {
      statuses {
        name
      }
    }`;
    await expect(server.query(query)).resolves.toBeTruthy();
    const { errors } = await server.query(query);
    expect(errors).not.toBeTruthy();
  });
});

describe('Create Status', () => {
  it('Status can be created', async () => {
    const server = MyServer;

    const mutation = `
    mutation {
      createStatus(
        data: 
        {name:"Status 1",  program: { create: {name: "Labs 22"}}}){
        name
        id
      }
    }
    `;

    await expect(server.query(mutation)).toBeTruthy();
    const { errors } = await server.query(mutation);
    expect(errors).not.toBeTruthy();
  });
});

describe('Delete Status', () => {
  it('deletes a status', async () => {
    const server = MyServer;

    const query=`
    query{
      statuses{
      }
    }`;

    const deleteMutation =`
    mutation{
      deleteStatus(where: { ${query[0]} }){
        id
      }
    }`;

    await expect(server.query(deleteMutation)).toBeTruthy();
    const { errors } = await server.query(deleteMutation);
    expect(errors).not.toBeTruthy();
  });
});

describe('Update Status', () => {
  it('updates a status', async () => {
    const server = MyServer;

  });
});
