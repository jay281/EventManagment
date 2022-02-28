const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventRegPerController = require('../controller/event_reg_person');



router.get("/search/:id",checkAuth,checkAdmin,EventRegPerController.person_by_id);
router.get("/search",checkAuth,checkAdmin,EventRegPerController.all_reg_persons);
router.post("/search",checkAuth,checkAdmin,EventRegPerController.person_by_title);


module.exports=router;