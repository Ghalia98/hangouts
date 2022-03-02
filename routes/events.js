const router = require("express").Router();
const Event = require("../models/Event")

// Get all events
router.get("/", (req, res, next) => {
  Event.find()
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => next(err))
});


// Create new event
router.post("/", (req, res, next) => {
  const { title, date, location, description, guestList } = req.body;
  Event.create({ title, date, location, description, guestList: guestList.split(' ') })
    .then(createdEvent => {
      res.status(201).json(createdEvent)
    })
    .catch(err => next(err))
})

// get a specific event
router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Event.findById(id)
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => next(err))
});

// update a specific event
router.put("/:id", (req, res, next) => {
  const { id } = req.params
  const { title, date, location, description, guestList } = req.body
  Event.findByIdAndUpdate(id,
    {
      title,
      date,
      location,
      description,
      guestList: guestList.split(' ')
    }, { new: true })
    .then(updatedEvent => {
      res.status(200).json(updatedEvent)
    })
    .catch(err => next(err))
})



// example: router.use("/auth", authRoutes)

module.exports = router;
