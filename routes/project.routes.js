import express from 'express'
const projectRoutes = express.Router()
import { createProject, uploadProjectPictures } from '../controllers/project/project.add.controller.js'
import { readProject, projectInfo, updateProject, deleteProject, findProject } from '../controllers/project/project.controller.js'
import { likeProject, unlikeProject, follow, unfollow, favorite, unfavorite } from '../controllers/project/project.actions.controller.js'
import { acceptMemberRequest,  cancelMemberRequest,  refuseMemberRequest,  leaveProject, sendMemberRequest, nameAdmin, removeAdmin } from '../controllers/project/project.members.controller.js'
import { createTask, deleteTask, updateTask } from '../controllers/project/project.tasks.controller.js'
import multer from 'multer'
const upload = multer()

projectRoutes.post('/add', createProject)
projectRoutes.post('/add/pictures', upload.array('files', 5), uploadProjectPictures)

projectRoutes.get('/', readProject)
projectRoutes.get('/:titleURL', projectInfo)
projectRoutes.get('/single/:id', findProject)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

projectRoutes.put('/remove-user/:id', leaveProject)
projectRoutes.put('/send-member-request/:id', sendMemberRequest)
projectRoutes.put('/cancel-member-request/:id', cancelMemberRequest)
projectRoutes.put('/accept-member-request/:id', acceptMemberRequest)
projectRoutes.put('/refuse-member-request/:id', refuseMemberRequest)

projectRoutes.put('/name-admin/:id', nameAdmin)
projectRoutes.put('/remove-admin/:id', removeAdmin)

projectRoutes.put('/add-task/:id', createTask)
projectRoutes.put('/update-task/:id', updateTask)
projectRoutes.put('/delete-task/:id', deleteTask)

projectRoutes.patch('/follow/:id', follow)
projectRoutes.patch('/unfollow/:id', unfollow)
projectRoutes.patch('/like/:id', likeProject)
projectRoutes.patch('/unlike/:id', unlikeProject)
projectRoutes.patch('/favorite/:id', favorite)
projectRoutes.patch('/unfavorite/:id', unfavorite)

export default projectRoutes;