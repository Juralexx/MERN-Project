import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fullImage } from '../Utils'

const UserCard = ({ project }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}api/user/${project.posterId}`)
                .then(res => {
                    setUser(res.data)
                }).catch(err => console.log(err))
        }
        fetchUser()
    }, [])

    return (
        user !== null &&
        <div className="user-card">
            <div className="user-avatar" style={fullImage(user.picture)}></div>
            <div className="user-title">{user.pseudo}</div>
            <div className="user-informations">
                <p><span>•</span> {user.created_projects.length} projets créés</p>
                <p><span>•</span> A Participé à {user.projects.length} projets</p>
                {user.bio && <p>{user.bio}</p>}
            </div>
        </div>
    )
}

export default UserCard