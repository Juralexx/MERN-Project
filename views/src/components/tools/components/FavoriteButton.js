import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux'
import { UidContext } from '../../AppContext';
import { styled } from '@mui/material/styles';
import { favoriteProject, unfavoriteProject } from '../../../actions/project.action';
import { Box, IconButton, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const FavoriteButton = ({ project }) => {
    const uid = useContext(UidContext)
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        if (project.favorites.includes(uid)) { setFavorite(true) }
        else { setFavorite(false) }
    }, [project.favorites, uid])

    const addFavorite = () => {
        dispatch(favoriteProject(project._id, uid))
        setFavorite(true)
    }
    const pullFavorite = () => {
        dispatch(unfavoriteProject(project._id, uid))
        setFavorite(false)
    }

    const FavoriteBox = styled(Box)(() => ({
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: 10,
        top: 100
    }))

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
            {!uid && (
                <FavoriteBox>
                    <HtmlTooltip placement="top"
                        title={
                                <Typography variant="caption">Connectez-vous pour ajouter ce projet<br />à vos favoris !</Typography>
                        }>
                        <IconButton color="warning">
                            <StarBorderIcon />
                        </IconButton>
                    </HtmlTooltip>
                </FavoriteBox>
            )}
            {uid && !favorite && (
                <FavoriteBox>
                    <HtmlTooltip placement="top"
                        title={
                            <Typography variant="caption">Cliquez pour ajouter ce projet<br />à vos favoris !</Typography>
                        }>
                        <IconButton color="warning" onClick={addFavorite}>
                            <StarBorderIcon />
                        </IconButton>
                    </HtmlTooltip>
                </FavoriteBox>
            )}
            {uid && favorite && (
                <FavoriteBox>
                    <IconButton color="warning" onClick={pullFavorite}>
                        <StarIcon />
                    </IconButton>
                </FavoriteBox>
            )}
        </>
    )
}

export default FavoriteButton;