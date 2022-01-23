import ProjectModel from '../models/project.model.js'
import UserModel from '../models/user.model.js'
import { projectErrors } from '../utils/error.utils.js'
import mongoose from 'mongoose'
const projectId = mongoose.Types.ObjectId()
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline);
import { uploadErrors } from "../utils/error.utils.js"

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const createProject = async (req, res) => {
    const { posterId, posterPseudo, posterAvatar, title, titleURL, category, location, end, content, numberofcontributors } = req.body
    const _id = projectId

    try {
        const project = ProjectModel.create({ _id, posterId, posterPseudo, posterAvatar, title, titleURL, category, location, end, content, numberofcontributors })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.posterId },
            {
                $addToSet: {
                    currentProjects: projectId,
                    createdProjects: projectId
                },
                $inc: {
                    nbOfCurrentProjects: 1,
                    nbOfCreatedProjects: 1
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