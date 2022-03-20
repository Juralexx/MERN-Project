import React from "react";
import FriendRequest from "./FriendRequest";
import MemberRequest from "./MemberRequest";

const NotificationsMenu = ({ open, user, websocket }) => {

    return (
        open &&
        <div className="min-w-[270px] w-auto h-auto py-4 px-5 absolute bg-white dark:bg-background_primary_light shadow-custom dark:shadow-lg rounded-md top-[65px] right-14 z-[1100] dark:border-background_primary_light">
            <h2 className="text-center w-full m-0 text-slate-500 dark:text-slate-300">Notifications</h2>
            {user.notifications.length !== 0 && (
                user.notifications.map((element) => {
                    if (element.type === "friend-request") {
                        return <FriendRequest notification={element} key={element.date} user={user} websocket={websocket} />
                    } else if (element.type === "project-member-request") {
                        return <MemberRequest notification={element} key={element.date} user={user} websocket={websocket} />
                    }
                })
            )}
            {user.notifications.length === 0 && (
                <p>Vous n'avez pas de nouvelles notifications</p>
            )}
        </div>
    )
}

export default NotificationsMenu;