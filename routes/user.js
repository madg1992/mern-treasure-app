const express = require('express');
const router = express.Router();

// require from the controllers folder
const { register, login } = require('../controllers/user');

// validator middleware
const { userSignupValidator } = require("../validation");


// fetch all users
// test on postman localhost:8080/api/register
// validate user input from the req.body with the middleware
router.post('/register', userSignupValidator, register);

router.post('/login', login);

module.exports = router;