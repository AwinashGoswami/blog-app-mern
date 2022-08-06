

const express = require('express');
const { home, about, contact } = require('../controllers/appController');
const appRoute = express.Router();

appRoute.get('/', home);
appRoute.get('/about', about);
appRoute.get('/contact', contact);

module.exports = appRoute;