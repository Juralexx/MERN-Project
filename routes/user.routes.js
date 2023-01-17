import express from 'express'
const userRoutes = express.Router()
import { signIn, signUp, logout } from '../controllers/auth.controller.js'
import { getAllUsers, getUserByID, updateUser, deleteUser, getUserByPseudo } from '../controllers/user/user.controller.js'
import { uploadCoverPicture, uploadProfilPicture, deleteCoverPicture, deleteProfilPicture } from '../controllers/user/user.upload.controller.js'
import { acceptContact, cancelContactRequest, refuseContact, sendContactRequest, deleteContact } from '../controllers/user/user.contact.js'
import { addConversationToFavorite, removeConversationFromFavorite, setLastConversation, setLastMessageSeen } from '../controllers/user/user.messenger.controller.js'
import { deleteNotification, resetNotifications, setNotificationToSeen } from '../controllers/user/user.notifications.controller.js'
import multer from 'multer'
const upload = multer()

userRoutes.post('/register', signUp)
userRoutes.post('/login', signIn)
userRoutes.get('/logout', logout)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUserByID)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.get('/profil/:pseudo', getUserByPseudo)

userRoutes.post('/:id/uploads/pictures/profil/', upload.single('file'), uploadProfilPicture)
userRoutes.put('/:id/uploads/pictures/profil/delete/', deleteProfilPicture)
userRoutes.post('/:id/uploads/pictures/cover/', upload.single('file'), uploadCoverPicture)
userRoutes.put('/:id/uploads/pictures/cover/delete', deleteCoverPicture) 

userRoutes.put('/:id/contacts/request/send/', sendContactRequest)
userRoutes.put('/:id/contacts/request/cancel/', cancelContactRequest)
userRoutes.put('/:id/contacts/request/accept/', acceptContact)
userRoutes.put('/:id/contacts/request/refuse/', refuseContact)

userRoutes.put('/:id/delete-contact/', deleteContact)

userRoutes.put('/:id/conversations/favorites/add/', addConversationToFavorite)
userRoutes.put('/:id/conversations/favorites/remove/', removeConversationFromFavorite)
userRoutes.put('/:id/conversations/last-message-seen/', setLastMessageSeen)
userRoutes.put('/:id/conversations/last-conversation-seen/', setLastConversation)

userRoutes.put('/:id/notifications/reset/', resetNotifications)
userRoutes.put('/:id/notifications/seen/', setNotificationToSeen)
userRoutes.put('/:id/notifications/delete/', deleteNotification)

export default userRoutes;