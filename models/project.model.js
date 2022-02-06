import mongoose from 'mongoose'
const ProjectModel = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

        posterPseudo: { type: String },

        posterAvatar: { type: String },

        state: { type: String, default: "En préparation" },

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

        location: {
            type: String,
            default: null,
        },
        department: {
            type: String,
            default: null,
        },
        region: {
            type: String,
            default: null,
        },
        new_region: {
            type: String,
            default: null,
        },

        content: {
            type: [],
            required: true,
            unique: false,
        },

        numberofcontributors: {
            type: Number,
        },

        works: {
            type: [],
            name: String,
            numberFound: { type: Number, default: "0" },
            number: Number
        },

        picture: {
            type: String,
            default: "/img/random-cover.jpg"
        },

        end: {
            type: Date
        },

        follows: { type: Number, default: 0 },
        followers: { type: [String] },

        likes: { type: Number, default: 0 },
        likers: { type: [String] },

        favorites: {
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