import express from 'express'
const userRoutes = express.Router()
import { signIn, signUp, logOut } from '../controllers/auth.controller.js'
import { getAllUsers, userInfo, updateUser, deleteUser, follow, unfollow } from '../controllers/user.controller.js'
import { deleteProfilImg, uploadProfil } from '../controllers/upload.controller.js'
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

userRoutes.post('/upload', upload.single('file'), uploadProfil)
userRoutes.delete('/upload/delete', deleteProfilImg)

export default userRoutes;