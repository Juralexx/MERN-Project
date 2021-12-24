import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail, updateLastname, updateName, updatePhone, updateWork } from "../../actions/user.action";

const ProfilEdit = () => {
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState(userData.email);
    const [name, setName] = useState(userData.name);
    const [lastname, setLastname] = useState(userData.lastname);
    const [work, setWork] = useState(userData.work);
    const [phone, setPhone] = useState(userData.phone);

    const handleUpdate = (e) => {
        if ((userData._id, name) !== setName(e.target.value)) { dispatch(updateName(userData._id, name)) }
        if ((userData._id, lastname) !== setLastname(e.target.value)) { dispatch(updateLastname(userData._id, lastname)) }
        if ((userData._id, work) !== setWork(e.target.value)) { dispatch(updateWork(userData._id, work)) }
        if ((userData._id, phone) !== setPhone(e.target.value)) { dispatch(updatePhone(userData._id, phone)) }

        if (setName(e.target.value) === '') dispatch(updateName((userData._id, name) === ''))
        if (setLastname(e.target.value) === '') dispatch(updateLastname((userData._id, lastname) === ''))
        if (setWork(e.target.value) === '') dispatch(updateWork((userData._id, work) === ''))
        if (setPhone(e.target.value) === '') dispatch(updatePhone((userData._id, phone) === ''))

        setSubmitted(true)
        e.preventDefault()
    };

    const handleEmailUpdate = (e) => {
        if ((userData._id, email) !== setEmail(e.target.value)) { dispatch(updateEmail(userData._id, email)) }
        setSubmitted(true)
        e.preventDefault()
    };

    return (
        <> {submitted ? (
            <>
                <p className="success">Vos modifications ont bien été prises en compte !</p>
            </>
        ) : (
            <></>
        )}
            <form action="" onSubmit={handleUpdate} id="update-form">
                <div className="top">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" name="pseudo" id="pseudo" disabled readOnly defaultValue={userData.pseudo} />

                    <label htmlFor="name">Prénom</label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} defaultValue={userData.name} />
                    <div className="name error"></div>
                </div>
                <div className="center">
                    <label htmlFor="work">Métier</label>
                    <input type="text" name="work" id="work" onChange={(e) => setWork(e.target.value)} defaultValue={userData.work} />
                    <div className="work error"></div>

                    <label htmlFor="lastname">Nom</label>
                    <input type="text" name="lastname" id="lastname" onChange={(e) => setLastname(e.target.value)} defaultValue={userData.lastname} />
                    <div className="lastname error"></div>
                </div>

                <div className="bottom">
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} defaultValue={userData.phone} />
                    <div className="phone error"></div>
                </div>


                <button className="btn btn-primary" id="checkout" disabled type="submit">Enregistrer</button>
            </form>

            <form action="" onSubmit={handleEmailUpdate} id="update-email-form">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} defaultValue={userData.email} />
                <div className="email error"></div>

                <button className="btn btn-primary" type="submit">Enregistrer</button>
            </form>
        </>
    );
};
export const emailError = document.querySelector('.email.error');
export default ProfilEdit;