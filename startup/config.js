const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) { //export vidly_jwtPrivateKey=secretkeyaconfigurer dans le terminal
    throw new Error('FATAL ERROR jwtPrivateKey is not defined.');
    // console.log('FATAL ERROR jwtPrivatKey not defined.');
    // process.exit(1); // global module that end the process if value is =/= from 0
  }
};
