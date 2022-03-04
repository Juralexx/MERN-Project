import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Mousewheel } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';
import 'reactjs-popup/dist/index.css'
import LikersModal from '../tools/components/LikersModal';
import FollowersModal from '../tools/components/FollowersModal';
import FavoriteButton from '../tools/components/FavoriteButton';
import ProjectModal from './ProjectModal';
import ProfilCard from '../tools/components/ProfilCard';
import { styled } from '@mui/material/styles';
import { Box, Chip, Divider, Grid, Stack, CardMedia, Card, CardContent, Typography, Skeleton } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { avatar } from '../tools/functions/useAvatar';
import { parseDescriptionToInnerHTML } from '../tools/functions/parseDescription';
import { dateParser } from '../Utils';
import { getState } from './functions';

const ProjectsSwiper = ({ projects, isLoading }) => {
    const [openProfilCard, setOpenProfilCard] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [user, setUser] = useState()
    const [project, setProject] = useState()

    const SwiperCard = styled(Card)(({ theme }) => ({
        width: 365,
        background: `linear-gradient(25deg, ${theme.palette.background.main}, 80%, ${theme.palette.background.light})`,
        cursor: "pointer",
        '&:hover': {
            background: `linear-gradient(25deg, ${theme.palette.background.main}, 20%, ${theme.palette.background.semiLight})`,
        }
    }))

    const getUser = (userId) => { setUser(userId); setOpenProfilCard(true) }
    const getProject = (project) => { setProject(project); setOpenModal(true) }

    return (
        <>
            {openModal && <ProjectModal project={project} open={openModal} setOpen={setOpenModal} />}
            {openProfilCard && <ProfilCard isUser={user} open={openProfilCard} setOpen={setOpenProfilCard} />}
            <Swiper
                slidesPerView="auto"
                navigation={true}
                keyboard={{ enabled: true }}
                mousewheel={true}
                modules={[Navigation, Keyboard, Mousewheel]}
            >
                {!isLoading ? (
                    projects.map((element, key) => {
                        return (
                            <SwiperSlide key={key} style={{ width: 382, minHeight: 426, display: "flex", justifyContent: "center" }}>
                                <SwiperCard>
                                    <CardMedia component="img" height="140" image='img/paysage-3.jpg' alt={element.title} />
                                    <ZoomOutMapIcon onClick={() => getProject(element)} sx={{ position: "absolute", top: 10, right: 20 }} />
                                    <FavoriteButton project={element} />
                                    <CardContent sx={{ paddingBottom: "8px !important" }}>
                                        <Typography gutterBottom variant="subtitle1" component="h3">
                                            {element.title}
                                            <Typography gutterBottom variant="caption" component="div" color="text.secondary" mb={1}>
                                                {element.location + ", " + element.department + " - " + element.category}
                                            </Typography>
                                            <Divider mb={2} />
                                        </Typography>
                                        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                                <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />
                                                <Typography variant="subtitle1" component="p" sx={{ marginLeft: 0.7 }}>
                                                    {element.numberofcontributors}
                                                </Typography>
                                            </Stack>
                                            <Chip label={element.state} color={getState(element)} size="small" />
                                        </Stack>
                                        <Box dangerouslySetInnerHTML={parseDescriptionToInnerHTML(element)} sx={{ textAlign: "justify" }} mt={1}></Box>

                                        <Grid container>
                                            <Grid item xs={7}>
                                                <Grid item>
                                                    <LikersModal project={element} />
                                                </Grid>
                                                <Grid item>
                                                    <FollowersModal project={element} />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                <div className="avatar" style={avatar(element.posterAvatar)}></div>
                                                <Stack>
                                                    <Typography variant="body2" fontWeight={600} onClick={() => getUser(element.posterId)}>{element.posterPseudo}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{dateParser(element.createdAt)}</Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </SwiperCard>
                            </SwiperSlide>
                        )
                    })
                ) : (
                    [...Array(15)].map((element, key) => {
                        return <SwiperSlide key={key} style={{ width: 382, minHeight: 426, display: "flex", justifyContent: "center" }}>
                            <SwiperCard>
                                <Skeleton animation="wave" variant="rectangular" width={382} height={140} />
                                <CardContent sx={{ paddingBottom: "8px !important" }}>
                                    <Skeleton animation="wave" variant="rectangular" width={333} height={50} />
                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Stack direction="row" sx={{ alignItems: "center" }}>
                                            <Skeleton animation="wave" variant="text" width={60} height={50} />
                                        </Stack>
                                        <Skeleton animation="wave" variant="text" width={120} height={50} />
                                    </Stack>
                                    <Skeleton animation="wave" variant="rectangular" width={333} height={90} />

                                    <Grid container mt={1}>
                                        <Grid item xs={7}>
                                            <Grid item>
                                                <Skeleton animation="wave" variant="text" width={120} height={30} />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton animation="wave" variant="text" width={120} height={30} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Skeleton animation="wave" variant="circular" width={50} height={50} sx={{ margin: "3px 5px 0 0" }} />
                                            <Stack>
                                                <Skeleton animation="wave" variant="text" width={85} height={30} />
                                                <Skeleton animation="wave" variant="text" width={85} height={30} />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SwiperCard>
                        </SwiperSlide>
                    })
                )}
            </Swiper>
        </>
    )
}

export default ProjectsSwiper;