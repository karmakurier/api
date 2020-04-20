var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');

// Controller
const usersController = require("../controller/UsersController");

module.exports = (passport) => {
    router.post('/login', (req, res, next) => {

        //Use local strategy to verify user
        passport.authenticate('local', { session: false }, (err, user, info) => {
        
            if(user) {
                let tokenUser = { id: user.id, email: user.email}
                const token = jwt.sign(tokenUser, process.env.JWT_SECRET,  { expiresIn: '30m' });
                res.send({token: "Bearer " + token});
            } else {
                res.status(401).send();
            }
        })(req, res, next);
    });

    router.post('/signup', usersController.signup);
    
    return router;
}





