import express from 'express'
const locationRoutes = express.Router()
import { findLocation, getLocation } from './location.api.controller.js';

locationRoutes.get('/', getLocation)
locationRoutes.get('/:query', findLocation)

export default locationRoutes;