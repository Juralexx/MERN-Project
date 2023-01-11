import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { favoriteProject, unfavoriteProject } from '../../../actions/project.action';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const FavoriteButton = ({ project }) => {
    const uid = useContext(UidContext)
    const [favorite, setFavorite] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (project.favorites.includes(uid))
            setFavorite(true)
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
                    <button>
                        <Link to='/login'>
                            <AiOutlineStar />
                        </Link>
                    </button>
                </div>
            }
            {uid &&
                !favorite &&
                <div className="favorite-toggle" onClick={addFavorite}>
                    <p>Ajouter au favoris</p>
                    <button onClick={addFavorite}>
                        <AiOutlineStar />
                    </button>
                </div>
            }
            {uid &&
                favorite &&
                <div className="favorite-toggle" onClick={pullFavorite}>
                    <p>Retirer des favoris</p>
                    <button onClick={pullFavorite}>
                        <AiFillStar />
                    </button>
                </div>
            }
        </>
    )
}

export default FavoriteButton;