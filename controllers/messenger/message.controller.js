import mongoose from 'mongoose';
import ConversationModel from '../../models/conversation.model.js';
const ObjectID = mongoose.Types.ObjectId

/**
 * Post new message
 */

export const addMessage = async (req, res) => {
    const newMessage = Object.assign(req.body.message, { _id: new ObjectID })

    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    messages: newMessage
                },
                $set: {
                    last_message: newMessage._id
                },
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
        res.status(200).json(newMessage)
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Update message
 */

export const updateMessage = async (req, res) => {
    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                messages: { $elemMatch: { _id: req.body.messageId } }
            },
            {
                $set: {
                    "messages.$.text": req.body.text,
                },
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Delete message
 */

export const deleteMessage = async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    messages: req.body.messageId
                },
            },
            { new: true, upsert: true },
        )
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Add emoji to message
 */

 export const addEmoji = async (req, res) => {
    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                messages: { $elemMatch: { _id: req.body.messageId } }
            },
            {
                $addToSet: {
                    "messages.$.emojis": req.body.emoji
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Remove emoji from message
 */

export const removeEmoji = async (req, res) => {
    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                messages: { $elemMatch: { _id: req.body.messageId } }
            },
            {
                $pull: {
                    "messages.$.emojis": req.body.emoji
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
}