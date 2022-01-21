import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { MdOutlineLogin } from "react-icons/md"
import { UidContext } from '../../AppContext';
import { Popup } from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { followProject, unfollowProject } from '../../../actions/project.action';

const FollowButton = ({ project }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        if (project.followers.includes(uid)) { setFollowed(true) }
        else { setFollowed(false) }
    }, [project.followers, uid])

    const follow = () => {
        dispatch(followProject(project._id, uid))
        setFollowed(true)
    }
    const unfollow = () => {
        dispatch(unfollowProject(project._id, uid))
        setFollowed(false)
    }

    return (
        <>
            {uid === null && (
                <Popup trigger={<button className="action-btn"><MdOutlineLogin /> <span>Suivre</span></button>}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour suivre un projet !</div>
                </Popup>
            )}
            {uid && followed === false && (
                <button className="action-btn" onClick={follow}><MdOutlineLogin /> <span>Suivre</span></button>
            )}
            {uid && followed === true && (
                <button className="action-btn" onClick={unfollow}><MdOutlineLogin /> <span>Ne plus suivre</span></button>
            )}
        </>
    )
}

export default FollowButton;