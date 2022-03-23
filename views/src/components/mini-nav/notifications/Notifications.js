import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FriendRequest from "./FriendRequest";
import MemberRequest from "./MemberRequest";
import { BsThreeDots } from 'react-icons/bs'
import SmallMenu from "../../tools/components/SmallMenu";
import { setNotifSeen } from "../../tools/functions/notifications";

const NotificationsMenu = ({ open, user, websocket }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()

    return (
        open &&
        <div className="min-w-[360px] w-auto h-auto py-4 px-2 absolute bg-white dark:bg-background_primary_light shadow-custom dark:shadow-lg rounded-md top-[65px] right-14 z-[1100] dark:border-background_primary_light">
            <div className="flex justify-between items-center w-full px-2 mb-2 text-slate-500 font-semibold dark:text-slate-300">
                <h2>Notifications</h2>
                <BsThreeDots className="cursor-pointer h-5 w-5" onClick={() => setOpenMenu(!openMenu)} />
            </div>
            {openMenu && (
                <SmallMenu>
                    <div className="py-1 text-slate-500 dark:text-slate-300">Tout marquer comme lu</div>
                    <div className="py-1 text-slate-500 dark:text-slate-300">Voir toutes les notifications</div>
                </SmallMenu>
            )}
            <div className="flex w-full px-2 mb-4 dark:text-slate-300">
                <div className="p-2 bg-primary_semi_dark dark:bg-background_primary_x_light rounded-lg">Tout</div>
                <div className="ml-2 p-2 bg-primary_semi_dark dark:bg-background_primary_x_light rounded-lg">Non lu</div>
            </div>
            {user.notifications.length !== 0 && (
                user.notifications.map((element, key) => {
                    return (
                        <>
                            {(element.type === "friend-request") &&
                                <FriendRequest notification={element} key={key} user={user} websocket={websocket} onClick={() => setNotifSeen(user._id, element._id, dispatch)} />
                            }
                            {(element.type === "project-member-request") &&
                                <MemberRequest notification={element} key={key} user={user} websocket={websocket} onClick={() => setNotifSeen(user._id, element._id, dispatch)} />
                            }
                        </>
                    )
                })
            )}
            {user.notifications.length === 0 && (
                <p>Vous n'avez pas de nouvelles notifications</p>
            )}
        </div>
    )
}

export default NotificationsMenu;