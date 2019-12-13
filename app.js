const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.log(err));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', (req, res) => res.send('Gday mate'));