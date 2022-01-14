import React, { useEffect, useState } from "react";
import ProfilHeader from "../Profil/ProfilHeader";
import LeftNavProfil from "../Profil/LeftNavProfil";
import { useParams } from 'react-router-dom'
import axios from "axios";

const MemberProfil = () => {
  const { pseudo } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/profil/${pseudo}`)
        setUser(data)
      } catch (err) {
        console.error(err)
      }
    };
    fetch();
  }, [pseudo]);

  return (
    <>
      <>
        <LeftNavProfil />
      </>
      <div className="container">
        <div className="profil-container">
          <ProfilHeader />

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="profil-card">
                  <h5>Introduction</h5>
                  <p>{user._id}</p>
                  <p>{user.pseudo}</p>
                  <p>{user.email}</p>
                  <p>{user.name}</p>
                  <p>{user.work}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default MemberProfil