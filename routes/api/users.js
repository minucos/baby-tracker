const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const children = require('./children');
const BCrypt = require("bcryptjs");
const keys = process.env.secretOrKey ? process.env.secretOrKey : require('../../config/keys');
const jwt = require("jsonwebtoken");
const validateRegistration = require('../../validation/register');
const validateLogin = require('../../validation/login');

router.get('/test', (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email is already registered" });
      } else {
        const newUser = new User({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          password: req.body.password
        });

        BCrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          BCrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = {
                  id: user.id,
                  fName: user.fName,
                  lName: user.lName,
                  email: user.email,
                }
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: '365d'},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  }
                )
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "Email or Password is invalid" });
      }

      BCrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              fName: user.fName,
              lName: user.lName,
              children: user.children
            };
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: '365d' },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            res.status(404).json({ message: "Email or Password is invalid" });
          }
        })
    })
});

router.use('/:userId/children', children);

module.exports = router;