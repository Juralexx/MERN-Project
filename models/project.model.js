const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

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
                            default: "./uploads/profil/ramdom-contributor.png"
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
        }
    },
    {
        timestamps: true
    }
)

const ProjectModel = mongoose.model('project', projectSchema)
module.exports = ProjectModel