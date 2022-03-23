import UserModel from '../../models/user.model.js'

export const resetNotifications = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: { unseen_notifications: 0 },
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

export const setNotificationToSeen = async (req, res) => {
    try {
        await UserModel.updateOne(
            {
                _id: req.params.id,
                notifications: { $elemMatch: { _id: req.body.notificationId } }
            },
            {
                $set: {
                    "notifications.$.seen": true,
                }
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

export const deleteNotification = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    notifications: { _id: req.body.notificationId }
                },
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