var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/', function(req, res) {
  db.query(`select * from notices`, (err,result) => {
    if(err) {
      console.log(err);
    }
    else {
      //res.status(200).json(result)
      res.render('notices',{data:result});
    }
  })
});

router.post('/',async(req,res) => {
    const {description} = req.body;
    const id = 1;
    var file = req.files.img;
    var img_name =id + "_" + file.name;
    file.mv('public/images/posts/' + img_name,async(err) => {
      if(err) {
        console.log(err);
      }
      else {
        db.query(`insert into notices(issue_date,description,id) values(CURDATE(),'${description}',${id})`, (err,result) => {
          if(err) {
            console.log(err);
          }
          else {
            res.redirect('/posts');
          }
        })
      }
    })
  })
  

module.exports = router;

