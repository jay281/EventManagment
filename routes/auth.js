const express = require('express');
const router = express.Router();



const AuthController = require('../controller/auth');


router.post("/forgotpassword",AuthController.forgot_Password);
router.post("/resetpassword",AuthController.ResetNewPassword);


module.exports=router;
