const express = require('express');
const router = express.Router();
const user = require('../models/User/User');


const UserController = require('../controller/user');
const checkadmin= require('../middleware/isAdmin');
const checkauth = require('../middleware/verifytoken');

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.post("/delete/:id",checkauth,checkadmin,UserController.delete_user);
router.get("/",checkauth,checkadmin,UserController.all_user);
router.get("/search/:id",checkauth,checkadmin,UserController.user_by_id);
router.post("/search",checkauth,checkadmin,UserController.user_by_fname);
router.post("/search",checkauth,checkadmin,UserController.user_by_email);


module.exports=router;
