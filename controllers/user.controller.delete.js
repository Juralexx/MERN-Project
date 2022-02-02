import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const deleteUserName = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    name: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
                $unset: {
                    lastname: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
                $unset: {
                    work: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
                $unset: {
                    phone: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
                $unset: {
                    location: "",
                    department: "",
                    region: "",
                    new_region: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
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
                $unset: {
                    bio: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserWebsite = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    website: "",
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserFacebook = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    facebook: ""
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserInstagram = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    instagram: ""
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserTwitter = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    twitter: ""
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserYoutube = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    youtube: ""
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const deleteUserLinkedin = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    linkedin: ""
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((docs) => { return res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};