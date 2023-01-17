import { useEffect, useState } from "react";

export function useOnline(contactsArr, onlineUsers) {
    const [online, setOnline] = useState([])
    const [offline, setOffline] = useState([])

    useEffect(() => {
        if (contactsArr.length > 0) {
            let areOnline = []
            let areOffline = []

            contactsArr.forEach(contact => {
                onlineUsers.some(u => u._id === contact._id) ? (
                    areOnline = [...areOnline, contact]
                ) : (
                    areOffline = [...areOffline, contact]
                )
            })
            setOnline(areOnline)
            setOffline(areOffline)
        }
    }, [contactsArr, onlineUsers])

    return { online, offline }
}