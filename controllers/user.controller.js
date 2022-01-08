import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

export const userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Unknown ID : ' + err)
        }
    }).select('-password')
};

export const updateUser = async (req, res) => {
    const { pseudo, email, name, lastname, location, work, phone, bio, gender } = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    pseudo,
                    email,
                    name,
                    lastname,
                    gender,
                    location,
                    work,
                    phone,
                    bio,
                },
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
        .then((docs) => { res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserName = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserLastname = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    lastname: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteGender = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    gender: "Non défini",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserWork = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    work: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserPhone = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    phone: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserLocation = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    location: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserBio = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .then((docs) => {return res.send(docs)})
        .catch((err) => {return res.status(500).send({ message: err })})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch {
        return res.status(500).json({ message: err })
    }
}

export const follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) {
                    res.status(201).json(docs)
                } else {
                    return res.status(400).json(err)
                }
            }
        )
        await ProjectModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).json(err)
                }
            }
        )
    } catch {
        return res.status(500).json({ message: err })
    }
}

export const unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) {
                    res.status(201).json(docs)
                } else {
                    return res.status(400).json(err)
                }
            }
        )
        await ProjectModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).json(err)
                }
            }
        )
    } catch {
        return res.status(500).json({ message: err })
    }
}