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
import workRoutes from './api/work/work.api.routes.js'
import locationRoutes from './api/location/location.api.routes.js'
import geolocationRoutes from './api/geolocation/geolocations.api.routes.js'
import conversationRoutes from './routes/conversation.routes.js'

const app = express();

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

app.use('/uploads', express.static('./uploads'))
app.use('/files', express.static('./files'))

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/conversation', conversationRoutes)
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

    socket.on("logout", ({ receiverId, userId }) => {
        users = users.filter(user => user.userId !== userId)
        const user = users.find(member => member.userId === receiverId)
        return io.to(user.socketId).emit('logout', {
            userId
        })
    })

    /***********************************************************************************/
    /************************************* CONTACTS **************************************/

    socket.on('contactRequest', ({ notification, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('contactRequest', {
                notification
            })
        }
    })

    socket.on('cancelContactRequest', ({ type, requesterId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('cancelContactRequest', {
                type,
                requesterId
            })
        }
    })

    socket.on('acceptContactRequest', ({ receiverId, contact }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('acceptContactRequest', {
                contact
            })
        }
    })

    socket.on('refuseContactRequest', ({ userId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('refuseContactRequest', {
                userId
            })
        }
    })

    socket.on('deleteContact', ({ userId, receiverId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteContact', {
                userId
            })
        }
    })

    /***********************************************************************************/
    /************************* MEMBER REQUEST FROM PROJECT *****************************/

    socket.on('sendMemberRequestFromProject', ({ receiverId, request, notification }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('sendMemberRequestFromProject', {
                request,
                notification
            })
        }
    })

    socket.on('cancelMemberRequestFromProject', ({ receiverId, notificationId, requestId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('cancelMemberRequestFromProject', {
                requestId,
                notificationId
            })
        }
    })

    socket.on('refuseMemberRequestFromProject', ({ receiverId, requestId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('refuseMemberRequestFromProject', {
                requestId
            })
        }
    })

    socket.on('acceptMemberRequestFromProject', ({ receiverId, member, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('acceptMemberRequestFromProject', {
                member,
                activity
            })
        }
    })

    /***********************************************************************************/
    /*************************** MEMBER REQUEST FROM USER ******************************/

    socket.on('sendMemberRequestFromUser', ({ receiverId, request }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('sendMemberRequestFromUser', {
                request
            })
        }
    })

    socket.on('cancelMemberRequestFromUser', ({ receiverId, requestId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('cancelMemberRequestFromUser', {
                requestId
            })
        }
    })

    socket.on('refuseMemberRequestFromUser', ({ receiverId, requestId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('refuseMemberRequestFromUser', {
                requestId
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

    /**
     * ACTUALITY
     */

    socket.on('createActuality', ({ receiverId, actuality, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('createActuality', {
                actuality,
                activity
            })
        }
    })

    socket.on('updateActuality', ({ receiverId, actuality, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateActuality', {
                actuality,
                activity
            })
        }
    })

    socket.on('deleteActuality', ({ receiverId, actuality, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteActuality', {
                actuality,
                activity
            })
        }
    })

    /**
     * QNA
     */

    socket.on('createQna', ({ receiverId, qna, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('createQna', {
                qna,
                activity
            })
        }
    })

    socket.on('updateQna', ({ receiverId, qna, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('updateQna', {
                qna,
                activity
            })
        }
    })

    socket.on('deleteQna', ({ receiverId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteQna', {
                activity
            })
        }
    })

    /**
     * TASKS
     */

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
                task,
                activity
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

    socket.on('deleteTask', ({ receiverId, taskId, activity }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('deleteTask', {
                taskId,
                activity
            })
        }
    })

    socket.on('commentTask', ({ receiverId, taskId, comment }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('commentTask', {
                taskId,
                comment
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
    
    /***********************************************************************************/
    /********************************** MESSENGER **************************************/

    socket.on("onMessenger", ({ userId, conversationId }) => {
        const user = users.find(member => member.userId === userId)
        if (user)
            Object.assign(user, { conversationId: conversationId })

        console.log(users.length)
    })

    socket.on("leaveMessenger", ({ userId }) => {
        const user = users.find(member => member.userId === userId)
        if (user) delete user.conversationId
    })

    socket.on("changeCurrentConversation", ({ userId, conversationId }) => {
        const user = users.find(member => member.userId === userId)
        if (user) {
            user.conversationId = conversationId
        }
    })

    socket.on('typing', ({ sender, receiverId, conversationId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            if (user.conversationId && user.conversationId === conversationId) {
                return io.to(user.socketId).emit('typing', {
                    sender,
                    conversationId
                })
            }
        }
    })

    socket.on('addConversation', ({ receiverId, conversationId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('addConversation', {
                conversationId
            })
        }
    })

    socket.on('updateConversation', ({ receiverId, conversationId, name, description }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('updateConversation', {
                name,
                description
            })
        }
    })

    socket.on('updateConversationPicture', ({ receiverId, conversationId, picture }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('updateConversationPicture', {
                picture
            })
        }
    })

    socket.on('deleteConversationPicture', ({ receiverId, conversationId }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('deleteConversationPicture')
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

    socket.on('addConversationMember', ({ receiverId, newMember }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('addConversationMember', {
                newMember
            })
        }
    })

    socket.on('joinConversation', ({ receiverId, conversationId }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user) {
            return io.to(user.socketId).emit('joinConversation', {
                conversationId
            })
        }
    })

    socket.on('removeConversationMember', ({ receiverId, memberId }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('removeConversationMember', {
                memberId
            })
        }
    })

    socket.on('leaveConversation', ({ receiverId, conversationId }) => {
        const user = users.filter(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('leaveConversation', {
                conversationId
            })
        }
    })

    socket.on("sendMessage", ({ receiverId, conversationId, message }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user) {
            if (user.conversationId && user.conversationId === conversationId) {
                return io.to(user.socketId).emit("getMessage", {
                    message
                })
            } else if (user.conversationId && user.conversationId !== conversationId) {
                return io.to(user.socketId).emit("getNotification", {
                    message
                })
            } else {
                return io.to(user.socketId).emit("sendMessageNotification", {
                    message
                })
            }
        }
    })

    socket.on('updateMessage', ({ receiverId, conversationId, messageId, text }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('updateMessage', {
                messageId,
                text
            })
        }
    })

    socket.on('deleteMessage', ({ receiverId, conversationId, messageId }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('deleteMessage', {
                messageId
            })
        }
    })

    socket.on('addEmoji', async ({ receiverId, conversationId, messageId, emoji }) => {
        const user = await users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('addEmoji', {
                conversationId,
                messageId,
                emoji
            })
        }
    })

    socket.on('removeEmoji', async ({ receiverId, conversationId, messageId, emojiId }) => {
        const user = await users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('removeEmoji', {
                conversationId,
                messageId,
                emojiId
            })
        }
    })

    socket.on('deleteFile', ({ receiverId, conversationId, messageId, file }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('deleteFile', {
                messageId,
                file
            })
        }
    })

    socket.on('customizeConversationPseudo', ({ receiverId, conversationId, userId, pseudo }) => {
        const user = users.find(member => member.userId === receiverId)
        if (user && user.conversationId && user.conversationId === conversationId) {
            return io.to(user.socketId).emit('customizeConversationPseudo', {
                userId,
                pseudo
            })
        }
    })
})