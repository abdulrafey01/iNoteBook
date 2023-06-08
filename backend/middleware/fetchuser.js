
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'DevletIA'

const fetchuser = (req, res, next)=>{
    
    const token = req.header('auth-token')
    if(!token){
        res.json('Please Use A Valid Token')
    }
    try {
        // DecodedToken is actuaaly a data object that we sent in login page for Jwt Sign
        const decodedToken = jwt.verify(token,JWT_SECRET)
    
        const userId = decodedToken.userId

        // req.(your choice) ha lekin use bhi phir ussi trah krna ha
         req.user = userId
        next()
    } catch (error) {
        res.status(400).json('Please Use Valid Token')
    }
  
}

module.exports = fetchuser