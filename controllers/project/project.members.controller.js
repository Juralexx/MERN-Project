import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'

/************************************************************************************************/
/**************************************** NOTIFICATIONS *****************************************/

export const sendMemberRequest = async (req, res) => {
    // const notification = Object.assign(req.body.notification, { _id: new ObjectID })
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    member_requests: req.body.request
                }
            },
            { news: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    notifications: req.body.notification
                },
                $inc: { unseen_notifications: 1 }
            },
            { news: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const cancelMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_requests: {
                        memberId: req.body.userId
                    }
                },
            },
            { new: true, upsert: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: {
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/************************************************************************************************/
/**************************** ACCEPTER / REFUSER DEMANDE D'ADHESION *****************************/

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
                    member_requests: {
                        memberId: req.body.userId
                    }
                },
            },
            { new: true, upsert: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    current_projects: req.params.id
                },
                $pull: {
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const refuseMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_requests: {
                        memberId: req.body.userId
                    }
                },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.updateOne(
            { _id: req.body.userId },
            {
                $pull: {
                    notifications: {
                        _id: req.body.notificationId
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
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
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
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
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
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
            { new: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.memberId },
            {
                $pull: { current_projects: req.params.id }
            },
            { news: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}