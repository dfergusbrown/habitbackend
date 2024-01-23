const express = require("express");
const app = express();
const PORT = 3000;

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./queries');
const userRouter = require("./routes/userRouter");

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
app.use(logger('dev'))
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/users', userRouter)

app.get("/habits", (req, res, next) => {
  res.send(habitList);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
