require('babel-polyfill');
const dataFolder = './data';
const fs = require('fs');
const path = require('path');
const Ix = require('ix');
const promisify = require('util.promisify');
const request = require('request');

const readFileProm = promisify(fs.readFile);
const sessionName = "Reactivate quiz"

fs.readdir(dataFolder, (err, files) => {
  const arrProm = files.map(file => readFileProm(path.join(dataFolder, file)));

  Promise.all(arrProm).then(arr => {
    const res = arr.map((data) => {
      const question = JSON.parse(data.toString('utf-8'));
      const optIds = question.options.map(opt => {
        return new Promise((resolve, reject) => {
          request({
            uri: 'http://localhost:8080/option',
            body: JSON.stringify({ title: opt.title }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          (err, res, body) => {
            if (!err) {
              resolve(body);
            } else {
              reject(err);
            }
          }
          )
        });
      });

      return Promise
        .all(optIds)
        .then((res) => {
          const serializedRes = res.map(opt => JSON.parse(opt));
          return new Promise((resolve, reject) => {
            request({
              uri: 'http://localhost:8080/question',
              body: JSON.stringify({
                title: question.title,
                description: question.description,
                optionIds: serializedRes.map(opt => opt.data._id),
                rightOption: serializedRes.find((_, index) => index === question.rightOption).data._id
              }),
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            },
            (err, res, body) => {
              if (!err) {
                resolve(body);
              } else {
                reject(err);
              }
            })
          })
        });
    });

    return Promise.all(res);
  })
  .then(questions => {
    request({
      uri: 'http://localhost:8080/session',
      body: JSON.stringify({
        name: sessionName,
        questionIds: questions.map(q => JSON.parse(q).data._id)
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    (err, res, body) => {
      console.log(body);
    })
  });
});
