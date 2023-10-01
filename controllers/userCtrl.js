const User = require('../models/userModel');
const { generateToken } = require('../config/jwtToken');
const jwt = require('jsonwebtoken')

const createUser = async(req,res,next)=>{
  const email = req.body.email;
  const findUser = await User.findOne({email})
  if(!findUser){
    const newUser = await User.create(req.body);
    res.json(newUser)
  }else{
    res.json({
      message: 'user already exists',
      succes:false
    })
  }
}

const loginUserCrtl = async(req,res,next)=>{
  try {
    const {email,password} = req.body;
  
    const findUser = await User.findOne({email});
     if(findUser && await findUser.isPasswordMatched(password)){
      const refreshToken = await generateToken(findUser._id);
      const updateuser = await User.findByIdAndUpdate(findUser._id,{refreshToken:refreshToken},{new:true})
      res.cookie('refreshToken',refreshToken,{
        httpOnly: true,
        maxAge:72*60*60*1000, 
      })
      
        res.json({
        _id: findUser._id,
        name: findUser.firstName  +" "+ findUser.lastName,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser?._id)
       })
    }else{
        res.json({message:'you are not exist id',password:password})
    }
  } catch (error) { 
    next(error)
  }
}
const handleRefreshToken = async(req,res,next)=>{
   try {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) {res.status(404).json({message:"refresh token not found"})}
    const refreshToken =cookie.refreshToken; 
     const user = await User.findOne({refreshToken})
      if(!user) {res.send('No Refresh Token present in db or not match')}
      const decoded = await jwt.verify(refreshToken,process.env.SECRETE)
      if(!decoded){res.status(404).json({message:'There is something wrong with refresh token'})}
     const accessToken = await generateToken(user?._id)
     res.json({accessToken})
    } catch (error) {
      res.status(400).json({message:'invalid'})
   }
}
const logout = async(req,res,next)=>{
const cookie = req.cookies;
if(!cookie?.refreshToken){res.status(404).json({message:"your are not exits"})}
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken})
  if(!user){
    res.clearCookie('refreshToken',{
      httpOnly:true,
      secure:true
    })
    
  return res.status(204)

  }
  await User.findOneAndUpdate(refreshToken,{refreshToken:'',})
  res.clearCookie('refreshToken',{
    httpOnly:true,
    secure:true
  })
  return res.sendStatus(204)
  
}
const getalUser = async(req,res,next)=>{ 
  try {
     const getUsers = await User.find({});
     res.json({getUsers})
  } catch (error) {

    next(error)
  }
}

const getIdByUser = async(req,res,next)=>{
 
  try {
    const id = req.user._id;
      const getUser = await User.findById({_id:id});
     res.json({getUser})
  } catch (error) {
    next(error)
  }
}
const deleteIdByUser = async(req,res,next)=>{
  try {
     const id = req.params.id;
     const findUser = await User.findById(id)
     
     if(!findUser){
       res.status(404).json({message:'user not found'})
     }else{

      await User.findByIdAndDelete({_id:id})
      res.json({message:'user already delete'})
     } 
 
  } catch (error) {
    next(error)
  }
}
const updateUserById = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const {firstName,lastName,email,mobile} = req.body
   
     const exsitUser = await User.findById(id);
    if(!exsitUser){
      res.status(400).json({message:"user not found "})
    }
    const updateUserById = await User.findByIdAndUpdate(id,{firstName,lastName,email,mobile},{new:true})
    res.status(202).json({message:'user already update by id',updateUserById})
  } catch (error) {
    
  }
}
const blockUsr = async(req,res,next)=>{
  const {id} = req.params;
  try {
     const block = await User.findByIdAndUpdate(id,{isBlocked:true},{new:true})
      if(!block){
        res.status(404).json({message: 'user is not found '})
      }
      res.status(202).json({message: 'user is block',payload:{block}})
    } catch (error) {
    res.status(404).json({message:error.message})
    
  }

}
const unblockUsr = async(req,res,next)=>{
  const {id} = req.params;
  try {
     const block = await User.findByIdAndUpdate(id,{isBlocked:false},{new:true})
      if(!block){
        res.status(404).json({message: 'user is not found '})
      }
      res.status(202).json({message: 'user is block',payload:{block}})
    } catch (error) {
    res.status(404).json({message:error.message})
    
  }

}
module.exports = {createUser,logout,handleRefreshToken,loginUserCrtl,getalUser,getIdByUser,deleteIdByUser,updateUserById,blockUsr,unblockUsr}