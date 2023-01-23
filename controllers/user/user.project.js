import ProjectModel from '../../models/project.model.js'
import UserModel from '../../models/user.model.js'

/**
 * Send a member request
 * @param {*} id User ID
 * @param {*} projectId Project ID to send request to
 * @param {*} request Request object
 */

export const sendMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.projectId },
            {
                $addToSet: {
                    member_request: req.body.request
                }
            },
            {
                new: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    member_request_sent: req.body.request,
                },
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Cancel a member request
 * @param {*} id User ID
 * @param {*} projectId User ID to cancel request from
 * @param {*} requestId Request ID
 */

export const cancelMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.projectId },
            {
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    },
                },
            },
            {
                new: true
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

/**
 * Accept a member request
 * @param {*} id User ID
 * @param {*} requestId Request ID
 * @param {*} projectId Project ID that accepts request
 * @param {*} member Member to add
 */

export const acceptMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.projectId },
            {
                $addToSet: {
                    members: req.body.member,
                    activity_feed: req.body.activity,
                },
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    projects: req.params.id
                },
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    },
                },
            },
            {
                new: true
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

/**
 * Accept a member request
 * @param {*} id Project ID
 * @param {*} requestId Request ID
 * @param {*} userId User ID that accepts request
 */

export const refuseMemberRequest = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    member_request: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
            },
        )
            .catch(err => {
                return res.status(500).send({ message: err })
            })

        await UserModel.updateOne(
            { _id: req.body.userId },
            {
                $pull: {
                    member_request_sent: {
                        _id: req.params.requestId
                    }
                },
            },
            {
                new: true
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