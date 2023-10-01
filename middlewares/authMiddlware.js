const User = require('../models/userModel')

const jwt = require("jsonwebtoken");
const authMiddleWare = async(req,res,next)=>{
  let token;
  if(req?.headers?.authorization?.startsWith('Bearer')){
    token = req.headers.authorization.split(" ")[1];
    try {
       if(token){
        const decoded = jwt.verify(token,process.env.SECRETE);
         const user = await User.findById(decoded?.id)
         req.user= user
        next()
       }
    } catch (error) {
      throw new Error('Not Authorized token exired,please login agai')
      
    }
  }
  else{
    throw new Error('There is no token attached to hedar')
  }
} 
const isAdmin = async(req,res,next)=>{
   try {
    const {email} = req.user
   
    const adminUser = await User.findOne({email})
    console.log(adminUser)
    if(!adminUser){
      throw new Error('user not found ')
    }
    if(adminUser.role !== 'admin'){ 
      
      res.status(404).json({message:'you are no admin'})
    }
    else{  
      next() 
    }

  } catch (error) { 
      
  }
}
module.exports = {authMiddleWare,isAdmin};