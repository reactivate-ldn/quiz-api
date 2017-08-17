import * as mongoose from 'mongoose';
import { v4 } from 'node-uuid';

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: v4()
  },
  title: String,
  description: String,
  optionIds: [String],
  rightOption: String
});

export default mongoose.model('question', schema);