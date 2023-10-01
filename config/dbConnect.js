const mongoose = require('mongoose')


const dbConnect = async()=>{
  try {
  const connect = mongoose.connect(process.env.MONGO_URL) 
  console.log('database coccented successfully')
    
  } catch (error) {
   console.log('Database error')
    
  }
}

module.exports = dbConnect;