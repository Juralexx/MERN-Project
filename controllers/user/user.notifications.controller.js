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