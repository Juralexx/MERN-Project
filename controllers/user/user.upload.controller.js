import UserModel from '../../models/user.model.js'
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline);
import { uploadErrors } from "../../utils/error.utils.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import sharp from 'sharp'

/**********************************************************************************************************************/
/****************************************************** UPLOAD ********************************************************/

export const uploadProfilPicture = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/users/${req.params.id}`
    try {
        if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") {
            throw Error("invalid file");
        } else if (req.file.size > 1000000) {
            throw Error("max size");
        }
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ message: errors });
    }

    if (!fs.existsSync(__directory)) {
        fs.mkdirSync(__directory, { recursive: true })
    }

    fs.unlink(`${__directory}/${req.params.id}.jpg`, (err) => {
        if (err) console.error(err)
    })

    const fileName = `${process.env.SERVER_URL}/uploads/users/${req.params.id}/${req.params.id}.jpg`;

    new Promise(async () => {
        await pipeline(req.file.stream, fs.createWriteStream(`${__directory}/${req.file.originalName}`))
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
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: { picture: fileName } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(400).send({ message: err });
                }
            }
        )
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}

/**********************************************************************************************************************/
/****************************************************** DELETE ********************************************************/

export const deleteProfilPicture = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/users/${req.params.id}`

    fs.unlinkSync(`${__dirname}/${req.params.id}.jpg`)

    const defaultPic = `${process.env.SERVER_URL}/files/img/random-user.png`

    fs.copyFile(defaultPic, `${__directory}/${req.params.id}.jpg`, (err) => {
        if (err) throw err
    })

    // try {
    //     UserModel.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: { picture: "/img/random-user.png" } },
    //         { new: true, upsert: true, setDefaultsOnInsert: true },
    //         (err, docs) => {
    //             if (!err) {
    //                 return res.send(docs);
    //             } else {
    //                 return res.status(500).send({ message: err });
    //             }
    //         }
    //     )
    // } catch (err) {
    //     return res.status(400).send({ message: err });
    // }
}

/**********************************************************************************************************************/
/************************************************** UPLOAD COVER ******************************************************/

export const uploadCoverPicture = async (req, res) => {
    const __directory = `${__dirname}/../../../uploads/users/${req.params.id}`
    try {
        if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") {
            throw Error("invalid file");
        } else if (req.file.size > 1000000) {
            throw Error("max size");
        }
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ message: errors });
    }

    if (!fs.existsSync(__directory)) {
        fs.mkdirSync(__directory, { recursive: true })
    }

    const fileName = `${process.env.SERVER_URL}/uploads/users/${req.params.id}/cover-${req.params.id}.jpg`;

    new Promise(async () => {
        await pipeline(req.file.stream, fs.createWriteStream(`${__directory}/${req.file.originalName}`))
            .then(() => {
                sharp(`${__directory}/${req.file.originalName}`)
                    .withMetadata()
                    .jpeg({ mozjpeg: true, quality: 50 })
                    .toFile(`${__directory}/cover-${req.params.id}.jpg`, (err) => {
                        if (err) {
                            console.error(err)
                        } else {
                            fs.unlink(`${__directory}/${req.file.originalName}`, (err) => {
                                if (err) {
                                    console.error(err)
                                }
                            })
                        }
                    })
            })
    })

    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { cover_picture: fileName } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

/**********************************************************************************************************************/
/*************************************************** DELETE COVER *****************************************************/

export const deleteCoverPicture = async (req, res) => {
    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { cover_picture: "/img/random-cover.jpg" } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message: err });
                }
            }
        );

        fs.unlinkSync(`${__dirname}/../views/public/uploads/cover/${req.params.id}.jpg`)

    } catch (err) {
        return res.status(400).send({ message: err });
    }
}