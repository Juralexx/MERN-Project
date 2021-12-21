const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoutes = require('./routes/user.routes')
const projectRoutes = require('./routes/project.routes')
require('dotenv').config({ path: './config/.env' })
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
require('./config/db.js')

const app = express();

app.use(cors({
    credentials: true, 
    origin :process.env.FRONT_URL,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false,
}))
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    return res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)

if(process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
})
