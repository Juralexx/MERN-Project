import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        members: {
            type: []
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("conversation", ConversationModel)