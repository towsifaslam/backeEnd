const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const ProductSchem = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    slug:{
        type:String,
         
         
    },
    description:{
        type:String,
        required:true,
         
    },
    price:{
        type:Number,
        required:true, 
    },
    category:{
      type: String,
      required:true,
    },
    brand:{
      type:String,
       required:true,
    },
      
      quantity:{type:Number,required:true},
    sold:{
      type:Number,
      default:0,
      
    },
    images:{ 
      type: Array,
    },
    color:{
      type: String,
       required:true
    },
    ratings:[ 
      {
        star:Number,   
        postedby:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
      }
    ]
});

//Export the model
 const Product= mongoose.model('Product', ProductSchem);
module.exports = Product