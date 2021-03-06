const router = require("express").Router();
const Event = require("../models/Event")
const User = require("../models/User")

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
  if (req.payload) {
    Event.create({ title, date, time, location, description, guestList: guestList.split(','), privateSetting, creator: req.payload._id })
      .then(createdEvent => {
        console.log(createdEvent);
        res.status(201).json(createdEvent)
      })
      .catch(err => next(err))
  }
})


// get a specific event
router.get("/:id", (req, res, next) => {
  const { id } = req.params
  console.log("req", req.payload._id);
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
    .then(delEvent => {
      res.status(200).json({ message: "event deleted" })
      return delEvent
    }).then(delEvent => {
      User.updateMany({ $in: { favList: delEvent._id } }, { $pull: { favList: delEvent._id } })
        .then(res => res.status(200).json('event has been deleted'))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

// update a guest-list
router.put("/:id/update/going-list", (req, res, next) => {
  const { id } = req.params
  Event.findById(id)
    .then(event => {
      console.log(res)
      if (!event.goingList.includes(req.body.currentUserName)) {
        event.updateOne({ $push: { goingList: req.body.currentUserName } })
          .then(() => {
            res.status(200).json("user has been added event's going-list")
          })
          .catch(err => next(err))
      } else {
        res.status(403).json('user is already in going-list')
      }
    })
    .catch(err => next(err))
})



module.exports = router;
