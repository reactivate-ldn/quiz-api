import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String
});

export default mongoose.model('option', schema);
