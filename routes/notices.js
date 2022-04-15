var express = require('express');
var router = express.Router();
const { db } = require('../db')

let notices = [
  {
    notice_number: 2,
    issue_date: '2020-10-30',
    description: 'Diwali Vacation Scheduled from 13 NOV'
  },
  {
    notice_number: 3,
    issue_date: '2020-11-08',
    description: 'TCS TERM TEST - 2 MARKS'
  }
]

router.get('/:id', function(req, res) {
  res.render('notices',{data:notices,id:req.params.id});

  // db.query(`select * from notices`, (err,result) => {
  //   if(err) {
  //     console.log(err);
  //   }
  //   else {
  //     //res.status(200).json(result)
  //     console.log(result);
  //     for(var i = 0;i<result.length;i++) {
  //       var dd = String(result[i].issue_date).split(" ");
  //       result[i].issue_date = dd[2] + " " + dd[1] + " " + dd[3]; 
  //     }
  //     res.render('notices',{data:result,id:req.params.id});
  //   }
  // })
});

router.post('/:id',async(req,res) => {
    console.log(req.body)
    const {description} = req.body;
    const {id} = req.params;
    // var file = req.files.img;
    // var img_name =id + "_" + file.name;
    notices.push({description:description,issue_date:'15-04-2022'});
    res.redirect(`/notices/${id}`);
    // file.mv('public/images/posts/' + img_name,async(err) => {
    //   if(err) {
    //     console.log(err);
    //   }
    //   else {
    //     // db.query(`insert into notices(issue_date,description,id) values(CURDATE(),'${description}',${id})`, (err,result) => {
    //     //   if(err) {
    //     //     console.log(err);
    //     //   }
    //     //   else {
    //     //     res.redirect('/notices/<%=id%>');
    //     //   }
    //     // })
    //   }
    // })
  })
  

module.exports = router;

