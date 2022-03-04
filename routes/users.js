const router = require("express").Router();
const User = require('../models/User')


// get a user

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            const { name, following, followers } = user
            user = { name, following, followers }
            res.status(200).json(user)
        }
        )
        .catch(err => next(err))
})

//  follow a user
router.put('/:id/follow', (req, res, next) => {
    const { id } = req.params
    console.log('id', id)
    console.log('res body', req.body._Id)
    if (req.body.userId !== req.params.id) {

        User.findById(req.params.id)
            .then(user => {
                if (!user.followers.includes(req.body.userId)) {
                    user.updateOne({ $push: { followers: req.body.userId } })
                        .then(() => res.status(200).json("user has been followed"))
                    User.findById(req.body.userId).then(currentUser =>
                        currentUser.updateOne({ $push: { following: req.params.id } })
                            .then(updatedCurrentUser => res.status(201).json(updatedCurrentUser))
                    )
                } else {
                    res.status(403).json("you already follow this user")
                }
            }
            )
    } else {
        res.status(403).json("you can't follow yourself")
    }
})
// unfollow a user
router.put('/:id/unfollow', (req, res, next) => {
    const { id } = req.params
    console.log('id', id)
    console.log('res body', req.body._Id)
    if (req.body.userId !== req.params.id) {

        User.findById(req.params.id)
            .then(user => {
                if (user.followers.includes(req.body.userId)) {
                    user.updateOne({ $pull: { followers: req.body.userId } })
                        .then(() => res.status(200).json("user has been unfollowed"))
                    User.findById(req.body.userId).then(currentUser =>
                        currentUser.updateOne({ $pull: { following: req.params.id } })
                            .then(updatedCurrentUser => res.status(201).json(updatedCurrentUser))
                            .next(err => next(err))
                    )
                        .next(err => next(err))
                } else {
                    res.status(403).json("you already unfollowed this user")
                }
            }
            )
    } else {
        res.status(403).json("you can't follow yourself")
    }
})


module.exports = router;
