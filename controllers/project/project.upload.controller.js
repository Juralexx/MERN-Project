import ProjectModel from '../../models/project.model.js'
import fs, { readdirSync } from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'

/**
 * Upload pictures to folder.
 */

export const uploadPictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}`
    let pics = []
    let done = 0

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        req.files.map((file, key) => {
            const fileName = `${req.params.id}-${key}.jpg`;
            pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/${fileName}`)
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
            await ProjectModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { pictures: pics } },
                { new: true }
            )
                .then(docs => { res.send(docs) })
                .catch(err => { return res.status(500).send({ message: err }) })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    }
}

/**
 * Update pictures in folder.
 */

export const updatePictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/`
    let pics = []

    if (req.files) {
        let i = 0
        if (!fs.existsSync(__directory)) fs.mkdirSync(__directory, { recursive: true })

        const upload = req.files.map(async (file, key) => {
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
                    pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/${req.params.id}-${key}.jpg`)
                    fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.id}-${key}.jpg`, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                })

                try {
                    ProjectModel.findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: { pictures: pics } },
                        { new: true, upsert: true }
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
 * Delete pictures in folder.
 */

export const deletePictures = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/`
    let pics = []

    if (!fs.existsSync(__directory))
        fs.mkdirSync(__directory, { recursive: true })

    const path = `${__directory}/${req.body.picture.substring(63, 94)}`

    fs.promises.unlink(path, (err) => {
        if (err) {
            console.error(err)
        }
    }).then(() => {
        const folder = readdirSync(__directory);
        folder.map(async (file, key) => {
            const fileName = `${req.params.id}-${key}.jpg`;
            pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/${fileName}`)
            fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.id}-${key}.jpg`, (err) => {
                if (err) {
                    throw err
                }
            })
        })
    }).then(async () => {
        try {
            await ProjectModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { pictures: pics } },
                { new: true, upsert: true }
            )
                .then(docs => { res.send(docs) })
                .catch(err => { return res.status(500).send({ message: err }) })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    })
}