const router = require("express").Router();
const Event = require("../models/Event")

// get all events
router.get("/", (req, res, next) => {
  Event.find().populate('creator')
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => next(err))
});


// create new event
router.post("/", (req, res, next) => {
  const { title, date, time, location, description, guestList, privateSetting, creator } = req.body;
  Event.create({ title, date, time, location, description, guestList: guestList.split(','), privateSetting, creator })
    .then(createdEvent => {
      res.status(201).json(createdEvent)
    })
    .catch(err => next(err))
})

// get a specific event
router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Event.findById(id).populate('creator')
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => next(err))
});

// update a specific event
router.put("/:id", (req, res, next) => {
  const { id } = req.params
  const { title, date, time, location, description, guestList, privateSetting } = req.body
  Event.findByIdAndUpdate(id,
    {
      title,
      date,
      time,
      location,
      description,
      guestList: guestList.split(','),
      privateSetting
    }, { new: true })
    .then(updatedEvent => {
      res.status(200).json(updatedEvent)
    })
    .catch(err => next(err))
})

//  delete a specific event
router.delete("/:id", (req, res, next) => {
  const { id } = req.params
  Event.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "event deleted" })
    })
    .catch(err => next(err))
})


module.exports = router;
