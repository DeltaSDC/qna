const faker = require('faker');
const fs = require('fs')
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const Afilename = argv.output || 'Aposts.csv';
const Astream = fs.createWriteStream(Afilename);


let questionId = 0;
let aId = 0;
const createARecord = () => {
  questionId += 1;
  aId += 1;
  let randoNumUpTo99 = Math.floor((Math.random() * 99)) + 1;
  let aBody = faker.lorem.sentence();
  let aDate = "2013-12-25T00:00:00.000Z";
  let name = faker.name.findName();
  let image = faker.image.image();
  return `${aId},${aBody},${aDate},${name},${randoNumUpTo99},{${image}, ${image}}, ${questionId}`
}


const startWritingA = (writeStream, encoding, done) => {
  let i = lines;
  function writing(){
    let canWrite = true;
    do {
      i--
      let post = createARecord()
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



Astream.write(`answer_id,body,date,answerer_name,helpfulness,photos,question_id`,'utf-8')
startWritingA(Astream, 'utf-8', () => {
  Astream.end();
});
