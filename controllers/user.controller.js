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

export const findUser = async (req, res) => {
    UserModel.findOne({ pseudo: req.params.pseudo },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown ID : ' + err)
            }
        }).select('-password')
};

export const updateUser = async (req, res) => {
    const { pseudo, email, name, lastname, location, work, phone, bio, gender, theme } = req.body

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
                    theme,
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