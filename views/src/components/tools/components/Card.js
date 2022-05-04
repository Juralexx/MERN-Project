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
            <div className={`state ${stateToBackground(element)}`}>{stateToString(element.state)}</div>
            <FavoriteButton project={element} />
            <div className="card-body">
                <Link to={"/project/" + element.URLID + "/" + element.URL}>
                    <div className="card-title">
                        <h4 className="one_line mb-2 !leading-6">{element.title}</h4>
                        <p><FaMapMarkerAlt />{element.location + ", " + element.department}</p>
                        <p><IoAlbums />{element.category}</p>
                    </div>
                </Link>
                <div className="three_lines text-sec py-2 mb-2 !leading-6 h-20"><p>{element.description}</p></div>
                <div className="card-footer flex col-12">
                    <div className="footer-left col-8">
                        <LikersButton project={element} onClick={() => { setProject(element); setOpenLikersModal(true) }} />
                        <FollowersButton project={element} onClick={() => { setProject(element); setOpenFollowersModal(true) }} />
                    </div>
                    <div className="footer-right col-4 flex pt-2">
                        <div className="footer-name">
                            <p className="name"><Link to={`/${element.posterPseudo}`}>{element.posterPseudo}</Link></p>
                            <p className="date">{dateParser(element.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card