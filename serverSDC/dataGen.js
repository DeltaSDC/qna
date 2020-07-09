var faker = require('faker');
const pgp = require('pg-promise')();
const connectionObj = {
  user: 'ethan_parent',
  host: 'localhost',
  database: 'productqas',
  password: '',
  port: 5432,
};
const db = pgp(connectionObj);
// db.createProduct()
// db.createQuestions()
// db.createAnswers()
let questionQueryInsert = `INSERT INTO questions
(question_id, question_body, question_date, question_helpfulness, reported, asker_name, product_id)
VALUES (1, 'Will these jeans shrink?', 'Thu Jul 09 2020 11:52:56', 5, 0, 'cindyFromUtah', 1);`
let answerQueryInsert = `INSERT INTO answers
(answer_id, body, date, answerer_name, helpfulness, photos, question_id)
VALUES (1, 'I had no problem when washing in cool water', 'Thu Jul 09 2020 11:58:00', 'ethanFromBoulder', 5,  '{"https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80", "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}', 1);`

// db.any(questionQueryInsert)
//   .then(data => {
//     db.any(answerQueryInsert)
//   }).catch(error => {
//     console.log(error);
//   });

// username
faker.internet.userName()
// timestamp
faker.date.past()
// random num 1-99
Math.floor((Math.random() * 99) + 1)
// title
faker.lorem.sentence()
// body
faker.lorem.paragraph()
// name
faker.name.firstName()
faker.name.lastName()