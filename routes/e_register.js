const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventRegController = require('../controller/e_register');


router.post("/:id/register",EventRegController.event_reg);
router.get("/register/search/:id",checkAuth,checkAdmin,EventRegController.registration_by_id);
router.get("/register/search",checkAuth,checkAdmin,EventRegController.all_registration);


module.exports=router;
