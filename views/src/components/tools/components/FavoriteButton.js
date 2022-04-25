import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { favoriteProject, unfavoriteProject } from '../../../actions/project.action';
import { IconToggle } from './Button';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const FavoriteButton = ({ project }) => {
    const uid = useContext(UidContext)
    const [favorite, setFavorite] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (project.favorites.includes(uid)) setFavorite(true)
        else setFavorite(false)
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
            {!uid &&
                <div className="favorite-toggle">
                    <p>Ajouter au favoris</p>
                    <IconToggle icon={<AiOutlineStar />} />
                </div>
            }
            {uid && !favorite &&
                <div className="favorite-toggle" onClick={addFavorite}>
                    <p>Ajouter au favoris</p>
                    <IconToggle icon={<AiOutlineStar />} />
                </div>
            }
            {uid && favorite &&
                <div className="favorite-toggle" onClick={pullFavorite}>
                    <p>Retirer des favoris</p>
                    <IconToggle icon={<AiFillStar />} />
                </div>
            }
        </>
    )
}

export default FavoriteButton;