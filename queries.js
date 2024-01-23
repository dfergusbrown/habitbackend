const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dfergusbrown',
    host: 'localhost',
    database: 'habittrackerDB',
    password: 'bluejuic66',
    port: 5432,
});

exports.getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
};

exports.getUserByUsername = (req, res) => {
    const {username} = req.body;
    pool.query('SELECT * FROM users WHERE username = $1',[username], function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, /*optional message*/);
        if (user.password != password) return done(null, false, { message: 'Incorrect username or password.' });
        return done(null, user);
    });
};

exports.checkDBforEmail = (req, res, next) => {
    const { email } = req.body
    console.log(`checking for email: ${email} in database`)
    pool.query('SELECT * from users WHERE email = $1', [email], (error, results) => {
        console.log(results.rows)
        // found one!
        if (results.rows.length > 0) {
            return res.status(409).send('Email belongs to an existing account')
        } 
        // no such email is found
        return next()
    })
}

exports.checkDBforUsername = (req, res, next) => {
    const { username } = req.body
    console.log(`checking for username: ${username} in database`)
    pool.query('SELECT * from users WHERE username = $1', [username], (error, results) => {
        console.log(results.rows)
        // found one!
        if (results.rows.length > 0) {
            return res.status(409).send('Username belongs to an existing account')
        } 
        // no such username is found
        return next()
    })
};

exports.createUser = (req, res) => {
    const { email, username, password } = req.body
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID; ${results.rows[0].id}`)
    })
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  };