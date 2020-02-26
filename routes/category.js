const express = require('express');
const router = express.Router();

const { create, categoryById, read } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/userAuth');
const { userById } = require('../controllers/user');

// route for admins to create a category
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

// route for admins to fetch a category
router.get('/category/:categoryId', read)



// anytime there is 'userId' in the route param, then this middleware will run
router.param('userId', userById);
// anytime there is 'categoryId' in the route param, then this middleware will run
router.param('categoryId', categoryById)
module.exports = router;