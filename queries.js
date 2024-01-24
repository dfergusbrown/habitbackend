const Pool = require('pg').Pool
const pool = new Pool({
    user: 'dfergusbrown',
    host: 'localhost',
    database: 'habittrackerDB',
    password: 'bluejuic66',
    port: 5432,
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
      if (err) {
        return err
      }
      res.status(200).json(results.rows)
    })
};

const getUserByUsername = async (username, done) => {
    const data = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    if (data.rows[0]) {
        console.log(data.rows[0])
        return data.rows[0]
    }
    return done(err)
};

const getUserById = async (id, done) => {
    const data = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
    if (data.rows) {
        return data.rows[0]
    }
    return done(err)
};

const checkDBforEmail = (req, res, next) => {
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

const checkDBforUsername = (req, res, next) => {
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

const createUser = (req, res) => {
    const { email, username, password } = req.body
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID; ${results.rows[0].id}`)
    })
};

const updateUser = (req, res) => {
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

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  };


  module.exports = {
    getUsers,
    getUserByUsername,
    getUserById,
    checkDBforEmail,
    checkDBforUsername,
    createUser,
    updateUser,
    deleteUser
  }