import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;