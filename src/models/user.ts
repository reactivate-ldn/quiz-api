import * as mongoose from 'mongoose';
import { v4 } from 'node-uuid';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: v4()
  },
  name: String,
  sessionId: String
});

export default mongoose.model('user', schema);
