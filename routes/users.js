const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//@route POST api/users
//@desc register a user
//@access Public

router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;