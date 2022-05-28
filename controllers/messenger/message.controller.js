import ConversationModel from '../../models/conversation.model.js';
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Get message
 */

export const getMessage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    ConversationModel.findOne({ _id: req.params.id },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select({ messages: { $elemMatch: { _id: req.params.messageId } } })
}

/**
 * Post new message
 */

export const addMessage = async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    messages: req.body.message
                },
                $set: {
                    last_message: req.body.message._id
                },
            },
            { new: true },
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
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
                    "messages.$.modified": true
                },
            },
            { new: true },
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Delete message
 */

export const deleteMessage = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}/${req.params.messageId}`

    if (fs.existsSync(__directory)) {
        fs.unlink(`${__directory}`, err => console.log(err))
    }

    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    messages: {
                        _id: req.body.messageId
                    },
                    files: {
                        messageId: req.params.messageId
                    },
                },
            },
            { new: true },
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
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
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
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
                    "messages.$.emojis": {
                        _id: req.body.emojiId
                    }
                }
            },
            { new: true },
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
}