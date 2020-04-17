const {Rental, validate} = require('../models/rental');
const auth = require('../middleware/auth');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

// get

router.get('/', auth, async (req, res) => {
const rentals = await Rental.find().sort('-dateOut');
res.send(rentals);
});

router.get('/:id', auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if(!rental) return res.status(400).send('This rental ddoes not exist.');

  res.send(rental);
});

// post

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send('The request is not valid');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('wrong ID for movie');
  if (movie.numberInStock === 0) return res.status(400).send('No movie in stock');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('wrong ID for customer');

  const rental = new Rental({ // const au lieu de let car utilisation de Fawn par la suite
    customer: {
      _id: customer.id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold
    },
    movie: {
      _id: movie.id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
    .save('rentals', rental) // name of collection in mongoDB (lowercase)
    .update('movies', {_id: movie._id}, {
      $inc: { numberInStock: -1 }
    })
    .run();

    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failes');
  }


  // rental = await rental.save();
  // movie.numberInStock--; //decrease the number of movie in stock
  // movie.save();
});

// put

router.put('/:id', auth, async (req, res) => {
    const {
      error
    } = validate(req.body);
    if (error) return res.status(400).send('The request is not valid');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('wrong ID for movie');
    if (movie.numberInStock === 0) return res.status(400).send('No movie in stock');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('wrong ID for customer');

    const rental = await Rental.findByIdAndUpdate(req.params.id, {
      customer: {
          _id: customer.id,
          name: customer.name,
          phone: customer.phone,
          isGold: customer.isGold
        },
        movie: {
          _id: movie.id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
    }, {new: true});
    if (!rental) return res.status(400).send('wrong ID for rental');
});

module.exports = router;
