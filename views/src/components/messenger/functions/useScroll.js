import { useEffect, useLayoutEffect, useState } from "react"

export function useScroll(conversation, convWrapperRef) {
    const [count, setCount] = useState(null)
    // const [loadMoreMore, setLoadMore] = useState(false)

    useEffect(() => {
        if (count === null) {
            if (conversation?.messages) {
                if (conversation.messages.length > 20) {
                    setCount(conversation.messages.length - 20)
                } else {
                    setCount(0)
                }
            }
        }
    }, [conversation.messages, count])

    const loadMore = () => {
        if (conversation?.messages?.length > 0) {
            if (count > 0) {
                const { scrollHeight, scrollTop } = convWrapperRef.current
                const pastScroll = scrollHeight - scrollTop

                if (scrollHeight - scrollTop > scrollHeight - 200) {
                    setCount(c => c - 20)
                    const currentScroll = convWrapperRef.current.scrollHeight - pastScroll
                    convWrapperRef.current.scrollTo({ top: currentScroll, behavior: 'smooth' })
                }
            }
        }
    }

    useEffect(() => {
        if (count > 0) {
            let wrapper = convWrapperRef?.current
            wrapper?.addEventListener('scroll', loadMore)
            return () => wrapper?.removeEventListener('scroll', loadMore)
        }
    }, [convWrapperRef?.current, loadMore, conversation.messages])

    return { number: Math.max(0, count) }
}