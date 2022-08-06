
const { body, validationResult } = require('express-validator');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup_Validations = [
    body("username").not().isEmpty().trim().withMessage('Username is required'),
    body("email").not().isEmpty().trim().withMessage('Email is required'),
    body("password").isLength({ min: 6 }).withMessage('Password must be 6 characters long')
]

const signin_Validations = [
    body("email").not().isEmpty().trim().withMessage('Email is required'),
    body("password").isLength({ min: 6 }).withMessage('Password must be 6 characters long')
]

const createToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7d' });
}

const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ error: [{ msg: 'Email is already taken' }] });
        }
        const hash_pass = await bcrypt.hash(password, 12);
        const insertUser = await User.create({ username, email, password: hash_pass });
        if (insertUser) {
            return res.status(200).json({ message: 'Account created' });
        }
    }
    catch (error) {
        return res.status(500).json({ errors: error });
    }
}

const signin = async (req, res) => {


    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ message: 'Email not found' });
        }
        else {
            const checkPass = await bcrypt.compare(password, checkUser.password);
            if (!checkPass) {
                return res.status(400).json({ message: 'Password incorrect' });
            }
            else {
                const token = createToken(checkUser);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                return res.status(200).json({ message: 'Logged in Successfully', token });
            }
        }
    } catch (error) {
        return res.status(500).json({ errors: error.response.data.errors });
    }
}

const logout = (res) => {
    res.clearCookie('jwtoken', { path: '/' });
    return res.status(200).send('Log out')
}

module.exports = {
    signup, signup_Validations,
    signin, signin_Validations,
    logout
}