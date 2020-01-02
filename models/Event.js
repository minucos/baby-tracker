const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['change','feed','sleep']
  },
  eventDetails: {
    type: mongoose.Schema.ObjectId,
    refPath: 'eventType'
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  recorder: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }
});

const Event = mongoose.model('event',EventSchema);
module.exports = Event;