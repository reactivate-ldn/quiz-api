import * as mongoose from 'mongoose';
import { v4 } from 'node-uuid';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: v4()
  },
  questionId: String,
  selectedOptionId: String,
  userId: String
});

export default mongoose.model('answer', schema);
