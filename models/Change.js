const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChangeSchema = new Schema({
  contents: [{
    type: String,
    required: true,
    enum: ['pee','poo']
  }],
  options: [{
    type: String,
    required: true
  }],
  notes: {
    type: String
  },
  changedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now()
  }
});

const Change = mongoose.model('change',ChangeSchema);
module.exports = Change;