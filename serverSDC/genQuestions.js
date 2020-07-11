const faker = require('faker');
const fs = require('fs')
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const Qfilename = argv.output || 'Qposts.csv';
const Qstream = fs.createWriteStream(Qfilename);

let randoNumUpTo99;
let qid = 0;
let pid = 0;
const createQRecord = () => {
  qid += 1;
  pid += 1;
  randoNumUpTo99 = Math.floor((Math.random() * 99)) + 1;
  // randoNumUpTo9M = Math.floor((Math.random() * 9999999)) + 1;
  let sentence = faker.lorem.sentence();
  // let date = faker.date.past();
  let date="2013-12-25T00:00:00.000Z"
  let userName = faker.internet.userName();

  return `${qid},${sentence},${date},${randoNumUpTo99},${randoNumUpTo99},${userName},${pid}\n`
}

const startWritingQ = (writeStream, encoding, done) => {
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

Qstream.write(`question_id,question_body,question_date,question_helpfulness,reported,asker_name,product_id`,'utf-8')
startWritingQ(Qstream, 'utf-8', () => {
  Qstream.end();
});

