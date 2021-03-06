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
  startTime: {
    type: Date,
    default: Date.now()
  },
  recorder: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  child: {
    type: mongoose.Schema.ObjectId,
    ref: 'children',
    required: true
  }
});

const Event = mongoose.model('event',EventSchema);
module.exports = Event;