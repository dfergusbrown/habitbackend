const express = require('express');
const userRouter = express.Router();
const db = require('../queries');

const authenticateUser = require('../authenticate');

userRouter.route('/')
    .get((req, res) => {

        res.send('all users')
    })

// userRouter.route('/:id')
//     .get((req, res) => {

//     })

userRouter.post('/register', db.checkDBforEmail, db.checkDBforUsername, db.createUser)

userRouter.post('/login', authenticateUser('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


module.exports = userRouter;