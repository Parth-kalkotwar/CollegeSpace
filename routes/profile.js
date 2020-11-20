var express = require('express');
var router = express.Router();
const { db } = require('../db')

router.get('/:id', function(req, res) {
  const {id} = req.params;
    db.query(`select * from student join department on student.dept_id = department.department_id where student.sap_id = ${id}`, (err,result) => {
      if(err) {
        console.log(err);
      }
      else {
        //res.status(200).json(result)
        var dob = String(result[0].date_of_birth).split(" ")
        result[0].date_of_birth = dob[0] + " " + dob[1] + " " + dob[2] + " " + dob[3]
        res.render('profile',{data:result,msg:"",id:req.params.id});
      }
    })
});

module.exports = router;