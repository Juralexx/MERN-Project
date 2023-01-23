import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { isEmailValid } from '../utils/validations.utils.js'

const UserModel = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
            validate: {
                validator: (val) => validator.isAlphanumeric(val, ['fr-FR'], { ignore: " -" }),
                message: 'Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscores (_) et faire entre 3 et 20 caractères.'
            }
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: isEmailValid,
                message: "Veuillez saisir une adresse email valide."
            }
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },

        name: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 60,
            trim: true,
            validate: {
                validator: (val) => validator.isAlpha(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un prénom valide.'
            },
        },

        lastname: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 60,
            trim: true,
            validate: {
                validator: (val) => validator.isAlpha(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un nom valide.'
            },
        },

        location: {
            type: Object,
        },

        picture: {
            type: String,
            default: "http://localhost:3001/files/img/random-user.jpg"
        },

        cover_picture: {
            type: String,
            default: "http://localhost:3001/files/img/random-cover.jpg"
        },

        phone: {
            type: String,
            required: false,
            trim: true,
            validate: {
                validator: validator.isMobilePhone,
                message: 'Veuillez saisir un numéro de téléphone valide'
            },
        },

        work: {
            type: String,
            trim: true,
            validate: {
                validator: (val) => validator.isAlpha(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un nom valide'
            },
        },

        bio: {
            type: String
        },

        networks: {
            type: [],
        },

        contacts: {
            type: [],
            contact: {
                type: String,
                requestedAt: Date,
            }
        },

        contact_request: {
            type: [],
            contact: {
                type: String,
                requestedAt: Date,
            }
        },

        contact_request_sent: {
            type: [],
            contact: {
                type: String,
                requestedAt: Date,
            }
        },

        member_request: {
            type: [],
            request: {
                _id: String,
                requester: {
                    _id: String,
                    pseudo: String,
                    picture: String
                },
                projectId: String,
                requestedAt: Date,
            }
        },

        member_request_sent: {
            type: [],
            request: {
                _id: String,
                requester: {
                    _id: String,
                    pseudo: String,
                    picture: String
                },
                projectId: String,
                description: String,
                works: Array,
                requestedAt: Date,
            }
        },

        research: {
            type: [],
            search: {
                query: String,
                category: String,
                location: Array,
                Date: Date,
                State: String,
                createdAt: Date
            }
        },

        notifications: {
            type: [],
            notification: {
                _id: String,
                type: String,
                project: {
                    _id: String,
                    title: String,
                }, 
                requester: {
                    _id: String,
                    pseudo: String,
                    picture: String
                },
                date: Date,
                seen: Boolean,
                state: String,
            }
        },

        unseen_notifications: {
            type: Number,
            min: 0,
            default: 0,
        },

        projects: {
            type: [String]
        },

        created_projects: {
            type: [String]
        },

        followed: {
            type: [String]
        },

        liked: {
            type: [String]
        },

        favorites: {
            type: [String]
        },

        conversations: {
            type: [],
            conversation: {
                type: String,
                id: String,
                last_message_seen: String,
                favorite: Boolean
            }
        },

        last_conversation: {
            type: String,
        },

        theme: {
            type: String,
            default: "dark"
        },
    },
    {
        timestamps: true,
    }, { minimize: false }
);

UserModel.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserModel.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            return user;
        } else {
            throw {
                name: 'password',
                message: 'Mot de passe incorrect.'
            };
        }
    } else {
        throw {
            name: 'email',
            message: 'Cet email n\'est rattachée à aucun compte.'
        }
    }

};


export default mongoose.model("user", UserModel)