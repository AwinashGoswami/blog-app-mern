
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
            return res.status(400).json({ errors: 'Email is already taken' });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                username,
                email,
                password: hash,
            });
            const token = createToken(user);
            return res
                .status(200)
                .json({ msg: 'Your account has been created', token: token });
        } catch (error) {
            return res.status(500).json({ errors: error });
        }
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

const signin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                const token = createToken(user);
                return res
                    .status(200)
                    .json({ msg: 'You have login successfully', token: token });
            } else {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'Password is not correct' }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: 'Email not found' }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

module.exports = {
    signup, signup_Validations,
    signin, signin_Validations
}