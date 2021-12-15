import React from 'react';
import Log from '../components/log';

const Profil = () => {
  return (
    <div classNome="profil-page">
      <div className="profil-container">
        <Log signup="{ true }" signin="{ false }"/>
      </div>
    </div>
  );
}

export default Profil;