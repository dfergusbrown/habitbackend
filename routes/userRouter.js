const express = require('express');
const userRouter = express.Router();
const db = require('../queries');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




userRouter.route('/')
    .get((req, res) => {

        res.send('all users')
    })

userRouter.route('/:id')
    .get((req, res) => {

    })

userRouter.post('/register', db.checkDBforEmail, db.checkDBforUsername, db.createUser)

userRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

passport.use(new LocalStrategy(
    function verify(username, password, done) {
        db.get('SELECT * FROM users WHERE username = $1',[username], function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (user.password != password) return done(null, false, { message: 'Incorrect username or password.' });
            return done(null, user);
        });
    }
));


module.exports = userRouter;