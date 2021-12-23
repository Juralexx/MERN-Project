import React from 'react';
import ProfilEdit from '../components/Profil/ProfilEdit';

const ProfilEditPage = () => {
    return (
      <div className="container">
        <div className="update-form">
          <div className="update-form-header">
            <h1>Modifier mon profil</h1>
          </div>
          <div className="update-form-body">
            <ProfilEdit />
          </div>
        </div>
      </div>
    )
}

export default ProfilEditPage;