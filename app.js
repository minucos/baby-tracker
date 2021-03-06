const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = process.env.mongoURI ? process.env.mongoURI : require('./config/keys').mongoURI;
const passport = require('passport')
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const events = require('./routes/api/events');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
};

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Gday mate')
});

app.use('/api/users', users);
app.use('/api/events', events);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
