import express from 'express'
import mongoose from 'mongoose'
import conversationModel from '../models/conversation.model.js';
const messageRoutes = express.Router()
import MessageModel from '../models/message.model.js';

messageRoutes.post('/', async (req, res) => {
    const newMessage = new MessageModel(req.body)

    try {
        const savedMessage = await newMessage.save()

        await conversationModel.findByIdAndUpdate(
            { _id: req.body.conversationId },
            {
                $addToSet: {
                    messages : newMessage._id
                },
                $set: {
                    last_message : newMessage._id
                },
            },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
        )
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(400).json(err)
    }
})

messageRoutes.get('/:conversationId', async (req, res) => {
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(400).json(err)
    }
})

messageRoutes.get('/single/:messageId', async (req, res) => {
    try {
        const messages = await MessageModel.find({
            _id: req.params.messageId
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(400).json(err)
    }
})

export default messageRoutes;