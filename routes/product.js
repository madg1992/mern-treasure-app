const express = require("express");
const router = express.Router();

const { create, productById, read } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/userAuth");
const { userById } = require("../controllers/user");


// user must be an authorized user and an Admin to access this route
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

// fetch a single product
// read method 
router.get('/product/:productId', read)

// if ':/userId' is in the route, then the userById method will run
router.param("userId", userById);
// if ':/productId' is in the route, then the productById method will run
router.param("productId", productById);

module.exports = router;