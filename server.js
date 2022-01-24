import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import { checkUser, requireAuth } from './middleware/auth.middleware.js'
import './config/db.js'
import workRoutes from './api/workapi.routes.js'

const app = express();

app.use(cors({
  mode: 'no-cors',
  credentials: true,
  origin: process.env.FRONT_URL,
  'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE',
  'preflightContinue': false,
}))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  return res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/work', workRoutes)

if (process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function (err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
    setTimeout(function () {
      process.exit(1);
    }, 100);
  });
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`);
})
