import ConversationModel from '../../models/conversation.model.js';
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId
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
 * Get message
 */

export const getMessage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    ConversationModel.find({
        _id: req.params.id,
        messages: { $elemMatch: { _id: req.params.messageId } }
    },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
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
 * Upload files
 */

export const uploadFiles = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}/${req.params.messageId}`
    let files = []
    let done = 0

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        let fileNamesAndTypes = req.files.map(file => { return { name: file.originalName, type: file.detectedMimeType || file.clientReportedMimeType } })

        if (req.files.length > 1) {
            fileNamesAndTypes.forEach((file, key) => {
                if (key > 0 && fileNamesAndTypes.some(f => f.type === file.type) && fileNamesAndTypes.some(f => f.name === file.name)) {
                    fileNamesAndTypes[key].name = file.name + "-" + key
                }
            })
        }

        req.files.map((file, key) => {
            let fileName = fileNamesAndTypes[key].name;
            const temporaryName = req.params.messageId + '-' + key + (file.detectedFileExtension || '.jpg')

            if (fileNamesAndTypes[key].type.includes('image')) {
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
                                    fs.unlink(`${__directory}/${temporaryName}`, (err) => {
                                        if (err) {
                                            console.error(err)
                                        }
                                    })
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
                $addToSet: {
                    files: files
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
 * Delete files
 */

export const deleteFiles = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}/${req.params.messageId}`

    fs.unlink(`${__directory}/${req.body.file.name}`, (err) => {
        if (err) {
            console.error(err)
        }
    })

    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                messages: { $elemMatch: { _id: req.params.messageId } }
            },
            {
                $pull: {
                    "messages.$.files": req.body.file.url
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