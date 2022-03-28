const express = require('express');
const router = express.Router();
const { LogTypes, users, logs, babies, parentBabies } = require('../../utils/mock');

router.post('/login', (req,res) => {
    // console.log(users)
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = users[email];
    const foundPassword = (foundUser) ? foundUser.password : null;
    if (password === foundPassword) {
        let userToUse = JSON.parse(JSON.stringify(foundUser));
        delete userToUse.password;
        req.session.user = userToUse;
        return res.status(200).json({ message : "Login successful.", user: userToUse });
    } else {
        return res.status(401).json({ message : "Please, check your email or password." });
    }
});

router.post('/register', (req,res) => {
    const userData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    users[userData.email] = userData;
    let userToUse = JSON.parse(JSON.stringify(userData));
    delete userToUse.password;
    //req.session.user = userToUse;
    return res.status(200).json({ message : "Register successful.", user: userToUse })
});

router.post('/logout', (req, res) => {
    req.session = null;
    return res.status(200).json({ message : "Logout successful." })
});

module.exports = router;