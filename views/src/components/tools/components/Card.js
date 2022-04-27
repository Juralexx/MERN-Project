import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { dateParser } from '../../Utils';
import { stateToBackground, stateToString } from '../functions/function';
import { projectPicture } from '../functions/useAvatar';
import FavoriteButton from './FavoriteButton'
import FollowersButton from './FollowersButton'
import LikersButton from './LikersButton'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoAlbums } from 'react-icons/io5'

const Card = ({ element, setProject, setOpenLikersModal, setOpenFollowersModal }) => {
    return (
        <div className="card">
            <div className="card-img" style={projectPicture(`${process.env.REACT_APP_API_URL}files/img/paysage-3.jpg`)}></div>
            <FavoriteButton project={element} />
            <div className="card-body">
                <Link to={"/project/" + element.URLID + "/" + element.URL}>
                    <div className="card-title">
                        <h3>{element.title}</h3>
                        <p><FaMapMarkerAlt />{element.location + ", " + element.department}</p>
                        <p><IoAlbums />{element.category}</p>
                    </div>
                </Link>
                <div className="card-head">
                    {element.works.length > 0 &&
                        <div className="contributors"><BsFillPeopleFill /><p>{element.works.length}</p></div>
                    }
                    <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
                </div>
                <div className="description"><p>{element.description}</p></div>
                <div className="card-footer">
                    <div className="footer-left">
                        <LikersButton project={element} onClick={() => { setProject(element); setOpenLikersModal(true) }} />
                        <FollowersButton project={element} onClick={() => { setProject(element); setOpenFollowersModal(true) }} />
                    </div>
                    <div className="footer-right">
                        <div className="footer-name">
                            <p className="name">par <Link to={`/${element.posterPseudo}`}>{element.posterPseudo}</Link></p>
                            <p className="date">le {dateParser(element.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card