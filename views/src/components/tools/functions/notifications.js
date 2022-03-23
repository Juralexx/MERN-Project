import { deleteNotification, setNotificationToSeen } from "../../../actions/user.action"

export const setNotifSeen = (userId, notificationId, dispatch) => {
    dispatch(setNotificationToSeen(userId, notificationId))
}

export const deleteNotif = (userId, notificationId, dispatch) => {
    dispatch(deleteNotification(userId, notificationId))
}