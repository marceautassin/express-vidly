const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {
  User
} = require('../models/user');


// post

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };

  return Joi.validate(req, schema);
};


module.exports = router;
