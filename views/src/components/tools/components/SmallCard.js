import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { dateParser } from '../../Utils';
import { stateToBackground, stateToString } from '../functions/function';
import { projectPicture } from '../functions/useAvatar';
import FavoriteButton from './FavoriteButton'
import FollowersButton from './FollowersButton'
import FollowersModal from './FollowersModal'
import LikersModal from './LikersModal'
import LikersButton from './LikersButton'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoAlbums } from 'react-icons/io5'
import { BsFillPeopleFill } from 'react-icons/bs';

const SmallCard = ({ element, user, websocket, style }) => {
    const [project, setProject] = useState({})
    const [openFollowersModal, setOpenFollowersModal] = useState(false)
    const [openLikersModal, setOpenLikersModal] = useState(false)

    return (
        <>
            <div className="card small-card" style={style}>
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

            {openFollowersModal &&
                <FollowersModal
                    project={project}
                    open={openFollowersModal}
                    setOpen={setOpenFollowersModal}
                    websocket={websocket}
                    user={user}
                />
            }
            {openLikersModal &&
                <LikersModal
                    project={project}
                    open={openLikersModal}
                    setOpen={setOpenLikersModal}
                    websocket={websocket}
                    user={user}
                />
            }
        </>
    )
}

export default SmallCard