import express from 'express'
const userRoutes = express.Router()
import { signIn, signUp, logOut } from '../controllers/auth.controller.js'
import { getAllUsers, userInfo, updateUser, deleteUser, findUser } from '../controllers/user.controller.js'
import { deleteUserBio, deleteUserName, deleteUserWork, deleteUserLastname, deleteUserPhone, deleteUserLocation, deleteGender, deleteUserWebsite, deleteUserLinkedin, deleteUserFacebook, deleteUserInstagram, deleteUserTwitter, deleteUserYoutube } from '../controllers/user.controller.delete.js'
import { uploadCoverPicture, uploadProfilPicture, deleteCoverPicture, deleteProfilPicture } from '../controllers/upload.user.controller.js'
import multer from 'multer'
import { acceptFriend, cancelSentFriendRequest, refuseFriend, sendFriendRequest, deleteFriend } from '../controllers/user.friend.js'
const upload = multer()

userRoutes.post('/register', signUp)
userRoutes.post('/login', signIn)
userRoutes.get('/logout', logOut)
userRoutes.put('/profil/edit', updateUser)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', userInfo)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.get('/profil/:pseudo', findUser)

userRoutes.post('/upload', upload.single('file'), uploadProfilPicture)
userRoutes.post('/upload/cover', upload.single('file'), uploadCoverPicture)
userRoutes.put('/upload/delete/:id', deleteProfilPicture)
userRoutes.put('/upload/delete/cover/:id', deleteCoverPicture)

userRoutes.put('/delete/name/:id', deleteUserName)
userRoutes.put('/delete/lastname/:id', deleteUserLastname)
userRoutes.put('/delete/gender/:id', deleteGender)
userRoutes.put('/delete/work/:id', deleteUserWork)
userRoutes.put('/delete/phone/:id', deleteUserPhone)
userRoutes.put('/delete/location/:id', deleteUserLocation)
userRoutes.put('/delete/bio/:id', deleteUserBio)
userRoutes.put('/delete/website/:id', deleteUserWebsite)
userRoutes.put('/delete/facebook/:id', deleteUserFacebook)
userRoutes.put('/delete/instagram/:id', deleteUserInstagram)
userRoutes.put('/delete/twitter/:id', deleteUserTwitter)
userRoutes.put('/delete/youtube/:id', deleteUserYoutube)
userRoutes.put('/delete/linkedin/:id', deleteUserLinkedin)

userRoutes.put('/send-friend-request/:id', sendFriendRequest)
userRoutes.put('/cancel-friend-request/:id', cancelSentFriendRequest)
userRoutes.put('/accept-friend-request/:id', acceptFriend)
userRoutes.put('/refuse-friend-request/:id', refuseFriend)
userRoutes.put('/delete/friend/:id', deleteFriend)

export default userRoutes;