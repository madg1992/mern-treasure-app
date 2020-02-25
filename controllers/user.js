const User = require('../models/user');

exports.register = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        // we set salt and hased_password as undefined 
        // so we don't expose user's credentials
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};