var express = require('express');
var router = express.Router();
const { db } = require('../../db')
const bcrypt = require("bcrypt");

router.get('/register', function(req, res) {
    res.render("register");
});

router.post('/register',(req,res) => {
    const {firstname,lastname,address,sap,email,password,} = req.body
    console.log(req.body);
    db.query(`select email from student where email = ?`,[email],async (err,results) => {
        if(err) {
            console.log(err);
        }
        else if(results.length > 0) {
            return res.render('register', {
                msg:'Email Already In Use'
            })
        }
        let hash = await bcrypt.hash(password,8);
        //console.log(hash);
        return res.render('register',{msg:"User Successfully Registered"})
        //console.log(firstname)
        /*
        db.query(`insert into student (first_name,last_name,address,sap_id,email,password) values (?,?,?,?,?,?)`,[firstname,lastname,address,sap,email,password],(err,result) => {
            if(err) {
                console.log(err);
            }
            console.log(result);
            return res.render('register',{msg:"User Successfully Registered"})
        })*/
    })
})


module.exports = router;