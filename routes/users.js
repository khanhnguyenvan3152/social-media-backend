var express = require('express');
var router = express.Router();
const User = require('../models/User')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let users = await User.find();
  res.json(users)
});

router.post('/', async function (req, res, next) {
  try {
    let { email, password, firstName, lastName, phone } = req.body;
    if (await User.exists({ email: email })) {
      res.status(400).json({ email: { message: "Email is already used!" } })
      return;
    } else {
      let newUser = new User();
      newUser.email = email
      newUser.password = password;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.phone = phone;
      await newUser.save();
      res.json(newUser);
    }
  } catch (exception) {
    res.status(400).json(exception.errors)
  }
})

module.exports = router;
