import mongoose from 'mongoose'
import validator from 'validator'
const ProjectModel = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            unique: false,
            trim: true,
        },

        titleURL: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true,
            unique: false,
        },

        numberofcontributors: {
            type: Number,
            required: false,
            contributor: {
                type: [
                    {
                        work: {
                            type: String,
                            minlength: 3,
                            maxlength: 1024,
                            unique: false,
                            trim: true
                        },

                        picture: {
                            type: String,
                            default: "/img/random-user.png"
                        }
                    }
                ]
            }
        },

        picture: {
            type: String,
            default: "/img/random-cover.jpg"
        },

        video: {
            type: String
        },

        end: {
            type: Date
        },

        follows: {
            type: Number,
            default: 0
        },

        followers: {
            type: [String]
        },

        likes: {
            type: Number,
            default: 0
        },

        likers: {
            type: [String]
        },

        views: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("project", ProjectModel)