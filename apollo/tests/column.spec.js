const fs = require('fs');
const { mockServer } = require('graphql-tools');

const schema = fs.readFileSync('./schema/generated/prisma.graphql', 'utf8');

const MyServer = mockServer(schema);

const createStatusMutation = `
  mutation CreateStatusMutation($name: String!, $projects: [String], $id: ID!, $labels: [String]) {
    createStatus(name: $name, projects: $projects, id: $id, labels: $labels){
      id
      name
      projects{
        id
        name
      }
      labels{
        id
        name
        color
      }
    }
  }
`;

const statusQuery = `
  query StatusQuery {
    statuses{
      id
      name
      labels{
        id
        name
        color
      }
      projects{
        id
        name
      }
      program{
        id
        name
      }
    }
  }
`;

const deleteStatusMutation = `
  mutation DeleteStatusMutation($id: id){
    deleteStatus(id: $id){
      id
      name
    }
  }
`;

const updateStatusMutation = `
  mutation UpdateStatusMutation($id: id, $name: String!){
    updateStatus(id: $id, name: $name){
      id
      name
    }
  }
`

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