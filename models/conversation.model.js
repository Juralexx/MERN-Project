import mongoose from 'mongoose'

const ConversationModel = new mongoose.Schema(
    {
        type: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        picture: {
            type: String
        },
        members: {
            type: [],
            _id: String,
            pseudo: String,
            picture: String,
            date: Date,
            requester: String,
            requester_pseudo: String
        },
        owner: {
            _id: String,
            pseudo: String,
            picture: String
        },
        creator: {
            _id: String,
            pseudo: String,
            picture: String
        },
        messages: {
            type: [
                {
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
                }
            ],
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