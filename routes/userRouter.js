const express = require('express');
const userRouter = express.Router();
const db = require('../queries');

const passport = require('passport');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

userRouter.route('/')
    .get((req, res) => {

        res.send('all users')
    })

// userRouter.route('/:id')
//     .get((req, res) => {

//     })
const habitList = [
    "Win",
    "Win",
    "Win",
    "No matter what"
  ];

userRouter.post('/register', db.checkDBforEmail, db.checkDBforUsername, db.createUser)

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    // console.log(req)
});

userRouter.get('/habits', checkAuthenticated, (req, res) => {
    res.send(habitList)
} )

module.exports = userRouter;