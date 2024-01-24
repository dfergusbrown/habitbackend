const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getUserByUsername, getUserById} = require('./queries')
// const bcrypt = require('bcrypt')

function initializePassport(passport) {
    
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username, done)
            console.log(password)
            if (!user) return done(null, false, /*optional message*/);
            if (user.password != password) return done(null, false, { message: 'Incorrect username or password.' });
            return done(null, user);
        } catch(err) {
            return done(err, false)
        }

        // if (err) return done(err);




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
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
};

module.exports = initializePassport;