import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  description: String,
  optionIds: [String],
  rightOption: String
});

export default mongoose.model('question', schema);
