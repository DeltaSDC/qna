const { Pool } = require('pg');
const pool = new Pool({
  user: '',
  host: '127.0.0.1',
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
  let rangeMin = Number(req.params.id);
  let rangeMax = Number(req.params.id) + 3;
  rangeMin = rangeMin.toString();
  rangeMax = rangeMax.toString();
  if (Number(rangeMin) + 3 >= 10000000) {
    rangeMin = 1
    rangeMax = 4;
  }
  pool.query(`SELECT * FROM questions WHERE product_id >= ${rangeMin} AND product_id <= ${rangeMax}`, (error, results) => {
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

const getAnswers = (req, res) => {
  let rangeMin = Number(req.params.id);
  let rangeMax = Number(req.params.id) + 3;
  rangeMin = rangeMin.toString();
  rangeMax = rangeMax.toString();
  if (Number(rangeMin) + 3 >= 10000000) {
    rangeMin = 1
    rangeMax = 4;
  }
  pool.query(`SELECT * FROM answers WHERE question_id >= ${rangeMin} AND question_id <= ${rangeMax}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
};

const getPhotos = (req, res) => {
  pool.query(`SELECT * FROM photos WHERE photo_id = ${req.params.id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
};



module.exports = {
  getProducts,
  getQuestion,
  getAnswers,
  getPhotos,
};
