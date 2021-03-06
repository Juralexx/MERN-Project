import ProjectModel from '../../models/project.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const allProjects = (req, res) => {
    ProjectModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

export const findProjectByURL = (req, res) => {
    ProjectModel.findOne({ URLID: req.params.URLID, URL: req.params.URL },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

export const findProjectById = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    ProjectModel.findById({ _id: req.params.id },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

export const updateProject = async (req, res) => {
    const {
        title,
        URL,
        category,
        state,
        geolocalisation,
        location,
        department,
        code_department,
        region,
        code_region,
        new_region,
        code_new_region,
        description,
        content,
        start,
        end,
        works,
        tags,
        networks
    } = req.body

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    try {
        await ProjectModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title,
                    URL,
                    category,
                    state,
                    geolocalisation,
                    location,
                    department,
                    code_department,
                    region,
                    code_region,
                    new_region,
                    code_new_region,
                    description,
                    content,
                    start,
                    end,
                    works,
                    tags,
                    networks
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const deleteProject = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

// supprimer des tout les utilisateurs qui ont lik??, suivi ou en favoris l'id du projet