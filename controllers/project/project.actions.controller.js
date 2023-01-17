import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/**
 * Like projet function
 * @param {*} id (params) ID for the project to like
 * @param {*} userId ID of the user that likes
 */

export const like = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    likers: req.body.userId
                }
            },
            {
                new: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    liked: req.params.id
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Unlike projet function
 * @param {*} id (params) ID for the project to unlike
 * @param {*} userId ID of the user that unlikes
 */

export const unlike = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    likers: req.body.userId
                }
            },
            {
                new: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    liked: req.params.id
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Follow projet function
 * @param {*} id (params) ID for the project to follow
 * @param {*} userId ID of the user that follows
 */

export const follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    followers: req.body.userId
                }
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    followed: req.params.id
                }
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/**
 * Unfollow projet function
 * @param {*} id (params) ID for the project to unfollow
 * @param {*} userId ID of the user that unfollows
 */

export const unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    followers: req.body.userId
                }
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    followed: req.params.id
                }
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/**
 * Add to favorites projet function
 * @param {*} id (params) ID for the project to add to favorite
 * @param {*} userId ID of the user that adds projet to favorites
 */

export const favorite = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    favorites: req.body.userId
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    favorites: req.params.id
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/**
 * Remove from favorites projet function
 * @param {*} id (params) ID for the project to remove from favorite
 * @param {*} userId ID of the user that removes projet from favorites
 */

export const unfavorite = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    favorites: req.body.userId
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    favorites: req.params.id
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}