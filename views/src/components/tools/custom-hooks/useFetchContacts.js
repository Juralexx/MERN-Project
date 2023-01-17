import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchContacts(user) {
    const [contactsArr, setContactsArr] = useState([])
    const [fetchedContacts, setFetchedContacts] = useState(true)

    useEffect(() => {
        if (user.contacts) {
            const fetchContacts = () => {
                try {
                    const allContacts = user.contacts.map(async contact => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${contact._id}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(allContacts).then(res => {
                        setContactsArr(res)
                        setFetchedContacts(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchContacts()
        }
    }, [user.contacts])

    return { contactsArr, fetchedContacts }
}