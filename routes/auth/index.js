var express = require('express');
var router = express.Router();
const registerRouter = require('./register')
const loginRouter = require('./login')
const logoutRouter = require('./logout')

router.all('/register',registerRouter);


router.all('/login',loginRouter);

router.get('/logout',logoutRouter);


module.exports = router;