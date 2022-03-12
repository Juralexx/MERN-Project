import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const addConversationToFavorite = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    favorite_conversations: req.body.conversationId
                },
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export const removeConversationFromFavorite = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    favorite_conversations: req.body.conversationId
                },
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const setLastMessageSeen = async (req, res) => {
    try {
        await UserModel.updateOne(
            {
                _id: req.params.id,
                conversations: { $elemMatch: { conversation: req.body.conversationId } },
            },
            { $set: { "conversations.$.last_message_seen": req.body.messageId } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}