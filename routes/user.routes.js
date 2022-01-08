import express from 'express'
const userRoutes = express.Router()
import { signIn, signUp, logOut } from '../controllers/auth.controller.js'
import { getAllUsers, userInfo, updateUser, deleteUser, follow, unfollow, deleteUserBio, deleteUserName, deleteUserWork, deleteUserLastname, deleteUserPhone, deleteUserLocation, deleteGender } from '../controllers/user.controller.js'
import { deleteCoverPicture, deleteProfilPicture, uploadCoverPicture, uploadProfilPicture } from '../controllers/upload.controller.js'
import multer from 'multer'
const upload = multer()

userRoutes.post('/register', signUp)
userRoutes.post('/login', signIn)
userRoutes.get('/logout', logOut)
userRoutes.put('/profil/edit', updateUser)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', userInfo)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.patch('/follow/:id', follow)
userRoutes.patch('/unfollow/:id', unfollow)

userRoutes.put('/delete/name/:id', deleteUserName)
userRoutes.put('/delete/lastname/:id', deleteUserLastname)
userRoutes.put('/delete/gender/:id', deleteGender)
userRoutes.put('/delete/work/:id', deleteUserWork)
userRoutes.put('/delete/phone/:id', deleteUserPhone)
userRoutes.put('/delete/location/:id', deleteUserLocation)
userRoutes.put('/delete/bio/:id', deleteUserBio)

userRoutes.post('/upload', upload.single('file'), uploadProfilPicture)
userRoutes.post('/upload/cover', upload.single('file'), uploadCoverPicture)
userRoutes.put('/upload/delete/:id', deleteProfilPicture)
userRoutes.put('/upload/delete/cover/:id', deleteCoverPicture)

export default userRoutes;