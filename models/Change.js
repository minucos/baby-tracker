const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChangeSchema = new Schema({
  changeType: [{
    type: String,
    required: true
  }],
  options: [{
    type: String,
    required: true
  }],
  notes: {
    type: String
  },
  recorder: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  createDate: {
    type: Date,
    required: true
  }
});

const Change = mongoose.model('change',ChangeSchema);
module.exports = Change;