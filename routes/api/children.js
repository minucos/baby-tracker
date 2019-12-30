const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require('passport');
const ValidateChildInputs = require('../../validation/child');
const Child = require('../../models/Child');
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ msg: "This is the children route" }));

router.get('/:id', (req,res) => {
  Child.findById(req.params.id)
    .then(child => res.json(child))
    .catch(err => res.status(400).json(err))
});

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req,res) => {
    const children = Child.find({ parent: req.params.userId });

    return res.json(children)
  }
);

router.post(
  '/', 
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    req.body.parentId = req.params.userId;
    const { errors, isValid } = ValidateChildInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const child = new Child({
      name: req.body.name,
      dob: req.body.dob,
      sex: req.body.sex,
      parents: [req.body.parentId]
    })

    child.save()
      .then(child => res.json(child))
      .catch(err => res.status(400).json(err))
  }
)

module.exports = router;