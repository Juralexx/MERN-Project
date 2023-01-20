import express from 'express'
const locationRoutes = express.Router()
import { findLocation, getLocation, getLocations } from './location.api.controller.js';

locationRoutes.get('/', getLocations)
locationRoutes.get('/:query', findLocation)
locationRoutes.get('/city/:location', getLocation)

export default locationRoutes;