import ConversationModel from '../../models/conversation.model.js';
import fs from 'fs'
import { createGzip } from 'zlib'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'

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
 * Upload files
 */

export const uploadFiles = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}/${req.params.messageId}`
    let files = []
    let done = 0

    console.log(req.files)

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        req.files.map((file, key) => {
            console.log(file.detectedMimeType)
            const fileName = file.originalName;
            const temporaryName = req.params.messageId + '-' + key

            if (file.detectedMimeType.includes('image')) {
                files.push({
                    type: 'image',
                    name: fileName,
                    url: `${process.env.SERVER_URL}/uploads/conversations/${req.params.id}/${req.params.messageId}/${fileName}`
                })
                new Promise(async () => {
                    await pipeline(
                        file.stream,
                        fs.createWriteStream(`${__directory}/${temporaryName}`)
                    ).then(() => {
                        sharp(`${__directory}/${temporaryName}`)
                            .withMetadata()
                            .toFile(`${__directory}/${fileName}`, (err) => {
                                if (err) {
                                    console.error(err)
                                } else {
                                    done++
                                    if (done === req.files.length) {
                                        req.files.map(file => {
                                            fs.unlink(`${__directory}/${temporaryName}`, (err) => {
                                                if (err) {
                                                    console.error(err)
                                                }
                                            })
                                        })
                                    }
                                }
                            })
                    })
                })
            } else {
                files.push({
                    type: 'file',
                    name: fileName,
                    url: `${process.env.SERVER_URL}/uploads/conversations/${req.params.id}/${req.params.messageId}/${fileName}`
                })
                new Promise(async () => {
                    await pipeline(
                        file.stream,
                        fs.createWriteStream(`${__directory}/${fileName}`)
                    )
                })
            }
        })
    }

    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                messages: { $elemMatch: { _id: req.params.messageId } }
            },
            {
                $set: {
                    "messages.$.files": files
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
                    }
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