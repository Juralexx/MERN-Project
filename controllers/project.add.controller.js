import ProjectModel from '../models/project.model.js'
import UserModel from '../models/user.model.js'
import { projectErrors } from '../utils/error.utils.js'

export const createProject = async (req, res) => {
    const { posterId, title, titleURL, category, content, numberofcontributors } = req.body

    try {
        const project = ProjectModel.create({ posterId, title, titleURL, category, content, numberofcontributors })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.posterId },
            {
                $addToSet: {
                    currentProjects: req.params._id,
                    createdProjects: req.params._id
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
            console.log(req.params.id)
    }
    catch (err) {
        const errors = projectErrors(err);
        res.status(200).json({ errors })
    }
}