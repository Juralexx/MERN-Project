import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchUsers(users) {
    const [usersArr, setUsersArr] = useState([])
    const [fetchedUsers, setFetchedUsers] = useState(false)

    useEffect(() => {
        if (users.length > 0) {
            const fetchUser = () => {
                try {
                    const allUsers = users.map(async user => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${user._id}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(allUsers).then(res => {
                        setUsersArr(res)
                        setFetchedUsers(true)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchUser()
        }
    }, [users])

    return { usersArr, fetchedUsers }
}