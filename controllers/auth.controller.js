import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { signUpErrors, signInErrors } from './../utils/error.utils.js'

const maxAge = 3000 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

export const signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
  
    try {
      const user = await UserModel.create({ pseudo, email, password })
      res.status(201).json({ user: user._id })
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }
}

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