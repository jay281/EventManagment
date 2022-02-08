const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventPerController = require('../controller/event_person');


router.post("/:id/person/create",checkAuth,checkAdmin,EventPerController.person_create);
router.get("/person/search/:id",checkAuth,checkAdmin,EventPerController.person_by_id);
router.get("/person/search",checkAuth,checkAdmin,EventPerController.all_event_persons);
router.post("/person/search",checkAuth,checkAdmin,EventPerController.person_by_username);


module.exports=router;