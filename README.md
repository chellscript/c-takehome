This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with all the dependencies I like to code with :3

## How to Run This Project

1. **Use the correct Node version** (based on `.nvmrc` file):

   ```bash
   nvm use
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the project, (typically runs on localhost:3000)**:
   ```bash
   npm run dev
   ```

### Things I would have like to included

- Tests, write unit tests (fmmllll 🙃)!
- Investigate a way to disrupt the function iterating through the commands when a button is pressed
- Square are buttons => when clicked there should be an option to set an obstacle
- Change input so that you can have multiple robots on the same square instead of one big text area.
- Have an interface where users can control the size of the grid (currently this is set using constants, see utils/constants.ts) and the starting position of the robot
- more detailed square state rather than just 0 and 1, maybe like {hasBeenTouched: true, currentRobots:[],hasObstacle:true} something like that
