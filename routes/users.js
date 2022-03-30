var express = require('express');
var router = express.Router();
const User = require('../models/User')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await User.find();
  res.json(users)
});

router.post('/',async function(req,res,next){
  let {email,password,firstName,lastName} = req.body;
  console.info({email,password,firstName,lastName});
  let newUser = new User();
  newUser.email = email
  newUser.password = password;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  await newUser.save();
  res.json(newUser);
})

module.exports = router;
