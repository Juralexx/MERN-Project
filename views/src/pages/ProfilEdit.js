import React from 'react';
import ProfilEdit from '../components/Profil/ProfilEdit';

const ProfilEditPage = () => {
    return (
      <div className="container">
        <div className="register-form">
          <div className="register-form-header">
            <h1>Modifier mon profil</h1>
          </div>
          <div className="register-form-body">
            <ProfilEdit />
          </div>
        </div>
      </div>
    )
}

export default ProfilEditPage;