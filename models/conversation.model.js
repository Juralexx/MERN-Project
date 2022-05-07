import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        type: {
            type: String
        },
        waiter: {
            type: String
        },
        name: {
            type: String
        },
        members: {
            type: [],
            id: String,
            pseudo: String,
            picture: String,
        },
        owner: {
            id: String,
            pseudo: String,
            picture: String
        },
        creator: {
            id: String,
            pseudo: String,
            picture: String
        },
        messages: {
            type: [{
                _id: String, 
                sender: String,
                sender_pseudo: String,
                sender_picture: String,
                text: {
                    type: [],
                },
                emojis: {
                    type: [],
                    emojis: {
                        emoji_sender: String
                    },
                }
            }],
        },
        last_message: {
            type: String,
            default: ""
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("conversation", ConversationModel)