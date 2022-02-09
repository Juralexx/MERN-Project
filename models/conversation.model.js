import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        name: {
            type: String
        },
        members_id: {
            type: []
        },
        members_pseudo: {
            type: []
        },
        owner: {
            type: String
        },
        creator: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("conversation", ConversationModel)