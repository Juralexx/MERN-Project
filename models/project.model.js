import mongoose from 'mongoose'
const ProjectModel = new mongoose.Schema(
    {
        poster: {
            type: Object,
            required: true,
            _id: {
                type: String,
                required: true
            },
            pseudo: {
                type: String,
                required: true
            },
            picture: {
                type: String,
                required: true
            },
        },

        state: {
            type: String,
            default: "in progress"
        },

        title: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 10,
            maxlength: 60,
        },

        subtitle: {
            type: String,
            unique: false,
            trim: true,
            minlength: 10,
            maxlength: 100,
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
            required: true,
            unique: false,
            minlength: 3,
        },

        tags: {
            type: [String],
            required: false,
            maxlength: 12,
        },

        location: {
            type: Object,
            required: true,
            unique: false,
            city: String,
            department: String,
            code_department: Number,
            region: String,
            code_region: Number,
            new_region: String,
            code_new_region: Number,
            geolocalisation: String,
        },

        description: {
            type: String,
            required: true,
            unique: false,
            minlength: 10,
            maxlength: 300,
        },

        content: {
            type: [],
            required: true,
            unique: false,
        },

        pictures: {
            type: [String]
        },

        networks: {
            type: [String],
            required: false,
        },

        works: {
            type: [],
            work: {
                type: Object,
                unique: true,
                name: String,
                description: String
            }
        },

        members: {
            type: [],
            member: {
                type: Object,
                _id: String,
                pseudo: String,
                picture: String,
                role: String,
                since: Date
            }
        },

        manager: {
            type: String,
            required: true,
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
                end: Date,
                date: Date,
                poster: {
                    type: Object,
                    required: true,
                    _id: {
                        type: String,
                        required: true
                    },
                    pseudo: {
                        type: String,
                        required: true
                    },
                    picture: {
                        type: String,
                        required: true
                    },
                },
                members: {
                    type: [],
                    member: {
                        _id: {
                            type: String,
                            required: true
                        },
                        pseudo: {
                            type: String,
                            required: true
                        },
                        picture: {
                            type: String,
                            required: true
                        },
                    }
                },
                comments: {
                    type: [],
                    comment: {
                        _id: String,
                        text: String,
                        date: String,
                        poster: {
                            type: Object,
                            required: true,
                            _id: {
                                type: String,
                                required: true
                            },
                            pseudo: {
                                type: String,
                                required: true
                            },
                            picture: {
                                type: String,
                                required: true
                            },
                        },
                    }
                }
            }
        },

        actualities: {
            type: [],
            actuality: {
                _id: String,
                url: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true,
                    minlength: 10,
                    maxlength: 60,
                },
                description: {
                    type: String,
                    required: true,
                    minlength: 10,
                },
                date: {
                    type: Date,
                    required: true
                },
                pictures: [String],
                poster: {
                    type: Object,
                    required: true,
                    _id: {
                        type: String,
                        required: true
                    },
                    pseudo: {
                        type: String,
                        required: true
                    },
                    picture: {
                        type: String,
                        required: true
                    },
                }
            }
        },

        QNA: {
            type: [],
            question: {
                _id: String,
                question: {
                    type: String,
                    required: true,
                    minlength: 10,
                    maxlength: 100,
                },
                response: {
                    type: String,
                    minlength: 10,
                    maxlength: 4000,
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
                prev_state: String,
                new_state: String,
                /************ actuality **********/
                actuality: String,
                /************* admin *************/
                new_admin: String,
                /********* exclude member ********/
                excluded: String,
                /********** leave project ********/
                leaver: String,
            }
        },

        followers: {
            type: [],
            follower: {
                type: String,
                unique: true
            }
        },

        likers: {
            type: [],
            liker: {
                type: String,
                unique: true
            }
        },

        favorites: {
            type: [],
            favorite: {
                type: String,
                unique: true
            }
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