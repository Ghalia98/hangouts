const router = require("express").Router();
const { rawListeners } = require("../models/User");
const User = require('../models/User')


// get a user

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    User.findById(id, { following: 1, followers: 1, _id: 1, name: 1, favList: 1 })
        .then(user => {
            res.status(200).json(user)
        }
        )
        .catch(err => next(err))
})

// follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json({ message: "user has been followed", followers: user.followers.length });
            } else {
                res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json({ message: "user has been unfollowed", followers: user.followers.length });
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});

// add event to fav-list
router.put("/:id/update/fav-list", (req, res, next) => {
    const eventId = req.params.id
    const userId = req.body.userId
    User.findById(userId)
        .then(user => {
            console.log(res)
            if (!user.favList.includes(eventId)) {
                user.updateOne({ $push: { favList: eventId } })
                    .then(() => {
                        res.status(200).json("event has been added to user's fav-list")
                    })
                    .catch(err => next(err))
            } else {
                res.status(403).json("event is already in user's fav-list")
            }
        })
        .catch(err => next(err))
})

// remove event from a user's fav list 
router.delete("/:id/update/fav-list", (req, res, next) => {
    const eventId = req.params.id
    const userId = req.body.userId
    User.findById(userId)
        .then(user => {
            console.log(res)
            if (user.favList.includes(eventId)) {
                user.updateOne({ $pull: { favList: eventId } })
                    .then(() => {
                        res.status(200).json("event has been removed from user's fav-list")
                    })
                    .catch(err => next(err))
            } else {
                res.status(403).json("event is already removed from user's fav-list")
            }
        })
        .catch(err => next(err))
})
module.exports = router;
