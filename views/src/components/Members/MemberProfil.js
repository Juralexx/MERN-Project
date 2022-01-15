import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const MemberProfil = () => {
  const { pseudo } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/profil/${pseudo}`)
        data.pseudo ? setUser(data) : navigate('/')
        
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, [pseudo]);

  return (
    <>
      <div className="container">
        <h1>Bienvenu sur la page de {user.pseudo}</h1>
      </div>
    </>

  )
}

export default MemberProfil