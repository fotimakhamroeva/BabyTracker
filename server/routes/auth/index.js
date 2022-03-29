const express = require('express');
const router = express.Router();
const { LogTypes, users, logs, babies, parentBabies } = require('../../utils/mock');

module.exports = (db) => {

    
    router.post('/login', (req,res) => {
        // console.log(users)
        const email = req.body.email;
        const password = req.body.password;
        const foundUser = users[email];
        const foundPassword = (foundUser) ? foundUser.password : null;
        
            // let userToUse = JSON.parse(JSON.stringify(foundUser));
            // delete userToUse.password;
            // req.session.user = userToUse;
            db.query('SELECT * FROM parent WHERE email = $1 AND password = $2', 
            [email, password] )
            
            .then((result) => {
                const user = result.rows[0];
                console.log("USER:", user);
                req.session.user = user;
                console.log("req session:", req.session);
                res.status(200).json({ message : "Login successful.", user})
            })
            .catch((error) => {
                console.log(error) 
                res.status(401).json({ message : "Request failed" });
            })
            
        // } else {
        //     return res.status(401).json({ message : "Please, check your email or password." });
        // }
       
    });
    
    
    router.post('/register', (req,res) => {
        const userData = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        }
        db.query('INSERT INTO parent (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', 
        [userData.first_name, userData.last_name, userData.email, userData.password] )
        .then((response) => {
            // console.log("RESPONSE:",response.rows[0])
            req.session.user = response.rows[0];
            console.log("Req session:", req.session);

            return res.status(200).json({ message : "Register successful.", user: response.rows[0]})

        })
        .catch((error) => console.log(error));

        // users[userData.email] = userData;
        // let userToUse = JSON.parse(JSON.stringify(userData));
        // delete userToUse.password;
        // // req.session.user = userToUse;
        //console.log("req.body:",req.body);
        // console.log("user to user:",userToUse);
        // return res.status(200).json({ message : "Register successful.", user: userData })
        
    });
    
    
    router.post('/logout', (req, res) => {
        req.session = null;
        return res.status(200).json({ message : "Logout successful." })
    });
return router;    
}
    // module.exports = router;