import ProjectModel from '../models/project.model.js'
import UserModel from '../models/user.model.js'
import { projectErrors } from '../utils/error.utils.js'
import mongoose from 'mongoose'
const projectId = mongoose.Types.ObjectId()

export const createProject = async (req, res) => {
    const { posterId, posterPseudo, posterAvatar, title, titleURL, category, location, end, content, numberofcontributors, works } = req.body
    const _id = projectId
    const state = "En préparation"

    try {
        const project = ProjectModel.create({
            _id, posterId, posterPseudo, posterAvatar, title, titleURL, category, location, end, content, numberofcontributors, works, state
        })

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