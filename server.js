const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

//DB connection
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;