import express from 'express'
const projectRoutes = express.Router()
import { createProject } from '../controllers/project.add.controller.js'
import { readProject, projectInfo, updateProject, deleteProject } from '../controllers/project.controller.js'

projectRoutes.post('/add', createProject)

projectRoutes.get('/', readProject)
projectRoutes.get('/:id', projectInfo)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

export default projectRoutes;