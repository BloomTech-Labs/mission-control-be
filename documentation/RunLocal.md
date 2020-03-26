# Docker, Prisma, Apollo Backend Setup and Run Locally

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


## Windows (Ideally you use Mac or Linux)
### Windows Pro

Windows Home (very problematic)
* In Docker, ```printenv``` Look for DOCKER_HOST this will give you the IP address that you will need to copy to your ```.env```
* (replace LOCALHOST with this IP address in PRISMA_ENDPOINT)
* ```npm run generate``` will run ```prisma generate``` to add the schema to Apollo.
* Leaving the above Prisma terminal open, run the following command in a new terminal.
* ```npm run start```  will run ```docker-compose up --build```.
* When nodemon error catch triggers, ```npm run deploy``` will run ```primsa deploy``` to fire up the Prisma data layer.
* Your docker terminal should now say: 
```
apollo_1    | =========Running on http://localhost:8000/=========
```
* Go to ```http://localhost:7000/_admin```
* In your above Prisma terminal run ```prisma token```
* Click the gear icon to add the token to the admin
* Go to ```http://localhost:7000/```
* in HTTP HEADERS add your token object.
```
{
    "Authorization": "Bearer {token}"
}
```


#
## Mac/OSX
* in the root create ```sourceme.sh```
* Copy and paste the following to sourceme.sh
```
export $(grep -v '^#' .env | xargs -0)
```
* run ```source sourceme.sh```
* ```npm run generate``` will run ```prisma generate``` to add the schema to Apollo.
* Leaving the above Prisma terminal open, run next comand in a new terminal. 
* ```npm run start```  will run ```docker-compose up --build```.
* When you get ```prisma_1    | Server running on :7000```` run ```npm run deploy``` will run ```primsa deploy``` to to fire up the Prisma data layer.
* Your docker terminal should now say:
```
apollo_1    | =========Running on http://localhost:8000/=========
```
* Go to ```http://localhost:7000/_admin```
* In your above Prisma terminal run ```prisma token```
* Click the gear icon to add the token to the admin
* Go to ```http://localhost:7000/```
* in HTTP HEADERS add your token object.
```
{
    "Authorization": "Bearer {token}"
}
```

#
## Linux
* Note: You may need to manually install a different version of ```Docker Compose```. If you encounter this error you can find the steps to check your distros version and  compatibility with the projects ```Compose file format``` [here](https://docs.docker.com/compose/compose-file/) and [here](https://docs.docker.com/compose/install/).
* ```npm run generate``` will run ```prisma generate``` to add the schema to Apollo.
* Leaving the above Prisma terminal open, run next command in a new terminal. 
* ```npm run start```  will run ```docker-compose up --build```.
* When nodemon error catch ```npm run deploy``` will run ```prisma deploy``` to to fire up the Prisma data layer.
* Your docker terminal should now say: 
```
apollo_1    | =========Running on http://localhost:8000/=========
```
* Go to ```http://localhost:7000/_admin```
* In your above Prisma terminal ```prisma token```
* Click the gear icon to add the token to the admin
* Go to ```http://localhost:7000/```
* in HTTP HEADERS add your token object.
```
{
    "Authorization": "Bearer {token}"
}
```




#
# Useful info

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




