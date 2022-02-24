import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import { checkUser, requireAuth } from './middleware/auth.middleware.js'
import './config/db.js'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import workRoutes from './api/work.api.routes.js'
import locationRoutes from './api/location.api.routes.js'
import conversationRoutes from './routes/conversation.routes.js'
import messageRoutes from './routes/message.routes.js'

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
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/work', workRoutes)
app.use('/api/location', locationRoutes)

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

const server = app.listen(PORT, () => {
  console.log(`Serveur démarré : http://localhost:${PORT}`);
})

/*************************************************************/
/************************ WEBSOCKET **************************/

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origins: 'http://localhost:3000'
  }
});

let users = new Array()

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId)
    && users.push({ userId, socketId })
}

io.on("connect", (socket) => {
  socket.on("addUser", ({ userId }) => {
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  socket.on("onMessenger", ({ userId, conversationId }) => {
    const user = users.find(member => member.userId === userId)
    if (user) Object.assign(user, { conversationId: conversationId })
  })

  socket.on("leaveMessenger", ({ userId }) => {
    const user = users.find(member => member.userId === userId)
    if (user) delete user.conversationId
  })

  socket.on("changeCurrentConversation", ({ userId, conversationId }) => {
    const user = users.find(member => member.userId === userId)
    if (user) user.conversationId = conversationId
  })

  socket.on("sendMessage", ({ senderId, sender_pseudo, receiverId, text, conversationId, createdAt }) => {
    var user = users.find(member => member.userId === receiverId)
    if (user) {
      if (user.conversationId === conversationId) {
        return io.to(user.socketId).emit("getMessage", {
          senderId,
          sender_pseudo,
          text,
          conversationId,
          createdAt,
        })
      }
      if (user.conversationId !== conversationId) {
        return io.to(user.socketId).emit("getNotification", {
          senderId,
          sender_pseudo,
          text,
          conversationId,
          createdAt,
        })
      }
    }
  })

  socket.on('typing', ({ sender, receiverId, conversationId }) => {
    const user = users.find(member => member.userId === receiverId)
    if (user) {
      if (user.conversationId === conversationId) {
        return io.to(user.socketId).emit('typing', {
          sender,
          conversationId
        })
      }
    }
  })

  socket.on('addConversation', ({ receiverId, conversation }) => {
    const user = users.find(member => member.userId === receiverId)
    if (user) {
      return io.to(user.socketId).emit('addConversation', {
        conversation
      })
    }
  })

  socket.on('deleteConversation', ({ receiverId, conversationId }) => {
    const user = users.filter(member => member.userId === receiverId)
    if (user) {
      return io.to(user.socketId).emit('deleteConversation', {
        conversationId
      })
    }
  })

  socket.on('modifyMessage', ({ receiverId, conversationId, messageId, text }) => {
    const user = users.find(member => member.userId === receiverId)
    if (user) {
      return io.to(user.socketId).emit('modifyMessage', {
        conversationId,
        messageId,
        text
      })
    }
  })

  socket.on('deleteMessage', ({ receiverId, conversationId, messageId }) => {
    const user = users.find(member => member.userId === receiverId)
    if (user) {
      return io.to(user.socketId).emit('deleteMessage', {
        conversationId,
        messageId
      })
    }
  })

  socket.on('addEmoji', async ({ receiverId, conversationId, messageId, emoji }) => {
    const user = await users.find(member => member.userId === receiverId)
    console.log(user)
    if (user) {
      return io.to(user.socketId).emit('addEmoji', {
        conversationId,
        messageId,
        emoji
      })
    }
  })

  const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
  }

  socket.on("disconnect", () => {
    removeUser(socket.id)
  })
})