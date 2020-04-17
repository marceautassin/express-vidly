const express = require('express');
const router = express.Router();

// get
router.get('/', (req, res) => {
  res.render('index', {
    title: "my first app",
    message: "Hello"
  })
});

module.exports = router;
