import express from 'express'
const LocationRoutes = express.Router()
import { findLocation, getLocation } from './locationapi.controller.js';

LocationRoutes.get('/', getLocation)
LocationRoutes.get('/:query', findLocation)

export default LocationRoutes;