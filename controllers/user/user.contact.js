import UserModel from '../../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

export const sendContactRequest = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    contact_request_sent: {
                        contact: req.body.contactId,
                        requestedAt: new Date().toISOString(),
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.contactId },
            {
                $addToSet: {
                    notifications: req.body.notification
                },
                $inc: { unseen_notifications: 1 }
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const cancelContactRequest = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.body.contactId },
            {
                $pull: {
                    notifications: {
                        requesterId: req.params.id,
                        type: req.body.type
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    contact_request_sent: {
                        contact: req.body.contactId,
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/****************************************************************************/
/************************ ACCEPTER AMI / REFUSER AMI ************************/

export const acceptContact = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    contacts: {
                        _id: req.body.requesterId,
                        requestedAt: new Date().toISOString(),
                    }
                },
                $pull: {
                    notifications: {
                        requesterId: req.body.requesterId,
                        type: req.body.type
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.requesterId },
            {
                $addToSet: {
                    contacts: {
                        _id: req.params.id,
                        requestedAt: new Date().toISOString(),
                    }
                },
                $pull: {
                    contact_request_sent: {
                        contact: req.params.id,
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

export const refuseContact = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    notifications: {
                        requesterId: req.body.requesterId,
                        type: req.body.type
                    }
                },
                $inc: { unseen_notifications: -1 }
            },
            { new: true, upsert: true, runValidators: true },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.requesterId },
            {
                $pull: {
                    contact_request_sent: {
                        contact: req.params.id
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

/****************************************************************************/
/****************************** SUPPRIMER AMI *******************************/

export const deleteContact = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    contacts: {
                        _id: req.body.contactId
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.findByIdAndUpdate(
            { _id: req.body.contactId },
            {
                $pull: {
                    contacts: {
                        _id: req.params.id
                    }
                },
            },
            {
                new: true,
                upsert: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}