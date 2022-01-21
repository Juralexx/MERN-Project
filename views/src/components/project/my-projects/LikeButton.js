import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io"
import { UidContext } from '../../AppContext';
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { likeProject, unlikeProject } from '../../../actions/project.action';

const LikeButton = ({ project }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [project.likers, uid])

    const like = () => {
        dispatch(likeProject(project._id, uid))
        setLiked(true)
    }
    const unlike = () => {
        dispatch(unlikeProject(project._id, uid))
        setLiked(false)
    }

    return (
        <>
            {uid === null &&(
                <Popup trigger={<button className="action-btn"><IoIosHeartEmpty /> <span>J'aime</span></button>}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un projet !</div>
                </Popup>
            )}
            {uid && liked === false && (
                <button className="action-btn" onClick={like}><IoIosHeartEmpty /> <span>J'aime</span></button>
            )}
            {uid && liked === true && (
                <button className="action-btn liked" onClick={unlike}><IoIosHeart /> <span>Je n'aime plus</span></button>
            )}
        </>
    )
}

export default LikeButton;