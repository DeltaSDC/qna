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
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
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

// Create a single product (eventually, create 6 million)
const createProduct = (req, res => {
  pool.query(`INSERT INTO products (product_id) VALUES (1);`);
  pool.query(`INSERT INTO questions
  (question_id, question_body, question_date, question_helpfulness, reported, asker_name, product_id)
  VALUES (1, 'Will these jeans shrink?', 'Thu Jul 09 2020 11:52:56', 5, 0, 'cindyFromUtah', 1);`);
  pool.query(`INSERT INTO answers (answer_id, ) VALUES (404);`);
});

module.exports = {
  getProducts,
  getProduct,
}