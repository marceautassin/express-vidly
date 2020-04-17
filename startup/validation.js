const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require('joi-objectid')(Joi); // usefull to validate id before submitting request
};
