const express = require('express');
const router = express.Router();

// require from the controllers folder
const { sayHi } = require('../controllers/user.js');

// fetch all users
router.get('/', sayHi);

module.exports = router;