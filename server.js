"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({ 
    path: './config/.env' 
})
const PORT = process.env.PORT || 3000
require('./config/db.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
})