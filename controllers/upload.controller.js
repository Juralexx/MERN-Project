import UserModel from '../models/user.model.js'
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline);
import { uploadErrors } from "../utils/error.utils.js"

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const uploadProfilPicture = async (req, res) => {
    try {
        if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 5000000) {
            throw Error("max size");
        }
    }
    catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ message: errors });
    }

    const fileName = req.body.userId + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../views/public/uploads/profil/${fileName}`
        )
    );

    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

export const deleteProfilPicture = async (req, res) => {
    req.params.id

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { picture: "./img/random-user.png" } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                else {
                    return res.status(500).send({ message: err });
                }
            }
        );

        fs.unlinkSync(`${__dirname}/../views/public/uploads/profil/${req.params.id}.jpg`)
        console.log('coucou')

    } catch (err) {
        return res.status(400).send({ message: err });
    }
};

export const uploadCoverPicture = async (req, res) => {
    try {
        if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 5000000) {
            throw Error("max size");
        }
    }
    catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ message: errors });
    }

    const fileName = req.body.userId + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../views/public/uploads/cover/${fileName}`
        )
    );

    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { coverPicture: "./uploads/cover/" + fileName } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

export const deleteCoverPicture = async (req, res) => {
    req.params.id

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { coverPicture: "./img/random-cover.jpg" } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                else {
                    return res.status(500).send({ message: err });
                }
            }
        );

        fs.unlinkSync(`${__dirname}/../views/public/uploads/cover/${req.params.id}.jpg`)
        console.log('coucou')

    } catch (err) {
        return res.status(400).send({ message: err });
    }
};