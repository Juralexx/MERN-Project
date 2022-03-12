import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'

export const addMemberToProject = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: { members: { member: req.body.member } }
            },
            { new: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.member },
            {
                $addToSet: { current_projects: req.params.id }
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

export const removeMemberFromProject = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { members: { id: req.body.memberId } }
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

/************************************************************************************************/
/**************************************** NOTIFICATIONS *****************************************/

export const sendMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    member_requests: req.body.memberId
                }
            },
            { news: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.memberId },
            {
                $addToSet: {
                    notifications: {
                        id: req.params.id,
                        type: req.body.type,
                        who: req.body.who,
                        date: new Date().toISOString()
                    }
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
                    member_requests: req.body.userId
                },
            },
            { new: true, upsert: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    notifications: {
                        type: req.body.type,
                        id: req.params.id,
                    }
                },
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
                    member_requests: req.body.userId
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
                    member_requests: req.body.userId
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