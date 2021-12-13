const router = require('express').Router()
const projectAddController = require('../controllers/project.add.controller')
const projectController = require('../controllers/project.controller')

router.post('/add', projectAddController.createProject)

router.get('/', projectController.readProject)
router.get('/:id', projectController.projectInfo)
router.put('/:id', projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

module.exports = router;