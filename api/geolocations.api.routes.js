import express from 'express'
const geolocationRoutes = express.Router()
import { getGeolocation, findGeolocation } from './geolocations.api.controller.js';

geolocationRoutes.get('/', getGeolocation)
geolocationRoutes.get('/:location', findGeolocation)

export default geolocationRoutes;