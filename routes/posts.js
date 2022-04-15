var express = require('express');
var router = express.Router();
// const { db } = require('../db')

let posts = [
  {
    post_id: 93,
    upvotes: 0,
    downvotes: 0,
    description: 'new Post',
    category: 'New Post',
    publish_date: '2022-04-14T18:30:00.000Z',
    sap_id: 68,
    img: '68_Screenshot (1).png',
    first_name: 'parth',
    last_name: 'kalkotwar',
    date_of_birth: '2020-09-24T18:30:00.000Z',
    address: 'Nashik',
    email: 'p@gmail.com',
    password: 'admin',
    profile_img: '1_ckima.png',
    dept_id: 1,
    contact: '9823016777',
    year: null
},
{
  post_id: 92,
  upvotes: 0,
  downvotes: 0,
  description: 'This app is a stop destination for all your college mates.',
  category: 'Social Media App',
  publish_date: '2020-11-08T18:30:00.000Z',
  sap_id: 417000,
  img: '417000_bis.jpg',
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1999-12-31T18:30:00.000Z',
  address: 'Vile Parle,Mumbai',
  email: 'johndoe@gmail.com',
  password: '$2b$08$T6/zIk/eLRl5gcMQTnVia.HqtE61pZ4Noz9RmySFJLI0wH21r5bIO',
  profile_img: '417000_Image-from-iOS-3-3.jpg',
  dept_id: 1,
  contact: '982145673',
  year: 'SE'}
]

router.get('/:id', function(req, res) {
  //console.log(req.cookies.jwt)
  const {id} = req.params;
  // if(!req.cookies.jwt) {
  //   return res.redirect('/auth/login')
  // }
  // console.log("Here")
  res.render('Post',{data:posts,msg:"",id:id});
  // const {id} = req.params;
  //   db.query(`select * from posts join student on posts.sap_id = student.sap_id`, (err,result) => {
  //     if(err) {
  //       console.log(err);
  //     }
  //     else {
  //       //res.status(200).json(result)
  //       console.log(result)
  //       res.render('Post',{data:posts,msg:"",id:id});
  //     }
  //   })
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
      posts.push({  first_name: 'John',
      last_name: 'Doe',category:title, description:description,img:img_name})
      res.redirect(`/posts/${id}`);
      // db.query(`insert into posts(category,description,img,sap_id,publish_date) values('${title}','${description}','${img_name}',${id},NOW())`, (err,result) => {
      //   if(err) {
      //     console.log(err);
      //   }
      //   else {
      //     res.redirect(`/posts/${id}`);
      //   }
      // })
    }
  })
})

module.exports = router;
