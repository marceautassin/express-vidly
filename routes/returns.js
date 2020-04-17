const {
  Rental
} = require('../models/rental');
const {
  Movie
} = require('../models/movie');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');
// const moment = require('moment'); // plus besoin car dans Rentl class maintenant
const express = require('express');
const router = express.Router(); // same as app but for routes

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
  // Avant refacto (validate(validateReturn))
  // if(!req.body.customerId) return res.status(400).send('CustomerId not provided');
  // if (!req.body.movieId) return res.status(400).send('CustomerId not provided');

  // avant refacto
  // const rental = await Rental.findOne({
  //   'customer._id': req.body.customerId, // use '' property to access key in subdocument
  //   'movie._id': req.body.movieId
  // });
  const rental = await Rental.lookup(req.body.movieId, req.body.customerId);
  if (!rental) return res.status(404).send('This rental does not exist');

  if (rental.dateReturned) return res.status(400).send('Return already processed');

   // avant refacto
  // rental.dateReturned = new Date();
  // const rentalDays = moment().diff(rental.dateOut, 'days');
  // rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  rental.return();
  await rental.save();

  await Movie.update({
    _id: rental.movie._id
  }, {
    $inc: {
      numberInStock: 1
    }
  });

  return res.send(rental);

  // res.status(401).send('unauthorized');

});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
