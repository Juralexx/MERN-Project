import React, { useEffect, useState } from 'react';
import Index from './components/routes/index';
import { UidContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'
// import Loader from './components/tools/Loader';

function App() {
  const [uid, setUid] = useState(null)
  // const [user, setUser] = useState(null)
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

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     await axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
  //       withCredentials: true,
  //     })
  //       .then((res) => { setUser(res.data); console.log(res.data) })
  //       .catch((err) => console.log(err))
  //   }
  //   fetchUser();
  // }, [uid])

  return (
    <UidContext.Provider value={uid}>
      {/* <UserContext.Provider value={user}> */}
        {/* <Loader /> */}
        <Index />
      {/* </UserContext.Provider> */}
    </UidContext.Provider>
  );
}

export default App;