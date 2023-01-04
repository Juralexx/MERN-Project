import React from 'react'
import { Link } from 'react-router-dom';
import { replaceHTTP, returnNetworkSVG } from '../tools/functions/networks';
import { dateParser } from '../Utils';
import { Button } from '../tools/global/Button';
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineCalendarToday, MdOutlineEditNote } from 'react-icons/md'
import { FaUserShield } from "react-icons/fa";

const ProfilCard = ({ user }) => {
    return (
        <div className="col-12 col-lg-3 md:pr-5 secondary mb-8">
            <div className="pb-5 border-b">
                <div className="f-24 bold txt-prim mb-2">{user?.pseudo}</div>
                <Link to="/profil/edit" className="mb-2">
                    <Button className="mb-4"><MdOutlineEditNote />Modifier mon profil</Button>
                </Link>
                <p className="flex items-center mb-1"><MdOutlineCalendarToday className="mr-2 primary" />inscrit le {dateParser(user.createdAt)}</p>
                {user.location &&
                    <p className="flex items-center mb-1"><HiOutlineLocationMarker className="mr-2 primary" /> {user?.location?.COM_NOM}, {user?.location?.DEP_NOM} ({user?.location?.DEP_CODE})</p>
                }
                {user.work &&
                    <p className="flex items-center"><FaUserShield className="mr-2 primary" /> {user?.work}</p>
                }
            </div>
            <div className="pt-5">
                <div className="three_lines">{user?.bio}</div>
                <div className="networks pt-5">
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