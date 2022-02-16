import express from 'express'
import ConversationModel from '../models/conversation.model.js';
import MessageModel from '../models/message.model.js';
const messageRoutes = express.Router()

messageRoutes.post('/', async (req, res) => {
    const newMessage = new MessageModel(req.body)

    try {
        const savedMessage = await newMessage.save()

        await ConversationModel.findByIdAndUpdate(
            { _id: req.body.conversationId },
            {
                $addToSet: {
                    messages: newMessage._id
                },
                $set: {
                    last_message: newMessage._id
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
        const messages = await MessageModel.findOne({ _id: req.params.messageId })
        res.status(200).json(messages)
    } catch (err) {
        res.status(400).json(err)
    }
})

messageRoutes.put('/single/:messageId', async (req, res) => {
    try {
        await MessageModel.findByIdAndUpdate(
            { _id: req.params.messageId },
            {
                $set: {
                    text: req.body.text,
                },
                $addToSet: {
                    emojis: req.body.emojis
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

messageRoutes.put('/single/remove-emoji/:messageId', async (req, res) => {
    try {
        await MessageModel.findByIdAndUpdate(
            { _id: req.params.messageId },
            {
                $pull: {
                    emojis: req.body.emojis
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

messageRoutes.delete('/single/:messageId', async (req, res) => {
    try {
        const message = await MessageModel.findById({ _id: req.params.messageId })

        await ConversationModel.findByIdAndUpdate(
            { _id: message.conversationId },
            {
                $pull: {
                    messages: message._id
                },
            },
            { new: true, upsert: true },
        )

        await MessageModel.deleteOne({ _id: req.params.messageId }).exec()
            .then((docs) => { res.send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })

    } catch (err) {
        res.status(400).json(err)
    }
})

export default messageRoutes;