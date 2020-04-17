const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

const validateCustomer = (customer) => {
  const Schema = {
    name: Joi.string().required().min(2).max(20),
    phone: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, Schema);
};


exports.Customer = Customer;
exports.validate = validateCustomer;
