import ConversationModel from '../../models/conversation.model.js';
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId
import fs from 'fs'
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
 * Upload files
 */

export const uploadFiles = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}/${req.params.messageId}`
    let files = []

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        let filesArr = req.files.map(file => { return { name: file.originalName, type: file.detectedMimeType || file.clientReportedMimeType } })

        if (req.files.length > 1) {
            req.files.forEach((file, key) => {
                let arr = req.files.slice()
                arr.splice(key, 1)
                if (arr.some(f => f.detectedMimeType === file.detectedMimeType && f.originalName === file.originalName)) {
                    let filename = filesArr[key].name.split('.').slice(0, -1).join('.');
                    let extension = filesArr[key].name.substr(filesArr[key].name.lastIndexOf('.'));
                    filesArr[key].name = filename + "-" + key + extension
                }
            })
        }

        req.files.map((file, key) => {
            let fileName = filesArr[key].name;
            const temporaryName = req.params.messageId + '-' + key + (file.detectedFileExtension || '.jpg')

            if (filesArr[key].type.includes('image')) {
                files.push({
                    _id: key,
                    type: 'image',
                    name: fileName,
                    url: `${process.env.SERVER_URL}/uploads/conversations/${req.params.id}/${req.params.messageId}/${fileName}`,
                    userId: req.params.userId,
                    userPseudo: req.params.userPseudo,
                    date: new Date().toISOString(),
                    messageId: req.params.messageId,
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
                    _id: key,
                    type: 'file',
                    name: fileName,
                    url: `${process.env.SERVER_URL}/uploads/conversations/${req.params.id}/${req.params.messageId}/${fileName}`,
                    userId: req.params.userId,
                    userPseudo: req.params.userPseudo,
                    date: new Date().toISOString(),
                    messageId: req.params.messageId,
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
                    files: {
                        $each: files
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
                    "messages.$.files": {
                        _id: req.body.file._id
                    },
                    files: {
                        _id: req.body.file._id
                    },
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