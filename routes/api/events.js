const express = require("express");
const router = express.Router();
const passport = require('passport');
const ValidateEventInputs = require('../../validation/event');
const Event = require('../../models/Event')
const Change = require('../../models/Change');
const Feed = require('../../models/Feed');
const Sleep = require('../../models/Sleep');

router.get('/test', (req, res) => res.json({ msg: "This is the events route" }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Event.find({ carers: req.params.childId })
      .populate('recorder', ['fName', 'lName', '_id', 'email'])
      .populate('eventDetails')
      .then(events => {
        if (events) {
          return res.json(events);
        }
      })
      .catch(err => res.status(400).json(err));
  }
)

router.post(
  '/',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.body.recorder = req.params.userId;
    const { errors, isValid } = ValidateEventInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const event = new Event({
      eventType: req.body.eventType,
      eventDetails: req.body.eventDetails,
      recorder: req.body.recorder
    })

    event.save()
      .then(event => res.json(event))
      .catch(err => res.status(400).json(err))
  }
);

module.exports = router;