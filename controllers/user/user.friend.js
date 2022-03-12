import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/****************************************************************************/
/******************* DEMANDE D'AMI / ANNULER DEMANDE D'AMI ******************/

export const sendFriendRequest = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    friend_request_sent: {
                        friend: req.body.friendId,
                        requestedAt: new Date(),
                    }
                },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.friendId },
            {
                $addToSet: {
                    friend_request: {
                        friend: req.params.id,
                        requestedAt: new Date(),
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

export const cancelSentFriendRequest = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.body.friendId },
            {
                $pull: {
                    friend_request: {
                        friend: req.params.id,
                    }
                },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    friend_request_sent: {
                        friend: req.body.friendId,
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

/****************************************************************************/
/************************ ACCEPTER AMI / REFUSER AMI ************************/

export const acceptFriend = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    friends: {
                        friend: req.body.friendId,
                        requestedAt: new Date(),
                    }
                },
                $pull: {
                    friend_request: {
                        friend: req.body.friendId,
                    }
                },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.friendId },
            {
                $addToSet: {
                    friends: {
                        friend: req.params.id,
                        requestedAt: new Date(),
                    }
                },
                $pull: {
                    friend_request_sent: {
                        friend: req.params.id,
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

export const refuseFriend = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    friend_request: {
                        friend: req.body.friendId
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
                    friend_request_sent: {
                        friend: req.params.id
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

/****************************************************************************/
/****************************** SUPPRIMER AMI *******************************/

export const deleteFriend = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { friends: req.body.userId },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $pull: { friends: req.params.id },
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