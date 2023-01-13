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

        tags: {
            type: [String],
        },

        geolocalisation: {
            type: String,
            default: null,
        },
        location: {
            type: String,
            default: null,
        },
        department: {
            type: String,
            default: null,
        },
        code_department: {
            type: Number,
        },
        region: {
            type: String,
            default: null,
        },
        code_region: {
            type: Number,
        },
        new_region: {
            type: String,
            default: null,
        },
        code_new_region: {
            type: Number,
        },

        description: {
            type: String,
        },

        content: {
            type: [],
            required: true,
            unique: false,
        },

        works: {
            type: [],
            name: String,
            number: Number,
            numberFound: Number,
            description: String
        },

        pictures: {
            type: [String]
        },

        day: {
            type: Date
        },

        start: {
            type: Date
        },

        end: {
            type: Date
        },

        networks: {
            type: [],
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
                },
                comments: {
                    type: [],
                    comment: {
                        _id: String,
                        poster: String,
                        posterId: String,
                        text: String,
                        date: String,
                    }
                }
            }
        },

        actualities: {
            type: [],
            actuality: {
                _id: String,
                url: String,
                title: String,
                description: String,
                posterId: String,
                poster: String,
                posterPicture: String,
                date: Date,
                pictures: [String]
            }
        },

        QNA: {
            type: [],
            question: {
                question: String,
                response: String
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
                /************ actuality **********/
                actuality: String,
                /************* admin *************/
                newAdmin: String,
                /********* exclude member ********/
                excluded: String,
                /********** leave project ********/
                leaver: String,
            }
        },
        
        followers: {
            type: [String]
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