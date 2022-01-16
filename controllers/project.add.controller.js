import ProjectModel from '../models/project.model.js'
import { projectErrors } from '../utils/error.utils.js'

export const createProject = async (req, res) => {
    const newProject = new ProjectModel({
        posterId: req.body.posterId,
        title: req.body.title,
        content: req.body.content,
        numberofcontributors: req.body.numberofcontributors,
        contributor: [],
        picture: req.body.picture,
        video: req.body.video,
        end: req.body.end,
        follows: 0,
        followers: [],
        likes: 0,
        likers: [],
        views: []
    })

    try {
        const project = await newProject.save()
        return res.status(201).json(project)
    }
    catch (err) {
        const errors = projectErrors(err);
        res.status(200).json({ errors })
    }
}