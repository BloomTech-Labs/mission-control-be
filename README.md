# Mission Control API Documentation

#### Backend delpoyed at [Coming Soon!]() <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn** to install all required dependencies
- **yarn server** to start the local server

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
server/prisma/datamodel.prisma

type User {
  id: ID! @id
  name: String!
}

type Program {
  id: ID! @id
  name: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  products: [Product]!
}

type Product {
  id: ID! @id
  name: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  projects: [Project]!
}

type Project {
  id: ID! @id
  name: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  start: DateTime!
  end: DateTime!
  product: Product!
  projectNotes: [ProjectNote]!
  projectRoles: [ProjectRole]!
}

type ProjectNote {
  id: ID! @id
  project: Project!
  author: Person! @relation(name: "NoteAuthor")
  title: String!
  content: String!
  attendees: [Person] @relation(name: "MeetingAttendee")
  performanceRating: Rating!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}

enum Rating {
  LOW
  MEDIUM
  HIGH
}

type Role {
  id: ID! @id
  title: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}

type ProjectRole {
  id: ID! @id
  person: Person!
  project: Project!
  role: Role!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}

type ProductRole {
  id: ID! @id
  person: Person!
  product: Product!
  role: Role!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}

type ProgramRole {
  id: ID! @id
  person: Person!
  program: Program!
  role: Role!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}

type Person {
  id: ID! @id
  firstName: String!
  lastName: String!
  timeZone: TimeZone!
  program: Program!
  email: String!
  githubId: String!
  slackId: String!
  avatarURL: String!
}

enum TimeZone {
  PST
  CST
  EST
}
```

### Authentication Services

- Currently, the application only supports OKTA as an authentication service, but is written such that you may implement an authentication solution and implement the logic to decode the token inside of the middleware directory to attach a user object to the Apollo context object:

```javascript
  const context = async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { type, accessToken } = JSON.parse(authorization);
      switch (type) {
        case 'OKTA': {
          const contextObject = await constructOktaContext(
            accessToken,
            'Everyone',
            prisma,
            req,
          );
          return contextObject;
        }
      case 'OTHER_AUTH_SERVICE': {
         // do something...
        }
      }
     default:
    }
    return {
      ...req,
    };
  };
```

- The purpose of attaching the user object to context is to pluck out the authenticated user ID and provide an authorization solution for protected data.
- The authorization headers come from the client-side containing a string such that it can be parsed to reveal an object of the following shape:

```javascript
{
 "token": {auth token, string},
 "type": {authentication service identifier, string}
}
```



## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

* OKTA_ISSUER_URL={OKTA issuer URI}
* OKTA_CLIENT_ID={OKTA client ID}


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

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
