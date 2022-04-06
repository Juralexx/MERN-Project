import mongoose from 'mongoose'
const ProjectModel = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },

        posterPseudo: {
            type: String,
            required: true
        },

        posterAvatar: {
            type: String,
            required: true
        },

        state: {
            type: String,
            default: "En préparation"
        },

        title: {
            type: String,
            required: true,
            unique: false,
            trim: true,
        },

        subtitle: {
            type: String,
            unique: false,
            trim: true,
        },

        URL: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },

        URLID: {
            type: String,
            required: true,
            unique: false,
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

        description: {
            type: String,
        },

        content: {
            type: [],
            required: true,
            unique: false,
        },

        numberofcontributors: {
            type: String,
        },

        works: {
            type: [],
            name: String,
            numberFound: {
                type: Number,
                default: "0"
            },
            number: Number
        },

        pictures: {
            type: [String]
        },

        end: {
            type: Date
        },

        members: {
            type: [],
            member: {
                id: String,
                pseudo: String,
                picture: String,
                role: String,
                since: Date
            }
        },

        manager: {
            type: String
        },

        admins: {
            type: [String],
        },

        member_requests: {
            type: [],
            request: {
                id: String,
                pseudo: String,
                picture: String,
                requesterId: String,
                requester: String,
                date: Date
            }
        },

        tasks: {
            type: [],
            task: {
                _id: String,
                title: String,
                description: String,
                state: String,
                status: String,
                creatorId: String,
                creator: String,
                creatorPicture: String,
                end: Date,
                date: Date,
                members: {
                    type: [],
                    member: {
                        id: String,
                        pseudo: String,
                        picture: String,
                    }
                }
            }
        },

        activity_feed: {
            type: [],
            activity: {
                type: String,
                date: Date,
                who: String,
                /****** add / remove member ******/
                member: String,
                /************* task **************/
                task: String,
                prevState: String,
                newState: String,
                /************* admin *************/
                newAdmin: String,
                /********* excluse member ********/
                excluded: String,
                /********** leave project ********/
                leaver: String,
            }
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