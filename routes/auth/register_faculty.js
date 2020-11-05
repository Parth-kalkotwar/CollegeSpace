var express = require('express');
var router = express.Router();
const { db } = require('../../db')
const bcrypt = require("bcrypt");

router.get('/registerFaculty', function(req, res) {
    res.render("register_faculty");
});

router.post('/registerFaculty',(req,res) => {
    const {firstname,lastname,sapid,email,password,dob,phone,doj,subjects} = req.body
    var file = req.files.avatar;
    var img_name = sapid + "_" + file.name;
    file.mv('public/images/faculty/' + img_name,async (err) => {
        if(err) {
            console.log(err);
        }
        db.query(`select email from faculty where email = ?`,[email],async (err,results) => {
            if(err) {
                console.log(err);
            }
            else if(results.length > 0) {
                return res.redirect('/auth/registerFaculty', {
                    msg:'Email Already In Use'
                })
            }
            let hash = await bcrypt.hash(password,8);
            await db.query(`insert into faculty (first_name,last_name,id,email,password,dob,date_of_joining,contact,profile_img) values (?,?,?,?,?,?,?,?,?)`,[firstname,lastname,sapid,email,hash,dob,doj,phone,img_name],(err,resu) => {
                if(err) {
                    console.log(err);
                }
                console.log(resu);
                for(var i = 0;i<subjects.length;i++) {
                    //console.log(subjects[i])
                    db.query(`insert into teaches_in(id,subject) values(${sapid},'${subjects[i]}')`, async(err,result) => {
                        if(err) {
                            console.log(err)
                        }
                    })
                }
                return res.redirect('/auth/login');
            })
        })
    })
})


module.exports = router;