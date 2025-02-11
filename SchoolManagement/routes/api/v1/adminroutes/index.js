const express = require('express');

const routes = express.Router();

const AdminClt = require('../../../../controllers/api/v1/adminController');

routes.post('/adminRegister',AdminClt.adminRegister);

routes.post('/adminLogin',AdminClt.adminLogin);

module.exports = routes;