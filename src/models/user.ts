import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  sessionId: String
});

export default mongoose.model('user', schema);
