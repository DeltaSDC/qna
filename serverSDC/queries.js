const { Pool } = require('pg');
const pass = require('./dbpassword');
const cache = require('./cache');
const port_redis = process.env.PORT || 6379;
const redis = require('redis');
const redis_client = redis.createClient(port_redis);

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-18-144-169-153.us-west-1.compute.amazonaws.com',
  database: 'productqas',
  password: pass.pass,
  port: 5432,
});

// Get all products
const getProducts = (req, res) => {
  pool.query('SELECT * FROM questions', (error, results) => {
    if (error) {
      throw error;
    }
  });
  res.status(200).json({});
};

let ethanCache = {};
// Get a single product
// get question with ethanCache
const getQuestion = (req, res) => {
  let rangeMin = Number(req.params.id);
  let rangeMax = Number(req.params.id) + 3;
  rangeMin = rangeMin.toString();
  rangeMax = rangeMax.toString();
  if (Number(rangeMin) + 3 >= 10000000) {
    rangeMin = 1
    rangeMax = 4;
  }
  if (ethanCache[req.params.id]) {
    let data = ethanCache[req.params.id]
    res.status(200).json(data)
  } else {
    pool.query(`SELECT * FROM questions WHERE product_id >= ${rangeMin} AND product_id <= ${rangeMax}`, (error, results) => {
      if (error) {
        throw error;
      }
      ethanCache[req.params.id] = results.rows;
      res.status(200).json(results.rows);
    })
  }
}

const getQuestionRedis = (req, res) => {
  const { id } = req.params;
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
    const questionInfo = results;
    redis_client.setex(id, 3600, JSON.stringify(questionInfo))
    res.status(200).json(results.rows);
  })
}


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
  getQuestionRedis,
  getAnswers,
  getPhotos,
};
