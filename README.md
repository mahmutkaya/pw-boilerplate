## Kudos

This repository is based on the [cucumber-typescript-starter](https://github.com/hdorgeval/cucumber7-ts-starter/) repo.
This repository is based on the [cucumber-playwright](https://github.com/Tallyb/cucumber-playwright/) repo.

## What's inside

- Typescript setup for writing steps with eslint/typescript and prettier
- Launching of Playwright browser before running all tests
- Launching new context and page for each scenario
- Running feature with video recording option
- Report generated with last good image attached
- Utiltes function to help you with writing steps
- VScode configuration to debug a single feature or an only scenario (run when located on the feature file)

## To run your tests

`npm run test` or `npx cucumber-js` runs all tests
`npm run test <feature name>` or `npx cucumber-js <feature name>` run the single feature

## Browser selection

By default we will use chromium. You can define an environment variable called BROWSER and
set the name of the browser. Available options: chromium, firefox, webkit

On Linux and Mac you can write:

`BROWSER=firefox npm run test` or `BROWSER=firefox npx cucumber-js` runs all tests using Firefox

One Windows you need to write

```
set BROWSER=firefox
npm run test
```

## Debugging Features

### From CLI

- `npm run debug:mode` - headful mode with APIs enables both APIs and debug options
- `npm run debug:api` - headless mode with debug apis
- `npm run debug:video` - headless mode vith video

## In Visual Studio Code

- Open the feature
- Select the debug options in the VSCode debugger
- Set breakpoints in the code

To stop the feature, you can add the `Then debug` step inside your feature. It will stop your debugger.

## To choose a reporter

The last reporter/formatter found on the cucumber-js command-line wins:

```text
--format summary --format @cucumber/pretty-formatter --format cucumber-console-formatter
```

In [cucumber.js](cucumber.js) file, modify the options.

## To ignore a scenario

- tag the scenario with `@ignore`


## To view the steps usage

- run the command `npm run coverage:steps-usage`.

## To view the html report of the last run

- run the command `npm run report`.

### Remote connection for Playwright:
# Setup Xquartz:
1. Install Xquartz https://www.xquartz.org/ 
2. Install Docker for Mac
3. Open Xquartz
4. In Xquartz Go to Security settings: check Allow connections from network clients
5. Restart Mac!
6. Open Xquartz

# Setup IP for remote connection
1. Go to Terminal: IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
2. Test it: echo $IP
3. In Terminal run: xhost +
3. In Terminal run: xhost + $IP

# Setup remote connection in project:
1. Go to project
2. Open package.json
3. Create new script or edit existing one
4. In terminal run e.g DISPLAY=host.docker.internal:0 npm run debug:mode - be happy that you can see the browser

# Debbuging using Debbuger from Visual Studio Code:
1. Open file that you want to debug (must be Xquartz run)
2. Place some breakpoints
3. Open `Run and Debug` menu
4. Click `Javascript Debug Terminal`
5. In docker use: `DISPLAY=host.docker.internal:0 npm run debug:mode`
6. Navigate to browser, and use arrows to move to the next steps
7. When breakpoint will be found check information in debbuger console in visual studio code