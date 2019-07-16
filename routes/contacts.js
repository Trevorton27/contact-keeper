const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleWare/auth');
const Contact = require('../models/Contact');

//@route GET api/contacts
//@desc Get all users contacts
//@access Private

router.get('/', auth, async (req, res) => {
  
    try {
        const contacts = await Contact.find({user: req.user.id}). sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST api/contacts
//@desc Add new contact
//@access Private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
});

//@route PUT api/contacts/:id
//@desc Add new contact
//@access Private

router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type } = req.body;

    //build contact object
    const contactFileds = {};
    if(name) contactFileds.name = name;
    if(email) contactFileds.email = email;
    if(phone) contactFileds.phone = phone;
    if(type) contactFileds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg: 'Apologies. Contact not found'});
        // Make sure user owns contact
        if(contact.user.toString !== req.user.id) {
            return res.status(401).json({ msg: 'You are not authorized to make changes to this user\`s account'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields},
            {new: true });

            res.json(contact);
    } catch (error) {
        console.error(err.message);
        res.status(500).send(`Server Error`);
    }
});

//@route DELETE api/contacts/:id
//@desc DELETE contact
//@access Private

router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});
module.exports = router;