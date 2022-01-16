import mongoose from 'mongoose'
const ProjectModel = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 120,
            unique: false,
            trimp: true
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
                            trimp: true
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

export default mongoose.model('project', ProjectModel)