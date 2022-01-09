import mongoose from 'mongoose'
const ProjectModel = new mongoose.Schema(
    {
        posterId: {
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

        bio: {
            type: String,
            required: true,
            unique: false,
            trimp: true
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
                            default: "../views/public/img/random-user.png"
                        }
                    }
                ]
            }
        },
        
        picture: {
            type: String
        },

        video: {
            type: String
        },

        end: {
            type: Date
        },

        followers: {
            type: [String]
        },

        likes: {
            type: [String]
        },

        likers: {
            type: [String]
        },

        views: {
            type: Number
        },

        viewers: {
            type: Number
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('project', ProjectModel)