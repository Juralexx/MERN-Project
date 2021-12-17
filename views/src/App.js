import React, { useEffect, useState } from 'react';
import Index from './components/Routes/index';
import { UidContext } from "./components/AppContext"
import axios from 'axios';

function App() {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const fetchToken = async() => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => { setUid(res.data) } )
      .catch((err) => console.log('No token'))
    }
  fetchToken();
  }, [uid]);


  return (
    <UidContext.Provider value={uid}>
      <Index />
    </UidContext.Provider>
  );
}

export default App;