var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/:id', function(req, res) {
  //console.log(req.cookies.jwt)
  
  // if(!req.cookies.jwt) {
  //   return res.redirect('/auth/login')
  // }
  const {id} = req.params;
    db.query(`select * from posts join student on posts.sap_id = student.sap_id`, (err,result) => {
      if(err) {
        console.log(err);
      }
      else {
        //res.status(200).json(result)
        res.render('Post',{data:result,msg:"",id:id});
      }
    })
});

router.post('/:id',async(req,res) => {
  const {title,description} = req.body;
  const {id} = req.params;
  var file = req.files.img;
  var img_name =id + "_" + file.name;
  file.mv('public/images/posts/' + img_name,async(err) => {
    if(err) {
      console.log(err);
    }
    else {
      db.query(`insert into posts(category,description,img,sap_id,publish_date) values('${title}','${description}','${img_name}',${id},NOW())`, (err,result) => {
        if(err) {
          console.log(err);
        }
        else {
          res.redirect(`/posts/${id}`);
        }
      })
    }
  })
})

module.exports = router;
