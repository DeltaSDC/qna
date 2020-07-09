const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ethan_parent',
  host: 'localhost',
  database: 'productqas',
  password: '',
  port: 5432,
});

// Get all products
const getProducts = (req, res) => {
  pool.query('SELECT * FROM products ORDER BY product_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows)
  });
};

// Get a single product
const getProduct = (req, res) => {
  pool.query(`SELECT * FROM products WHERE product_id = ${req.params.product_id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getQuestions = (req, res) => {
  pool.query(`SELECT * FROM questions WHERE product_id = ${req.params.product_id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getAnswers = (req, res) => {
  pool.query(`SELECT * FROM answers WHERE question_id = ${req.params.question_id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a single product (eventually, create 6 million)
const createProduct = (num) => {
  pool.query(`INSERT INTO products (product_id) VALUES (1);`, (error) => {
    if (error) {
      throw error;
    }
  });
};

const createQuestions = (num) => {
  pool.query(`INSERT INTO questions
  (question_id, question_body, question_date, question_helpfulness, reported, asker_name, product_id)
  VALUES (1, 'Will these jeans shrink?', 'Thu Jul 09 2020 11:52:56', 5, 0, 'cindyFromUtah', 1);`, (error) => {
    if (error) {
      throw error;
    }
  });
};

const createAnswers = (num) => {
  pool.query(`INSERT INTO answers
  (answer_id, body, date, answerer_name, helpfulness, photos, question_id)
  VALUES (1, 'I had no problem when washing in cool water', 'Thu Jul 09 2020 11:58:00', 'ethanFromBoulder', 5,  '{"https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80", "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}', 1);`, (error, results) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = {
  getProducts,
  getProduct,
  getQuestions,
  getAnswers,
  createProduct,
  createQuestions,
  createAnswers,
};
