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
  startingSide: {
    type: String,
    required: true,
    enum: ['left', 'right']
  },
  notes: {
    type: String
  },
  fedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now()
  },
  endTime: {
    type: Date,
    default: Date.now()
  }
});

const Feed = mongoose.model('feed',FeedSchema);
module.exports = Feed;