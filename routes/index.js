var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.cookies.jwt) {
    return res.render('homepage', { auth:false });
  }
  else {
    return res.render('homepage',{auth:true})
  }
});

module.exports = router;
