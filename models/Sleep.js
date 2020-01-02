const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SleepSchema = new Schema({
  timeSlept: {
    type: Number,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  notes: {
    type: String
  }
});

const Sleep = mongoose.model('sleep', SleepSchema);
module.exports = Sleep;