const express = require("express");
const app = express();
const PORT = 3000;

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

// authentication
const db = require('./queries');
const userRouter = require("./routes/userRouter");
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport');
const initializePassport = require('./authenticate')
initializePassport(passport)

const habitList = [
  "Drink Water",
  "Exercise",
  "Journal",
  "Do homework",
  "Make dinner",
  "Win at Everything"
];

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(session({
  secret: 'felonious',
  cookie: { maxAge: 300000000, secure: false },
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'))
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

// ROUTES
app.use('/users', userRouter)
app.get('/habits', (req, res, next) => {
  res.send(habitList);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
