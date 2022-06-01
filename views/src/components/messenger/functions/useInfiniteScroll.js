import { useCallback, useEffect, useLayoutEffect, useState } from "react"

export function useInfiniteScroll(conversation, convWrapperRef) {
    const [number, setNumber] = useState(null)
    const [pushMore, setMore] = useState(false)
    const [prevscroll, setPrevscroll] = useState(null)

    useEffect(() => {
        if (conversation?.messages) {
            if (conversation.messages.length > 20)
                setNumber(conversation.messages.length - 20)
            else setNumber(0)
        }
    }, [conversation.messages])

    useEffect(() => {
        if (!pushMore) return;
        setTimeout(async () => {
            setNumber(prevState => prevState - 20)
            setMore(false)
            await convWrapperRef.current.scrollTo({ top: convWrapperRef.current.scrollHeight - prevscroll, behavior: 'auto' })
        }, 2000)
    }, [pushMore, convWrapperRef, prevscroll])

    const loadMore = () => {
        const { scrollHeight, scrollTop } = convWrapperRef?.current
        setPrevscroll(scrollHeight)

        if (scrollHeight - scrollTop > scrollHeight - 200) {
            setMore(true)
        }
    }

    useLayoutEffect(() => {
        if (number > 0 && !pushMore) {
            let wrapper = convWrapperRef?.current
            wrapper?.addEventListener('scroll', loadMore)
            return () => wrapper?.removeEventListener('scroll', loadMore)
        }
    }, [convWrapperRef?.current, loadMore, pushMore, number])

    return { number: Math.max(0, number), pushMore }
}