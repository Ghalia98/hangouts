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
  Event.create({ title, date, location, description, guestList: guestList.split(', ') })
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
// Edit 
// example: router.use("/auth", authRoutes)

module.exports = router;
