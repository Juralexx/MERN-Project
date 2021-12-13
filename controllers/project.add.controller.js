const ProjectModel = require('../models/project.model')

module.exports.createProject = async (req, res) => {
    const newProject = new ProjectModel({
        posterId: req.body.posterId,
        name: req.body.name,
        bio: req.body.bio,
        numberofcontributors: req.body.numberofcontributors,
        contributor: [],
        picture: req.body.picture,
        video: req.body.video,
        end: req.body.end,
        followers: [],
        likes: [],
        likers: [],
        //views: []
    })

    try {
        const project = await newProject.save()
        return res.status(201).json(project)
    }
    catch {
        return res.status(400).send(err)
    }
}