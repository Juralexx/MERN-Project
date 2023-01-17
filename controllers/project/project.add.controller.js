import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'
import { projectErrors } from '../../utils/error.utils.js'
import mongoose from 'mongoose'
const projectId = mongoose.Types.ObjectId()

export const createProject = async (req, res) => {
    const {
        poster,
        title,
        URL,
        URLID,
        category,
        tags,
        location,
        description,
        day,
        start,
        end,
        state,
        content,
        works,
        members,
        manager,
        networks
    } = req.body

    try {
        const project = ProjectModel.create({
            _id: projectId,
            poster,
            title,
            URL,
            URLID,
            category,
            tags,
            location,
            description,
            day,
            start,
            end,
            content,
            works,
            qna,
            state,
            members,
            manager,
            networks
        })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.poster._id },
            {
                $addToSet: {
                    projects: projectId,
                    created_projects: projectId
                }
            },
            {
                new: true
            },
        )
            .then(() => {
                res.status(201).json({ project: project._id })
            })
            .catch(err => {
                return res.status(400).send({ message: err })
            })
    } catch (err) {
        const errors = projectErrors(err)
        res.status(200).json({ errors })
    }
}