var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/:id', function(req, res) {
  if(!req.cookies.jwt) {
    return res.redirect('/auth/login')
  }
  return res.render('notes_main',{id:req.params.id})
});


module.exports = router;
