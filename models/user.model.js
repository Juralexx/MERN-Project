import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { isEmailValid } from '../utils/validations.utils.js'

const UserModel = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
            validate: {
                validator: (val) => validator.isAlphanumeric(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un nom valide'
            },
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: isEmailValid,
                message: "Veuillez saisir une adresse email valide"
            },
            match: [/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i, "Veuillez saisir une adresse email valide"],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },

        name: {
            type: String,
            trim: true,
            validate: {
                validator: (val) => validator.isAlpha(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un nom valide'
            },
        },

        gender: {
            type: String,
            default: 'Non défini',
        },

        lastname: {
            type: String,
            trim: true,
            validate: {
                validator: (val) => validator.isAlpha(val, ['fr-FR'], { ignore: " -" }),
                message: 'Veuillez saisir un nom valide'
            },
        },

        location: { type: String, },

        department: { type: String, },

        region: { type: String, },

        new_region: { type: String, },

        country: { type: String, },

        picture: {
            type: String,
            default: "http://localhost:3001/files/img/random-user.png"
        },

        cover_picture: {
            type: String,
            default: "http://localhost:3001/files/img/random-cover.jpg"
        },

        phone: {
            type: String,
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

        bio: { type: String },

        website: { type: String },

        facebook: { type: String },

        instagram: { type: String },

        twitter: { type: String },

        youtube: { type: String },

        linkedin: { type: String },

        friends: {
            type: [],
            friend: {
                type: String,
                requestedAt: Date,
            }
        },

        friend_request_sent: {
            type: [],
            friend: {
                type: String,
                requestedAt: Date,
            }
        },

        conversations: {
            type: [],
            conversation: {
                type: String,
                last_message_seen: String,
            }
        },

        favorite_conversations: {
            type: [String]
        },

        notifications: {
            type: [],
            notification: {
                _id: String,
                type: String,
                projectId: String,
                projectTitle: String,
                projectUrl: String,
                requesterId: String,
                requester: String,
                requesterPicture: String,
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

        current_projects: {
            type: [String]
        },

        completed_projects: {
            type: [String]
        },

        created_projects: {
            type: [String]
        },

        following: {
            type: [String]
        },

        projects_liked: {
            type: [String]
        },

        favorites: {
            type: [String]
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
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};


export default mongoose.model("user", UserModel)