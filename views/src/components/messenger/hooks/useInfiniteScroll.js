import { useEffect, useLayoutEffect, useState } from "react"

export function useInfiniteScroll(conversation, convWrapperRef) {
    const [number, setNumber] = useState(null)
    const [pushMore, setPushMore] = useState(false)
    const [prevscroll, setPrevscroll] = useState(null)

    useEffect(() => {
        if (conversation?.messages) {
            if (conversation?.messages.length > 20)
                setNumber(conversation.messages.length - 20)
            else setNumber(0)
        }
    }, [conversation])

    useEffect(() => {
        let wrapper = convWrapperRef?.current
        if (!pushMore) return;
        setTimeout(async () => {
            setNumber(prevState => prevState - 20)
            setPushMore(false)
            await wrapper?.scrollTo({ top: wrapper.scrollHeight - prevscroll, behavior: 'auto' })
        }, 2000)
    }, [pushMore, convWrapperRef, prevscroll])

    useLayoutEffect(() => {
        let wrapper = convWrapperRef?.current
        const loadMore = () => {
            const { scrollHeight, scrollTop } = wrapper
            setPrevscroll(scrollHeight)

            if (scrollHeight - scrollTop > scrollHeight - 200) {
                setPushMore(true)
            }
        }

        if (number > 0 && !pushMore) {
            wrapper?.addEventListener('scroll', loadMore)
            return () => wrapper?.removeEventListener('scroll', loadMore)
        }
    }, [convWrapperRef, convWrapperRef?.current, pushMore, number])

    return { number: Math.max(0, number), pushMore }
}