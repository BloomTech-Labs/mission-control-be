# API Documentation

#### Backend delpoyed at [AWS Beanstalk](https://d2di75zt4h5vt7.cloudfront.net/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### ExpressJs

-    Express.js makes development easy by allowing us to create secure, modular, and fast applications. 
-    Express.js is an unopinionated framework, meaning there isn't any strict and determined rules on how to deal with certain requests. We can create our own custom middleware to handle requests in the ways we wish.

## Api docs are [HERE](https://d2di75zt4h5vt7.cloudfront.net/docs) <br>

- To update the documentation for the API **npm run docs** 

# Data Model

#### ROLES

---

```
{
  id: UUID
  name: STRING
}
```

#### USERS

---

```
{
  id: UUID
  firstName: STRING
  lastName: STRING
  email: STRING
  password: STRING
  roleId: UUID foreign key in ROLES table
}
```

## Actions

`getRoles()` -> Returns all roles

<br>

`getUsers()` -> Returns all users

<br>

`updateUserRole()` -> Update a users role

<br>

`deleteUser()` -> Delete a user

<br>

`getUsersByRole(roleId)` -> Get all users with requested role.


## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  JWT_ADMIN - you can create a secret to be attached to token generated for all admin accounts
    *  JWT_MANAGER - you can create a secret to be attached to token generated for all manager accounts
    *  JWT_STUDENT - you can create a secret to be attached to token generated for all manager accounts
    *  ADMIN_SECRET - a string used to authenticate a user is of type admin to prevent all other user types from accessing protected routes. 
    *  DB_ENV - set to "development" until ready for "production" or "staging"
    *  NODE_ENV - set to "development" until ready for "production" or "staging"
    
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

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/mission-control-fe/blob/master/README.md) for details on the fronend of our project.
