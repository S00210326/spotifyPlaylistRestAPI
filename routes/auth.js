require('dotenv').config();

const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const validationMiddleware = require('../middleware/jwtvalidation');
const router = express.Router();

// post to auth/local with username and password to login

router.post('/local', passport.authenticate('local' ,{session:false}), async (req, res) => {

    // here the authenication middleware has verified the password and username
    // the user details are now stored in a variable called req.user 

    console.log('logged in now');

        let payload = {};

        payload.name = req.user.username;

        console.table(payload);

        // sign the jwt and return it in the body of the request.       

        let token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 60 * 5});
        res.status(201).json({ accesstoken: token });
        console.log('login success');

    }
)

module.exports = router;
