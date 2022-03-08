const router = require("express").Router();
const Message = require('../models/Message');

// create/add new message 

router.post('/', async (req, res, next) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage);
    }
    catch (err) {
        next(err)
    }
})


// fetching all messages of a specific convo

router.get('/:conversationId', async (req, res, next) => {
    try {
        const { id } = req.params.conversationId
        const messages = await Message.find(id);
        res.status(200).json(messages)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;