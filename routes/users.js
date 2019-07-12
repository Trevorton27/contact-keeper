const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//@route POST api/users
//@desc register a user
//@access Public

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with a minimum of 6 characters').isLength({ min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email});

        if(user) {
          return res.status(400).json({ msg: 'User already exists'})
        }
    } catch (err) {

    }

  }

);

/*
User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});*/


module.exports = router;