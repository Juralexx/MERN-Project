import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { favoriteProject, unfavoriteProject } from '../../../reducers/project.action';
import Icon from '../icons/Icon';

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
                            <Icon name="StarHalf" />
                        </Link>
                    </button>
                </div>
            }
            {uid &&
                !favorite &&
                <div className="favorite-toggle" onClick={addFavorite}>
                    <p>Ajouter au favoris</p>
                    <button onClick={addFavorite}>
                        <Icon name="StarHalf" />
                    </button>
                </div>
            }
            {uid &&
                favorite &&
                <div className="favorite-toggle" onClick={pullFavorite}>
                    <p>Retirer des favoris</p>
                    <button onClick={pullFavorite}>
                        <Icon name="Star" />
                    </button>
                </div>
            }
        </>
    )
}

export default FavoriteButton;