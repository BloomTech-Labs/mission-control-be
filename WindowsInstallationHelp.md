## Windows Installation

This worked for Devin, but it may not work for all windows users.
If you're not sure about this process, get with Devin or Kevin to troubleshoot.

### Hyper-V
- You NEED Windows 10 Pro (Don't have it? Check with Kevin)
- In the Windows Start Bar, search "Hyper-V"
- Click on "Turn Windows Features On or Off"
- Find Hyper-V, and check the box to initialize it.
- Click OK. You may need to restart your computer at this point (recommended)

### Docker
- Google search Docker
- Go to their website, create an account, and download docker desktop
- Restart if needed. (There may be some debugging here)
- Once running, open the Docker Settings
- In the Side Panel, click on RESOURCES/FILE SHARING
- Add the Drive that holds this codebase
    - (For most Windows computers, this is the C Drive. If you're not sure, selec them all.)

### In the terminal
- Navigate to the root directory (With the README and this text file) and run `npm i`
- navigate inside the apollo directory and run `npm i` as well
- `npm i -g prisma` to install prisma globally
- Navigate back to the root directory of this codebase

#### Run these commands
You can either run the main command, or run the npm command (taken from the `package.json`)
- `prisma generate` (`npm run generate`)
- `docker-compose up --build` (`npm start`)
- While the apollo server is running, `prisma deploy` (`npm run deploy`)


### ReSeeding
- `prisma delete` (Deletes entire service -> All empty)
- `prisma deploy` -> Re seed