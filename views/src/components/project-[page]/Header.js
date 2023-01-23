import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../tools/icons/Icon'
import { Button } from '../tools/global/Button'
import { MediumAvatar } from '../tools/global/Avatars'
import Share from './Share'
import { dateParser, fullImage } from '../Utils'
import { followProject, likeProject, unfollowProject, unlikeProject } from '../../reducers/project.action'
import JoinModal from './JoinModal'
import { cancelUserMemberRequest } from '../tools/functions/member'

const Header = ({ project, user, websocket }) => {
    const [actions, setActions] = useState({ liked: false, followed: false, share: false })
    const dispatch = useDispatch()

    /**
     * 
     */

    useEffect(() => {
        if (user._id) {
            if (project.likers.includes(user._id))
                setActions(prevState => ({ ...prevState, liked: true }))
            else setActions(prevState => ({ ...prevState, liked: false }))

            if (project.followers.includes(user._id))
                setActions(prevState => ({ ...prevState, followed: true }))
            else setActions(prevState => ({ ...prevState, followed: false }))
        }
    }, [project, user._id])

    /**
     * 
     */

    const like = () => {
        dispatch(likeProject(project._id, user._id))
        setActions(prevState => ({ ...prevState, liked: true }))
    }
    const unlike = () => {
        dispatch(unlikeProject(project._id, user._id))
        setActions(prevState => ({ ...prevState, liked: false }))
    }

    const follow = () => {
        dispatch(followProject(project._id, user._id))
        setActions(prevState => ({ ...prevState, followed: true }))
    }
    const unfollow = () => {
        dispatch(unfollowProject(project._id, user._id))
        setActions(prevState => ({ ...prevState, followed: false }))
    }

    /**
     * 
     */

    const [join, setJoin] = useState(false)
    const [isAlreadyMember, setAlreadyMember] = useState({
        state: false,
        content: 'Rejoindre le projet',
        request: {},
        action: () => setJoin(true)
    })

    useEffect(() => {
        // L'utilisateur est le créateur du projet
        if (project.poster._id === user._id) {
            setAlreadyMember(prevState => ({
                ...prevState,
                state: true,
                content: 'Vous êtes créateur du projet'
            }))
            // L'utilisateur a envoyé une demande d'adhésion
        } else if (user.member_request_sent.some(request => request.projectId === project._id)) {
            let request = user.member_request_sent.find(request => request.projectId === project._id)
            setAlreadyMember(prevState => ({
                ...prevState,
                state: true,
                content: 'Annuler ma demande',
                request: request,
                action: () => cancelUserMemberRequest(request, user, project, websocket, dispatch)
            }))
        } else {
            // L'utilisateur participe déjà au projet
            for (let i = 0; i < project.members.length; i++) {
                if (project.members[i]._id === user._id) {
                    setAlreadyMember(prevState => ({
                        ...prevState,
                        state: true,
                        content: 'Vous participez déjà'
                    }))
                    break;
                }
            }
            // Une demande d'adhésion a été envoyée a l'utilisateur
            for (let i = 0; i < project.member_request_sent.length; i++) {
                if (project.member_request_sent[i].member._id === user._id) {
                    setAlreadyMember(prevState => ({
                        ...prevState,
                        state: true,
                        content: 'Accepter la demande d\'adhésion',
                        request: project.member_request_sent[i],
                        action: () => { }
                    }))
                    break;
                }
            }
            setAlreadyMember({
                state: false,
                content: 'Rejoindre le projet',
                request: {},
                action: () => setJoin(true)
            })
        }
    }, [project, user])

    /**
     * 
     */

    return (
        <div className="project-page_header">
            <img className='mobile-img' src={project.pictures[0]} alt={project.title} />
            <div className="container-lg">
                <div className="header-title">
                    <h1>{project.title}</h1>
                    <p>{project.category}</p>
                </div>
                <div className="header-inner row">
                    <div className="col-12 col-lg-7 z-10">
                        <div className="project-picture" style={fullImage(project.pictures[0])}></div>
                        <div className="project-infos">
                            <Link to={"/" + project.poster.pseudo} className="flex items-center bold ml-2">
                                <MediumAvatar pic={project.poster.picture} className="mr-2" />
                                {project.poster.pseudo}
                            </Link>
                            <div>Posté le {dateParser(project.createdAt)}</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 order-1">
                        <h2>{project.subtitle}</h2>
                        <div className="py-2">
                            <div className="flex items-center py-1">
                                <Icon name="Position" className="mr-2 w-5 h-5" />
                                <Link to={`/search/?location=${project.location.city}`} className="bold">
                                    {project.location.city} ({project.location.code_department})
                                </Link>
                            </div>
                            {project.day &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Le <span className="font-medium">{dateParser(project.day)}</span></p>
                                </div>
                            }
                            {project.start && !project.end &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Commence le <span className="font-medium">{dateParser(project.start)}</span></p>
                                </div>
                            }
                            {project.end && !project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Jusqu'au <span className="font-medium">{dateParser(project.end)}</span></p>
                                </div>
                            }
                            {project.end && project.start &&
                                <div className="flex items-center py-1">
                                    <Icon name="Calendar" className="mr-2 w-5 h-5" />
                                    <p>Du <span className="font-medium">{dateParser(project.start)}</span> au <span className="font-medium">{dateParser(project.end)}</span></p>
                                </div>
                            }

                            <div className="project-infos_mobile">
                                <Link to={"/" + project.poster.pseudo}>
                                    <MediumAvatar pic={project.poster.picture} className="mr-2" />
                                    {project.poster.pseudo}
                                </Link>
                                <div className='flex items-center'>
                                    Posté le {dateParser(project.createdAt)}
                                </div>
                            </div>
                        </div>
                        <Button className="join-btn" onClick={isAlreadyMember.action}>
                            {isAlreadyMember.content}
                        </Button>
                        <div className="project-tags">
                            {project.tags.map((tag, i) => {
                                return <div className="tag" key={i}><span>#</span>{tag}</div>
                            })}
                        </div>
                        <div className="project-page_actions">
                            {user._id === null &&
                                <Button className="action-btn like">
                                    Soutenir <Icon name="Heart" />
                                </Button>
                            }
                            {user._id && !actions.liked ? (
                                <Button className="action-btn like" onClick={like}>
                                    Soutenir <Icon name="Heart" />
                                </Button>
                            ) : (
                                <Button className="action-btn like" onClick={unlike}>
                                    Ne plus soutenir <Icon name="Heart" />
                                </Button>
                            )}
                            {user._id === null &&
                                <Button className="action-btn follow">
                                    Suivre <Icon name="Bookmark" />
                                </Button>
                            }
                            {user._id && !actions.followed ? (
                                <Button className="action-btn follow" onClick={follow}>
                                    Suivre <Icon name="Bookmark" />
                                </Button>
                            ) : (
                                <Button className="action-btn follow" onClick={unfollow}>
                                    Ne plus suivre <Icon name="Bookmark" />
                                </Button>
                            )}

                            <Button className="action-btn share" onClick={() => setActions(prevState => ({ ...prevState, share: !actions.share }))}>
                                Partager <Icon name="Share" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Share share={actions.share} />
            </div>
            <JoinModal
                project={project}
                user={user}
                websocket={websocket}
                open={join}
                setOpen={setJoin}
            />
        </div>
    )
}

export default Header