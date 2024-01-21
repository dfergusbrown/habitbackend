const express = require('express');
const userRouter = express.Router();
const {createUser, checkDBforEmail} = require('../queries')

userRouter.route('/')
    .get((req, res) => {

        res.send('all users')
    })
    .post(checkDBforEmail, createUser)

userRouter.route('/:id')
    .get((req, res) => {

    })
module.exports = userRouter;