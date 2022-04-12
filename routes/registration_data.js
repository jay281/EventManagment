const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const RegController = require('../controller/registration_data');


router.post("/:eid/registration",RegController.Register);


module.exports=router;
