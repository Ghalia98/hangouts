const router = require("express").Router();
const Event = require("../models/Event")



router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// Create new event
router.post("/", (req, res, next) => {
  const { title, date, location, description, guestList } = req.body;
  Event.create({ title, date, location, description, guestList: guestList.split(', ') })
    .then(createdEvent => {
      res.status(201).json(createdEvent)
    })
    .catch(err => next(err))
})

// example: router.use("/auth", authRoutes)

module.exports = router;
