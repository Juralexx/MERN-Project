import ProjectModel from '../../models/project.model.js'
import mongoose from 'mongoose'
import fs, { readdirSync } from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'
const ObjectID = mongoose.Types.ObjectId

/**
 * Create new actuality.
 */

export const createActuality = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    actualities: req.body.actuality,
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Update actuality.
 */

export const updateActuality = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                actualities: { $elemMatch: { _id: req.body.actualityId } }
            },
            {
                $set: {
                    "actualities.$.title": req.body.title,
                    "actualities.$.url": req.body.url,
                    "actualities.$.description": req.body.description
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Delete actuality.
 */

export const deleteActuality = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    actualities: { _id: req.body.actualityId }
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Upload actuality pictures.
 */

export const uploadActualityPictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    let pics = []
    let done = 0

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        req.files.map((file, key) => {
            const fileName = `${req.params.actualityId}-${key}.jpg`;
            pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${fileName}`)
            new Promise(async () => {
                await pipeline(
                    file.stream,
                    fs.createWriteStream(`${__directory}/${file.originalName}`)
                ).then(() => {
                    sharp(`${__directory}/${file.originalName}`)
                        .withMetadata()
                        .jpeg({ mozjpeg: true, quality: 50 })
                        .toFile(`${__directory}/${fileName}`, (err) => {
                            if (err) {
                                console.error(err)
                            } else {
                                done++
                                if (done === req.files.length) {
                                    req.files.map((file, key) => {
                                        fs.unlink(`${__directory}/${file.originalName}`, (err) => {
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
        })

        try {
            await ProjectModel.updateOne(
                {
                    _id: req.params.id,
                    actualities: { $elemMatch: { _id: req.params.actualityId } }
                },
                {
                    $set: {
                        "actualities.$.pictures": pics
                    }
                },
                { new: true },
            )
                .then(docs => { res.send(docs) })
                .catch(err => { return res.status(500).send({ message: err }) })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    }
}

/**
 * Update actuality pictures.
 */

export const updateActualityPictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    let pics = []

    if (req.files) {
        let i = 0
        if (!fs.existsSync(__directory)) fs.mkdirSync(__directory, { recursive: true })

        const upload = req.files.map(async file => {
            i++
            await pipeline(
                file.stream,
                fs.createWriteStream(`${__directory}/${file.originalName}`)
            ).then(async () => {
                await sharp(`${__directory}/${file.originalName}`)
                    .withMetadata()
                    .jpeg({ mozjpeg: true, quality: 50 })
                    .toFile(`${__directory}/${file.originalName}.jpg`)
                    .then(() => {
                        fs.unlink(`${__directory}/${file.originalName}`, (err) => {
                            if (err) {
                                console.error(err)
                            }
                        })
                    })
            })
        })

        Promise.all(upload).then(() => {
            if (i === req.files.length) {
                const folder = readdirSync(__directory)
                folder.map((file, key) => {
                    pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${req.params.actualityId}-${key}.jpg`)
                    fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.actualityId}-${key}.jpg`, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                })

                try {
                    ProjectModel.updateOne(
                        {
                            _id: req.params.id,
                            actualities: { $elemMatch: { _id: req.params.actualityId } }
                        },
                        {
                            $set: {
                                "actualities.$.pictures": pics
                            },
                            $addToSet: {
                                activity_feed: req.body.activity
                            }
                        },
                        { new: true, upsert: true },
                    )
                        .then(docs => { res.send(docs) })
                        .catch(err => { return res.status(400).send({ message: err }) })
                } catch (err) {
                    return res.status(400).send({ message: err })
                }
            }
        })
    }
}

/**
 * Delete actuality pictures.
 */

export const deleteActualityPictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    let pics = []

    if (!fs.existsSync(__directory))
        fs.mkdirSync(__directory, { recursive: true })

    const promise = req.body.deletedFiles.map(filename => {
        let path = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${filename}`
        fs.promises.unlink(path, (err) => {
            if (err) {
                console.error(err)
            }
        })
    })

    Promise.all(promise).then(() => {
        const folder = readdirSync(__directory);
        folder.map((file, key) => {
            const fileName = `${req.params.actualityId}-${key}.jpg`;
            pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${fileName}`)
            fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.actualityId}-${key}.jpg`, (err) => {
                if (err) {
                    throw err
                }
            })
        })
    }).then(async () => {
        console.log('coucou')
        try {
            await ProjectModel.updateOne(
                {
                    _id: req.params.id,
                    actualities: { $elemMatch: { _id: req.params.actualityId } }
                },
                {
                    $set: {
                        "actualities.$.pictures": pics
                    },
                    $addToSet: {
                        activity_feed: req.body.activity
                    }
                },
                { new: true, upsert: true },
            )
                .then(docs => { res.send(docs) })
                .catch(err => { return res.status(500).send({ message: err }) })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    })
}