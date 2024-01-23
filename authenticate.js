const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./queries')
// const bcrypt = require('bcrypt')

// function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        db.getUserByUsername()

        // try {
        //     if (password === user.password) {
        //         return done(null, user)
        //     } else {
        //         return done(null, false, { message: 'Password Incorrect'})
        //     }
        // } catch (err) {
        //     return done(err)
        // }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
// };

module.exports = authenticateUser;