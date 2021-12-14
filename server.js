"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const projectRoutes = require('./routes/project.routes')
require('dotenv').config({ path: './config/.env' })
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
require('./config/db.js')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
})