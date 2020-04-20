const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
var models = require('../models/sequelize');
var bCrypt = require('bcrypt');

module.exports = function (passport) {

    // Local Strategy for checking user creds.
    passport.use('local', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    },
        function (req, email, password, done) {
            // check in sequilize if a user with username exists or not
            console.log(email);
            models.user.findOne({ where: { email: email } }).then(user => {
               
                // Username does not exist, log the error and redirect back
                if (!user) {
                    console.log('User Not Found with username ' + email);
                    return done(null, false, {message: 'User Not Found.'});
                }

                let plainUser = user.get({ plain: true});
                // User exists but wrong password, log the error 
                if (!isValidPassword(plainUser, password)) {
                    console.log('Invalid Password');
                    return done(null, false, {message: 'User Not Found.'}); // redirect back to login page
                }
                // User and password both match, return user from done method
                // which will be treated like success
                return done(null, plainUser);
            });

        })
    );

    // jwt strategy for bearer auth
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, function(jwtPayload, next) {
        models.user.findOne({ where: { id: jwtPayload.id } }).then(user => {
            // Username does not exist, log the error and redirect back
            if (!user) {
                console.log('User Not Found with username ' + username);
                return next(null, false);
            } 

            
            // User and password both match, return user from done method
            // which will be treated like success
            return next(null, user);
        });
    }))


    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}