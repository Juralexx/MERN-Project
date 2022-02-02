import ProjectModel from '../models/project.model.js'
import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const readProject = (req, res) => {
    ProjectModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

export const projectInfo = (req, res) => {
    ProjectModel.findOne({ titleURL: req.params.titleURL }, 
        (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Unknown URL : ' + err)
        }
    }).select()
};

export const findProject = (req, res) => {
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
};

export const updateProject = async (req, res) => {
    const { title, titleURL, category, state, location, department, region, new_region, content, numberofcontributors, contributors, picture, end, works } = req.body

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    try {
        await ProjectModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title,
                    titleURL,
                    category,
                    state,
                    location,
                    department,
                    region,
                    new_region,
                    content,
                    numberofcontributors,
                    contributors,
                    picture,
                    end,
                    works
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
};

export const deleteProject = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch {
        return res.status(500).json({ message: err })
    }
}

export const likeProject = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: { likers: req.body.id },
                $inc: { likes: 1 }
            },
            { new: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $addToSet: { projects_liked: req.params.id },
                $inc: { likes: 1 }
            },
            { news: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const unlikeProject = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { likers: req.body.id },
                $inc: { likes: -1 }
            },
            { new: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $pull: { projects_liked: req.params.id },
                $inc: { likes: -1 }
            },
            { news: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

export const follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.followerId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                $addToSet: { followers: req.body.followerId },
                $inc: { follows: 1 }
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.followerId },
            { 
                $addToSet: { following: req.params.id },
                $inc: { follows: 1 }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.followerId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                $pull: { followers: req.body.followerId },
                $inc: { follows: -1 }
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.followerId },
            { 
                $pull: { following: req.params.id },
                $inc: { follows: -1 }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}



export const favorite = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                $addToSet: { favorites: req.body.userId },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            { 
                $addToSet: { favorites: req.params.id },
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const unfavorite = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            { 
                $pull: { favorites: req.body.userId },
            },
            { new: true, upsert: true },
        )
            .catch((err) => { return res.status(400).send({ message: err }) })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            { 
                $pull: { favorites: req.params.id },
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(400).send({ message: err }) })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}