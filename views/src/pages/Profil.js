import React from "react";
import { Outlet } from "react-router-dom";
import ProfilHeader from "../components/profil/ProfilHeader";
import LeftNavProfil from "../components/profil/LeftNavProfil";

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