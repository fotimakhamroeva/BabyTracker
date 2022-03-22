const express = require('express');
const router = express.Router();
const mock = require('../../utils/mock');
const users = mock.users;

router.post('/login', (req,res) => {
    console.log('login route reached')
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = users[email];
    const foundPassword = (foundUser) ? foundUser.password : null;
    if (password === foundPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.status(200).json({message:"Success"});
    } else {
        res.status(401).json({message:"Please, check your email or password"});
    }
});

router.post('/register', (req,res) => {
    console.log('register route reached')
    const userData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    console.log(userData)
    users[userData.email] = userData;
    delete userData.password;
    req.session.user = userData;
    res.status(200).json({message:"Success"})
});

module.exports = router;