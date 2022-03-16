import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'

export const addMemberToProject = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: { members: { member: req.body.member } }
            },
            { new: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.member },
            {
                $addToSet: { current_projects: req.params.id }
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

export const removeMemberFromProject = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: { members: { id: req.body.memberId } }
            },
            { new: true },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.memberId },
            {
                $pull: { current_projects: req.params.id }
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