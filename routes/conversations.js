const router = require("express").Router();
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// create a new convo

router.post('/', async (req, res, next) => {
    const newConvo = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })

    try {
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo);
    }
    catch (err) {
        err => next(err)
    }
})

// fetch user convo (id of a convo for a specifc user)

router.get("/:userId", async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation);
    }
    catch (err) {
        err => next(err)
    }
})











module.exports = router;