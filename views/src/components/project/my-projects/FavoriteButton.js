import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { BsStar, BsStarFill } from "react-icons/bs"
import { UidContext } from '../../AppContext';
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { favoriteProject, unfavoriteProject } from '../../../actions/project.action';

const FavoriteButton = ({ project }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        if (project.favorites.includes(uid)) { setFavorite(true) }
        else { setFavorite(false) }
    }, [project.favorites, uid])

    const addFavorite = () => {
        dispatch(favoriteProject(project._id, uid))
        setFavorite(true)
    }
    const pullFavorite = () => {
        dispatch(unfavoriteProject(project._id, uid))
        setFavorite(false)
    }

    return (
        <>
            {uid === null &&(
                <Popup trigger={<button className="action-btn"><BsStar /> Favoris</button>}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour ajouter ce projet à vos favoris !</div>
                </Popup>
            )}
            {uid && favorite === false && (
                <button className="action-btn" onClick={addFavorite}><BsStar /> Ajouter aux favoris</button>
            )}
            {uid && favorite === true && (
                <button className="action-btn liked" onClick={pullFavorite}><BsStarFill /> Favoris</button>
            )}
        </>
    )
}

export default FavoriteButton;