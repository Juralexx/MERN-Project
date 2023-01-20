import express from 'express'
const workRoutes = express.Router()
import { findWork, getWork, getWorks } from './work.api.controller.js';

workRoutes.get('/', getWorks)
workRoutes.get('/:query', findWork)
workRoutes.get('/single/:work', getWork)

export default workRoutes;