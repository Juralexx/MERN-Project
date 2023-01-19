import ProjectModel from '../../models/project.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/**
 * Get project by ID
 * @param {*} id Project ID
 * @param {*} taskId Task ID to get
 */

export const getTaskById = async (req, res) => {
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
        })
        .select({
            tasks: {
                $elemMatch: {
                    _id: req.params.taskId
                }
            }
        })
}

/**
 * Create a task
 * @param {*} id Project ID
 * @param {*} task Task object
 * @param {*} activity Activity feed
 */

export const createTask = async (req, res) => {
    const task = Object.assign(req.body.task, { _id: (new ObjectID).toString() })

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    tasks: task,
                    activity_feed: req.body.activity
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Update a task
 * @param {*} id Project ID
 * @param {*} taskId ID of the task to update
 * @param {*} task Task object
 * @param {*} activity Activity feed
 */

export const updateTask = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                tasks: {
                    $elemMatch: {
                        _id: req.params.taskId
                    }
                }
            },
            {
                $set: {
                    "tasks.$.title": req.body.task.title,
                    "tasks.$.description": req.body.task.description,
                    "tasks.$.state": req.body.task.state,
                    "tasks.$.status": req.body.task.status,
                    "tasks.$.end": req.body.task.end,
                    "tasks.$.members": req.body.task.members
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            {
                new: true,
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(400).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Delete a task
 * @param {*} id Project ID
 * @param {*} taskId ID of the task to delete
 * @param {*} activity Activity feed 
 */

export const deleteTask = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    tasks: {
                        _id: req.params.taskId
                    }
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            {
                new: true,
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Delete a task
 * @param {*} id Project ID
 * @param {*} taskId ID of the task to delete
 * @param {*} comment Comment object
 */

export const commentTask = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                tasks: {
                    $elemMatch: {
                        _id: req.params.taskId
                    }
                }
            },
            {
                $addToSet: {
                    "tasks.$.comments": req.body.comment,
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}