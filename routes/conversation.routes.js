import express from 'express'
const conversationRoutes = express.Router()
import { addMember, createConversation, customizeUserPseudo, deleteConversation, getConversation, removeMember, updateConversation } from '../controllers/messenger/conversation.controller.js';
import { addEmoji, addMessage, deleteMessage, getMessage, removeEmoji, updateMessage } from '../controllers/messenger/message.controller.js';
import { deleteConversationPicture, uploadConversationPicture } from '../controllers/messenger/conversation.upload.controller.js';
import { deleteFiles, uploadFiles } from '../controllers/messenger/message.upload.controller.js';
import multer from 'multer'
const upload = multer()

conversationRoutes.get('/:id', getConversation)
conversationRoutes.get('/:id/:messageId', getMessage)

conversationRoutes.post('/', createConversation)
conversationRoutes.put('/:id', updateConversation)
conversationRoutes.delete('/:id', deleteConversation)

conversationRoutes.put('/:id/upload/', upload.single('file'), uploadConversationPicture)
conversationRoutes.put('/:id/upload/delete/', deleteConversationPicture)

conversationRoutes.put('/:id/members/add/', addMember)
conversationRoutes.put('/:id/members/remove/', removeMember)

conversationRoutes.put('/:id/pseudo/update/:userId/', customizeUserPseudo)

conversationRoutes.put('/:id/messages/add/', addMessage)
conversationRoutes.put('/:id/messages/update/', updateMessage)
conversationRoutes.put('/:id/messages/remove/:messageId/', deleteMessage)

conversationRoutes.put('/:id/messages/upload/:messageId/:userId/:userPseudo/', upload.array('files', 10), uploadFiles)
conversationRoutes.put('/:id/messages/upload/delete/:messageId/', deleteFiles)

conversationRoutes.put('/:id/emojis/add/', addEmoji)
conversationRoutes.put('/:id/emojis/remove/', removeEmoji)

export default conversationRoutes;