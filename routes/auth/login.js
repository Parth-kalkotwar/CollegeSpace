var express = require('express');
var router = express.Router();
const { db } = require('../../db')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


router.get('/login', function(req, res) {
  res.render('newlogin');
});

router.post('/login',(req,res) => {
    //console.log(req.body)
    const {email,password} = req.body;
    if(!email || !password) {
        return res.render('newlogin');
    }
    else {
        db.query(`select * from student where email = ?`,[email], async (err,results) => {
            console.log("result",results);
            if(err) {
                console.log(err);
            }
            else if(results.length == 0 || !await bcrypt.compare(password,results[0].password)) {
                return res.redirect('/auth/login')
            }
            else {
                const { sap_id } = results[0];
                const token = jwt.sign({sap_id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRESIN
                });
                const opts = {
                    expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60
                ),
                httpOnly:true   
            }
            res.cookie('jwt',token,opts);
            return res.status(200).redirect(`/posts/${sap_id}`);
            }
        })
    }
    
})

module.exports = router;