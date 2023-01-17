import mongoose from 'mongoose';
import ConversationModel from '../../models/conversation.model.js';
import UserModel from '../../models/user.model.js';
const ObjectID = mongoose.Types.ObjectId

/**
 * Get conversation
 * @param {*} id ID of the conversation to get
 */

export const getConversation = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    ConversationModel.findById({ _id: req.params.id },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

/**
 * Create a new conversation
 * @param {*} type Type of the conversation : 'group' or 'dialog'
 * @param {*} members Members array
 * @param {*} name Name of the conversation if one is defined
 * @param {*} description Description of the conversation if one is defined
 * @param {*} owner Conversation owner
 * @param {*} creator Conversation creator
 * @param {*} messages Messages Array
 */

export const createConversation = async (req, res) => {
    const { type, members, name, description, owner, creator, messages } = req.body

    const newConversation = new ConversationModel({
        type: type,
        members: members,
        name: name,
        description: description,
        owner: owner,
        creator: creator,
        messages: messages
    })

    try {
        const savedConversation = await newConversation.save()

        if (savedConversation) {
            savedConversation.members.map(async member => {
                await UserModel.findByIdAndUpdate(
                    { _id: member._id },
                    {
                        $addToSet: {
                            conversations: {
                                id: savedConversation._id,
                                last_message_seen: null,
                                favorite: false
                            }
                        },
                    },
                    {
                        new: true,
                        upsert: true,
                        runValidators: true,
                        setDefaultsOnInsert: true
                    },
                )
            })
        }
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Update conversation
 * @param {*} id ID of the conversation to update
 * @param {*} name Name updated
 * @param {*} description Description updated
 * @param {*} owner Owner updated
 */

export const updateConversation = async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    owner: req.body.owner,
                }
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
    } catch (err) {
        res.status(400).json(err)
    }
}
/**
 * Customize user pseudo in conversation
 * @param {*} id ID of the conversation to update
 * @param {*} userId User ID of the user to update the pseudo of
 * @param {*} pseudo Updated pseudo
 */

export const customizeUserPseudo = async (req, res) => {
    try {
        await ConversationModel.updateOne(
            {
                _id: req.params.id,
                members: {
                    $elemMatch: {
                        _id: req.params.userId
                    }
                }
            },
            {
                $set: {
                    "members.$.custom_pseudo": req.body.pseudo
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
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Delete conversation 
 * @param {*} id ID of the conversation to delete
 */

export const deleteConversation = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        const convToDelete = await ConversationModel.findById({ _id: req.params.id })

        if (convToDelete) {
            convToDelete.members.map(async member => {
                await UserModel.findByIdAndUpdate(
                    { _id: member._id },
                    {
                        $pull: {
                            conversations: {
                                id: convToDelete._id,
                            }
                        },
                    },
                    {
                        new: true,
                        upsert: true
                    },
                )
            })

            try {
                await ConversationModel.deleteOne({ _id: req.params.id }).exec()

                res.status(200).json({ message: "Successfully deleted." })
            } catch {
                return res.status(500).json({ message: err })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

/**
 * Add member to conversation
 * @param {*} id ID of the conversation to update
 * @param {*} newMember New member object to add to members array of the conversation
 */

export const addMember = async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    members: req.body.newMember
                }
            },
            {
                new: true,
                upsert: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.newMember.id },
            {
                $addToSet: {
                    conversations: {
                        conversation: req.params.id,
                        last_message_seen: null,
                    }
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
        res.status(400).json(err)
    }
}

/**
 * Remove member from conversation
 * @param {*} id ID of the conversation to update
 * @param {*} memberId ID of the member to remove from the conversation
 */

export const removeMember = async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    members: {
                        id: req.body.memberId
                    }
                }
            },
            {
                new: true,
                upsert: true
            },
        )

        await UserModel.findByIdAndUpdate(
            { _id: req.body.memberId },
            {
                $pull: {
                    conversations: {
                        conversation: req.params.id
                    }
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
        res.status(400).json(err)
    }
}