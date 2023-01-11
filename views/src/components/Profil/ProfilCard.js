import React from 'react'
import { Link } from 'react-router-dom';
import { replaceHTTP, returnNetworkSVG } from '../tools/functions/networks';
import { dateParser } from '../Utils';
import { Button } from '../tools/global/Button';
import Icon from '../tools/icons/Icon';

const ProfilCard = ({ user }) => {
    return (
        <div className="col-12 col-lg-3 md:pr-5 mb-8">
            <div className='row'>
                <div className='col-12 col-sm-6 col-lg-12'>
                    <div className="f-24 bold txt-prim mb-2">{user?.pseudo}</div>
                    <Button className="mb-4">
                        <Link to="/profil/edit">
                            Modifier mon profil
                        </Link>
                    </Button>
                    <p className="flex items-center mb-1">
                        <Icon name="Calendar" className="mr-2" />inscrit le {dateParser(user.createdAt)}
                    </p>
                    {user.location &&
                        <p className="flex items-center mb-1">
                            <Icon name="Position" className="mr-2" /> {user?.location?.COM_NOM}, {user?.location?.DEP_NOM} ({user?.location?.DEP_CODE})
                        </p>
                    }
                    {user.work &&
                        <p className="flex items-center">
                            <Icon name="User" className="mr-2" /> {user?.work}
                        </p>
                    }
                </div>
                <div className='col-12 col-sm-6 col-lg-12'>
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
        </div>
    )
}

export default ProfilCard