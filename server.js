const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const acticles = require('./routes/api/articles');

const app = express();


// Body parser middleware
app.use(express.static(path.join(__dirname, 'client/build')));
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
// app.get('/', (req,res) =>{
//     res.sendFile(path.join(__dirname+'client/build/index.html'));
// });

app.use('/api/users', users);
app.use('/api/articles', acticles);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;