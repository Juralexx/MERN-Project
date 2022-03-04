import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { followProject, unfollowProject } from "../../../actions/project.action";
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { UidContext } from "../../AppContext";
import HoverModal from "./HoverModal";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Box, Divider, Typography, List, ListItem, Avatar } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const FollowersModal = ({ project }) => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)
    const [follower, setFollower] = useState([])
    const dispatch = useDispatch()
    const [followed, setFollowed] = useState(false)
    const [action, setAction] = useState("")
    const follow = () => { dispatch(followProject(project._id, uid)); setFollowed(true) }
    const unfollow = () => { dispatch(unfollowProject(project._id, uid)); setFollowed(false) }

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) { setFollowed(true) }
            else { setFollowed(false) }
        }
    }, [project.followers, uid])

    useEffect(() => {
        if (uid) {
            if (project.followers.includes(uid)) {
                if (followed) {
                    if (project.followers.length > 1)
                        setAction(<span>Vous et {project.followers.length - 1} personnes</span>)
                    if (project.followers.length === 1)
                        setAction(<span>Vous</span>)
                    if (project.followers.length === 0)
                        setAction(<span>Vous</span>)
                }
                if (!followed) { setAction(<span>{project.followers.length - 1}</span>) }
            } else {
                if (followed) {
                    if (project.followers.length > 1)
                        setAction(<span>Vous et {project.followers.length} personnes</span>)
                    if (project.followers.length === 1)
                        setAction(<span>Vous et 1 personne</span>)
                    if (project.followers.length === 0)
                        setAction(<span>Vous</span>)
                }
                if (!followed) { setAction(<span>{project.followers.length}</span>) }
            }
        } else {
            setAction(<span>{project.followers.length}</span>)
        }
    }, [followed, project.followers, uid])

    useEffect(() => {
        if (open) {
            const findFollowers = async () => {
                try {
                    const followerFound = project.followers.map(async (followerId) => {
                        return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${followerId}`)
                            .then((res) => res.data)
                            .catch((err) => console.error(err))
                    })
                    Promise.all(followerFound).then((res) => {
                        setFollower(res)
                    })
                }
                catch (err) { console.log(err) }
            }
            findFollowers()
        }
    }, [project.followers, open])

    const [hoveredCard, setHoveredCard] = useState(-1);
    const showCardHandler = (key) => { setHoveredCard(key) }
    const hideCardHandler = () => { setHoveredCard(-1) }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: `${theme.palette.background.light}`,
            color: `${theme.palette.text.primary}`,
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            textAlign: "center",
            padding: "7px"
        },
    }));

    return (
        <>
            {uid === null && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HtmlTooltip placement="top"
                        title={
                            <Typography variant="caption">Connectez-vous pour suivre ce projet !</Typography>
                        }>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton color="primary">
                                <BookmarkOutlinedIcon />
                            </IconButton>
                            <Typography component="div" sx={{ fontSize: 14 }}>{action}</Typography>
                        </Box>
                    </HtmlTooltip>
                </Box>
            )}
            {uid && !followed && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="primary" onClick={follow} sx={{ padding: 0.5 }}>
                        <BookmarkBorderOutlinedIcon />
                    </IconButton>
                    <Typography onClick={() => setOpen(true)} component="div" sx={{ fontSize: 14 }}>{action}</Typography>
                </Box>
            )}
            {uid && followed && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="primary" onClick={unfollow} sx={{ padding: 0.5 }}>
                        <BookmarkOutlinedIcon />
                    </IconButton>
                    <Typography onClick={() => setOpen(true)} component="div" sx={{ fontSize: 14 }}>{action}</Typography>
                </Box>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        padding: "10px 30px",
                        minWidth: 400,
                        background: '#091726',
                        overflowY: "unset"
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
                    <Box sx={{ width: '100%', display: "flex", alignItems: "center" }}>
                        <IconButton color="primary">
                            <BookmarkOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2">Suivi par {project.followers.length}</Typography>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ padding: "10px 0" }}>
                    {open && (
                        project.followers.length > 0 ? (
                            <>
                                {follower.map((element, key) => {
                                    return (
                                        <List sx={{ width: '100%', maxWidth: 360, overflowY: "unset" }}>
                                            <HoverModal
                                                user={element}
                                                style={{ display: hoveredCard === key ? 'block' : 'none' }}
                                            />
                                            <ListItem sx={{ padding: "8px 0" }}>
                                                <NavLink
                                                    to={"/" + element.pseudo}
                                                    onMouseLeave={hideCardHandler}
                                                    onMouseEnter={() => showCardHandler(key)}
                                                    onClick={() => showCardHandler(key)}
                                                    style={{ display: "flex" }}
                                                >
                                                    <Avatar src={element.picture}></Avatar>
                                                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", marginLeft: 1 }}>{element.pseudo}</Typography>
                                                </NavLink>
                                                {userData.friend_request_sent
                                                    && !userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && !userData.friends.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <button className="btn btn-secondary" onClick={() => {
                                                            dispatch(sendFriendRequest(element._id, uid))
                                                        }}>Ajouter en ami</button>
                                                    )}
                                                {userData.friend_request_sent
                                                    && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                    && element._id !== uid
                                                    && (
                                                        <button className="btn btn-secondary" onClick={() => {
                                                            dispatch(cancelSentFriendRequest(element._id, uid))
                                                        }}>Annuler ma demande</button>
                                                    )}
                                                {!userData.friend_request_sent
                                                    && element._id !== uid
                                                    && (
                                                        <button className="btn btn-secondary" onClick={() => {
                                                            dispatch(sendFriendRequest(element._id, uid))
                                                        }}>Ajouter en ami</button>
                                                    )}
                                                {userData.friends
                                                    && userData.friends.some((object) => object.friend === element._id)
                                                    && (
                                                        <button className="btn btn-secondary">Vous êtes ami</button>
                                                    )}
                                            </ListItem>
                                        </List>
                                    )
                                })}
                            </>
                        ) : (
                            <p>Personne n'a encore soutenu ce projet</p>)
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default FollowersModal;