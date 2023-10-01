const mongoose = require('mongoose') // erase if alreadu require
const bcrypt =require('bcryptjs')
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required:true, 
    unique:true,
    index:true, 
  },
  lastName:{ 
    type: String,
    required:true, 
    index:true, 
  },
  mobile:{
   type: String,
   required:true,
   unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true, 
  },
  password:{
    type:String,
    required:true
  },
  isBlocked:{type:Boolean,default:false},
  role:{
    type:String,
    default:'user'
  },
  cart:{
    type: Array,
    default:[]
  },
  address:[{type:mongoose.Schema.Types.ObjectId,ref:"Address"}],
  wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
  refreshToken:{
    type:String
  }
},{timestamps:true})
userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enterPassword){
  return await bcrypt.compare(enterPassword,this.password)
}

const User = mongoose.model('User',userSchema);
module.exports = User;
