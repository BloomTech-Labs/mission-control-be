# Mission Control API Documentation

## Getting started

To get the server running locally:

- Clone this repo
- Ensure you have configured your environment variables as seen below
- Export environment variables by running `source sourceme.sh`
- Follow the instructions in `README.md` in the `/init` folder for your platform
- Run `prisma generate` to add the schema to Apollo
- Run `docker-compose up --build`
- Run `primsa deploy` to fire up the Prisma data layer
- To reset the DB, run `prisma reset`
- To run the seed, run `prisma seed`

The Apollo instance is listining on port 8000, and an authenticated prisma playground with documentation regarding the exposed methods can be found on port 7000. To authenticate and view the prisma playground:

- Run `prisma token`
- Copy the token and attach it to the HTTP headers inside the playground:

```json
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

- The Prisma client squats in the context layer of all resolvers run against the DB and exposes an extensive list of CRUD operations that are generated from the type definitions inside of the data model.

- Prisma bridges the gap between your database and GraphQL resolvers. It replaces traditional ORMs and makes it easy to implement resilient, production-ready GraphQL servers.

- Documentation can be found [here](https://www.prisma.io/with-graphql)

#### Prisma Data Model

```graphql

type CodeClimateSnapshot {
  id: ID!
  grade: String!
  name: String!
  link: String!
  GHRepoId: String!
}

type Program {
  id: ID! @id
  name: String! @unique
  Cctoken: String
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  products: [Product!]!
  statuses: [Status!]
}

type Product {
  id: ID! @id
  name: String!
  program: Program!
  createdAt: String! @createdAt
  updatedAt: String! @updatedAt
  projects: [Project!]!
  productActive: Boolean Boolean @default(value: false)
  GHRepos: [GHRepo]! @relation(name: "GHRepos")
  grades: [CodeClimateSnapshot!] @relation(name: "CodeClimateSnapshot")
}

type Project {
  id: ID! @id
  name: String!
  product: Product!
  projectManagers: [Person!]! @relation(name: "ProjectManager")
  team: [Person!]! @relation(name: "Team")
  notes: [Note!]!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  projectStatus: [Status]
  projectActive: Boolean @default(value: false)
}

type Pulse {
  id: ID! @id
  issueCount: Int!
  closedIssues: Int!
  openIssues: Int!
  prCount: Int!
  closedPRs: Int!
  openPRs: Int!
  mergedPRs: Int!
}

type GHRepo {
  id: ID! @id
  name: String!
  owner: String!
  ownerId: String!
  repoId: String!
  product: Product @relation(name: "GHRepos")
}

type Note {
  id: ID! @id
  topic: String!
  content: String!
  author: Person! @relation(name: "NoteAuthor")
  attendedBy: [Person!]! @relation(name: "NoteAttendee")
  project: Project!
  rating: Int!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  privateNote: Boolean! @default(value: false)
}
type Person {
  id: ID! @id
  name: String!
  email: String! @unique
  role: Role!
  authored: [Note!]! @relation(name: "NoteAuthor")
  attended: [Note!]! @relation(name: "NoteAttendee")
  manages: [Project!]! @relation(name: "ProjectManager")
  team: Project @relation(name: "Team")
  avatar: String
}
type Label {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  name: String!
  color: String!
  status: Status! @relation(name: "StatusLabel")
  selected: Boolean @default(value: false)
}

type Sparkline {
  id: ID! @id
  message: String!
  additions: Int!
  deletions: Int!
  changedFiles: Int!
  committedDate: String!
}

