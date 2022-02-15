const express = require('express');
const router = express.Router();



const AuthController = require('../controller/auth');
const checkadmin= require('../middleware/isAdmin');
const checkauth = require('../middleware/verifytoken');


router.post("/forgotpassword",AuthController.forgot_Password);
router.post("/reset/:token",AuthController.ResetNewPassword);


module.exports=router;
