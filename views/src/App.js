import React, { useEffect, useRef, useState } from 'react';
import Index from './components/routes/index';
import { UidContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'
// import { io } from 'socket.io-client'

function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

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
    fetchToken();

    if (uid) dispatch(getUser(uid))
  }, [uid])

//   const websocket = useRef()
//   websocket.current = io('ws://localhost:3001')
//   const [onlineUsers, setOnlineUsers] = useState([])
//   useEffect(() => {
//     websocket.current.emit("addUser", uid)
//     websocket.current.on("getUsers", (users) => {
//       const getUsers = async () => {
//           try {
//               const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
//               setOnlineUsers(response.data.friends.filter((f) => users.some((u) => u.userId === f.friend)))
//           } catch (err) {
//               console.log(err)
//           }
//       }
//       getUsers()
//   })
// }, [uid, onlineUsers.length])

  return (
    <UidContext.Provider value={uid}>
      <Index />
    </UidContext.Provider>
  );
}

export default App;