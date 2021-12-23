const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
//const { isEmailValid } = require('../utils/validations.utils');
const isEmailValid = function(email) {
    const emailRegexp = new RegExp(
       /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
     )
     return emailRegexp.test(email)
 }
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
            trimp: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmailValid],
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
            trimp: true,
        },

        lastname: {
            type: String,
            trimp: true,
        },

        picture: {
            type: String,
            default: "../views/public/img/random-user.png"
        },

        phone: {
            type: String,
            trim: true
        },

        work: {
            type: String,
            trim: true,
        },

        bio: {
            type: String,
            maxlength: 1024
        },

        following: {
            type: [String]
        },

        likes: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {
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


const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel;