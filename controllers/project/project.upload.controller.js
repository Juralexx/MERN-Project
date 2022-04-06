import ProjectModel from '../../models/project.model.js'
import fs, { readdirSync } from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'

/**********************************************************************************************************************/
/****************************************************** UPLOAD ********************************************************/

export const uploadPictures = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/projects/${req.params.id}`
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

/**********************************************************************************************************************/
/****************************************************** UPDATE ********************************************************/

export const updatePictures = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/projects/${req.params.id}`
    let pics = []
    let done = 0

    if (req.files) {
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        const folder = readdirSync(__directory)
        let files = folder.concat(req.files)

        files.map(async (file, key) => {
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
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { pictures: pictures } },
            { new: true, upsert: true }
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

/**********************************************************************************************************************/
/****************************************************** DELETE ********************************************************/

export const deletePictures = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/projects/${req.params.id}`
    let pictures = []

    if (!fs.existsSync(__directory)) {
        fs.mkdirSync(__directory, { recursive: true })
    }

    const path = `${__directory}/${req.body.picture}`
    const files = readdirSync(__directory);

    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
        } else {
            files.map(async (file, key) => {
                const fileName = `${req.params.id}-${key}.jpg`;
                pics.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/${fileName}`)
                await pipeline(
                    file.stream,
                    fs.createWriteStream(`${__directory}/${fileName}`)
                )
            })
        }
    })

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: { pictures: pictures }
            },
            { new: true, upsert: true }
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}