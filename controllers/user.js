const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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

exports.login = (req, res) => {
    // we use findOne method to locate user based on their email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Sorry, we don\'t  recognize this email!'
            });
        }
        // if user is found, make sure the email and password match
        // created the authenticate() method in user model which checks if the
        // encrypted pw is = to the hashed pw
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        // 9999 seconds or roughly around 2.7 hours
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user id, name, email & role 
        // and token to frontend client
        const { _id, name, email, role } = user;
        // written this way so we don't have to write:
        /*
        user.id
        user.email
        user.name
        user.role
        */
        return res.json({ token, user: { _id, email, name, role } });
    });
};