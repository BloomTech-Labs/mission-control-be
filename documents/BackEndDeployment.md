# Back end deployment for Mission Control to AWS

**Docker must be running!**

First thing first, set your .env variables to match the environment you wish to deploy to.

**“I’d like to deploy to the STAGE environment”**

`APOLLO_CONTAINER_IMAGE=lambdaschoollabs/missioncontrol:stage`
`ENVIRONMENT_NAME=stage`

Once that is done here are the following commands to get Docker to build and push to AWS

**Selects the app name**

`export APPLICATION_NAME=mission-control`

**Sets the environment you wish to deploy to**

`export ENVIRONMENT_NAME=stage`

**Sets the environments within the env.apollo.cf.yaml**

`make aws-deploy-env-apollo`

**Updates Apollo**

`make aws-apollo-update-service`

**Pushes the docker container image**

`make apollo-push`

This should push the docker container image to Docker. Check your Apollo and Prisma playground to confirm any schema/seed changes.

If for some reason the seed data did not update run `make aws-prisma-reseed`
