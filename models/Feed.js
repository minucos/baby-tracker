const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  foodFrom: {
    type: String,
    required: true,
    enum: ['breast', 'bottle','other']
  },
  foodType: {
    type: String,
    required: true,
    enum: ['milk','formula','solids']
  },
  options: [{
    type: String,
    required: true
  }],
  notes: {
    type: String
  },
  fedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }
});

const Feed = mongoose.model('feed',FeedSchema);
module.exports = Feed;