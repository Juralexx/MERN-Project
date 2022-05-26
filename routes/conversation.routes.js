import express from 'express'
const conversationRoutes = express.Router()
import { addMember, createConversation, customizeUserPseudo, deleteConversation, getConversation, removeMember, updateConversation, uploadConversationPicture } from '../controllers/messenger/conversation.controller.js';
import { addEmoji, addMessage, deleteFiles, deleteMessage, getMessage, removeEmoji, updateMessage, uploadFiles } from '../controllers/messenger/message.controller.js';
import multer from 'multer'
const upload = multer()

conversationRoutes.get('/:id', getConversation)
conversationRoutes.get('/:id/:messageId', getMessage)

conversationRoutes.post('/', createConversation)
conversationRoutes.put('/:id', updateConversation)
conversationRoutes.delete('/:id', deleteConversation)

conversationRoutes.put('/:id/upload', upload.single('files'), uploadConversationPicture)

conversationRoutes.put('/:id/add-member', addMember)
conversationRoutes.put('/:id/remove-member', removeMember)

conversationRoutes.put('/:id/add-message', addMessage)
conversationRoutes.put('/:id/update-message', updateMessage)
conversationRoutes.put('/:id/remove-message/:messageId', deleteMessage)

conversationRoutes.put('/:id/upload-files/:messageId/:userId/:userPseudo', upload.array('files', 10), uploadFiles)
conversationRoutes.put('/:id/delete-files/:messageId', deleteFiles)

conversationRoutes.put('/:id/add-emoji', addEmoji)
conversationRoutes.put('/:id/remove-emoji', removeEmoji)

conversationRoutes.put('/:id/customize-pseudo/:userId', customizeUserPseudo)

export default conversationRoutes;