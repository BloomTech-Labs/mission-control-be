# Mission Control API Documentation

#### Backend delpoyed at [Coming Soon!]() <br>

## Getting started

To get the server running locally:

- Clone this repo
- Ensure you have configured your environment variables as seen below
- Export environment variables by running `source sourceme.sh`
- Run `docker-compose up --build`
- Run `primsa deploy` to fire up the Prisma data layer
- To reset the DB, run `prisma reset`
- To run the seed, run `prisma seed`

The Apollo instance is listining on port 8000, and an authenticated prisma playground with documentation regarding the exposed methods can be found on port 7000. To authenticate and view the prisma playground:

- Run `prisma token`
- Copy the token and attach it to the HTTP headers inside the playground:

```
{
"authorization": "Bearer {token}"
}
```

### Apollo Server

- Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.

- Apollo communicates directly with the front-end to act as a bridge between the graphQL client and the prisma ORM data layer.

- Documentation can be found [here](https://www.apollographql.com/docs/apollo-server/getting-started/)

### Prisma

- Prisma is a data layer that sits between Apollo Server and the Database

- The Prisma client squats in the context layer of all resolvers run against the DB and exposes an extensive list of CRUD operations that are generated from the type definitions inside of the datam model.

- Prisma bridges the gap between your database and GraphQL resolvers. It replaces traditional ORMs and makes it easy to implement resilient, production-ready GraphQL servers.

- Documentation can be found [here](https://www.prisma.io/with-graphql)

#### Prisma Data Model

```graphql
type Program {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
  products: [Product!]!
}

type Product {
  id: ID!
  name: String!
  program: Program!
  createdAt: String!
  updatedAt: String!
  projects: [Project!]!
}

type Project {
  id: ID!
  name: String!
  product: Product!
  status: Boolean!
  sectionLead: Person
  teamLead: Person
  projectManagers: [Person!]!
  team: [Person!]!
  notes: [Note]
  createdAt: String!
  updatedAt: String!
}

type Person {
  id: ID!
  name: String!
  email: String!
  role: Role!
  manages: [Project!]!
  notes: [Note]
  team: Project
  sl: [Project!]!
  tl: Project
}

type User {
  id: ID!
  email: String!
  claims: [String!]!
  projects: [Project!]!
}

enum Role {
  SL
  TL
  WEB
  DS
  UX
  PM
}

type Note {
  id: ID!
  topic: String!
  content: String!
  author: Person!
  attendedBy: [Person!]!
  createdAt: String!
  updatedAt: String!
}
```

### Authentication Services

- Currently, Mission Control only features support for OKTA authentication services, but should work with other providers in theory. Once the client makes a request of the API, a decoded user object is attached to context that holds information about the user's email and claims.

```javascript
const context = async ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const user = await decodeToken(authorization);
    return { ...req, user, prisma };
  }
  throw new Error('A valid token _must_ be provided!');
};
```

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- OAUTH_TOKEN_ENDPOINT
- OAUTH_CLIENT_ID
- APPLICATION_NAME
- ENVIRONMENT_NAME
- TEST_OAUTH_CLIENT_ID
- TEST_OAUTH_CLIENT_SECRET
- PRISMA_MANAGEMENT_API_SECRET
- PRISMA_ENDPOINT
- PRISMA_SECRET

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Coming Soon: Front end edition]() for details on the frontend of our project.
