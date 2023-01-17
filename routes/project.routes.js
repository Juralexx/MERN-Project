import express from 'express'
const projectRoutes = express.Router()
import { createProject } from '../controllers/project/project.add.controller.js'
import { getAllProjects, findProjectByURL, updateProject, deleteProject, findProjectById } from '../controllers/project/project.controller.js'
import { like, unlike, follow, unfollow, favorite, unfavorite } from '../controllers/project/project.actions.controller.js'
import { acceptMemberRequest, cancelMemberRequest, refuseMemberRequest, leaveProject, sendMemberRequest, nameAdmin, removeAdmin } from '../controllers/project/project.members.controller.js'
import { commentTask, createTask, deleteTask, updateTask } from '../controllers/project/project.tasks.controller.js'
import { deletePictures, updatePictures, uploadPictures } from '../controllers/project/project.upload.controller.js'
import { createActuality, deleteActuality, deleteActualityPictures, updateActuality, updateActualityPictures, uploadActualityPictures } from '../controllers/project/project.actuality.controller.js'
import { createQNA, deleteQNA, updateQNA } from '../controllers/project/project.faq.controller.js'
import multer from 'multer'
const upload = multer()

projectRoutes.post('/add', createProject)

projectRoutes.get('/', getAllProjects)
projectRoutes.get('/:URLID/:URL', findProjectByURL)
projectRoutes.get('/:id', findProjectById)
projectRoutes.put('/:id', updateProject)
projectRoutes.delete('/:id', deleteProject)

projectRoutes.put('/:id/uploads/pictures/add/', upload.array('files', 6), uploadPictures)
projectRoutes.put('/:id/uploads/pictures/update/', upload.array('files', 6), updatePictures)
projectRoutes.put('/:id/uploads/pictures/delete/', deletePictures)

projectRoutes.put('/:id/members/remove/', leaveProject)
projectRoutes.put('/:id/members/request/send/', sendMemberRequest)
projectRoutes.put('/:id/members/request/cancel/', cancelMemberRequest)
projectRoutes.put('/:id/members/request/accept/', acceptMemberRequest)
projectRoutes.put('/:id/members/request/refuse/', refuseMemberRequest)

projectRoutes.put('/:id/members/admins/add/', nameAdmin)
projectRoutes.put('/:id/members/admins/remove/', removeAdmin)

projectRoutes.put('/:id/tasks/add/', createTask)
projectRoutes.put('/:id/tasks/update/', updateTask)
projectRoutes.put('/:id/tasks/delete/', deleteTask)
projectRoutes.put('/:id/tasks/comment/', commentTask)

projectRoutes.put('/:id/actualities/add/', createActuality)
projectRoutes.put('/:id/actualities/:actualityId/update/', upload.array('files'), updateActuality)

projectRoutes.put('/:id/actualities/:actualityId/delete/', deleteActuality)
projectRoutes.put('/:id/actualities/:actualityId/pictures/add/', upload.array('files', 3), uploadActualityPictures)
projectRoutes.put('/:id/actualities/:actualityId/pictures/update/', upload.array('files', 3), updateActualityPictures)
projectRoutes.put('/:id/actualities/:actualityId/pictures/delete/', deleteActualityPictures)

projectRoutes.put('/:id/qna/add/', createQNA)
projectRoutes.put('/:id/qna/update/', updateQNA)
projectRoutes.put('/:id/qna/delete/', deleteQNA)

projectRoutes.patch('/:id/follow/', follow)
projectRoutes.patch('/:id/unfollow/', unfollow)
projectRoutes.patch('/:id/like/', like)
projectRoutes.patch('/:id/unlike/', unlike)
projectRoutes.patch('/:id/favorite/', favorite)
projectRoutes.patch('/:id/unfavorite/', unfavorite)

export default projectRoutes;