import * as express from 'express';

/*
*
* Routes
*
*/

// Session management

// (Add an option to the quizz) POST /option { title: string }
// (Add a question to the quizz) POST /question { title: string, description: string, optionIds: string[], rightOption: string }
// (Create a session) POST /session { name: string, questionIds: string[]}
// (move to next question) GET /next

// Add participants

// POST /user { name: string }
// POST /answer { userId: string, questionId: string, selectedOptionId: string }


export default express.Router()
  .use('/', (req, res) => {
    res.status(200).send({ hello: 'test' });
  });
