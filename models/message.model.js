import mongoose from 'mongoose'

const MessageModel = new mongoose.Schema(
    {
        conversationId: {
            type: String
        },

        sender: {
            type: String,
        },

        sender_pseudo: {
            type: String,
        },

        sender_picture: {
            type: String,
        },

        text: {
            type: String
        },

        emojis: {
            type: [],
            emojis: {
                emoji_sender: String
            },
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("message", MessageModel)