import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { favoriteProject, unfavoriteProject } from '../../../reducers/project.action';
import Icon from '../icons/Icon';
import styled from 'styled-components';

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
                <FavoriteToggle>
                    <p>Ajouter au favoris</p>
                    <button>
                        <Link to='/login'>
                            <Icon name="StarHalf" />
                        </Link>
                    </button>
                </FavoriteToggle>
            }
            {uid &&
                !favorite &&
                <FavoriteToggle onClick={addFavorite}>
                    <p>Ajouter au favoris</p>
                    <button onClick={addFavorite}>
                        <Icon name="StarHalf" />
                    </button>
                </FavoriteToggle>
            }
            {uid &&
                favorite &&
                <FavoriteToggle onClick={pullFavorite}>
                    <p>Retirer des favoris</p>
                    <button onClick={pullFavorite}>
                        <Icon name="Star" />
                    </button>
                </FavoriteToggle>
            }
        </>
    )
}

export default FavoriteButton;

const FavoriteToggle = styled.div`
    position        : absolute;
    top             : 110px;
    right           : 8px;
    display         : flex;
    align-items     : center;
    justify-content : center;
    padding         : 7px;
    background      : var(--content-light);
    border-radius   : var(--rounded-full);
    box-shadow      : var(--shadow-tiny);

    svg {
        color  : var(--yellow);
        width  : 20px;
        height : 20px;
    }

    p {
        position     : absolute;
        opacity      : 0;
        visibility   : hidden;
        font-size    : 13px;
        white-space  : nowrap;
        margin-right : 7px;
    }

    &:hover {
        padding-left : 15px;
        transition   : .3s ease;

        p {
            position   : unset;
            opacity    : 1;
            visibility : visible;
            transition : 1s ease .2s;
        }
    }
`