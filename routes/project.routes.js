import express from 'express'
const projectRoutes = express.Router()
import { createProject } from '../controllers/project/project.add.controller.js'
import { allProjects, findProjectByURL, updateProject, deleteProject, findProjectById } from '../controllers/project/project.controller.js'
import { likeProject, unlikeProject, follow, unfollow, favorite, unfavorite } from '../controllers/project/project.actions.controller.js'
import { acceptMemberRequest, cancelMemberRequest, refuseMemberRequest, leaveProject, sendMemberRequest, nameAdmin, removeAdmin } from '../controllers/project/project.members.controller.js'
import { createTask, deleteTask, updateTask } from '../controllers/project/project.tasks.controller.js'
import { deletePictures, updatePictures, uploadPictures } from '../controllers/project/project.upload.controller.js'
import { createActuality, deleteActuality, deleteActualityPictures, updateActuality, updateActualityPictures, uploadActualityPictures } from '../controllers/project/project.actuality.controller.js'
import { createQNA, deleteQNA, updateQNA } from '../controllers/project/project.faq.controller.js'
import multer from 'multer'
const upload = multer()

projectRoutes.post('/add', createProject)

projectRoutes.get('/', allProjects)
projectRoutes.get('/:URLID/:URL', findProjectByURL)
projectRoutes.get('/:id', findProjectById)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

projectRoutes.put('/add-pictures/:id', upload.array('files', 6), uploadPictures)
projectRoutes.put('/update-pictures/:id', upload.array('files', 6), updatePictures)
projectRoutes.put('/delete-pictures/:id', deletePictures)

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

projectRoutes.put('/add-actuality/:id', createActuality)
projectRoutes.put('/update-actuality/:id', upload.array('files'), updateActuality)
projectRoutes.put('/delete-actuality/:id', deleteActuality)
projectRoutes.put('/add-actuality-pictures/:id/:actualityId', upload.array('files', 3), uploadActualityPictures)
projectRoutes.put('/update-actuality-pictures/:id/:actualityId', upload.array('files', 3), updateActualityPictures)
projectRoutes.put('/delete-actuality-pictures/:id/:actualityId', deleteActualityPictures)

projectRoutes.put('/add-qna/:id', createQNA)
projectRoutes.put('/update-qna/:id', updateQNA)
projectRoutes.put('/delete-qna/:id', deleteQNA)

projectRoutes.patch('/follow/:id', follow)
projectRoutes.patch('/unfollow/:id', unfollow)
projectRoutes.patch('/like/:id', likeProject)
projectRoutes.patch('/unlike/:id', unlikeProject)
projectRoutes.patch('/favorite/:id', favorite)
projectRoutes.patch('/unfavorite/:id', unfavorite)

export default projectRoutes;