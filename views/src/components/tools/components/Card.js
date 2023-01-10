import React from 'react'
import { Link } from 'react-router-dom';
import { dateParser } from '../../Utils';
import { stateToBackground, stateToString } from '../../project/functions';
import { projectPicture } from '../hooks/useAvatar';
import FavoriteButton from './FavoriteButton'
import FollowersButton from './FollowersButton'
import LikersButton from './LikersButton'
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai';

const Card = ({ element, setProject, setOpenLikersModal, setOpenFollowersModal, className }) => {
    return (
        <div className={className ? 'card ' + className : 'card'}>
            <div className="card-img" style={projectPicture(`${process.env.REACT_APP_API_URL}files/img/paysage-3.jpg`)}></div>
            <div className={`state ${stateToBackground(element)}`}>
                {stateToString(element.state)}
            </div>
            <FavoriteButton
                project={element}
            />
            <div className="card-body">
                <Link to={"/project/" + element.URLID + "/" + element.URL}>
                    <div className="card-title">
                        <h4>
                            {element.title}
                        </h4>
                        <p>
                            <IoLocationOutline />
                            <span>{element.location + ", " + element.department}</span>
                        </p>
                        <p>
                            <AiOutlineUnorderedList />
                            <span>{element.category}</span>
                        </p>
                    </div>
                </Link>
                <div className="card-description">
                    {element.description}
                </div>
                <div className="card-footer flex col-12">
                    <div className="footer-left col-8">
                        <LikersButton project={element} onClick={() => {
                            setProject(element)
                            setOpenLikersModal(true)
                        }} />
                        <FollowersButton project={element} onClick={() => {
                            setProject(element)
                            setOpenFollowersModal(true)
                        }} />
                    </div>
                    <div className="footer-right col-4 flex pt-2">
                        <div className="footer-name">
                            <p className="name">
                                <Link to={`/${element.posterPseudo}`}>
                                    {element.posterPseudo}
                                </Link>
                            </p>
                            <p className="date">{dateParser(element.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card