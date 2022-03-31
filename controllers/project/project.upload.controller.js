import ProjectModel from '../../models/project.model.js'
import fs, { readdirSync, rename } from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadPictures = async (req, res) => {
    const __directory = `${__dirname}/../../views/public/uploads/projects/${req.params.id}`
    let pictures = []

    if (req.files) {
        if (!fs.existsSync(__directory)) { fs.mkdirSync(__directory, { recursive: true }) }

        req.files.map(async (file, key) => {
            const fileName = `${req.params.id}-${key}.jpg`;
            pictures.push(`/uploads/projects/${req.params.id}/${fileName}`)
            await pipeline(
                file.stream,
                fs.createWriteStream(`${__directory}/${fileName}`)
            )
        })
    }

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

export const updatePictures = async (req, res) => {
    const __directory = `${__dirname}/../../views/public/uploads/projects/${req.params.id}`
    let pictures = []

    if (req.files) {
        if (!fs.existsSync(__directory)) { fs.mkdirSync(__directory, { recursive: true }) }

        const files = readdirSync(__directory);
        pictures = files.concat(req.files)

        pictures.map(async (file, key) => {
            const fileName = `${req.params.id}-${key}.jpg`;
            pictures.push(`/uploads/projects/${req.params.id}/${fileName}`)
            await pipeline(
                file.stream,
                fs.createWriteStream(`${__directory}/${fileName}`)
            )
        })
    }

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

export const deletePictures = async (req, res) => {
    const __directory = `${__dirname}/../../views/public/uploads/projects/${req.params.id}`
    let pictures = []

    if (!fs.existsSync(__directory)) { fs.mkdirSync(__directory, { recursive: true }) }

    const path = `${__directory}/${req.body.picture}`
    const files = readdirSync(__directory);

    fs.unlink(path, err => {
        if (err) { console.error(err) }
        else {
            files.map(async (file, key) => {
                const fileName = `${req.params.id}-${key}.jpg`;
                pictures.push(`/uploads/projects/${req.params.id}/${fileName}`)
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