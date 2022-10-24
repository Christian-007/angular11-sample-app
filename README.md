# Angular 11 Sample App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Pre-requisites

If you want to run this project locally, make sure you have the following installed in your operating system:

- Node.js `v14.x.x` or higher
- Angular CLI v11 or higher (skip this if you want to use `npx` instead)

## Running the project locally

1. Clone the project.
2. Run `npm install` within the project directory.
3. Run `ng serve`.
4. Open your browser on `http://localhost:4200`.

## Triggering and sending JS errors to New Relic

1. Change the `apiKey` and `applicationId` values on 3 files: `webpack.config.js`, `new-relic-list-source-map.js`, and `new-relic-delete-source-map.js` accordingly.
2. Run `ng build --prod` (this will bundle the Angular app and upload the source map files to New Relic).
3. Run `node ./new-relic-list-source-map.js` to list the uploaded source map files (to make sure all files are uploaded successfully).
4. Run `npm run serve:spa` (this will open the app in `http://localhost:3000`).
5. Trigger some errors by clicking `notAFunctionError()`, `uriError()`, `syntaxError()`, or `rangeError()` buttons on the browser.
6. Go to One New Relic dashboard.
