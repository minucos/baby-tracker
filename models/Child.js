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
  parents: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]

});

const Child = mongoose.model('children',ChildSchema);
module.exports = Child;