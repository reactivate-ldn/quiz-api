import * as express from 'express';
import Session from '../models/session';
import Option from '../models/option';
import Question from '../models/question';

/*
*
* Routes
*
*/

// Session management

// (Add an option to the quizz) POST /option { title: string }
// (Add a question to the quizz) POST /question { title: string, description: string, optionIds: string[], rightOption: string }
// (Create a session) POST /session { name: string, questionIds: string[]}
// (Get the latest session) GET /session/question
// (move to next question) GET /next

// Add participants

// POST /user { name: string }
// POST /answer { userId: string, questionId: string, selectedOptionId: string }


export default express.Router()
  .post('/option', (req, res) => {
    const opt = new Option({ title: req.body.title });
    console.log('Creating an option', opt);

    opt.save((err, option) => {
      if (!err) {
        res.status(200).send({ data: option });
      } else {
        res.status(500).send(err);
      }
    });
  })
  .post('/question', (req, res) => {
    const { title, description, optionIds, rightOption } = req.body;
    const q = new Question({ title, description, optionIds, rightOption });

    q.save((err, question) => {
      if (!err) {
        res.status(200).send({ data: question });
      } else {
        res.status(500).send(err);
      }
    });
  })
  .post('/session', (req, res) => {
    const { name, questionIds } = req.body;
    const s = new Session({ name, questionIds });

    s.save((err, session) => {
      if (!err) {
        res.status(200).send({ data: session });
      } else {
        res.status(500).send(err);
      }
    });
  });
