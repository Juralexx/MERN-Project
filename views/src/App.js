import React, { useEffect, useState } from 'react';
import Index from './components/Routes/index';
import Loader from './pages/Loader';
import { UidContext } from "./components/AppContext"
import axios from 'axios';
import { getUser } from './actions/user.action';
import { useDispatch } from 'react-redux'

function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async() => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => { setUid(res.data) } )
      .catch((err) => console.log(err))
    }
  fetchToken();

  if(uid) { dispatch(getUser(uid)) }
  }, ); //[uid][dispatch]


  return (
    <UidContext.Provider value={uid}>
      <Loader />
      <Index />
    </UidContext.Provider>
  );
}

export default App;