type Status {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  name: String!
  projects: [Project!]!
  program: Program
  labels: [Label!]! @relation(name: "StatusLabel")
}
type Role {
  id: ID! @id
  name: String!
  privateNote: Boolean! @default(value: false)
  viewProducts: Boolean! @default(value: false)
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

## Back-End Testing

To run tests, cd into the apollo directory and run 'npm i' on your terminal to download the depedencies. Run 'npm test' to run tests.

You need to reset your prisma first in order to run the tests. The commands are as follows:
-prisma delete
-prisma generate
-prisma deploy

To set up a testing environment,
-Import the file-system(fs) reader
-Import mockServer from graphql-tools
-Set variable name equal to the contents fs reads from the generated prisma.graphql file. - Example: const schema = fs.readFileSync('./schema/generated/prisma.graphql', 'utf8');
-Pass the above variable name into your mockServer as a parameter.
-Example: const MyServer = mockServer(schema);
-Run tests

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

IMPORTANT!: These variables must also be added to the docker-compose.yml file.

create a .env file that includes the following:

- APPLICATION_NAME
- APOLLO_CONTAINER_IMAGE
- ENVIRONMENT_NAME
- OAUTH_TOKEN_ENDPOINT
- OAUTH_CLIENT_ID
- TEST_OAUTH_CLIENT_ID
- TEST_OAUTH_CLIENT_SECRET
- PRISMA_MANAGEMENT_API_SECRET
- PRISMA_SECRET
- PRISMA_ENDPOINT
- SENDGRID_API_KEY
- CODE_CLIMATE_API
- CODE_CLIMATE_TOKEN
- GIT_HUB_API
- GIT_HUB_TOKEN

## Adding New Apollo Environment Variables

Your code running in Apollo may need additional environment variables in order to run. For example, if you resolver reaches out to
an external API, it'll likely need to know the API endpoint and client credentials, which should _never_ be hardcoded.

The Apollo service gets environment variable from the AWS Elastic Container Service (ECS) when it starts. These environment
variables are part of the Task Definition that ECS uses to configure and run the container. In order to add new environment
variables to the Task Definition for Apollo, you need to add them to the AWS Cloudformation template that creates the Task
Definition.

The template `aws/env-apollo.cf.yaml' contains the Task Definition to which we will add an environment variable called GITHUB_API.

1. Add the environment variable to the Task Definition in the Cloudformation Template:

   ```yaml
      TaskDefinition:
      Type: 'AWS::ECS::TaskDefinition'
      Properties:
        NetworkMode: awsvpc
        ...
        ContainerDefinitions:
          - Name: apollo
            ...
            Environment:
              ...
              - Name: GITHUB_API
                Value: !Ref GithubApi
    ```

1. The `!Ref GithubApi` is Cloudformation syntax for saying the the value of this environment variable is a reference to a parameter to the template.
   This allows us to pass the parameter to the template later, so we don't have to hardcode the value _inside_ the template, which is bad.

1. The next step is going to be to define the parameter that the `!Ref GithubAPI` is referring to, this is done at the top of the template:

  ```yaml
  Parameters:
    ...
    GithubApi:
      Type: String
      Description: The API for GitHub integration
  ```

1. Now, when we deploy the template, the value of the GITHUB_API environment variable in the Task Definition can be provided as a parameter.

1. Next, we need to set the value for this template parameter, which can vary per environment. Template parameters that can vary by environment
   are stored in a file called `aws.<application-name>.<environment-name>` (e.g. aws.mission-control.stage)

    ```bash
    EnvironmentName=stage

    ApolloDockerImage=lambdaschoollabs/missioncontrol:latest
    ApolloServicePort=8000

    OAuthTokenEndpoint=https://XXXXXXXXXXXXX/oauth2/default
    OAuthClientID=XXXXXXXXXXXX

    PrismaServicePort=8000

    GithubApi=https://api.github.com/v2
    ```

1. Finally, we need to deploy the update Cloudformation template to AWS, which will update the Task Definition with our new environment variable.

    ```bash
    $ make aws-deploy-env-apollo
    ...
    ```

1. You can view the progress in the AWS Console by watching the events in the Cloudformation service console.

## Apollo Environment Variable Secrets

You can and should keep your non-secret CloudFormation template parameter files in version control. However, if these variable contain secrets the
values should _absolutely not_ be kept in version control.

If you have a secret that you need to pass to your Apollo container, you'll need to first store the secret in secrets manager.

1. Navigate to AWS Secrets Manager in the console.

1. Store your secret as an 'Other type of secrets' which will allow you to save a name/value pair

1. Press Next

1. Give your secret a name, which should include the application and environment name: (e.g. github-api-key-mission-control-production)

1. Add a new environment variable to the Task Definition using the slightly funky Cloudformation syntax to reference it in Secrets Manager

    ```yaml
      TaskDefinition:
      Type: 'AWS::ECS::TaskDefinition'
      Properties:
        NetworkMode: awsvpc
        ...
        ContainerDefinitions:
          - Name: apollo
            ...
            Environment:
              ...
              - Name: GITHUB_API
                Value: !Ref GithubApi
              - Name: GITHUB_API_KEY
                Value:
                  Fn::Sub:
                    - '{{resolve:secretsmanager:${GithubApiKey}:SecretString}}'
                    - GithubApiKey: !Sub github-api-key-${ApplicationName}-${EnvironmentName}
    ```

1. Finally, we need to deploy the update Cloudformation template to AWS, which will update the Task Definition with our new environment variable.

    ```bash
    $ make aws-deploy-env-apollo
    ...
    ```

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

## Frontend Documentation

See [this repository](https://github.com/Lambda-School-Labs/mission-control-fe) for details on the frontend of our project.
