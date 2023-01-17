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
userRoutes.put('/profil/edit', updateUser)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUserByID)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.get('/profil/:pseudo', getUserByPseudo)

userRoutes.post('/upload/:id', upload.single('file'), uploadProfilPicture)
userRoutes.put('/upload/delete/:id', deleteProfilPicture)
userRoutes.post('/upload/cover/:id', upload.single('file'), uploadCoverPicture)
userRoutes.put('/upload/delete/cover/:id', deleteCoverPicture) 

userRoutes.put('/send-contact-request/:id', sendContactRequest)
userRoutes.put('/cancel-contact-request/:id', cancelContactRequest)
userRoutes.put('/accept-contact-request/:id', acceptContact)
userRoutes.put('/refuse-contact-request/:id', refuseContact)
userRoutes.put('/delete-contact/:id', deleteContact)

userRoutes.put('/conversation/add-favorite/:id', addConversationToFavorite)
userRoutes.put('/conversation/remove-favorite/:id', removeConversationFromFavorite)
userRoutes.put('/conversation/last-message-seen/:id', setLastMessageSeen)
userRoutes.put('/conversation/last-conversation-seen/:id', setLastConversation)

userRoutes.put('/reset-notifications/:id', resetNotifications)
userRoutes.put('/notification-seen/:id', setNotificationToSeen)
userRoutes.put('/delete-notification/:id', deleteNotification)

export default userRoutes;