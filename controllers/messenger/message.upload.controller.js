import ConversationModel from '../../models/conversation.model.js';
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'

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

        let filesArr = req.files.map(file => {
            return {
                name: file.originalName, 
                type: file.detectedMimeType || file.clientReportedMimeType
            }
        })

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
                    _id: req.params.messageId + key,
                    type: filesArr[key].type,
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
            } else if (filesArr[key].type.includes('video')) {
                files.push({
                    _id: req.params.messageId + key,
                    type: filesArr[key].type,
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
            } else {
                files.push({
                    _id: req.params.messageId + key,
                    type: filesArr[key].type,
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
            .then(docs => { res.status(200).json({ files }) })
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
            throw err
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