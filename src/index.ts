import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import mainRoutes from './routes';

const PORT = 8080;

mongoose.connect('mongodb://localhost/reactivate-quizz');
const app = express();
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

app.use(cors());
app.use(cookieParser());
app.use(mainRoutes);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
