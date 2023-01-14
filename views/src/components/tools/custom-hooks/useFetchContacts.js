import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchContacts(user) {
    const [contactsArr, setContactsArr] = useState([])
    const [fetchedContacts, setFetchedContacts] = useState(true)

    useEffect(() => {
        if (user.friends) {
            const fetchFriends = () => {
                try {
                    const allFriends = user.friends.map(async friend => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${friend._id}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(allFriends).then(res => {
                        setContactsArr(res)
                        setFetchedContacts(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchFriends()
        }
    }, [user.friends])

    return { contactsArr, fetchedContacts }
}