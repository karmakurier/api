/**
 * this module provides auth-check middleware for the router.
 */
var passport = require('passport');

module.exports = {
    // Check is authentication token is valid and user is in Role "USER"
    isAuthenticatedUser: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                let plainuser = user.get({ plain: true });
                user.getRole().then(foundRole => {
                    let plainRole = foundRole.get({ plain: true });
                    if (plainRole.name !== "USER" || plainRole.name !== "ADMIN")
                        return res.sendStatus(403);
                    req.user = plainuser;
                    next();
                });
            } else {
                res.status(401).send();
            }
        })(req, res, next);
    },

    // Check is authentication token is valid and user is in Role "ADMIN"
    isAuthenticatedAdmin: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                let plainuser = user.get({ plain: true });
                user.getRole().then(foundRole => {
                    let plainRole = foundRole.get({ plain: true });
                    if (plainuser.name !== "ADMIN")
                        return res.sendStatus(403);
                    req.user = plainuser;
                    next();
                });

            } else {
                res.status(401).send();
            }
        })(req, res, next);
    }
}