import express from 'express'
const conversationRoutes = express.Router()
import ConversationModel from '../models/conversation.model.js';

conversationRoutes.post('/', async (req, res) => {
    const newConversation = new ConversationModel({
        members: req.body.members,
        owner: req.body.owner, 
        creator: req.body.creator
    })

    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(400).json(err)
    }
})

conversationRoutes.get('/:id', async (req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: {
                $in: [req.params.id]
            }
        })
        res.status(200).json(conversation)
    } catch (err) {
        res.status(400).json(err)
    }
})

export default conversationRoutes;