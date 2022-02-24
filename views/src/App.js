import React, { useEffect, useRef, useState } from 'react';
import Index from './components/routes/index';
import { UidContext, UserContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

function App() {
  const [uid, setUid] = useState(null)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const websocket = useRef()
  const [friends, setFriends] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  websocket.current = io('ws://localhost:3001')

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

  return (
    <UidContext.Provider value={uid}>
      <UserContext.Provider value={user}>
        <Index websocket={websocket} friends={friends} onlineUsers={onlineUsers} />
      </UserContext.Provider>
    </UidContext.Provider>
  );
}

export default App;