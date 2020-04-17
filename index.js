
// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
// const morgan = require('morgan');
const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/loggin')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

  // throw new Error('Somehting failed during startup...') // => uncaught exception test
  // const p = Promise.reject(new Error('It fails again...'));
  // p.then(() => console.log('done')); // unhandle rejection test

// app.set('view engine', 'pug');
// app.set('views', './views'); //default

// if (app.get('env') === "development") {
//   app.use(morgan('tiny')); // Define logs
//   // console.log("Morgan enabled..."); => old fashion debug
//   startupDebugger("Morgan enabled..."); // console: DEBUG=app:db nodemon index.js
// }


// PORT

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening to port ${port}...`);
});

//Db work...
// dbDebugger('Connected to the database...');

module.exports = server;
