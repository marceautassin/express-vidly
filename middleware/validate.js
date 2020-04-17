module.exports = (validator) => {
  return (req, res, next) => {
    const {
      error
    } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};


// toutes les routes sont à simplifier grace à ce middleware
