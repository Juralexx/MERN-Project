import express from 'express'
const userRoutes = express.Router()
import { signIn, signUp, logout } from '../controllers/auth.controller.js'
import { getAllUsers, userInfo, updateUser, deleteUser, findUser } from '../controllers/user/user.controller.js'
import { uploadCoverPicture, uploadProfilPicture, deleteCoverPicture, deleteProfilPicture } from '../controllers/user/user.upload.controller.js'
import { acceptFriend, cancelFriendRequest, refuseFriend, sendFriendRequest, deleteFriend } from '../controllers/user/user.friend.js'
import { addConversationToFavorite, removeConversationFromFavorite, setLastMessageSeen } from '../controllers/user/user.messenger.controller.js'
import { deleteNotification, resetNotifications, setNotificationToSeen } from '../controllers/user/user.notifications.controller.js'
import multer from 'multer'
const upload = multer()

userRoutes.post('/register', signUp)
userRoutes.post('/login', signIn)
userRoutes.get('/logout', logout)
userRoutes.put('/profil/edit', updateUser)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', userInfo)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.get('/profil/:pseudo', findUser)

userRoutes.post('/upload/:id', upload.single('file'), uploadProfilPicture)
userRoutes.put('/upload/delete/:id', deleteProfilPicture)
userRoutes.post('/upload/cover/:id', upload.single('file'), uploadCoverPicture)
userRoutes.put('/upload/delete/cover/:id', deleteCoverPicture) 

userRoutes.put('/send-friend-request/:id', sendFriendRequest)
userRoutes.put('/cancel-friend-request/:id', cancelFriendRequest)
userRoutes.put('/accept-friend-request/:id', acceptFriend)
userRoutes.put('/refuse-friend-request/:id', refuseFriend)
userRoutes.put('/delete-friend/:id', deleteFriend)

userRoutes.put('/conversation/add-favorite/:id', addConversationToFavorite)
userRoutes.put('/conversation/remove-favorite/:id', removeConversationFromFavorite)
userRoutes.put('/conversation/last-message-seen/:id', setLastMessageSeen)

userRoutes.put('/reset-notifications/:id', resetNotifications)
userRoutes.put('/notification-seen/:id', setNotificationToSeen)
userRoutes.put('/delete-notification/:id', deleteNotification)

export default userRoutes;