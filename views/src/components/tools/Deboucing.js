// import { useEffect, useState } from "react";

// // export function useDebounce(value, timeout, callback) {
// //     const [timer, setTimer] = useState(null)

// //     const clearTimer = () => {
// //         if (timer) {
// //             clearInterval(timer)
// //         }
// //     }

// //     useEffect(() => {
// //         clearTimer()
// //         function setNewTimer() {
// //             if (value && callback) {
// //                 const newTimer = setInterval(callback, timeout)
// //                 setTimer(newTimer)
// //             }
// //         }
// //         setNewTimer()
// //         console.log('coucou')
// //     }, [])
// // }



// export const useDebounce = (callback, wait) => {
//     let timeout;
//     return (...args) => {
//         const context = this;
//         clearInterval(timeout);
//         timeout = setInterval(() => callback.apply(context, args), wait);
//     }
// }
