## Mission Control Initialization scripts

A series of scripts to initialize a dev environment for the Mission Control project.

Installs docker & docker-compose, sources environment variables, and spins up an instance of the Prismatopia backend for Mission Control. A valid .env configuration file and the Mission Control repository are required for these scripts to be of any use besides installing Docker on your machine.

## Get started:

### Linux + MacOS

- NOTE: requires global installation of the prisma cli if you wish to deploy/seed the Prisma layer from the makefile.

```
npm i -g prisma
```

1. Clone the Mission Control repo, which contains these init scripts.
2. Configure your .env to match the credentials in the Mission Control Backend documentation.

```bash
cd init && make
```

3. Select your OS [MacOS, Arch, Ubuntu, Debian, CentOS, Fedora]
4. It's easy now!

#### Windows:

- Message Kevin on Slack

#### Contributors / Testers:

Special thanks to [ElijahMcKay](https://github.com/ElijahMcKay), [fresocodes](https://github.com/frescocodes), & [judson00](https://github.com/judson00).

---

The Ubuntu / Debian / CentOS / Fedora installation uses the `get.docker.com` install script which can be found [here](https://github.com/docker/docker-install).
