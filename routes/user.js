const express = require('express');
const router = express.Router();

// fetch all users
router.get('/', (req, res) => {
    res.send("Hello this is from the user.js file")
})

module.exports = router;