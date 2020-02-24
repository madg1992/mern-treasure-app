const express = require('express');
const router = express.Router();

// require from the controllers folder
const { signup } = require('../controllers/user');

// fetch all users
// test on postman localhost:8080/api/register
router.post('/signup', signup);

module.exports = router;