const nr = require('newrelic');
// const spdy = require('spdy');
const compression = require('compression');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./queries');
const app = express();
const port = 4003;
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
// app.use(express.static('public'));    <== commented out for now for testing

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Future Update: Move routes to their own file, e.g. routes.js

// Get all QAs
app.get('/qa/', db.getProducts);

// Get one Q
app.get('/qa/questions/:id', db.getQuestion);

// Get one A
app.get('/qa/answers/:id', db.getAnswers);

// Get one photo
app.get('/qa/photos/:id', db.getPhotos);



// app.post('/qa/:product_id', function(req, res, next) {

// });

// app.put('/qa/:product_id', function(req, res) {
//   res.send('PUT req to root')
// })

// app.delete('/qa/:product_id', function(req, res) {
//   res.send('DELETE req to root')
// })

// const options = {
//   key: fs.readFileSync(__dirname + '/http2-express/server.key'),
//   cert:  fs.readFileSync(__dirname + '/http2-express/server.crt')
// }

// spdy
//   .createServer(options, app)
//   .listen(port, (error) => {
//     if (error) {
//       console.error(error)
//       return process.exit(1)
//     } else {
//       console.log('Listening on port: ' + port + '.')
//     }
//   })