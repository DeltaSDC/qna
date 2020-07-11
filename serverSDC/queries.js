const { Pool } = require('pg');
const pool = new Pool({
  user: 'ethan_parent',
  host: 'localhost',
  database: 'productqas',
  password: '',
  port: 5432,
});

// Get all products
const getProducts = (req, res) => {
  pool.query('SELECT * FROM questions', (error, results) => {
    if (error) {
      throw error;
    }
  });
  res.status(200).json({})
};

// Get a single product
const getQuestion = (req, res) => {
  pool.query(`SELECT * FROM questions WHERE product_id = ${req.params.id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
};

// const getQuestions = (req, res) => {
//   pool.query(`SELECT * FROM questions WHERE product_id = ${req.params.product_id}`, (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

const getAnswer = (req, res) => {
  pool.query(`SELECT * FROM answers WHERE question_id = ${req.params.id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
};

module.exports = {
  getProducts,
  getQuestion,
  getAnswer,
};
