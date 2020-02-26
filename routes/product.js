const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
// user must be an authorized user and an Admin to access this route
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);
// router.param("productId", productById);

module.exports = router;