const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.js")
const {verifyJWT} = require("../middleware/auth.js")
const { signUp, 
    login,
    getuser,
    logout,
    findAllUsers,
    getRoomId
} = require('../controllers/user.controller.js');


//user
router.post("/signUp",upload.single('avatar'),signUp);
router.post("/login",login); 
router.post("/getuser",verifyJWT,getuser);
router.post("/findAllUsers",findAllUsers);
router.post("/getRoomId",getRoomId); 
// router.post("/sendOtp",sendOtp);
// router.post("/verifyOtp",verifyOtp);
 router.post("/logout",verifyJWT,logout);
// router.post("/resetPassword",resetPassword);
// router.post("/uploadAvatar",verifyJWT ,upload.single('avatar'),uploadAvatar);
// router.post("/createPost",verifyJWT,upload.single('productImage') ,createPost);
// router.post("/UpdateUserDetails",verifyJWT,upload.single('avatar') ,UpdateUserDetails);

module.exports = router;
