const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan_parent',
  host: 'localhost',
  database: 'productqas',
  password: '',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows)
  })
}

const getUser = (req, res) => {
  pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows)
  })
}


module.exports = {
  getUsers,
  getUser,
}