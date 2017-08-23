import * as express from 'express';
import * as mongoose from 'mongoose';

import Session from '../models/session';
import Option from '../models/option';
import Question from '../models/question';
import { makeid } from '../utils';

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
  .get('/secret-clear', (req, res) => {
    // TODO: Protect this API route
    mongoose.connect('mongodb://localhost/reactivate-quizz', () => {
        /* Drop the DB */
        mongoose.connection.db.dropDatabase();
        res.status(200).send({ data: 'Database cleared' });
    });
  })
  .post('/option', (req, res) => {
    const opt = new Option({ title: req.body.title });

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
    const s = new Session({ name, questionIds, sessionHash: makeid() });

    s.save((err, session) => {
      if (!err) {
        res.status(200).send({ data: session });
      } else {
        res.status(500).send(err);
      }
    });
  })
  .get('/next/:hash', (req, res) => {
    // TODO: protect this API route
    const { hash } = req.params;
    Session.find({ sessionHash: hash }).exec((err, sessions: any) => {
      const session = sessions[0];

      if (!err) {
        if (!session.lastQuestion) {
          session.lastQuestion = session.questionIds[0];
          session.save((error: any, s: any) => {
            if (error) {
              res.status(500).send({ data: 'couldn\'t update session'})
            } else {
              res.status(200).send({ data: s });
            }
          })
        } else {
          const nextSessionIdNumber = session.questionIds.indexOf(session.lastQuestion);
          session.lastQuestion = session.questionIds[nextSessionIdNumber + 1];
          session.save((error: any, s: any) => {
            if (error) {
              res.status(500).send({ data: 'couldn\'t update session'})
            } else {
              res.status(200).send({ data: s });
            }
          })
        }
      } else {
        res.status(404).send({ data: 'session not found' });
      }

    });
  })
  .get('/session/:hash', (req, res) => {
    const { hash } = req.params;
    Session.find({ sessionHash: hash }).exec((err, session) => {
      if (!err) {
        res.status(200).send({ data: session });
      } else {
        res.status(404).send(err);
      }
    });
  });
