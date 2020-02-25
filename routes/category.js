const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/userAuth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

// anytime there is 'userId' in the route param, then this method will run
router.param('userId', userById);

module.exports = router;