import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  sessionHash: String,
  lastQuestion: String,
  questionIds: [String]
});

export default mongoose.model('session', schema);
