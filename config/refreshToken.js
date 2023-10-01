const jwt = require("jsonwebtoken")


const generateRefreshToken = (id)=>{
  return jwt.sign({id},process.env.SECRETE,{expiresIn: '3d'})
}

module.exports = {generateRefreshToken}