const jwt = require("jsonwebtoken")


const generateToken = (id)=>{
  return jwt.sign({id},process.env.SECRETE,{expiresIn: '3d'})
}

module.exports = {generateToken}