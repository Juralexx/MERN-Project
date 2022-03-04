import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from '../../AppContext';
import 'reactjs-popup/dist/index.css'
import HoverModal from "./HoverModal";
import { likeProject, unlikeProject } from '../../../actions/project.action';
import { cancelSentFriendRequest, sendFriendRequest } from "../../../actions/user.action";
import { Box, Divider, Typography, Button, IconButton, List, ListItem, Avatar, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LikersModal = ({ project }) => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const [open, setOpen] = useState(false)
    const modalOpen = () => { setOpen(true) }

    const [liker, setLiker] = useState([])
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [action, setAction] = useState("")

    useEffect(() => {
        if (project.likers.includes(uid)) { setLiked(true) }
        else { setLiked(false) }
    }, [project.likers, uid])

    useEffect(() => {
        if (project.likers.includes(uid)) {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length - 1} personnes</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length - 1}</span>) }
        }
        else {
            if (liked) {
                if (project.likers.length > 1)
                    setAction(<span>Vous et {project.likers.length} personnes</span>)
                if (project.likers.length === 1)
                    setAction(<span>Vous et 1 personne</span>)
                if (project.likers.length === 0)
                    setAction(<span>Vous</span>)
            }
            if (!liked) { setAction(<span>{project.likers.length}</span>) }
        }
    }, [liked, project.likers, uid])

    const like = () => { dispatch(likeProject(project._id, uid)); setLiked(true) }
    const unlike = () => { dispatch(unlikeProject(project._id, uid)); setLiked(false) }

    useEffect(() => {
        const findLikers = () => {
            try {
                const likerFound = project.likers.map(async (likerId) => {
                    return await axios.get(`${process.env.REACT_APP_API_URL}api/user/${likerId}`)
                        .then((res) => res.data)
                        .catch((err) => console.error(err))
                })
                Promise.all(likerFound).then((res) => {
                    setLiker(res)
                })
            }
            catch (err) { console.log(err) }
        }
        findLikers()
    }, [project.likers])

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
                        <Typography variant="caption">Connectez-vous pour soutenir ce projet !</Typography>
                    }>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="secondary">
                            <FavoriteOutlinedIcon />
                        </IconButton>
                        <Typography component="div" sx={{ fontSize: 14 }}>{action}</Typography>
                    </Box>
                </HtmlTooltip>
            </Box>
            )}
            {uid && liked === false && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="secondary" onClick={like} sx={{ padding: 0.5 }}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                    <Typography onClick={modalOpen} component="div" sx={{ fontSize: 14 }}>{action}</Typography>
                </Box>
            )}
            {uid && liked === true && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton color="secondary" onClick={unlike} sx={{ padding: 0.5 }}>
                        <FavoriteOutlinedIcon />
                    </IconButton>
                    <Typography onClick={modalOpen} component="div" sx={{ fontSize: 14 }}>{action}</Typography>
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
                        overflow: "unset"
                    }
                }}
                sx={{ overflowY: "unset" }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
                    <Box sx={{ width: '100%', display: "flex", alignItems: "center" }}>
                        <IconButton color="primary">
                            <BookmarkOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2">Aimé par {project.likers.length}</Typography>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ padding: "10px 0", overflow: "unset" }}>
                    <List sx={{ width: '100%', maxWidth: 360, overflow: "unset" }}>
                        {open && (
                            project.likers.length > 0 ? (
                                <>
                                    {liker.map((element, key) => {
                                        return (
                                            <>
                                                <ListItem sx={{ padding: "8px 0", justifyContent: "space-between" }}>
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
                                                            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                                                                dispatch(sendFriendRequest(element._id, uid))
                                                            }}>Ajouter en ami</Button>
                                                        )}
                                                    {userData.friend_request_sent
                                                        && userData.friend_request_sent.some((object) => object.friend === element._id)
                                                        && element._id !== uid
                                                        && (
                                                            <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => {
                                                                dispatch(cancelSentFriendRequest(element._id, uid))
                                                            }}>Annuler ma demande</Button>
                                                        )}
                                                    {!userData.friend_request_sent
                                                        && element._id !== uid
                                                        && (
                                                            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                                                                dispatch(sendFriendRequest(element._id, uid))
                                                            }}>Ajouter en ami</Button>
                                                        )}
                                                    {userData.friends
                                                        && userData.friends.some((object) => object.friend === element._id)
                                                        && (
                                                            <Button variant="outlined" size="small" startIcon={<CheckIcon />}>Ami</Button>
                                                        )}

                                                    <HoverModal
                                                        user={element}
                                                        style={{ display: hoveredCard === key ? 'block' : 'none' }}
                                                    />
                                                </ListItem>
                                            </>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Personne n'a encore soutenu ce projet</p>)
                        )}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default LikersModal;