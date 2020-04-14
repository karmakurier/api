var login = require('./login');
var models = require('../models/sequelize');

module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        console.log('serializing user: '); console.log(user.id);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        models.user.findById(id).then(user => {
            console.log('deserializing user:', user.id);
            done(null, user);
        });

    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);

}