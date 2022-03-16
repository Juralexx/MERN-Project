import React, { useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";

const NotificationsMenu = ({ open, user, newNotification, setNewNotification, cancelNewNotification, setCancelNewNotification }) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (user) {
            setNotifications(user.notifications)
        }
    }, [user])

    useEffect(() => {
        if (newNotification) {
            var array = notifications.slice()
            array.push(newNotification)
            setNotifications(array)
            setNewNotification("")
        }
    }, [newNotification])

    useEffect(() => {
        if (cancelNewNotification) {
            var array = notifications.slice()
            var index = notifications.findIndex(notification => notification._id === cancelNewNotification._id)
            array.splice(index, 1)
            setNotifications(array)
            setCancelNewNotification("")
        }
    }, [cancelNewNotification])


    return (
        open &&
        <div className="min-w-[270px] w-auto h-auto py-4 px-5 absolute bg-white dark:bg-background_primary_light shadow-custom dark:shadow-lg rounded-md top-[65px] right-14 z-[1100] dark:border-background_primary_light">
            <h2 className="text-center w-full m-0 text-slate-500 dark:text-slate-300">Notifications</h2>
            {notifications.length !== 0 && (
                notifications.map((element, key) => {
                    return (
                        element.type === "friend-request" && (
                            <FriendRequest notification={element} uniqueKey={key} />
                        )
                    )
                })
            )}
            {notifications.length === 0 && (
                <p>Vous n'avez pas de nouvelles notifications</p>
            )}
        </div>
    )
}

export default NotificationsMenu;