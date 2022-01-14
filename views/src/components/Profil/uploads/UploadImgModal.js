import React from "react"
import AvatarEditor, { allowZoomOut } from 'react-avatar-editor'

class ReactAvatarEditor extends React.Component {
    state = {
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        color: [255, 255, 255, 0.6],
        border: 50,
        borderRadius: 200,
        preview: null,
        width: 200,
        height: 200,
        scale: 1.2,
        rotate: 0
    }

    handleScale = (e) => {
        const scale = parseFloat(e.target.value)
        this.setState({ scale })
    }

    render() {
        return (
            <>
                <AvatarEditor
                    width={this.state.width}
                    height={this.state.height}
                    border={this.state.border}
                    color={this.state.color}
                    borderRadius={this.state.borderRadius}
                    scale={this.state.scale}
                    rotate={this.state.rotate}
                />
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
            </>
        )
    }
}


export default ReactAvatarEditor