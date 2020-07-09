const db = require('./queries');
const pgp = require('pg-promise')();


// db.createProduct()
// db.createQuestions()
// db.createAnswers()

db.task(t => {
  return t.oneOrNone('SELECT id FROM Users WHERE name = $1', 'John')
      .then(user => {
          if(user) {
              return t.any('SELECT * from Events WHERE userId = $1', user.id);
          }
          return []; // user not found, so no events
      });
})
  .then(events => {
      // success
  })
  .catch(error => {
      // error
  });
