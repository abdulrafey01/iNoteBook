const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()   // To use the routes
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

// Should be in env.local file
const JWT_SECRET = 'DevletIA'

//ROUTE 1: /createUSer api and checks to check the data : POST : 
router.post('/createuser', [
   body('name').isLength({ min: 3 }),
   body('email').isEmail(),
   body('password').isLength({ min: 6 }),
], async (req, res) => {

   // If there are errors in posting data show errors
   const error = validationResult(req);
   if (!error.isEmpty()) {
      return res.send({ errors: error.array() });
   }

   // Check if user with same email already exists
   let user = await User.findOne({ email: req.body.email })
   if (user) {
      return res.status(400).json("User already exists")
   }

   // Creating User With The Help Of User Model
   try {

      // Adding salt to password and making it secure
      const salt = await bcrypt.genSalt(10)
      const secPassword = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPassword
      })
      console.log("User Created")

      // Jwt Token
      const data = {
         userId: user.id
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json({ authToken: authToken })


   } catch (error) {
      console.log(error.message)
   }

   // res.send(req.body)
})

//ROUTE 2: Login Endpoint : POST : 

router.post('/login/', [

   // Check if email and password is in cirrect format
   body('email', 'Please Enter Email Correctly').isEmail(),
   body('password', 'Please Enter Password').exists(),

], async (req, res) => {

   // If there are errors as loging in with wrong format
   const error = validationResult(req);
   if (!error.isEmpty()) {
      return res.send({ errors: error.array() });
   }

   const { email, password } = req.body
   const enteredEmail = email
   const enteredPassword = password
   try {

      // First Check Email. It will return us the user with matched Email
      const user = await User.findOne({ email: enteredEmail })
      if (!user) {
         return res.status(400).json('Jani Email Sai Dal')
      }

      // Second Check password
      const passwordCompare = await bcrypt.compare(enteredPassword, user.password)
      if (!passwordCompare) {
         return res.json('Jani password Sai Dal')
      }

      // to pass userdetails to other pages
      // Jwt Token
      const data = {
         userId: user.id
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json({ authToken: authToken })
   } catch (error) {
      console.log(error)
   }
})


//ROUTE 3: Get User Details : POST : // An example that will access the loginned user
router.post('/getuser', fetchuser, async (req, res) => {
   try {
      const userId = req.user
      const user = await User.findById(userId).select('-password')
      return res.send(user)
   } catch (error) {
      console.log(error.message)
      return res.status(400).json("Fetching Error")
   }
})



module.exports = router
