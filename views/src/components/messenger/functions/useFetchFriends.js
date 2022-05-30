import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchFriends(user) {
    const [friendsArr, setFriendsArr] = useState([])
    const [fetchedFriends, setFetchedFriends] = useState(true)

    useEffect(() => {
        if (user.friends) {
            const fetchFriends = () => {
                try {
                    const allFriends = user.friends.map(async friend => {
                        return await axios
                            .get(`${process.env.REACT_APP_API_URL}api/user/${friend.friend}`)
                            .then(res => res.data)
                            .catch(err => console.error(err))
                    })
                    Promise.all(allFriends).then(res => {
                        setFriendsArr(res)
                        setFetchedFriends(false)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
            fetchFriends()
        }
    }, [user.friends])

    return { friendsArr, fetchedFriends }
}