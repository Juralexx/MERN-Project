import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'

/**
 * Send a member request
 * @param {*} id Project ID
 * @param {*} userId User ID to send request to
 * @param {*} request Request object
 */

export const sendMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    member_request_sent: req.body.request
                }
            },
            {
                new: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    member_request: req.body.request,
                    notifications: req.body.notification
                },
                $inc: {
                    unseen_notifications: 1
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
 * Cancel a member request
 * @param {*} id Project ID
 * @param {*} userId User ID to cancel request from
 * @param {*} requestId Request ID
 */

export const cancelMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )
        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    },
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: {
                    unseen_notifications: -1
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
        return res.status(500).json({ message: err })
    }
}

/**
 * Accept a member request
 * @param {*} id Project ID
 * @param {*} requestId Request ID
 * @param {*} userId User ID that accepts request
 * @param {*} member Member to add
 */

export const acceptMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    members: req.body.member,
                    activity_feed: req.body.activity,
                },
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )
        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    projects: req.params.id
                },
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    },
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: {
                    unseen_notifications: -1
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
        return res.status(500).json({ message: err })
    }
}

/**
 * Accept a member request
 * @param {*} id Project ID
 * @param {*} requestId Request ID
 * @param {*} userId User ID that accepts request
 */

export const refuseMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )
        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    },
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: {
                    unseen_notifications: -1
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
        return res.status(500).json({ message: err })
    }
}

/************************************************************************************************/
/************************************ NOMMER / RETIRER ADMIN ************************************/

export const nameAdmin = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                members: { $elemMatch: { id: req.body.userId } }
            },
            {
                $addToSet: {
                    admins: req.body.userId
                },
                $set: {
                    "members.$.role": "admin",
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
        return res.status(500).json({ message: err })
    }
}

export const removeAdmin = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                members: { $elemMatch: { id: req.body.userId } }
            },
            {
                $pull: {
                    admins: req.body.userId
                },
                $set: {
                    "members.$.role": "user",
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

/************************************************************************************************/
/**************************************** LEAVE PROJECT *****************************************/

export const leaveProject = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    members: { id: req.body.memberId },
                    admins: req.body.userId
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            {
                new: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.memberId },
            {
                $pull: { projects: req.params.id }
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