import React from "react";
import { Outlet } from "react-router-dom";
import ProfilHeader from "../components/Profil/ProfilHeader";
import LeftNavProfil from "../components/Profil/LeftNavProfil";

const Profil = () => {

  return (
    <>
      <>
        <LeftNavProfil />
      </>
      <div className="container">
        <div className="profil-container">
          <ProfilHeader />

          <Outlet />
        </div>
      </div>
    </>

  )
}

export default Profil