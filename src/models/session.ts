import * as mongoose from 'mongoose';
import { v4 } from 'node-uuid';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: v4()
  },
  name: String,
  sessionHash: String,
  lastQuestion: String,
  questionIds: [String]
});

export default mongoose.model('session', schema);
