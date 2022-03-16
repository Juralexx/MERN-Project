import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'

/************************************************************************************************/
/**************************************** NOTIFICATIONS *****************************************/

export const sendMemberRequest = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    notifications: req.body.notification
                },
                $inc: { unseen_notifications: 1 }
            },
            { news: true },
        )

        await ProjectModel.findByIdAndUpdate(
            { _id: req.body.projectId },
            {
                $addToSet: {
                    member_requests: req.body.request
                }
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
                        id: req.body.userId
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
                        type: req.body.type,
                        id: req.params.id,
                    }
                },
                $inc: { unseen_notifications: -1 }
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
/**************************** ACCEPTER / REFUSER DEMANDE D'ADHESION *****************************/

export const acceptMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    members: req.body.member
                },
                $pull: {
                    member_requests: {
                        id: req.body.userId
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
                        type: req.body.type,
                        id: req.params.id,
                    }
                },
                $inc: { unseen_notifications: -1 }
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

export const refuseMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_requests: {
                        id: req.body.userId
                    }
                },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.friendId },
            {
                $pull: {
                    notifications: {
                        type: req.body.type,
                        id: req.params.id,
                    }
                },
                $inc: { unseen_notifications: -1 }
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