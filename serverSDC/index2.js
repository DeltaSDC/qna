const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./queries');
const app = express();
const port = 3003;
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static('public'));    <== commented out for now for testing

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Future Update: Move routes to their own file, e.g. routes.js

// Get all QAs
app.get('/qa/', db.getProducts);

// Get one QA
app.get('/qa/:product_id', db.getProduct);


// app.post('/qa/:product_id', function(req, res, next) {

// });

// app.put('/qa/:product_id', function(req, res) {
//   res.send('PUT req to root')
// })

// app.delete('/qa/:product_id', function(req, res) {
//   res.send('DELETE req to root')
// })

// Shape of Data:
/*
{
  "product_id": STRING(num)
  "results": [
    {
      "question_id": INT,
      "question_body": STRING,
      "question_date": STRING(timestamp),
      "asker_name": STRING,
      "question_helpfulness": INT,
      "reported": INT,
      "answers": {
        STRING(num): {
          "id": INT,
          "body": STRING,
          "date": STRING(timestamp),
          "answerer_name": STRING,
          "photos": [
            "URL",
            "URL"
          ]
        },
        STRING(num): {
          "id": INT,
          etc etc etc...
        }
      }
    }
  ]
}

** NOTE: Photos can be a empty array, answers can be empty object
*/