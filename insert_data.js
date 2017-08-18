require('babel-polyfill');
const dataFolder = './data';
const fs = require('fs');
const path = require('path');
const Ix = require('ix');
const promisify = require('util.promisify');

const readFileProm = promisify(fs.readFile);

fs.readdir(dataFolder, (err, files) => {
  Ix.AsyncIterable
    .from(
      files.map(file => readFileProm(path.join(dataFolder, file)))
    )
    .forEach(data => {
      console.log(data.toString('utf-8'));
    })
    .catch(err => console.log(`Error ${err}`));
});
