## Mission Control Initialization scripts

A series of scripts to initialize a dev environment for the Mission Control project.

Installs docker & docker-compose as well as the Prisma CLI, sources environment variables, and spins up an instance of the Prismatopia backend for Mission Control. A valid .env configuration file and the Mission Control repository are required for these scripts to be of any use besides installing Docker and the Prisma CLI on your machine.

Please note that this is not a replacement for manually managing you dev environment and is intended only to initialize the project for the first time. See the [Mission Control Backend](../README.md) documentation for instructions regarding the management of your Docker containers, in addition to Prisma deployments & seeds.

## Getting started:

#### Assumptions:

The following `.env` file is required in the root directory of the Mission Control repository:

```
OAUTH_TOKEN_ENDPOINT
OAUTH_CLIENT_ID
APPLICATION_NAME
ENVIRONMENT_NAME
TEST_OAUTH_CLIENT_ID
TEST_OAUTH_CLIENT_SECRET
PRISMA_MANAGEMENT_API_SECRET
PRISMA_ENDPOINT
PRISMA_SECRET
```

- The deployment script assumes that you have selected YES to globally install the Prisma CLI in order to deploy & seed the database.
- The deployment script assumes that you have selected YES to manage Docker as a user and you have refreshed your groups prior to deploying the containers. You may either logout or run `su -l $USER` & `logout` to refresh your groups.

#### Linux + MacOS

1. Clone the Mission Control repo, which contains these init scripts.
2. Ensure you have a valid `.env` in the Mission Control root directory.

```bash
cd init && make
```

3. Select your OS [MacOS, Arch (& Arch-derived), Ubuntu, Debian, CentOS, Fedora]
4. Follow the on-screen prompts to install required dependencies
5. Once you have verified that Docker is running, run `cd init && make` again and select `Deploy Mission Control` to spin up the containers.

#### Windows:

- Message Kevin on Slack

#### Contributors / Testers:

Special thanks to [ElijahMcKay](https://github.com/ElijahMcKay), [fresocodes](https://github.com/frescocodes), [karl2365](https://github.com/karl2365), & [judson00](https://github.com/judson00) for their help with testing!

---

The Ubuntu / Debian / CentOS / Fedora installation uses the `get.docker.com` install script which can be found [here](https://github.com/docker/docker-install).
