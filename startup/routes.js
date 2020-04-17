const express = require('express');
const genres = require('../routes/genres'); // call router methods from courses file
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const home = require('../routes/home');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json()); //middleware function => req.body
  app.use(express.urlencoded({ extended: true })); //middleware function => req.body
  app.use(express.static('public')); // Define a folder for static web components
  app.use('/api/genres', genres); // for any routes beginning by /api/genres, use routes frome genres
  app.use('/', home);
  app.use('/api/genres', genres); // for any routes beginning by /api/genres, use routes frome genres
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);
  app.use(error);
};
