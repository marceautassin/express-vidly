const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 250
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin // this refer to the function herself // this does not work with arrow function
  }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
