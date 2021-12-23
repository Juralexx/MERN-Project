const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            res.send(docs)
        } else {
            console.log('Unknown ID : ' + err)
        }
    }).select('-password')
};

module.exports.updateUser = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    //bio: req.body.bio,
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    work: req.body.work,
                    phone: req.body.phone,
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if(err) {
                    return res.status(500).send({ message: err })
                }
                else {
                    return res.status(200).send(docs);
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
};

module.exports.deleteUser = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch {
        return res.status(500).json({ message: err})
    }
}

module.exports.follow = async (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow }},
            { new: true, upsert: true },
            (err, docs) => {
                if(!err) {
                    res.status(201).json(docs)
                } else {
                    return res.status(400).json(err)
                }
            }
        )
        await ProjectModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id }},
            { new: true, upsert: true },
            (err, docs) => {
                if(err) {
                    return res.status(400).json(err)
                }
            }
        )
    } catch {
        return res.status(500).json({ message: err})
    }
}

module.exports.unfollow = async (req, res) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)){
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow }},
            { new: true, upsert: true },
            (err, docs) => {
                if(!err) {
                    res.status(201).json(docs)
                } else {
                    return res.status(400).json(err)
                }
            }
        )
        await ProjectModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id }},
            { new: true, upsert: true },
            (err, docs) => {
                if(err) {
                    return res.status(400).json(err)
                }
            }
        )
    } catch {
        return res.status(500).json({ message: err})
    }
}