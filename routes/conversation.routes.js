import express from 'express'
const conversationRoutes = express.Router()
import { addMember, createConversation, deleteConversation, getConversation, removeMember, removeWaiter, updateConversation } from '../controllers/messenger/conversation.controller.js';
import { addEmoji, addMessage, deleteMessage, removeEmoji, updateMessage } from '../controllers/messenger/message.controller.js';

conversationRoutes.get('/:id', getConversation)

conversationRoutes.post('/', createConversation)
conversationRoutes.put('/:id', updateConversation)
conversationRoutes.delete('/:id', deleteConversation)

conversationRoutes.put('/:id/add-member', addMember)
conversationRoutes.put('/:id/remove-member', removeMember)

conversationRoutes.put('/:id/remove-waiter', removeWaiter)

conversationRoutes.put('/:id/add-message', addMessage)
conversationRoutes.put('/:id/update-message', updateMessage)
conversationRoutes.put('/:id/remove-message', deleteMessage)
conversationRoutes.put('/:id/add-emoji', addEmoji)
conversationRoutes.put('/:id/remove-emoji', removeEmoji)

export default conversationRoutes;