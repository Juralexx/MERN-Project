import express from 'express'
const conversationRoutes = express.Router()
import ConversationModel from '../models/conversation.model.js';
import messageModel from '../models/message.model.js';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
const ObjectID = mongoose.Types.ObjectId

conversationRoutes.post('/', async (req, res) => {
    const newConversation = new ConversationModel({
        members: req.body.members,
        owner: req.body.owner,
        creator: req.body.creator
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



