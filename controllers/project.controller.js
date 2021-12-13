const ProjectModel = require('../models/project.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.readProject = (req, res) => {
    PostModel.find((err, docs) => {
        if(!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

module.exports.projectInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    ProjectModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        } else {
            console.log('Unknown ID : ' + err)
        }
    }).select()
};

module.exports.updateProject = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    try {
        await ProjectModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if(!err) {
                    return res.send(docs);
                }
                if(err) {
                    return res.status(500).send({ message: err})
                }
            }
        )
    } catch(err) {
        return res.status(500).json({ message: err})
    }
};

module.exports.deleteProject = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch {
        return res.status(500).json({ message: err})
    }
}