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
  pool.query(`INSERT INTO answers (adata, othercode) VALUES (404);`);
});

// **Commands to create the tables**

// Create Product Table
/*

CREATE TABLE products (
  product_id serial PRIMARY KEY
)

*/
// Create Question Table
/*

CREATE TABLE questions (
  question_id serial PRIMARY KEY,
  question_body varchar(255),
  question_date timestamp,
  question_helpfulness integer,
  reported integer,
  asker_name varchar(60),
  product_id integer REFERENCES products
)

*/
// Create Answer Table
/*

CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  body varchar(255),
  date timestamp,
  answerer_name varchar(60),
  helpfulnes integer,
  photos text[],
  question_id integer REFERENCES questions
)

*/

module.exports = {
  getProducts,
  getProduct,
}