# Docker, Prisma, Appolo Backend Setup and Run Localy

* Clone the repo https://github.com/Lambda-School-Labs/mission-control-be
* cd in to your local copy
* In root create ```.env```
```
APPLICATION_NAME=(get the value from your TL)
APOLLO_CONTAINER_IMAGE=(get the value from your TL)
ENVIRONMENT_NAME=(get the value from your TL)
OAUTH_TOKEN_ENDPOINT=(get the value from your TL)
OAUTH_CLIENT_ID=(get the value from your TL)
TEST_OAUTH_CLIENT_ID=(get the value from your TL)
TEST_OAUTH_CLIENT_SECRET=(get the value from your TL)
PRISMA_MANAGEMENT_API_SECRET=(get the value from your TL)
PRISMA_SECRET=(get the value from your TL)
PRISMA_ENDPOINT=(get the value from your TL)
SENDGRID_API_KEY=(get the value from your TL)
CODE_CLIMATE_API=(get the value from your TL)
CODE_CLIMATE_TOKEN=(get the value from your TL)
GIT_HUB_API=(get the value from your TL)
GIT_HUB_TOKEN=(get the value from your TL)
```
* ```npm install``` in the root directory to download dependencies
* ```cd apollo``` 
* ```npm install``` in this ```apollo``` directory 
* install Docker [see documentation](https://docs.docker.com/get-started/)
* install Prisma ```npm install -g prisma```


## Windows (Idealy you use Mac or Linux)
### Windows Pro

### Windows Home (very problminatic)



## Mac/OSX
* in the root create ```sourceme.sh```
```
export $(grep -v '^#' .env | xargs -0)
```
* ```source sourceme.sh```
* ```npm run generate``` will run ```prisma generate``` to to add the schema to Apollo.




## Linux





**** 
To get the server running locally:

    Clone this repo
    Ensure you have configured your environment variables as seen below
    Export environment variables by running source sourceme.sh
Follow the instructions in README.md in the /init folder for your platform
    Run prisma generate to add the schema to Apollo
Run docker-compose up --build
Run primsa deploy to fire up the Prisma data layer
To reset the DB, run prisma reset
To run the seed, run prisma seed
The Apollo instance is listining on port 8000, and an authenticated prisma playground with documentation regarding the exposed methods can be found on port 7000. To authenticate and view the prisma playground:

Run prisma token
Copy the token and attach it to the HTTP headers inside the playground:
{
"authorization": "Bearer {token}"
}




