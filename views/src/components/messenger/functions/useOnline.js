import { useCallback, useEffect, useState } from "react";

export function useOnline(friendsArr, onlineUsers) {
    const [online, setOnline] = useState([])
    const [offline, setOffline] = useState([])

    const isOnline = useCallback(() => {
        if (friendsArr.length > 0) {
            setOffline([])
            setOnline([])
            friendsArr.forEach(friend => {
                onlineUsers.some(u => u.friend === friend._id) ? (
                    setOnline(o => [...o, friend])
                ) : (
                    setOffline(o => [...o, friend])
                )
            })
        }
    }, [friendsArr, onlineUsers])

    useEffect(() => {
        isOnline()
    }, [isOnline])

    return { online, offline }
}