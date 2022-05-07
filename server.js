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
import geolocationRoutes from './api/geolocations.api.routes.js'
import conversationRoutes from './routes/conversation.routes.js'

const app = express();
app.use('/uploads', express.static('./uploads'))
app.use('/files', express.static('./files'))

app.use(cors({
    mode: 'no-cors',
    credentials: true,
    origin: process.env.FRONT_URL,
    "Access-Control-Allow-Origin": process.env.FRONT_URL,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, OPTIONS, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false,
}))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    return res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/work', workRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/geolocation', geolocationRoutes)

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', err => {
        console.error(err.stack || err)
        setTimeout(() => process.exit(1), 100)
    })
}

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})

/************************************************************************************/
/*********************************** WEBSOCKET **************************************/
/************************************************************************************/

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

    /***********************************************************************************/
    /********************************** MESSENGER **************************************/

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

    socket.on("sendMessage", ({ senderId, sender_pseudo, sender_picture, receiverId, text, conversationId, createdAt }) => {
        let user = users.find(member => member.userId === receiverId)
        if (user) {
            if (user.conversationId && user.conversationId === conversationId) {
                return io.to(user.socketId).emit("getMessage", {
                    senderId,
                    sender_pseudo,
                    text,
                    conversationId,
                    createdAt,
                })
            } else if (user.conversationId && user.conversationId !== conversationId) {
                return io.to(user.socketId).emit("getNotification", {
                    senderId,
                    sender_pseudo,
                    text,
                    conversationId,
                    createdAt,
                })
            } else {
                return io.to(user.socketId).emit("sendMessageNotification", {
                    senderId,
                    sender_pseudo,
                    sender_picture,
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

    /***********************************************************************************/
    /************************************* FRIEND **************************************/

    socket.on('friendRequest', ({ notification, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('friendRequest', {
                notification
            })
        }
    })

    socket.on('cancelFriendRequest', ({ type, requesterId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('cancelFriendRequest', {
                type,
                requesterId
            })
        }
    })

    socket.on('acceptFriendRequest', ({ receiverId, friend }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('acceptFriendRequest', {
                friend
            })
        }
    })

    socket.on('refuseFriendRequest', ({ userId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('refuseFriendRequest', {
                userId
            })
        }
    })

    socket.on('deleteFriend', ({ userId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteFriend', {
                userId
            })
        }
    })

    /***********************************************************************************/
    /**************************** PROJECT MEMBER REQUEST *******************************/

    socket.on('memberRequest', ({ receiverId, notification }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('memberRequest', {
                notification
            })
        }
    })

    socket.on('cancelMemberRequest', ({ notificationId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('cancelMemberRequest', {
                notificationId
            })
        }
    })

    socket.on('acceptMemberRequest', ({ receiverId, member, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('acceptMemberRequest', {
                member,
                activity
            })
        }
    })

    socket.on('refuseMemberRequest', ({ receiverId, userId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('refuseMemberRequest', {
                userId
            })
        }
    })

    /***********************************************************************************/
    /************************************** ADMIN **************************************/

    socket.on('nameAdmin', ({ receiverId, userId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('nameAdmin', {
                userId,
                activity
            })
        }
    })

    socket.on('removeAdmin', ({ receiverId, userId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('removeAdmin', {
                userId
            })
        }
    })

    /***********************************************************************************/
    /********************************** LEAVE PROJECT **********************************/

    socket.on('leaveProject', ({ receiverId, projectId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('leaveProject', {
                projectId,
                activity
            })
        }
    })

    socket.on('removeMember', ({ receiverId, memberId, projectId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('removeMember', {
                memberId,
                projectId,
                activity
            })
        }
    })

    /***********************************************************************************/
    /************************************** TASKS **************************************/

    socket.on('createTask', ({ receiverId, task, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('createTask', {
                task,
                activity
            })
        }
    })

    socket.on('updateTask', ({ receiverId, task, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateTask', {
                task
            })
        }
    })

    socket.on('updateTaskState', ({ receiverId, taskId, state, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateTaskState', {
                taskId,
                state,
                activity
            })
        }
    })

    socket.on('updateTaskStatus', ({ receiverId, taskId, status, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateTaskStatus', {
                taskId,
                status,
                activity
            })
        }
    })

    socket.on('deleteTask', ({ receiverId, taskId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteTask', {
                taskId,
                activity
            })
        }
    })

    /***********************************************************************************/
    /************************************ PICTURES *************************************/

    socket.on('updateGallery', ({ receiverId, pictures, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateGallery', {
                pictures,
                activity
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