import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const useVideoJS = (props) => {
    const videoRef = React.useRef(null)
    const playerRef = React.useRef(null)
    const { onReady } = props

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current

            if (!videoElement) return

            const player = playerRef.current = videojs(videoElement, props, () => {
                // player.log(props)
                onReady && onReady(player)
            })
        }
    }, [props, videoRef])

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current

        return () => {
            if (player) {
                player.dispose()
                playerRef.current = null
            }
        }
    }, [playerRef])

    const Video = React.useCallback(
        ({ children, ...props }) => {
            return (
                <div data-vjs-player>
                    <video ref={videoRef} className="video-js" {...props}>
                        {children}
                    </video>
                </div>
            )
        }, [])

    return { Video }
}