import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'
import { projectErrors } from '../../utils/error.utils.js'
import mongoose from 'mongoose'
const projectId = mongoose.Types.ObjectId()
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const createProject = async (req, res) => {
    const { posterId, posterPseudo, posterAvatar, title, titleURL, category, location, department,
        region, new_region, end, content, numberofcontributors, works, members, manager } = req.body
    const _id = projectId
    const state = "En préparation"

    try {
        const project = ProjectModel.create({
            _id, posterId, posterPseudo, posterAvatar, title, titleURL, category, location, department,
            region, new_region, end, content, numberofcontributors, works, state, members, manager
        })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.posterId },
            {
                $addToSet: {
                    current_projects: projectId,
                    created_projects: projectId
                },
                $inc: {
                    number_of_current_projects: 1,
                    number_of_created_projects: 1
                }
            },
            { news: true },
        )
            .then((docs) => {
                res.status(201).json({ project: project._id })
            })
            .catch((err) => {
                return res.status(400).send({ message: err })
            })
    }
    catch (err) {
        const errors = projectErrors(err);
        res.status(200).json({ errors })
    }
}

export const uploadProjectPictures = async (req, res) => {
    console.log(req.file)
    if (req.files) {
        req.files.map(async (file, key) => {
            console.log(req.files)
            const fileName = projectId + '-' + key + ".jpg";
            await pipeline(
                file.stream,
                fs.createWriteStream(
                    `${__dirname}/../views/public/uploads/projects/${projectId}/${fileName}`
                )
            )
        })
    }

    // try {
    //     ProjectModel.findByIdAndUpdate(
    //         req.body.userId,
    //         { $addToSet: { pictures: "/uploads/profil/" + fileName } },
    //         { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    //         (err, docs) => {
    //             if (!err) {
    //                 return res.send(docs);
    //             }
    //             else {
    //                 return res.status(500).send({ message: err });
    //             }
    //         }
    //     )
    // } catch (err) {
    //     return res.status(500).send({ message: err });
    // }
}