const { request, response } = require('express');
var express = require('express');
var router = express.Router();

const middleware = require('../middleware/jwt-middleware.js');

var u_controller = require('../controllers/user.controller'); 

router.post('/', u_controller.LOGIN);

module.exports = router;