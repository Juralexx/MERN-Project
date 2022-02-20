// const [messagesToDisplay, setMessagesToDisplay] = useState([])
// const [isLoad, setLoad] = useState(false)
// const [count, setCount] = useState(20)

// useEffect(() => {
//     if (messages) {
//         if (messages.length < 20) {
//             setLoad(false)
//             setMessagesToDisplay(messages)
//         } else if (messages.length > 20 && count < messages.length - 20) {
//             console.log(count)
//             setLoad(true)
//             setMessagesToDisplay(messages.slice((messages.length - 1) - count, messages.length - 1))
//         } else {
//             setLoad(false)
//             setMessagesToDisplay(messages)
//         }
//     }
//     if (isLoad) {
//         convWrapperRef?.current?.addEventListener('scroll', loadMore)
//         return () => convWrapperRef?.current?.removeEventListener('scroll', loadMore)
//     }
// }, [messages, count, convWrapperRef.current])

// const loadMore = () => {
//     const { scrollTop, scrollHeight } = convWrapperRef.current
//     if (scrollTop === 0) {
//         setCount(count + 20)
//         setLoad(false)
//     }
// }



// const pastScroll = scrollHeight
// const currentScroll = (await convWrapperRef.current.scrollHeight - pastScroll)

// if (currentScroll !== undefined) {
//     await convWrapperRef.current.scrollTo(0, currentScroll)