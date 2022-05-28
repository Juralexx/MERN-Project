import ConversationModel from '../../models/conversation.model.js';
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline);
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import sharp from 'sharp'

/**
 * Upload conversation picture
 */

export const uploadConversationPicture = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}`

    if (!fs.existsSync(__directory)) {
        fs.mkdirSync(__directory, { recursive: true })
    }

    const fileName = `${process.env.SERVER_URL}/uploads/conversations/${req.params.id}/${req.params.id}.jpg`;

    new Promise(async () => {
        await pipeline(
            req.file.stream,
            fs.createWriteStream(`${__directory}/${req.file.originalName}`)
        )
            .then(() => {
                sharp(`${__directory}/${req.file.originalName}`)
                    .withMetadata()
                    .jpeg({ mozjpeg: true, quality: 50 })
                    .toFile(`${__directory}/${req.params.id}.jpg`, (err) => {
                        if (err) {
                            console.error(err)
                        } else {
                            fs.unlink(`${__directory}/${req.file.originalName}`, (err) => {
                                if (err) console.error(err)
                            })
                        }
                    })
            })
    })

    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { picture: fileName } },
            { new: true, upsert: true }
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}

/**
 * Delete conversation picture
 */

export const deleteConversationPicture = (req, res) => {
    const __directory = `${__dirname}/../../uploads/conversations/${req.params.id}`

    fs.unlinkSync(`${__directory}/${req.params.id}.jpg`)

    try {
        ConversationModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    picture: ""
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
            .then(docs => { res.send(docs) })
            .catch(err => { return res.status(500).send({ message: err }) })

    } catch (err) {
        return res.status(400).send({ message: err });
    }
}