import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { signUpErrors, signInErrors } from './../utils/error.utils.js'

/**********************************************************************************************************************/
/********************************************** CREATE UNIQUE TOKEN ***************************************************/

const maxAge = 3000 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

/**********************************************************************************************************************/
/****************************************************** SIGNUP ********************************************************/

export const signUp = async (req, res) => {
    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password })

        const __directory = `${__dirname}/../uploads/users/${user._id}`
        if (!fs.existsSync(__directory)) {
            fs.mkdirSync(__directory, { recursive: true })
        }

        const defaultProPic = `${__dirname}/../files/img/random-user.png`
        fs.copyFile(defaultProPic, `${__directory}/${user._id}.jpg`, (err) => {
            if (err) throw err
        })

        const defaultCoverPic = `${__dirname}/../files/img/random-cover.jpg`
        fs.copyFile(defaultCoverPic, `${__directory}/cover-${user._id}.jpg`, (err) => {
            if (err) throw err
        })

        const ProPicName = `${process.env.SERVER_URL}/uploads/users/${user._id}/${user._id}.jpg`;
        const CoverPicName = `${process.env.SERVER_URL}/uploads/users/${user._id}/cover-${user._id}.jpg`;

        try {
            UserModel.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        picture: ProPicName,
                        cover_picture: CoverPicName,
                    }
                },
                { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) {
                        return res.status(201).json({ user: user._id })
                    } else {
                        return res.status(400).send({ message: err });
                    }
                }
            )
        } catch (err) {
            return res.status(400).send({ message: err });
        }
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
}

/**********************************************************************************************************************/
/****************************************************** SIGNIN ********************************************************/

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
}

export const logOut = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}