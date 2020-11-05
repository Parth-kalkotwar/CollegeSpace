var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/:id/:year', function(req, res) {
  if(!req.cookies.jwt) {
    return res.redirect('/auth/login')
  }
  //console.log(req.params.year);
  db.query(`select * from notes where year = ${req.params.year}`,(err,ress) => {
      if(err) {
          console.log(err);
      }
      console.log(ress);
      return res.render('notes',{id:req.params.id,year:req.params.year,data:ress})
  })
  
});

router.post('/:id/:year',async(req,res) => {
    const {subject,title} = req.body
    const {id,year} = req.params
    console.log(subject,title,req.files)
    var file = req.files.pdf;
    var pdf_name =id + "_" + file.name;
    file.mv('public/pdf/' + pdf_name,async(err) => {
        if(err) {
            console.log(err);
        }
        db.query(`insert into notes(path,subject,title,year) values('${pdf_name}','${subject}','${title}',${year})`,(err,ress) => {
            if(err) {
                console.log(err);
            }
            res.redirect(`/notes_year/${id}/${year}`);
        })
    });
});

module.exports = router;
