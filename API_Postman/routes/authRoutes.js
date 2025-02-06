const express = require('express');

const routes = express.Router();

const authclt = require('../controllers/authController');

routes.post('/signup' , authclt.signup);

routes.post('/signin',authclt.signin);

module.exports = routes;