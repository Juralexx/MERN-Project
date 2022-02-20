import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        type: {
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
            type: [],
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