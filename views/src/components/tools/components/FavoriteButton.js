import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { favoriteProject, unfavoriteProject } from '../../../actions/project.action';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { IconToggle } from './Button';

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
            {!uid && (
                <div className="absolute top-[120px] right-2">
                    <IconToggle icon={<AiOutlineStar className="w-6 h-6" />} color="yellow-400" />
                </div>
            )}
            {uid && !favorite && (
                <div className="absolute top-[120px] right-2">
                    <IconToggle icon={<AiOutlineStar className="w-6 h-6" />} color="yellow-400" onClick={addFavorite} />
                </div>
            )}
            {uid && favorite && (
                <div className="absolute top-[120px] right-2">
                    <IconToggle icon={<AiFillStar className="w-6 h-6" />} color="yellow-400" onClick={pullFavorite} />
                </div>
            )}
        </>
    )
}

export default FavoriteButton;