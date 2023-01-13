import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'
import { projectErrors } from '../../utils/error.utils.js'
import mongoose from 'mongoose'
const projectId = mongoose.Types.ObjectId()

export const createProject = async (req, res) => {
    const {
        posterId,
        posterPseudo,
        posterAvatar,
        title,
        URL,
        URLID,
        category,
        tags,
        geolocalisation,
        location,
        department,
        code_department,
        region,
        code_region,
        new_region,
        code_new_region,
        description,
        day,
        start,
        end,
        content,
        works,
        members,
        manager,
        networks
    } = req.body
    const _id = projectId
    const state = "En préparation"

    try {
        const project = ProjectModel.create({
            _id,
            posterId,
            posterPseudo,
            posterAvatar,
            title,
            URL,
            URLID,
            category,
            tags,
            geolocalisation,
            location,
            department,
            code_department,
            region,
            code_region,
            new_region,
            code_new_region,
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
            { _id: req.body.posterId },
            {
                $addToSet: {
                    projects: projectId,
                    created_projects: projectId
                }
            },
            { news: true },
        )
            .then(docs => {
                res.status(201).json({ project: project._id })
            })
            .catch((err) => {
                return res.status(400).send({ message: err })
            })
    } catch (err) {
        const errors = projectErrors(err)
        res.status(200).json({ errors })
    }
}