import express from 'express'
const messageRoutes = express.Router()
import MessageModel from '../models/message.model.js';

messageRoutes.post('/', async (req, res) => {
    const newMessage = new MessageModel(req.body)

    try {
        const savedMessage = await newMessage.save()
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

export default messageRoutes;