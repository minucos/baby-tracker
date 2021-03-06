const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fName: {
      type: String,
      required: true
  },
  lName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  createDate: {
      type: Date,
      default: Date.now()
  }
});

const User = mongoose.model('users',UserSchema);
module.exports = User;