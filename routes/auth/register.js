var express = require('express');
var router = express.Router();
const { db } = require('../../db')
const bcrypt = require("bcrypt");


router.get('/registerStudent', function(req, res) {
    res.render("register_student");
});


router.post('/registerStudent',(req,res) => {
    const {firstname,lastname,address,sapid,email,password,dob,phone,year} = req.body
    var {stream} = req.body;
    stream = stream.toLowerCase();
    var file = req.files.avatar;
    var img_name = sapid + "_" + file.name;
    file.mv('public/images/profile/' + img_name,async (err) => {
        if(err) {
            console.log(err);
        }
        db.query(`select email from student where email = ?`,[email],async (err,results) => {
            if(err) {
                console.log(err);
            }
            else if(results.length > 0) {
                return res.render('register_student', {
                    msg:'Email Already In Use'
                })
            }
            db.query(`select department_id from department where name = '${stream}'`, async(err,result) => {
                if(err) {
                    console.log(err)
                }
                let hash = await bcrypt.hash(password,8);
                db.query(`insert into student (first_name,last_name,address,sap_id,email,password,date_of_birth,dept_id,year,contact,profile_img) values (?,?,?,?,?,?,?,?,?,?,?)`,[firstname,lastname,address,sapid,email,hash,dob,result[0].department_id,year,phone,img_name],(err,resu) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log(resu);
                    return res.redirect('/auth/login');
                })
                
            })
        })
    })
})


module.exports = router;