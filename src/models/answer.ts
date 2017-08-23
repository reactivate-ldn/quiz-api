import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  questionId: String,
  selectedOptionId: String,
  userId: String
});

export default mongoose.model('answer', schema);
