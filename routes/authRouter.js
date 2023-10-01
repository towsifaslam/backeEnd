const express = require('express');
const { createUser, loginUserCrtl, getalUser,getIdByUser,deleteIdByUser,updateUserById,blockUsr,unblockUsr, handleRefreshToken, logout} = require('../controllers/userCtrl');
const router = express.Router();
const {authMiddleWare, isAdmin} = require('../middlewares/authMiddlware')

router.post('/register',createUser);
router.post('/login',loginUserCrtl); 
router.get('/',getalUser)
router.get('/refresh',handleRefreshToken) 
router.get('/:id',authMiddleWare,isAdmin,getIdByUser)
router.get('/logout',logout)
router.delete('/:id',deleteIdByUser)
router.put('/:id',authMiddleWare,updateUserById)
router.put('/block_user/:id',authMiddleWare,isAdmin,blockUsr)
router.put('/unBlock_user/:id',authMiddleWare,isAdmin,unblockUsr)
 
module.exports = router;  