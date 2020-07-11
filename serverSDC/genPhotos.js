const faker = require('faker');
const fs = require('fs')
const argv = require('yargs').argv

const lines = argv.lines || 10000000;
const Pfilename = argv.output || 'Pposts.csv';
const Pstream = fs.createWriteStream(Pfilename);

let randoNumUpTo99;
let aId = 0;
let pId = 0;
let image;
const createPRecord = () => {
  aId += 1;
  pId += 1;
  image = faker.image.image();
  return `${pId},${image},${aId}\n`
};

const startWritingP = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let canWrite = true;
    do {
      i--
      let post = createPRecord()
      if(i === 0) {
        writeStream.write(post, encoding, done)
      } else {
        writeStream.write(post, encoding)
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
  }
  writing();
};

Pstream.write(`photo_id,url,answer_id`,'utf-8')
startWritingP(Pstream, 'utf-8', () => {
  Pstream.end();
});
