# azure-functions-ts-jest
Sample application that with integration-tests on Azure Function apps with **jest**

## Setup
### Install the app
`npm install`

### Setup local settings
Copy `local.settings-SAMPLE.json` and name it `local.settings.json`.

### Create database
Create a MongoDB database (your db for testing purposes). 
Add connection string to `local.settings.json`

## Test the function app
`npm test` or `npm run test:watch`

## Start the function app
`npm start`