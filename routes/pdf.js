var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/:name', function(req, res) {
  if(!req.cookies.jwt) {
    return res.redirect('/auth/login')
  }
  console.log(req.params.name)
  return res.render('pdf',{name:req.params.name})
});


module.exports = router;
