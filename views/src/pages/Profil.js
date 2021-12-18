import React, { useContext } from 'react';
import UpdateProfil from '../components/Profil/UpdateProfil';
import { UidContext } from '../components/AppContext';

const Profil = () => {
  const uid = useContext(UidContext)

  if (uid) {
    return (
      <UpdateProfil />
    )
  }
  else {
    return ( window.location = '/' )
  }
}

export default Profil;