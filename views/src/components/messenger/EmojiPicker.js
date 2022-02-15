import React from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const EmojiPicker = () => {
  return (
    <div className="emoji-picker-container">
        <Picker />
    </div>
  )
}

export default EmojiPicker