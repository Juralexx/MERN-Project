import express from 'express'
const workRoutes = express.Router()
import { findWork, getWorks } from './work.api.controller.js';

workRoutes.get('/', getWorks)
workRoutes.get('/:query', findWork)

export default workRoutes;