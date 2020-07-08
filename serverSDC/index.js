const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;
app.use(cors());
app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

//Future Update: Move routes to their own file, e.g. routes.js

app.get('/', function(req, res) {
  res.send('bonjour!')
})

app.post('/', function(req, res) {
  res.send('POST req to root')
})

app.put('/', function(req, res) {
  res.send('PUT req to root')
})

app.delete('/', function(req, res) {
  res.send('DELETE req to root')
})
