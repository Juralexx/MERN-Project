import ProjectModel from '../../models/project.model.js'
import mongoose from 'mongoose'
import { projectErrors } from '../../utils/error.utils.js'
const ObjectID = mongoose.Types.ObjectId

/**
 * Get all the created projects
 * @param {*} req Request 
 * @param {*} res Response
 */

export const getAllProjects = (req, res) => {
    ProjectModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

/**
 * Get project by URL
 * @param {*} URLID Project URL ID
 * @param {*} URL Project URL
 */

export const findProjectByURL = (req, res) => {
    ProjectModel.findOne({
        URLID: req.params.URLID,
        URL: req.params.URL
    },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

/**
 * Get project by ID
 * @param {*} id Project ID to get
 */

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

/**
 * Update user profil
 * @param {*} title Project title
 * @param {*} URL Project URL
 * @param {*} category Project category
 * @param {*} state Project state
 * @param {*} location Project location
 * @param {*} description Project description
 * @param {*} day Project day
 * @param {*} start Project start
 * @param {*} end Project end
 * @param {*} works Project works
 * @param {*} tags Project tags
 * @param {*} networks Project networks
 */

export const updateProject = async (req, res) => {
    const {
        title,
        URL,
        category,
        state,
        location,
        description,
        content,
        day,
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
                    location,
                    description,
                    content,
                    day,
                    start,
                    end,
                    works,
                    tags,
                    networks
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    } catch (err) {
        const errors = projectErrors(err)
        res.status(200).json({ errors })
    }
}

/**
 * Delete project
 * @param {*} id ID of the project to delete
 */

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

// supprimer des tout les utilisateurs qui ont liké, suivi ou en favoris l'id du projet