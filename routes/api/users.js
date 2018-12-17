const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const validateRegisterInput  = require('../../validation/register');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req,res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }else{
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;