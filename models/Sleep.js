const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SleepSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  }
});

const Sleep = mongoose.model('sleep', SleepSchema);
module.exports = Sleep;