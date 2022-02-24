import express from 'express'
const conversationRoutes = express.Router()
import ConversationModel from '../models/conversation.model.js';
import messageModel from '../models/message.model.js';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
const ObjectID = mongoose.Types.ObjectId

conversationRoutes.post('/', async (req, res) => {
    const newConversation = new ConversationModel({
        type: req.body.type,
        members: req.body.members,
        name: req.body.name,
        description: req.body.description,
        owner: req.body.owner,
        creator: req.body.creator,
        waiter: req.body.waiter
    })

    try {
        const savedConversation = await newConversation.save()
        if (savedConversation) {
            savedConversation.members.map(async (member) => {
                await UserModel.findByIdAndUpdate(
                    { _id: member.id },
                    {
                        $addToSet: {
                            conversations: {
                                conversation: savedConversation._id,
                                last_message_seen: null,
                            }
                        },
                    },
                    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
                )
            })
        }
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.get('/:id', async (req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: {
                $elemMatch: {
                    id: req.params.id
                }
            }
        })
        res.status(200).json(conversation)
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.put('/:id', async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    description: req.body.description,
                    name: req.body.name,
                    owner: req.body.owner,
                    waiter: req.body.waiter,
                    last_message: req.body.last_message
                }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.put('/:id/pull', async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    members: { id: req.body.memberId }
                }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.put('/:id/add', async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    members: req.body.newMember
                }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.put('/:id/remove-waiter', async (req, res) => {
    try {
        await ConversationModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $unset: {
                    waiter: req.body.waiter
                }
            },
            { new: true, upsert: true },
        )
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.delete('/:id', async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        const convToDelete = await ConversationModel.findById({ _id: req.params.id })

        if (convToDelete) {
            convToDelete.messages.map(async (message) => {
                await messageModel.deleteOne({ _id: message }).exec()
            })
            convToDelete.members.map(async (member) => {
                await UserModel.findByIdAndUpdate(
                    { _id: member.id },
                    {
                        $pull: {
                            conversations: {
                                conversation: convToDelete._id,
                            }
                        },
                    },
                    { new: true, upsert: true },
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
})

export default conversationRoutes;