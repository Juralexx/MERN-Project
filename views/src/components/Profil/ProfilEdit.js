import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfil } from "../../actions/user.action";

const ProfilEdit = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false);
    const [pseudo, setPseudo] = useState(userData.pseudo);
    const [email, setEmail] = useState(userData.email);
    const [name, setName] = useState(userData.name);
    const [lastname, setLastname] = useState(userData.lastname);
    const [work, setWork] = useState(userData.work);
    const [phone, setPhone] = useState(userData.phone);

    const handleUpdate = () => {
        dispatch(updateProfil(userData._id, pseudo, email, name, lastname, work, phone))
        setSubmitted(true)
    };

    return (
        <> { submitted ? ( 
            <> 
                <p className="success">Vos modifications ont bien été prisent en compte !</p>
            </> 
        ) : (
            <></>
        )}
        <form action="" onSubmit={handleUpdate} id="update-form">
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} defaultValue={userData.pseudo} />
            <div className="pseudo error"></div>

            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} defaultValue={userData.email} />
            <div className="email error"></div>

            <label htmlFor="name">Prénom</label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} defaultValue={userData.name} />
            <div className="name error"></div>

            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname" onChange={(e) => setLastname(e.target.value)} defaultValue={userData.lastname} />
            <div className="lastname error"></div>

            <label htmlFor="work">Métier</label>
            <input type="text" name="work" id="work" onChange={(e) => setWork(e.target.value)} defaultValue={userData.work} />
            <div className="work error"></div>

            <label htmlFor="phone">Téléphone</label>
            <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} defaultValue={userData.phone} />
            <div className="phone error"></div>

            <button className="btn btn-primary" type="submit">Enregistrer</button>

            
        </form>
        
        </> 
    );
};

export default ProfilEdit;