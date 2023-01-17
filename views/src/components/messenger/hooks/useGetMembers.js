import { useEffect, useState } from "react";

export function useGetMembers(uid, conversation) {
    const [members, setMembers] = useState([])

    /**
     * Return all members except user
     */

    useEffect(() => {
        if (conversation.members) {
            setMembers(conversation.members.filter(member => member._id !== uid))
        }
    }, [uid, conversation.members])

    return { members }
}