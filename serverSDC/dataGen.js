const faker = require('faker');
// const pgp = require('pg-promise')();
const fs = require('fs')
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const filename = argv.output || 'posts.csv';
const stream = fs.createWriteStream(filename);

// const connectionObj = {
//   user: 'ethan_parent',
//   host: 'localhost',
//   database: 'productqas',
//   password: '',
//   port: 5432,
// };

// const db = pgp(connectionObj);

let randoNumUpTo99;
let qid = 0;
const createQRecord = () => {
  qid += 1;
  randoNumUpTo99 = Math.floor((Math.random() * 99)) + 1;
  let sentence = faker.lorem.sentence();
  // let date = faker.date.past();
  let date="2013-12-25T00:00:00.000Z"
  let userName = faker.internet.userName();
  let image = faker.image.image();

  return `${qid},${sentence},${date},${randoNumUpTo99},${randoNumUpTo99},${userName},${randoNumUpTo99}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing(){
    let canWrite = true;
    do {
      i--
      let post = createQRecord()
      if(i === 0) {
        writeStream.write(post, encoding, done)
      } else {
        writeStream.write(post, encoding)
      }
    } while(i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
  }
  writing()
}

// CREATE TABLE IF NOT EXISTS questions (
//   question_id serial PRIMARY KEY,
//   question_body varchar(60),
//   question_date timestamp,
//   question_helpfulness integer,
//   reported integer,
//   asker_name varchar(60),
//   product_id integer
// );

stream.write(`question_id,question_body,question_date,question_helpfulness,reported,asker_name,product_id`,'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end()
})

    // let questionQueryInsert = `INSERT INTO questions
    // (question_id, question_body, question_date, question_helpfulness, reported, asker_name, product_id)
    // VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`

    // const qValues = [qid, sentence, date, randoNumUpTo99, randoNumUpTo99, userName, randoNumUpTo99];


    // const aValues = [aid, sentence, date, userName, randoNumUpTo99, '{"https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80", "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}', qid]

    // let answerQueryInsert = `INSERT INTO answers
    // (answer_id, body, date, answerer_name, helpfulness, photos, question_id)
    // VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`

    // qid += 1;
    // aid += 1;

    //   db.any(questionQueryInsert, qValues)
    //     .then(data => {
    //   db.any(answerQueryInsert, aValues)
    //   }).catch(error => {
    //   console.log(error);
    // });

// seedDatabase();
