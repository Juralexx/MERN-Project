const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,

        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },

        picture: {
            type: String,
            default: "../views/public/img/random-user.png"
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