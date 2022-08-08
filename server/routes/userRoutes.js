
const express = require('express');
const userRoute = express.Router();
const {
    signup,
    signin,
    signup_Validations,
    signin_Validations
} = require('../controllers/userController');

userRoute.post('/signup', signup_Validations, signup);
userRoute.post('/signin', signin_Validations, signin);
userRoute.get('/logout');



module.exports = userRoute;
