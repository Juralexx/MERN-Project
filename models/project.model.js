const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 1024,
            unique: false,
            trimp: true
        },

        bio: {
            type: String,
            required: true,
            unique: false,
            trimp: true
        },

        followers: {
            type: [String]
        },

        likes: {
            type: [String],
        }
    }
)