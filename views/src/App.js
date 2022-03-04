import React, { useEffect, useRef, useState } from 'react';
import Index from './components/routes/index';
import { UidContext, UserContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import Notification from './components/messenger/Notification';

function App() {
  const [uid, setUid] = useState(null)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const [friends, setFriends] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const websocket = useRef()
  websocket.current = io('ws://localhost:3001')
  const [sentNotification, setSentNotification] = useState({})
  const [send, setSend] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => { setUid(res.data) })
        .catch((err) => console.log(err))
    }
    fetchToken()

    if (uid) {
      dispatch(getUser(uid))
      const fetchUser = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
          .then((res) => setUser(res.data))
      }
      fetchUser()
    }
  }, [uid, websocket])

  useEffect(() => {
    if (user) {
      websocket.current.emit("addUser", { userId: uid })
      websocket.current.on("getUsers", (users) => {
        setFriends(user.friends)
        setOnlineUsers(user.friends.filter((f) => users.some((u) => u.userId === f.friend)))
      })
    }
  }, [user])

  useEffect(() => {
    if (!window.location.href.includes("messenger")) {
      websocket.current.emit("leaveMessenger", {
        userId: uid
      })
    }
  }, [uid, websocket])

  useEffect(() => {
    websocket.current.on("sendMessageNotification", data => {
      setSend(true)
      setSentNotification({
        sender: data.senderId,
        sender_pseudo: data.sender_pseudo,
        sender_picture: data.sender_picture,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: new Date().toISOString()
      })
    })
  }, [websocket.current])

  return (
    <UidContext.Provider value={uid}>
      <UserContext.Provider value={user}>
        <Index websocket={websocket} friends={friends} onlineUsers={onlineUsers} />
        {send && <Notification sentNotification={sentNotification} setSend={setSend} send={send} />}
      </UserContext.Provider>
    </UidContext.Provider>
  );
}

export default App;