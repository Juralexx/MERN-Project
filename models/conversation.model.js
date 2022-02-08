import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        members: {
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