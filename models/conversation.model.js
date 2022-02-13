import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
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
            type: String
        },
        creator: {
            type: String
        },
        messages: {
            type: [],
        },
        last_message: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("conversation", ConversationModel)