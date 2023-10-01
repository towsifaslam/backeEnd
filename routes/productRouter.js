const express = require('express');
const { createProduct ,deleteProduct,getProductById,getProducts, updateProduct} = require('../controllers/productCtrl');
const {isAdmin,authMiddleWare} = require('../middlewares/authMiddlware') 
const productRouter = express.Router();

productRouter.post('/',authMiddleWare,isAdmin,createProduct)
productRouter.get('/',authMiddleWare,getProducts) 
productRouter.get('/:id',authMiddleWare,isAdmin,getProductById)
productRouter.put('/:id',authMiddleWare,isAdmin,updateProduct)
productRouter.delete('/:id',authMiddleWare,isAdmin,deleteProduct)

module.exports = productRouter;