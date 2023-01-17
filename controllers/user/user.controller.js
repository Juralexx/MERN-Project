import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/**
 * Get all the created users profils
 * @param {*} req Request 
 * @param {*} res Response
 */

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

/**
 * Get user profil by ID
 * @param {*} id User ID to get
 */

export const getUserByID = (req, res) => {
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

/**
 * Get user profil by pseudo
 * @param {*} pseudo User pseudo to get
 */

export const getUserByPseudo = async (req, res) => {
    UserModel.findOne({ pseudo: req.params.pseudo },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown ID : ' + err)
            }
        }).select('-password')
};

/**
 * Update user profil
 * @param {*} email User email
 * @param {*} name User name
 * @param {*} lastname User lastname
 * @param {*} location User location
 * @param {*} work User work
 * @param {*} phone User phone
 * @param {*} bio User bio
 * @param {*} networks User networks
 * @param {*} theme User theme
 * @param {*} contacts User contacts
 * @param {*} favorites User favorites projects
 */

export const updateUser = async (req, res) => {
    const {
        email,
        name,
        lastname,
        location,
        work,
        phone,
        bio,
        networks,
        theme,
        contacts,
        favorites
    } = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    email,
                    name,
                    lastname,
                    location,
                    work,
                    phone,
                    bio,
                    networks,
                    theme,
                    contacts,
                    favorites
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

/**
 * Delete user profil
 * @param {*} id ID of the user to delete
 */

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