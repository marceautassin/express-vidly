const winston = require('winston');
// require('winston-mongodb'); // conflict with jest
require('express-async-errors');

module.exports = function () {
  //manual version
  // process.on('uncaughtException', (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // winston method (to be checked for unhandlerejection)
  winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({
      filename: 'uncaughtException.log'
    })
  );

  process.on('unhandledRejection', (ex) => {
    // console.log('We got an unhandle rejection!!!!');
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  winston.add(winston.transports.File, {
    filename: 'logfile.log'
  }); // write in logfile.log
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly-api-project', // should be on a dedicated database
  //   level: 'error'
  // });

};
