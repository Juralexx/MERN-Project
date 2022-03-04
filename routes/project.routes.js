import express from 'express'
const projectRoutes = express.Router()
import { createProject, uploadProjectPictures } from '../controllers/project.add.controller.js'
import { readProject, projectInfo, updateProject, deleteProject, likeProject, unlikeProject, follow, unfollow, findProject, favorite, unfavorite } from '../controllers/project.controller.js'
import multer from 'multer'
const upload = multer()

projectRoutes.post('/add', createProject)
projectRoutes.post('/add/pictures', upload.array('files', 5), uploadProjectPictures)

projectRoutes.get('/', readProject)
projectRoutes.get('/:titleURL', projectInfo)
projectRoutes.get('/single/:id', findProject)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

projectRoutes.patch('/follow/:id', follow)
projectRoutes.patch('/unfollow/:id', unfollow)

projectRoutes.patch('/like/:id', likeProject)
projectRoutes.patch('/unlike/:id', unlikeProject)

projectRoutes.patch('/favorite/:id', favorite)
projectRoutes.patch('/unfavorite/:id', unfavorite)

export default projectRoutes;