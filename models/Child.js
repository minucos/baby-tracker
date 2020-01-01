const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  carers: [{ 
    type: mongoose.Schema.ObjectId, 
    ref: 'users' 
  }],
  createDate: {
    type: Date,
    default: Date.now()
  }
});

const Child = mongoose.model('children',ChildSchema);
module.exports = Child;