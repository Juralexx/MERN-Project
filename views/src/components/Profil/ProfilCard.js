import React from 'react'
import { NavLink } from 'react-router-dom';
import { replaceHTTP, returnNetworkSVG } from '../tools/functions/networks';
import { dateParser } from '../Utils';
import { StartIconButton } from '../tools/components/Button';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineCalendarToday, MdOutlineEditNote } from 'react-icons/md'
import { FaUserShield } from "react-icons/fa";

const ProfilCard = ({ user }) => {
    return (
        <div className="profil_card">
            <div className="profil_card-header">
                <div className="pseudo_header">{user?.pseudo}</div>
                <NavLink to="/profil/edit">
                    <StartIconButton icon={<MdOutlineEditNote />} text="Modifier mon profil" className="mb-2" />
                </NavLink>
                <p><MdOutlineCalendarToday />inscrit le {dateParser(user.createdAt)}</p>
                <p><HiOutlineLocationMarker /> {user?.location?.COM_NOM}, {user?.location?.DEP_NOM} ({user?.location?.DEP_CODE})</p>
                <p><FaUserShield /> {user?.work}</p>
            </div>
            <div className="profil_card-body">
                <div className="three_lines">{user?.bio}</div>
                <div className="networks">
                    {user?.networks?.map((e, i) => {
                        return (
                            <div className="networks-item" key={i}>
                                {returnNetworkSVG(e.type)}
                                <a href={e.url} rel="noreferrer" target="_blank">{replaceHTTP(e.url)}</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProfilCard