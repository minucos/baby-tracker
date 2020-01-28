const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const ValidateEventInputs = require('../../validation/event');
const parseEventInfo = require('../../validation/parseEventDetails');
const Event = require('../../models/Event')
const Change = require('../../models/Change');
const Feed = require('../../models/Feed');
const Sleep = require('../../models/Sleep');

router.get('/test', (req, res) => res.json({ msg: "This is the events route" }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Event.find({ child: req.params.childId })
      .populate('eventDetails')
      .populate('recorder', ['fName', 'lName', '_id', 'email'])
      .sort({ startTime: -1 })
      .limit(30)
      .then(events => {
        if (events) {
          return res.json(events);
        }
      })
      .catch(err => res.status(400).json(err));
  }
)

router.get(
  '/filtered',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let filter = req.query.filter;

    let event;
    let totalEvents;
    if (filter !== '') {
      event = Event.find({ child: req.params.childId, eventType: filter });
      totalEvents = Event.find({ child: req.params.childId, eventType: filter }).count();
    } else {
      event = Event.find({ child: req.params.childId });
      totalEvents = Event.find({ child: req.params.childId }).count();
    }
    totalEvents.count({}, (err,count) => {
      let skipAmt = (page * limit) % count;
      
      event
        .populate('eventDetails')
        .populate('recorder', ['fName', 'lName', '_id', 'email'])
        .sort({ startTime: -1 })
        .skip(skipAmt).limit(limit)
        .then(events => {
          if (events) {
            return res.json({events,count});
          }
        })
        .catch(err => res.status(400).json(err));
    });
  }
)

router.post(
  '/',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.body.recorder = req.params.userId;
    req.body.child = req.params.childId;
    req.body.eventInfo = parseEventInfo(req.body);
    
    const { errors, isValid } = ValidateEventInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let eventDetail; 
    switch (req.body.eventType) {
      case 'sleep':
        eventDetail = new Sleep(req.body.eventInfo);
        break;
    
      case 'feed':
        eventDetail = new Feed(req.body.eventInfo);
        break;
    
      case 'change':
        eventDetail = new Change(req.body.eventInfo);
        break;
    
      default:
        break;
    }
    console.log(eventDetail.startTime);
    eventDetail.save()
      .then(eventDetail => {
        
        const event = new Event({
          eventType: req.body.eventType,
          startTime: eventDetail.startTime,
          eventDetails: eventDetail._id,
          recorder: req.body.recorder,
          child: req.body.child
        })
    
        event.save()
          .then(event => {
            
            Event.findOne({ _id: event._id })
              .populate('eventDetails')
              .populate('recorder', ['fName', 'lName', '_id', 'email'])
              .then(event => res.json(event))
          })
          .catch(err => res.status(400).json(err))
      })
      .catch(err => res.status(400).json(err))
  }
);

router.delete('/:id',(req,res) => {
  Event.findById(req.params.id)
    .then(event => {
      switch (event.eventType) {
        case 'sleep':
          eventDetail = Sleep.deleteOne({ _id: event.eventDetails });
          break;

        case 'feed':
          eventDetail = Feed.deleteOne({ _id: event.eventDetails });
          break;

        case 'change':
          eventDetail = Change.deleteOne({ _id: event.eventDetails });
          break;

        default:
          break;
      }

      eventDetail.then(() => {
        Event.deleteOne({_id: event._id})
          .then(() => {
            return res.json(event)
          })
      })
    })
    .catch((err) => res.status(400).json(err))
})

module.exports = router;