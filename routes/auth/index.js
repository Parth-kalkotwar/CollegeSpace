var express = require('express');
var router = express.Router();
const registerRouter = require('./register')
const registerFaculty = require('./register_faculty')
const loginRouter = require('./login')
const logoutRouter = require('./logout')

router.all('/registerStudent',registerRouter);

router.all('/registerFaculty',registerFaculty);


router.all('/login',loginRouter);

router.get('/logout',logoutRouter);


module.exports = router;