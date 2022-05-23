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
            type: [{
                _id: String, 
                sender: String,
                sender_pseudo: String,
                sender_picture: String,
                text: {
                    type: {},
                },
                emojis: {
                    type: [],
                },
                createdAt: Date,
                modified: Boolean,
                shared: Object,
                files: []
            }],
        },
        description: {
            type: String,
        },
        last_message: {
            type: String
        },
        files: []
    },
    {
        timestamps: true
    }
)

export default mongoose.model("conversation", ConversationModel)