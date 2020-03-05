const fs = require('fs');
const { mockServer } = require('graphql-tools');

const schema = fs.readFileSync('./schema/generated/prisma.graphql', 'utf8');

const MyServer = mockServer(schema);

// Queries if there is a label
describe('Column', () => {
  it('Column query is there', async () => {
    const server = MyServer;
    const query = `
          {
            columns {
              name
            }
          }
        `;
    await expect(server.query(query)).resolves.toBeTruthy();
    const { errors } = await server.query(query);
    expect(errors).not.toBeTruthy();
  });
});

describe('Column', () => {
  it('Column can be updated', async () => {
    const server = MyServer;

    const mutation = `
    mutation {
      createColumn(
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
