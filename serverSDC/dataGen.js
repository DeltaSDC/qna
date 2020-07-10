const faker = require('faker');
const fs = require('fs')
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const filename = argv.output || 'posts.csv';
const stream = fs.createWriteStream(filename);

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
};

stream.write(`question_id,question_body,question_date,question_helpfulness,reported,asker_name,product_id`,'utf-8')
startWriting(stream, 'utf-8', () => {
  stream.end();
});
