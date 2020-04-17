const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // usefull to validate id before submitting request
const {
  genreSchema
} = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 250
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 150
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 150
  }
}));

const validateMovie = (movie) => {
  const schema = {
    title: Joi.string().min(5).max(250).required(),
    genreId: Joi.objectId().required(), // validation de l'ID!
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
};


exports.Movie = Movie;
exports.validate = validateMovie;
