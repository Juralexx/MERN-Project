import ProjectModel from '../../models/project.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const createTask = async (req, res) => {
    const task = Object.assign(req.body.task, { _id: new ObjectID })
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    tasks: task,
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const updateTask = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                tasks: { $elemMatch: { _id: req.body.taskId } }
            },
            {
                $set: {
                    "tasks.$": req.body.task,
                    "tasks.$.title": req.body.title,
                    "tasks.$.description": req.body.description,
                    "tasks.$.state": req.body.state,
                    "tasks.$.end": req.body.end,
                    "tasks.$.members": req.body.members
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const deleteTask = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    tasks: { _id: req.body.taskId }
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            { new: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}