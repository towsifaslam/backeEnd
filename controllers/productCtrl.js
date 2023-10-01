const  slugify  = require("slugify");
const Product = require("../models/productModel");

 const createProduct = async(req,res,next)=>{
    console.log(req.body)
  try {
    if(req.body.title){
      req.body.slug = slugify(req.body.title)
    } 
    
    
   const newProduct = await Product.create(req.body)
   res.json({
    message: 'Hey it prouduct prost',
    newProduct
  })
  } catch (error) { 
    throw new Error(error)    
  } 

 }
 const updateProduct = async(req,res,next)=>{
  const id = req.params.id;
  try {
     if(req.body.title){
      req.body.slug = slugify(req.body.title)
     };
     const updateProduct = await Product.findByIdAndUpdate(id,req.body,{new:true})
       res.status(200).json({message:'user already updated',updateProduct})
    } catch (error) {
    throw new Error(error.message)
  }
 }
 const deleteProduct = async(req,res,next)=>{
  const id = req.params.id;
  try {
     const deleteProduct = await Product.findOneAndDelete(id);
     res.json(deleteProduct)
  } catch (error) {
    throw new Error(error)
    
  }
 }
 const getProductById = async(req,res,next)=>{
  try {
    const id = req.params.id
   const product = await Product.findOne({_id:id})
   res.json({
    message: 'product founded',
    product
  })
  } catch (error) {
    throw new Error(error)
  }

 }
const getProducts = async(req,res,next)=>{ 
  console.log(req.query) 
  try { 
     const products = await Product.find(req.query);
     if(!products){
       throw new Error('Produtc not found')
     }
     res.json({
      message:'products found',
      products
     })
  } catch (error) {
    
  }
}
  
 module.exports = {createProduct,deleteProduct,getProductById,updateProduct,getProducts}