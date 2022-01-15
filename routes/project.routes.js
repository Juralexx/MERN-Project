import express from 'express'
const projectRoutes = express.Router()
import { createProject } from '../controllers/project.add.controller.js'
import { readProject, projectInfo, updateProject, deleteProject, likeProject, unlikeProject } from '../controllers/project.controller.js'

projectRoutes.post('/add', createProject)

projectRoutes.get('/', readProject)
projectRoutes.get('/:id', projectInfo)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

projectRoutes.patch('/like-project/:id', likeProject)
projectRoutes.patch('/unlike-project/:id', unlikeProject)

export default projectRoutes;