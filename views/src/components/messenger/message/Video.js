import * as React from 'react'
import { useVideoJS } from './useVideoJS'

const VideoJS = (props) => {

    const { Video } = useVideoJS({
        autoplay: false,
        controls: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: props.url,
            type: props.type
        }],
        height: props.height,
        width: props.width
    })

    return (
        <Video>
            {props.children}
        </Video>
    )
}

export default VideoJS